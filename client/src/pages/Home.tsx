import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, CheckCircle, HelpCircle, PlusCircle, TicketCheck, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOverviewData } from "@/api/dashboard";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/contexts/AuthContext";

export function Home() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOverviewData();
        setDashboardData(data);
        setLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load dashboard data",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleCreateTicket = () => {
    navigate("/tickets/new");
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's a summary of your support activity.
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={handleCreateTicket} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>New Ticket</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
            <TicketCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.activeTickets}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.ticketChange > 0 
                ? `+${dashboardData.ticketChange}% from last week` 
                : `${dashboardData.ticketChange}% from last week`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Payments</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.pendingPayments.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.pendingInvoices} pending invoices
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resolved Issues</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.resolvedTickets}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors">
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
            <CardDescription>Your recently created support tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {dashboardData.recentTickets.map((ticket: any) => (
                <div key={ticket._id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{ticket.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    ticket.status === 'open' ? 'bg-yellow-100 text-yellow-800' : 
                    ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {ticket.status}
                  </div>
                </div>
              ))}
              {dashboardData.recentTickets.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No recent tickets found
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors">
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>The latest updates from Solaready</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.announcements.map((announcement: any) => (
                <div key={announcement._id} className="space-y-2">
                  <h3 className="font-medium">{announcement.title}</h3>
                  <p className="text-sm text-muted-foreground">{announcement.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(announcement.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {dashboardData.announcements.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No announcements at this time
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="col-span-4 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Support Activity</CardTitle>
              <CardDescription>Your ticket activity over time</CardDescription>
            </div>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {dashboardData.chartData ? (
              <div className="h-[200px]">
                {/* Chart would be rendered here with actual implementation */}
                <div className="flex h-full items-end gap-2">
                  {dashboardData.chartData.map((item: any, i: number) => (
                    <div key={i} className="bg-primary/90 rounded-t w-full" 
                      style={{ height: `${(item.value / 10) * 100}%` }}></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center">
                <p className="text-muted-foreground">No data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common support actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Button variant="outline" className="justify-start" onClick={() => navigate("/tickets/new")}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Ticket
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => navigate("/chat")}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Chat with Support
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => navigate("/knowledge")}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Knowledge Base
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => navigate("/payments")}>
                <Wallet className="mr-2 h-4 w-4" />
                View Payments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}