import api from './api';

// Description: Get user profile data
// Endpoint: GET /api/users/profile
// Request: {}
// Response: {
//   profile: {
//     _id: string,
//     name: string,
//     email: string,
//     phone: string,
//     avatar: string,
//     address: string,
//     city: string,
//     state: string,
//     zipCode: string,
//     bio: string,
//     passwordLastChanged: string,
//     twoFactorEnabled: boolean
//   }
// }
export const getUserProfile = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        profile: {
          _id: "u1",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
          avatar: "",
          address: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          bio: "I'm a software developer with a passion for creating great user experiences.",
          passwordLastChanged: "2023-05-15",
          twoFactorEnabled: false
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/users/profile');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Update user profile
// Endpoint: PUT /api/users/profile
// Request: FormData with user profile fields and optional avatar
// Response: { success: boolean, message: string, profile: { /* updated profile data */ } }
export const updateUserProfile = (formData: FormData) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Profile updated successfully",
        profile: {
          _id: "u1",
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          phone: formData.get('phone') as string,
          avatar: "",
          address: formData.get('address') as string,
          city: formData.get('city') as string,
          state: formData.get('state') as string,
          zipCode: formData.get('zipCode') as string,
          bio: formData.get('bio') as string,
          passwordLastChanged: "2023-05-15",
          twoFactorEnabled: false
        }
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.put('/api/users/profile', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};