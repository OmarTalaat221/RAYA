import axiosInstance from "./axios";

export async function getHomeData(config = {}) {
  const response = await axiosInstance.get("/home", config);
  return response.data;
}
