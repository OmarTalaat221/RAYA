// services/categories.service.js

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

/* ─── Sitemap helper ─────────────────────────────────────────────────────── */

export async function getAllCategoriesForSitemap({ pageSize = 100 } = {}) {
  const allItems = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    try {
      const data = await getAllCategories({ page, limit: pageSize });
      const items = data?.items ?? [];
      const pagination = data?.pagination ?? {};

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

      if (page > 100) break;
    } catch (error) {
      console.error(
        `[Sitemap] Failed to fetch categories page ${page}:`,
        error?.message
      );
      break;
    }
  }

  return allItems;
}
