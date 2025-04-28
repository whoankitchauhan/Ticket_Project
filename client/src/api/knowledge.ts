import api from './api';

// Description: Get knowledge base categories
// Endpoint: GET /api/knowledge/categories
// Request: {}
// Response: { categories: Array<{ _id: string, name: string, icon: string, color: string, articleCount: number }> }
export const getKnowledgeBaseCategories = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        categories: [
          {
            _id: "c1",
            name: "Account Management",
            icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" /><path d="M7 21C7 16.5817 9.58172 14 14 14C18.4183 14 21 16.5817 21 21H7Z" /></svg>',
            color: "#4f46e5",
            articleCount: 6
          },
          {
            _id: "c2",
            name: "Billing & Payments",
            icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M3 4.5C3 3.12 4.12 2 5.5 2H18.5C19.88 2 21 3.12 21 4.5V18.5C21 19.88 19.88 21 18.5 21H5.5C4.12 21 3 19.88 3 18.5V4.5ZM8 17H16C16.55 17 17 16.55 17 16C17 15.45 16.55 15 16 15H8C7.45 15 7 15.45 7 16C7 16.55 7.45 17 8 17ZM16 7H8C7.45 7 7 7.45 7 8C7 8.55 7.45 9 8 9H16C16.55 9 17 8.55 17 8C17 7.45 16.55 7 16 7ZM16 13H8C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11H16C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z" /></svg>',
            color: "#16a34a",
            articleCount: 8
          },
          {
            _id: "c3",
            name: "Technical Support",
            icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M3 17V7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17Z" /><path d="M9 11.5h2.5V9h1v2.5H15v1h-2.5V15h-1v-2.5H9v-1z" /></svg>',
            color: "#e11d48",
            articleCount: 12
          },
          {
            _id: "c4",
            name: "Getting Started",
            icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 17V11H13V17H11ZM11 9V7H13V9H11Z" /></svg>',
            color: "#f97316",
            articleCount: 4
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/knowledge/categories');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get knowledge base articles for a category
// Endpoint: GET /api/knowledge/categories/:categoryId/articles
// Request: {}
// Response: { articles: Array<{ _id: string, title: string, excerpt: string, content: string, helpful: number, viewCount: number, updatedAt: string, relatedArticles: Array<{ _id: string, title: string }> }> }
export const getKnowledgeBaseArticles = (categoryId: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        articles: [
          {
            _id: "a1",
            title: "How to reset your password",
            excerpt: "A step-by-step guide on how to reset your password if you've forgotten it or need to change it for security reasons.",
            content: "<h2>How to Reset Your Password</h2><p>If you've forgotten your password or need to change it for security reasons, follow these steps:</p><ol><li>Go to the login page</li><li>Click on 'Forgot Password'</li><li>Enter the email address associated with your account</li><li>Check your email for a password reset link</li><li>Click the link and follow the instructions to create a new password</li></ol>",
            helpful: 24,
            viewCount: 156,
            updatedAt: "2023-05-10T14:30:00Z",
            relatedArticles: [
              { _id: "a2", title: "How to update your email address" },
              { _id: "a3", title: "How to enable two-factor authentication" }
            ]
          },
          {
            _id: "a2",
            title: "How to update your email address",
            excerpt: "Learn how to update the email address associated with your account while maintaining your security settings.",
            content: "<h2>Updating Your Email Address</h2><p>To update the email address associated with your account:</p><ol><li>Log in to your account</li><li>Go to your Profile settings</li><li>Click on 'Edit' next to your email address</li><li>Enter your new email address</li><li>Verify the new email by clicking the link sent to that address</li></ol>",
            helpful: 18,
            viewCount: 120,
            updatedAt: "2023-05-12T10:45:00Z",
            relatedArticles: [
              { _id: "a1", title: "How to reset your password" },
              { _id: "a4", title: "How to manage notification settings" }
            ]
          },
          {
            _id: "a3",
            title: "How to enable two-factor authentication",
            excerpt: "Enhance your account security by setting up two-factor authentication to protect against unauthorized access.",
            content: "<h2>Enabling Two-Factor Authentication</h2><p>Two-factor authentication adds an extra layer of security to your account. To enable it:</p><ol><li>Go to your Account Security settings</li><li>Click on 'Enable Two-Factor Authentication'</li><li>Choose your preferred method (SMS or authenticator app)</li><li>Follow the prompts to complete the setup</li><li>Make sure to save your backup codes in a safe place</li></ol>",
            helpful: 32,
            viewCount: 210,
            updatedAt: "2023-05-15T09:20:00Z",
            relatedArticles: [
              { _id: "a1", title: "How to reset your password" },
              { _id: "a5", title: "Understanding security best practices" }
            ]
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get(`/api/knowledge/categories/${categoryId}/articles`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Search the knowledge base
// Endpoint: GET /api/knowledge/search
// Request: { query: string }
// Response: { results: Array<{ _id: string, title: string, excerpt: string, category: { _id: string, name: string } }> }
export const searchKnowledgeBase = (query: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        results: [
          {
            _id: "a1",
            title: "How to reset your password",
            excerpt: "A step-by-step guide on how to reset your password if you've forgotten it or need to change it for security reasons.",
            category: { _id: "c1", name: "Account Management" }
          },
          {
            _id: "a6",
            title: "Common billing issues and solutions",
            excerpt: "Troubleshooting guide for the most common billing issues encountered by users.",
            category: { _id: "c2", name: "Billing & Payments" }
          },
          {
            _id: "a9",
            title: "Understanding your invoice",
            excerpt: "Detailed explanation of all the sections and charges on your monthly invoice.",
            category: { _id: "c2", name: "Billing & Payments" }
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/knowledge/search', { params: { query } });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Rate a knowledge base article
// Endpoint: POST /api/knowledge/articles/:id/rate
// Request: { rating: "helpful" | "unhelpful" }
// Response: { success: boolean, message: string }
export const rateFAQ = (articleId: string, rating: "helpful" | "unhelpful") => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Thank you for your feedback!"
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post(`/api/knowledge/articles/${articleId}/rate`, { rating });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};