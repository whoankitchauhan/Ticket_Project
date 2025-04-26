import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import { completeOnboarding } from "@/api/auth";
import { CheckCircle, ChevronLeft, ChevronRight, LifeBuoy, MessageCircle, Ticket, Wallet } from "lucide-react";

interface OnboardingProps {
  onComplete?: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const steps = [
    {
      title: "Welcome to Solaready",
      description: "Your all-in-one customer support platform",
      icon: <LifeBuoy className="h-12 w-12 text-primary" />,
      content: "Solaready helps you manage customer inquiries, track support tickets, and handle all your service needs in one place. We'll guide you through the key features to help you get started."
    },
    {
      title: "Raise and Track Tickets",
      description: "Easily create and monitor support requests",
      icon: <Ticket className="h-12 w-12 text-primary" />,
      content: "Submit new support tickets, track their status, and view updates all in one place. Attach files, set priorities, and get email notifications on your ticket progress."
    },
    {
      title: "Live Chat Support",
      description: "Get instant help when you need it",
      icon: <MessageCircle className="h-12 w-12 text-primary" />,
      content: "Connect with our support team instantly through live chat. Our AI chatbot is available 24/7 to answer common questions, or you can escalate to a human agent when needed."
    },
    {
      title: "Secure Payments",
      description: "Manage your invoices and payments",
      icon: <Wallet className="h-12 w-12 text-primary" />,
      content: "View and pay invoices securely through our platform. Access your payment history, download receipts, and set up automatic payments for hassle-free service."
    },
    {
      title: "You're All Set!",
      description: "Start using Solaready",
      icon: <CheckCircle className="h-12 w-12 text-primary" />,
      content: "You're now ready to use all the features of Solaready. If you have any questions, you can visit our Knowledge Base or contact our support team at any time."
    }
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCompleteOnboarding();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteOnboarding = async () => {
    try {
      await completeOnboarding();
      toast({
        title: "Onboarding completed",
        description: "Welcome to Solaready!",
      });
      if (onComplete) {
        onComplete();
      } else {
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to complete onboarding process",
      });
    }
  };

  const handleSkip = async () => {
    try {
      await completeOnboarding();
      if (onComplete) {
        onComplete();
      } else {
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to skip onboarding process",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4">
      <Card className="w-full max-w-2xl overflow-hidden border bg-card/60 backdrop-blur-sm shadow-lg">
        <CardContent className="p-0">
          <div className="flex justify-center bg-primary/10 p-6">
            {steps[currentStep].icon}
          </div>
          <div className="space-y-4 p-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">{steps[currentStep].title}</h1>
              <p className="text-muted-foreground">{steps[currentStep].description}</p>
            </div>
            <div className="py-4 text-center">{steps[currentStep].content}</div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>
                {currentStep < steps.length - 1 && (
                  <Button size="sm" onClick={handleNextStep}>
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
                {currentStep === steps.length - 1 && (
                  <Button size="sm" onClick={handleCompleteOnboarding}>
                    Get Started
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
              {currentStep < steps.length - 1 && (
                <Button variant="ghost" size="sm" onClick={handleSkip}>
                  Skip
                </Button>
              )}
            </div>
            <div className="flex justify-center gap-1 pt-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 w-12 rounded-full",
                    index === currentStep ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}