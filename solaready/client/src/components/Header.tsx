import { Bell, LogOut, Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { ThemeToggle } from "./ui/theme-toggle"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useState } from "react"
import { Badge } from "./ui/badge"

export function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(3);
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleNavigateHome}>
            <div className="rounded-full bg-primary p-1">
              <svg
                className="h-5 w-5 text-primary-foreground"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v8" />
                <path d="M6.8 7a6 6 0 1 0 10.396 0" />
              </svg>
            </div>
            <span className="text-xl font-bold">Solaready</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative" 
            onClick={() => navigate("/notifications")}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Log out">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}