import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BarChart3, Bell, CreditCard, FileQuestion, Home, LifeBuoy, MessageSquare, Settings, ShieldQuestion, Ticket, User } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { user } = useAuth();

  return (
    <div className={cn("pb-12 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary p-1">
              <LifeBuoy className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-semibold tracking-tight">Solaready</h2>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
              <p className="text-xs leading-none text-muted-foreground mt-1">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
        </div>
        <div className="px-3">
          <ScrollArea className="h-[calc(100vh-9rem)]">
            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">
                GENERAL
              </h2>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )
                }
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )
                }
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </NavLink>
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )
                }
              >
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </NavLink>
            </div>
            <div className="space-y-1 mt-6">
              <h2 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">
                SUPPORT
              </h2>
              <NavLink
                to="/tickets"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )
                }
              >
                <Ticket className="h-4 w-4" />
                <span>Tickets</span>
              </NavLink>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )
                }
              >
                <MessageSquare className="h-4 w-4" />
                <span>Live Chat</span>
              </NavLink>
              <NavLink
                to="/knowledge"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )
                }
              >
                <FileQuestion className="h-4 w-4" />
                <span>Knowledge Base</span>
              </NavLink>
            </div>
            <div className="space-y-1 mt-6">
              <h2 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">
                BILLING
              </h2>
              <NavLink
                to="/payments"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )
                }
              >
                <CreditCard className="h-4 w-4" />
                <span>Payments</span>
              </NavLink>
            </div>
            <div className="space-y-1 mt-6">
              <h2 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">
                ACCOUNT
              </h2>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )
                }
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </NavLink>
              {user?.isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                    )
                  }
                >
                  <ShieldQuestion className="h-4 w-4" />
                  <span>Admin</span>
                </NavLink>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}