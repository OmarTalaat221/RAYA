import axiosInstance from "./axios";

export async function getHomeData(config = {}) {
  const response = await axiosInstance.get("/home", config);
  console.log(response.data, "home");
  return response.data;
}
