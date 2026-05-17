import axiosInstance from "./axios";

export async function getSearchSuggests(search, config = {}) {
  const trimmedSearch = String(search ?? "").trim();

  if (!trimmedSearch) {
    throw new Error("Search query is required.");
  }

  const { params, ...restConfig } = config;

  const response = await axiosInstance.get("/search/suggests", {
    ...restConfig,
    params: {
      ...params,
      search: trimmedSearch,
    },
  });

  return response.data;
}
