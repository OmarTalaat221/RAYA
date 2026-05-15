import axiosInstance from "./axios";

const CATEGORIES_PER_PAGE_LARGE = 100;

export async function getAllCategories({
  page = 1,
  limit = CATEGORIES_PER_PAGE_LARGE,
} = {}) {
  const response = await axiosInstance.get("/categories/all", {
    params: { page, limit },
  });
  return response.data?.data ?? { items: [], metadata: {} };
}
