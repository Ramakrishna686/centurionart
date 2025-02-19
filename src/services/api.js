import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Adjust the base URL as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any request configurations here, e.g., adding auth tokens
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error response:', error.response);
      if (error.response.status === 401) {
        // Handle unauthorized errors, e.g., redirect to login
        window.location.href = '/login';
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Error request:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;