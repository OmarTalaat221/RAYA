// services/blogs.service.js

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

/* ─── Sitemap helper ─────────────────────────────────────────────────────── */

export async function getAllBlogsForSitemap({ pageSize = 50 } = {}) {
  const allItems = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    try {
      const response = await getAllBlogs(page, pageSize);

      // 🔍 DEBUG
      console.log(
        `[Sitemap-Blogs] Page ${page} raw response:`,
        JSON.stringify(response).slice(0, 300)
      );

      // Response shape: { message, status, lang, data: { items, pagination } }
      const payload = response?.data ?? response;
      const items = Array.isArray(payload?.items) ? payload.items : [];
      const pagination = payload?.pagination ?? {};

      // 🔍 DEBUG
      console.log(`[Sitemap-Blogs] Page ${page} → ${items.length} items found`);

      for (const item of items) {
        const slug = item?.slug;
        if (!slug) {
          console.warn(`[Sitemap-Blogs] Item missing slug:`, item?.id);
          continue;
        }

        let latestUpdate = item.updatedAt || item.createdAt || null;

        if (
          Array.isArray(item.blogTranslations) &&
          item.blogTranslations.length > 0
        ) {
          for (const translation of item.blogTranslations) {
            const translationDate = translation?.updatedAt;
            if (
              translationDate &&
              (!latestUpdate || translationDate > latestUpdate)
            ) {
              latestUpdate = translationDate;
            }
          }
        }

        allItems.push({
          slug,
          updatedAt: latestUpdate,
        });
      }

      hasNextPage = Boolean(pagination.hasNextPage);
      page += 1;

      if (page > 200) break;
    } catch (error) {
      console.error(
        `[Sitemap-Blogs] Failed to fetch page ${page}:`,
        error?.message,
        error?.response?.status,
        error?.response?.data
      );
      break;
    }
  }

  console.log(`[Sitemap-Blogs] Total items collected: ${allItems.length}`);
  return allItems;
}
