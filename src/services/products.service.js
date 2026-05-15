// services/products.service.js

import axiosInstance from "./axios";

function buildProductParams(opts = {}) {
  const params = {};
  if (opts.page) params.page = opts.page;
  if (opts.limit) params.limit = opts.limit;
  if (opts.sortBy) params.sortBy = opts.sortBy;
  if (opts.sortOrder) params.sortOrder = opts.sortOrder;
  if (typeof opts.in_stock === "boolean") params.in_stock = opts.in_stock;
  if (opts.priceRange) params.priceRange = opts.priceRange;
  return params;
}

export async function getProducts(options = {}) {
  const response = await axiosInstance.get("/products", {
    params: buildProductParams(options),
  });
  return response.data?.data;
}

export async function getProductsByCategorySlug(slug, options = {}) {
  const response = await axiosInstance.get(`/products/category/${slug}`, {
    params: buildProductParams(options),
  });
  return response.data?.data;
}

export async function getProductBySlug(slug) {
  const response = await axiosInstance.get(`/products/${slug}`);
  return response.data?.data;
}
