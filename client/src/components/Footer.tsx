import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();
  
  return (
    <footer className="fixed bottom-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container flex h-14 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Solaready. All rights reserved.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate("/privacy")} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => navigate("/terms")} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </button>
        </div>
      </div>
    </footer>
  )
}