import axiosInstance from "./axios";

export async function getHomeData(extraHeaders = {}) {
  const response = await axiosInstance.get("/home", { headers: extraHeaders });
  return response.data;
}
