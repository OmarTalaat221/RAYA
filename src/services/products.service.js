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

/* ─── Reviews ────────────────────────────────────────────────────────────── */

export async function getProductReviews(productId, { page = 1, limit = 5 } = {}) {
  const response = await axiosInstance.get(`/products/${productId}/reviews`, {
    params: { page, limit },
  });
  return response.data?.data;
}

export async function submitProductReview({ productId, rating, comment }) {
  const response = await axiosInstance.post("/products/review", {
    productId,
    rating: String(rating),
    comment,
  });
  return response.data?.data;
}

/* ─── Random / Related Products ──────────────────────────────────────────── */

export async function getRandomProducts() {
  const response = await axiosInstance.get("/products/random");
  return response.data?.data;
}

/* ─── Sitemap helper ─────────────────────────────────────────────────────── */

export async function getAllProductsForSitemap({ pageSize = 100 } = {}) {
  const allItems = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    try {
      const data = await getProducts({ page, limit: pageSize });
      const items = data?.products?.items ?? [];
      const pagination = data?.products?.pagination ?? {};

      for (const item of items) {
        const slug = item?.translations?.[0]?.slug || item?.slug || null;
        if (!slug) continue;

        allItems.push({
          slug,
          updatedAt: item.updatedAt || item.createdAt || null,
        });
      }

      hasNextPage = Boolean(pagination.hasNextPage);
      page += 1;

      if (page > 500) break;
    } catch (error) {
      console.error(
        `[Sitemap] Failed to fetch products page ${page}:`,
        error?.message
      );
      break;
    }
  }

  return allItems;
}