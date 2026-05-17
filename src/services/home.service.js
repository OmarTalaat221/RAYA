import axiosInstance from "./axios";

export async function getHomeData() {
  const response = await axiosInstance.get("/home");
  return response.data;
}
