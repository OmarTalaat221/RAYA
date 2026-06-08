import axiosInstance from "./axios";

export async function getSiteInfo() {
  const response = await axiosInstance.get("/site-info");
  return response.data;
}
