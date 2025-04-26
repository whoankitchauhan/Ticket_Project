import api from './api';

// Description: Get all tickets for the current user
// Endpoint: GET /api/tickets
// Request: {}
// Response: { tickets: Array<{ _id: string, ticketId: string, title: string, description: string, status: string, priority: string, type: string, createdAt: string, updatedAt: string }> }
export const getTickets = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        tickets: [
          {
            _id: "t1",
            ticketId: "SR-2023-001",
            title: "Unable to access account settings",
            description: "I'm trying to update my profile information but the settings page gives me an error.",
            status: "open",
            priority: "high",
            type: "technical",
            createdAt: "2023-06-15T10:30:00Z",
            updatedAt: "2023-06-15T10:30:00Z"
          },
          {
            _id: "t2",
            ticketId: "SR-2023-002",
            title: "Billing discrepancy on latest invoice",
            description: "The amount charged on my latest invoice doesn't match our agreement.",
            status: "in-progress",
            priority: "medium",
            type: "billing",
            createdAt: "2023-06-10T14:20:00Z",
            updatedAt: "2023-06-12T09:15:00Z"
          },
          {
            _id: "t3",
            ticketId: "SR-2023-003",
            title: "Request for additional user licenses",
            description: "We need to add 5 more user licenses to our account.",
            status: "closed",
            priority: "low",
            type: "account",
            createdAt: "2023-06-05T09:15:00Z",
            updatedAt: "2023-06-07T11:30:00Z"
          },
          {
            _id: "t4",
            ticketId: "SR-2023-004",
            title: "Feature request: Dark mode",
            description: "Would like to request a dark mode option for the dashboard.",
            status: "open",
            priority: "low",
            type: "service",
            createdAt: "2023-06-02T16:45:00Z",
            updatedAt: "2023-06-02T16:45:00Z"
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/tickets');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get a specific ticket by ID
// Endpoint: GET /api/tickets/:id
// Request: {}
// Response: { 
//   ticket: { 
//     _id: string, 
//     ticketId: string, 
//     title: string, 
//     description: string, 
//     status: string, 
//     priority: string, 
//     type: string, 
//     createdAt: string, 
//     updatedAt: string,
//     createdBy: { _id: string, name: string, email: string, avatar: string },
//     attachments: Array<{ filename: string, url: string, size: number }>,
//     replies: Array<{
//       _id: string,
//       message: string,
//       createdAt: string,
//       isStaff: boolean,
//       user: { _id: string, name: string, avatar: string },
//       attachments: Array<{ filename: string, url: string, size: number }>
//     }>
//   }
// }
export const getTicketById = (id: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ticket: {
          _id: id,
          ticketId: "SR-2023-001",
          title: "Unable to access account settings",
          description: "I'm trying to update my profile information but the settings page gives me an error. Every time I click on 'Save Changes', I get a message saying 'An error occurred. Please try again later.' I've tried using different browsers and clearing my cache, but the issue persists.",
          status: "in-progress",
          priority: "high",
          type: "technical",
          createdAt: "2023-06-15T10:30:00Z",
          updatedAt: "2023-06-16T14:20:00Z",
          createdBy: {
            _id: "u1",
            name: "John Doe",
            email: "john.doe@example.com",
            avatar: ""
          },
          attachments: [
            {
              filename: "error_screenshot.png",
              url: "#",
              size: 1024000
            }
          ],
          replies: [
            {
              _id: "r1",
              message: "Thank you for reporting this issue. Could you please provide more details about which specific settings you're trying to update?",
              createdAt: "2023-06-15T11:45:00Z",
              isStaff: true,
              user: {
                _id: "s1",
                name: "Support Agent",
                avatar: ""
              },
              attachments: []
            },
            {
              _id: "r2",
              message: "I'm trying to update my billing address in the account settings section. I've attached another screenshot showing the exact error message.",
              createdAt: "2023-06-15T12:30:00Z",
              isStaff: false,
              user: {
                _id: "u1",
                name: "John Doe",
                avatar: ""
              },
              attachments: [
                {
                  filename: "detailed_error.png",
                  url: "#",
                  size: 1536000
                }
              ]
            },
            {
              _id: "r3",
              message: "We've identified the issue with the billing address update functionality. Our team is working on a fix and it should be resolved within the next 24 hours. In the meantime, I can update your billing address manually if you provide the details.",
              createdAt: "2023-06-16T09:15:00Z",
              isStaff: true,
              user: {
                _id: "s1",
                name: "Support Agent",
                avatar: ""
              },
              attachments: []
            }
          ]
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get(`/api/tickets/${id}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Create a new ticket
// Endpoint: POST /api/tickets
// Request: FormData with { title: string, description: string, type: string, priority: string, attachments: File[] }
// Response: { success: boolean, message: string, ticketId: string }
export const createTicket = (formData: FormData) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Ticket created successfully",
        ticketId: "t5"
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/tickets', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Add a reply to a ticket
// Endpoint: POST /api/tickets/reply
// Request: FormData with { ticketId: string, message: string, attachments: File[] }
// Response: { success: boolean, message: string }
export const addTicketReply = (formData: FormData) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Reply added successfully"
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/tickets/reply', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get knowledge base suggestions based on ticket description
// Endpoint: GET /api/knowledge/suggest
// Request: { query: string }
// Response: { suggestions: Array<{ _id: string, title: string, excerpt: string }> }
export const getKnowledgeBaseSuggestions = (query: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        suggestions: [
          {
            _id: "kb1",
            title: "How to update your account settings",
            excerpt: "A step-by-step guide to updating your profile information, billing details, and notification preferences."
          },
          {
            _id: "kb2",
            title: "Troubleshooting common account errors",
            excerpt: "Solutions for the most frequently encountered errors when managing your account settings."
          },
          {
            _id: "kb3",
            title: "Browser compatibility issues",
            excerpt: "Learn which browsers work best with our platform and how to resolve common compatibility problems."
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/knowledge/suggest', { params: { query } });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};