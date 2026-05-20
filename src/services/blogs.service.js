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

export async function getBlogBySlug(slug) {
  const response = await axiosInstance.get(`/blogs/slug/${slug}`);
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

      const payload = response?.data ?? response;
      const items = Array.isArray(payload?.items) ? payload.items : [];
      const pagination = payload?.pagination ?? {};

      for (const item of items) {
        const slug = item?.slug;
        if (!slug) continue;

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

  return allItems;
}