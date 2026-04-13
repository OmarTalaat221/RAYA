import axiosInstance from '../apiInstance/axiosInstance';
import { API_ENDPOINTS } from '../constants/apiConstants';

export const loginAPI = async (credentials) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  return response.data;
};

export const registerAPI = async (formData) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getUserProfileAPI = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.AUTH.PROFILE);
  return response.data;
};

export const updateUserAccountAPI = async (formData) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.AUTH.PROFILE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};
