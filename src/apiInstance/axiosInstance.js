import axios from 'axios';
import { BASE_URL } from '../constants/apiConstants';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for tokens
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: attaching token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Example: handling unauthenticated (401) errors globally
    if (error.response?.status === 401) {
       
       console.log('Unauthorized access! Redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
