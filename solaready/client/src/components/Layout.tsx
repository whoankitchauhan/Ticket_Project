import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Sidebar } from "./Sidebar"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Onboarding } from "@/pages/Onboarding"

export function Layout() {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if this is the first login for the user
    if (user?.firstLogin) {
      setShowOnboarding(true);
    }
  }, [user]);

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Header />
      <div className="flex h-[calc(100vh-4rem)] pt-16">
        <Sidebar className="w-64 hidden md:block" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}