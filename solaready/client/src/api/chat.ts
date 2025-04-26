import api from './api';

// Description: Get chat history and available agents
// Endpoint: GET /api/chat
// Request: {}
// Response: {
//   messages: Array<{ id: string, sender: string, senderName: string, message: string, timestamp: string }>,
//   agents: Array<{ _id: string, name: string, avatar: string, department: string, status: string }>
// }
export const getChats = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        messages: [
          {
            id: "welcome",
            sender: "bot",
            senderName: "Solaready AI",
            message: "Hello! I'm your Solaready AI assistant. How can I help you today?",
            timestamp: new Date().toISOString()
          }
        ],
        agents: [
          {
            _id: "a1",
            name: "Sarah Johnson",
            avatar: "",
            department: "Technical Support",
            status: "online"
          },
          {
            _id: "a2",
            name: "Michael Chen",
            avatar: "",
            department: "Billing Support",
            status: "online"
          },
          {
            _id: "a3",
            name: "Emily Rodriguez",
            avatar: "",
            department: "Account Management",
            status: "busy"
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/chat');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Send a chat message
// Endpoint: POST /api/chat/message
// Request: { message: string, type: "bot" | "human", agentId?: string }
// Response: {
//   message: { id: string, sender: string, senderName: string, message: string, timestamp: string }
// }
export const sendChatMessage = (message: string, type: "bot" | "human", agentId?: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      if (type === "bot") {
        // AI responses based on user query
        let botResponse = "";
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes("password") && (lowerMessage.includes("reset") || lowerMessage.includes("forgot"))) {
          botResponse = "To reset your password, please go to the login page and click on 'Forgot Password'. You'll receive an email with instructions to create a new password.";
        } else if (lowerMessage.includes("invoice") || lowerMessage.includes("payment") || lowerMessage.includes("bill")) {
          botResponse = "Your next invoice is due on July 15, 2023. You can view all your invoices and make payments in the Payments section of your dashboard.";
        } else if (lowerMessage.includes("account") && lowerMessage.includes("status")) {
          botResponse = "Your account is currently active and in good standing. You have 3 active licenses and your subscription renews on August 1, 2023.";
        } else if (lowerMessage.includes("download") && lowerMessage.includes("document")) {
          botResponse = "You can download your documents from the Documents section in your profile. All files are available in PDF format.";
        } else if (lowerMessage.includes("support") && lowerMessage.includes("hours")) {
          botResponse = "Our live support team is available Monday through Friday, 9:00 AM to 8:00 PM EST. For urgent issues outside these hours, please submit a high-priority ticket.";
        } else {
          botResponse = "I'm not sure I understand your question. Could you please provide more details or rephrase? Alternatively, you can connect with a human agent for more assistance.";
        }

        resolve({
          message: {
            id: Date.now().toString(),
            sender: "bot",
            senderName: "Solaready AI",
            message: botResponse,
            timestamp: new Date().toISOString()
          }
        });
      } else {
        // Human agent response (simulated)
        resolve({
          message: {
            id: Date.now().toString(),
            sender: "agent",
            senderName: agentId === "a1" ? "Sarah Johnson" : agentId === "a2" ? "Michael Chen" : "Emily Rodriguez",
            message: "Thank you for your message. I'm reviewing your inquiry and will respond shortly. Is there anything else you'd like to add in the meantime?",
            timestamp: new Date().toISOString()
          }
        });
      }
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/chat/message', { message, type, agentId });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};