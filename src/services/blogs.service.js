import axiosInstance from "./axios";

export async function getAllBlogs(page = 1, limit = 6) {
  const response = await axiosInstance.get("/blogs/all", {
    params: { page, limit },
  });
  return response.data;
}

export async function getBlogById(id) {
  const response = await axiosInstance.get(`/blogs/blog/${id}`);
  return response.data;
}
