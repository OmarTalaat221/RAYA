import axiosInstance from '../apiInstance/axiosInstance';
// import { API_ENDPOINTS } from '../constants/apiConstants';

// Base example service function
export const fetchExampleDataService = async () => {
  // const response = await axiosInstance.get(API_ENDPOINTS.EXAMPLE_ENDPOINT);
  const response = await axiosInstance.get('/example-endpoint');
  return response.data;
};
