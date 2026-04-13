import axiosInstance from "../apiInstance/axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

export const getProfileAPI = async (type = "main") => {
  const response = await axiosInstance.get(API_ENDPOINTS.PROFILE.GET_PROFILE, {
    params: { type },
  });
  return response.data;
};

export const getTargetProfileAPI = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.PROFILE.GET_TARGET);
  return response.data;
};

export const updateProfileAPI = async (formData) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.PROFILE.UPDATE_PROFILE,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      params: { type: "main" },
    }
  );
  return response.data;
};

export const patchProfileAPI = async (formData) => {
  const response = await axiosInstance.patch(
    API_ENDPOINTS.PROFILE.UPDATE_PROFILE,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      params: { type: "main" },
    }
  );
  return response.data;
};

export const updateTargetProfileAPI = async (data) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.PROFILE.UPDATE_TARGET,
    data
  );
  return response.data;
};

export const deleteProfileFileAPI = async ({ fieldName, filePath }) => {
  const relativePath = filePath.startsWith("http")
    ? filePath.replace(/^https?:\/\/[^/]+\//, "")
    : filePath;

  const response = await axiosInstance.delete(
    API_ENDPOINTS.PROFILE.DELETE_FILE,
    {
      data: { fieldName, filePath: relativePath },
    }
  );
  return response.data;
};
