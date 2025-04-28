import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getChats, sendChatMessage } from "@/api/chat";
import { useToast } from "@/hooks/useToast";
import { Send, Bot, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Chat() {
  const { toast } = useToast();
  const [activeChat, setActiveChat] = useState<string>("bot");
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [agents, setAgents] = useState<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getChats();
        setMessages(data.messages || []);
        setAgents(data.agents || []);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load chat history",
        });
      }
    };

    fetchChats();

    // Simulate initial bot message
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          senderName: "Solaready AI",
          message: "Hello! I'm your Solaready AI assistant. How can I help you today?",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [toast]);

  // Scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      senderName: "You",
      message: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    if (activeChat === "bot") {
      // Simulate bot typing
      setIsBotTyping(true);
      setTimeout(async () => {
        try {
          const response = await sendChatMessage(input, "bot");
          setIsBotTyping(false);
          setMessages((prev) => [...prev, response.message]);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to get response",
          });
          setIsBotTyping(false);
        } finally {
          setLoading(false);
        }
      }, 1500);
    } else {
      // Handle human agent chat
      try {
        const response = await sendChatMessage(input, "human", selectedAgent || undefined);
        setMessages((prev) => [...prev, response.message]);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to send message",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectAgent = (agentId: string) => {
    setSelectedAgent(agentId);
    setActiveChat("human");

    // Add a system message about connecting to an agent
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "system",
        message: "You are now connected to a support agent. They will respond shortly.",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chat Support</h1>
        <p className="text-muted-foreground mt-1">
          Get instant help from our AI assistant or connect with a support agent
        </p>
      </div>

      <Tabs defaultValue="bot" value={activeChat} onValueChange={setActiveChat} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="bot" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI Assistant
          </TabsTrigger>
          <TabsTrigger value="human" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Human Agent
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <div className="h-[calc(80vh-12rem)] md:col-span-2 flex flex-col">
            <Card className="flex-1 bg-card/60 backdrop-blur-sm flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle>
                  {activeChat === "bot" ? "AI Assistant" : "Support Agent"}
                </CardTitle>
                <CardDescription>
                  {activeChat === "bot"
                    ? "Our AI assistant is available 24/7 to help you with common questions"
                    : selectedAgent
                      ? "You are connected to a support agent"
                      : "Select an agent to start chatting"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pb-4 space-y-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.sender !== "user" && msg.sender !== "system" && (
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={msg.sender === "bot" ? "/bot-avatar.png" : "/agent-avatar.png"} />
                          <AvatarFallback>
                            {msg.sender === "bot" ? "AI" : "AG"}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          msg.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : msg.sender === "system"
                            ? "bg-muted text-muted-foreground text-center w-full"
                            : "bg-secondary"
                        }`}
                      >
                        {msg.sender !== "system" && (
                          <div className="flex justify-between items-center gap-4 mb-1">
                            <p className="text-xs font-medium">
                              {msg.senderName || (msg.sender === "bot" ? "AI Assistant" : "Agent")}
                            </p>
                            <p className="text-xs opacity-70">{formatTime(msg.timestamp)}</p>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                      </div>

                      {msg.sender === "user" && (
                        <Avatar className="h-8 w-8 ml-2">
                          <AvatarImage src="/user-avatar.png" />
                          <AvatarFallback>ME</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {isBotTyping && (
                    <div className="flex justify-start">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/bot-avatar.png" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-4 py-2 bg-secondary">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-primary delay-75"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-primary delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={endOfMessagesRef} />
                </div>
              </CardContent>

              <div className="p-4 border-t">
                <div className="flex">
                  <Textarea
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-12 resize-none"
                    disabled={loading || (activeChat === "human" && !selectedAgent)}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="ml-2"
                    disabled={!input.trim() || loading || (activeChat === "human" && !selectedAgent)}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {activeChat === "human" && !selectedAgent && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Please select an agent from the list to start chatting
                  </p>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {activeChat === "human" && (
              <Card className="bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Support Agents</CardTitle>
                  <CardDescription>
                    Available agents ready to help you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {agents.map((agent) => (
                    <div
                      key={agent._id}
                      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedAgent === agent._id
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => selectAgent(agent._id)}
                    >
                      <Avatar>
                        <AvatarImage src={agent.avatar} />
                        <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {agent.department} • {agent.status === "online" ? "Available" : "Busy"}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            agent.status === "online" ? "bg-green-500" : "bg-orange-500"
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "What is my account status?",
                  "How do I reset my password?",
                  "When is my next invoice due?",
                  "How can I download my documents?",
                  "What are your support hours?",
                ].map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => {
                      setInput(question);
                      setActiveChat("bot");
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}