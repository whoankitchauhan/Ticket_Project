import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  Download,
  FileUp,
  MessageSquare,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { getTicketById, addTicketReply } from "@/api/tickets";
import { Input } from "@/components/ui/input";

export function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      if (!id) return;

      try {
        const data = await getTicketById(id);
        setTicket(data.ticket);
        setLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load ticket details",
        });
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...fileArray]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitReply = async () => {
    if (!reply.trim() && attachments.length === 0) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("message", reply);
      formData.append("ticketId", id || "");

      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      await addTicketReply(formData);

      // Update ticket with new reply
      const data = await getTicketById(id || "");
      setTicket(data.ticket);
      
      // Reset form
      setReply("");
      setAttachments([]);
      
      toast({
        title: "Reply sent",
        description: "Your message has been added to the ticket",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send reply",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            Open
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="mr-1 h-3 w-3" />
            In Progress
          </Badge>
        );
      case "closed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Closed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-primary"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <AlertCircle className="h-16 w-16 text-destructive" />
        <h2 className="mt-4 text-xl font-bold">Ticket not found</h2>
        <p className="text-muted-foreground">
          The requested ticket could not be found
        </p>
        <Button className="mt-4" onClick={() => navigate("/tickets")}>
          Back to Tickets
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/tickets")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ticket #{ticket.ticketId}</h1>
          <p className="text-muted-foreground mt-1">
            Created on {new Date(ticket.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{ticket.title}</CardTitle>
              <CardDescription>
                Submitted by {ticket.createdBy.name} • {new Date(ticket.createdAt).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none dark:prose-invert">
                <p>{ticket.description}</p>
              </div>

              {ticket.attachments && ticket.attachments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Attachments</h4>
                  <div className="space-y-2">
                    {ticket.attachments.map((attachment: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md border p-2"
                      >
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-1">
                            <FileUp className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{attachment.filename}</p>
                            <p className="text-xs text-muted-foreground">
                              {(attachment.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(attachment.url, "_blank")}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Conversation</h3>
            
            {ticket.replies && ticket.replies.length > 0 ? (
              <div className="space-y-4">
                {ticket.replies.map((reply: any) => (
                  <Card key={reply._id} className={`bg-card/60 backdrop-blur-sm ${
                    reply.isStaff ? 'border-l-4 border-l-primary' : ''
                  }`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={reply.user.avatar} />
                            <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{reply.user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {reply.isStaff ? 'Support Staff' : 'Customer'} • {new Date(reply.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {reply.isStaff && (
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            Staff
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="prose max-w-none dark:prose-invert">
                        <p>{reply.message}</p>
                      </div>

                      {reply.attachments && reply.attachments.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Attachments</h4>
                          <div className="space-y-2">
                            {reply.attachments.map((attachment: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center justify-between rounded-md border p-2"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-primary/10 p-1">
                                    <FileUp className="h-4 w-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{attachment.filename}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {(attachment.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => window.open(attachment.url, "_blank")}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-card/60 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <MessageSquare className="h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-2 text-center text-muted-foreground">
                    No replies yet. Add a reply to continue the conversation.
                  </p>
                </CardContent>
              </Card>
            )}

            {ticket.status !== "closed" && (
              <Card className="bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Add Reply</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Type your message here..."
                      className="min-h-32"
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                    />

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("reply-file-upload")?.click()}
                          >
                            <FileUp className="mr-2 h-4 w-4" />
                            Upload Files
                          </Button>
                          <Input
                            id="reply-file-upload"
                            type="file"
                            className="hidden"
                            multiple
                            onChange={handleFileChange}
                          />
                          <p className="text-sm text-muted-foreground">
                            Max 5 files (10MB each)
                          </p>
                        </div>
                      </div>

                      {attachments.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Attached Files</h4>
                          <div className="space-y-2">
                            {attachments.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between rounded-md border p-2"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-primary/10 p-1">
                                    <FileUp className="h-4 w-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeAttachment(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end">
                        <Button
                          onClick={handleSubmitReply}
                          disabled={submitting || (!reply.trim() && attachments.length === 0)}
                          className="flex items-center gap-2"
                        >
                          {submitting ? "Sending..." : "Send Reply"}
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Status</p>
                <div>{getStatusBadge(ticket.status)}</div>
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Priority</p>
                <Badge
                  variant="outline"
                  className={`
                    ${ticket.priority === "high" ? "bg-red-100 text-red-800 border-red-200" : ""}
                    ${ticket.priority === "medium" ? "bg-orange-100 text-orange-800 border-orange-200" : ""}
                    ${ticket.priority === "low" ? "bg-green-100 text-green-800 border-green-200" : ""}
                  `}
                >
                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                </Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Category</p>
                <p>{ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1)}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Created By</p>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={ticket.createdBy.avatar} />
                    <AvatarFallback>{ticket.createdBy.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p>{ticket.createdBy.name}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Last Updated</p>
                <p>{new Date(ticket.updatedAt).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {ticket.status !== "closed" && (
                <Button className="w-full justify-start" variant="outline">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Resolved
                </Button>
              )}
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate(`/chat?ticketId=${ticket._id}`)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}