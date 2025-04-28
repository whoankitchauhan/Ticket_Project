import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"

import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { Onboarding } from "./pages/Onboarding"
import { TicketList } from "./pages/TicketList"
import { CreateTicket } from "./pages/CreateTicket"
import { TicketDetail } from "./pages/TicketDetail"
import { Chat } from "./pages/Chat"
import { KnowledgeBase } from "./pages/KnowledgeBase"
import { Profile } from "./pages/Profile"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="tickets" element={<TicketList />} />
            <Route path="tickets/new" element={<CreateTicket />} />
            <Route path="tickets/:id" element={<TicketDetail />} />
            <Route path="chat" element={<Chat />} />
            <Route path="knowledge" element={<KnowledgeBase />} />
            <Route path="notifications" element={
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">Notifications</h1>
                <p className="text-muted-foreground">Coming soon</p>
              </div>
            } />
            <Route path="payments" element={
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">Payments & Invoices</h1>
                <p className="text-muted-foreground">Coming soon</p>
              </div>
            } />
            <Route path="settings" element={
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">Settings</h1>
                <p className="text-muted-foreground">Coming soon</p>
              </div>
            } />
            <Route path="*" element={
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
                <p className="text-muted-foreground">The page you are looking for does not exist.</p>
              </div>
            } />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
