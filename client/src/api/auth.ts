import api from './api';

// Description: Login user
// Endpoint: POST /api/auth/login
// Request: { email: string, password: string, rememberMe: boolean }
// Response: { accessToken: string, refreshToken: string, user: { id: string, name: string, email: string, firstLogin: boolean } }
export const login = async (email: string, password: string, rememberMe: boolean = false) => {
  try {
    const { data } = await api.post('/api/auth/login', { email, password, rememberMe });

    // Store tokens in localStorage
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

// Description: Register new user
// Endpoint: POST /api/auth/register
// Request: { name: string, email: string, phone: string, password: string }
// Response: { accessToken: string, user: { id: string, name: string, email: string, firstLogin: boolean } }
export const register = async (name: string, email: string, phone: string, password: string) => {
  try {
    const { data } = await api.post('/api/auth/register', { name, email, phone, password });

    // Store token in localStorage
    localStorage.setItem('accessToken', data.accessToken);

    return data.user;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

// Description: Logout user
// Endpoint: POST /api/auth/logout
// Request: {}
// Response: { success: boolean }
export const logout = async () => {
  try {
    await api.post('/api/auth/logout');

    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    return true;
  } catch (error) {
    // Still clear tokens even if API call fails
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    throw new Error(error?.response?.data?.message || error.message);
  }
};

// Description: Complete onboarding process
// Endpoint: POST /api/auth/onboarding/complete
// Request: {}
// Response: { success: boolean, message: string }
export const completeOnboarding = async () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Onboarding completed successfully"
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/auth/onboarding/complete');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};