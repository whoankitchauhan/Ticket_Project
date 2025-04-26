import api from './api';

// Description: Get dashboard overview data
// Endpoint: GET /api/dashboard/overview
// Request: {}
// Response: {
//   activeTickets: number,
//   ticketChange: number,
//   pendingPayments: number,
//   pendingInvoices: number,
//   resolvedTickets: number,
//   recentTickets: Array<{_id: string, title: string, status: string, createdAt: string}>,
//   announcements: Array<{_id: string, title: string, content: string, date: string}>,
//   chartData: Array<{date: string, value: number}>
// }
export const getOverviewData = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        activeTickets: 3,
        ticketChange: 12,
        pendingPayments: 249.99,
        pendingInvoices: 2,
        resolvedTickets: 15,
        recentTickets: [
          {
            _id: "t1",
            ticketId: "SR-2023-001",
            title: "Unable to access account settings",
            status: "open",
            createdAt: "2023-06-15T10:30:00Z"
          },
          {
            _id: "t2",
            ticketId: "SR-2023-002",
            title: "Billing discrepancy on latest invoice",
            status: "in-progress",
            createdAt: "2023-06-10T14:20:00Z"
          },
          {
            _id: "t3",
            ticketId: "SR-2023-003",
            title: "Request for additional user licenses",
            status: "closed",
            createdAt: "2023-06-05T09:15:00Z"
          }
        ],
        announcements: [
          {
            _id: "a1",
            title: "Scheduled Maintenance",
            content: "Our systems will be undergoing scheduled maintenance on June 30th from 2:00 AM to 4:00 AM EST. During this time, some services may be temporarily unavailable.",
            date: "2023-06-20T08:00:00Z"
          },
          {
            _id: "a2",
            title: "New Feature Release",
            content: "We're excited to announce our new mobile app is now available for download on iOS and Android devices!",
            date: "2023-06-15T10:00:00Z"
          }
        ],
        chartData: [
          { date: "Jan", value: 4 },
          { date: "Feb", value: 3 },
          { date: "Mar", value: 5 },
          { date: "Apr", value: 7 },
          { date: "May", value: 2 },
          { date: "Jun", value: 6 }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/dashboard/overview');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};