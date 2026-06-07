import axiosInstance from "./axios";

function buildProductParams(options = {}) {
  const params = {};

  const page = Number(options.page);
  const limit = Number(options.limit);

  if (Number.isFinite(page) && page > 0) {
    params.page = page;
  }

  if (Number.isFinite(limit) && limit > 0) {
    params.limit = limit;
  }

  if (options.sortBy) {
    params.sortBy = options.sortBy;
  }

  if (options.sortOrder) {
    params.sortOrder = options.sortOrder;
  }

  if (typeof options.in_stock === "boolean") {
    params.in_stock = options.in_stock;
  }

  if (
    options.priceRange !== undefined &&
    options.priceRange !== null &&
    options.priceRange !== ""
  ) {
    params.priceRange = options.priceRange;
  }

  return params;
}

function getResponseData(response) {
  return response?.data?.data;
}

export async function getProducts(options = {}) {
  const response = await axiosInstance.get("/products", {
    params: buildProductParams(options),
  });

  return getResponseData(response);
}

export async function getProductsByCategorySlug(slug, options = {}) {
  const response = await axiosInstance.get(
    `/products/category/${encodeURIComponent(slug)}`,
    {
      params: buildProductParams(options),
    }
  );

  return getResponseData(response);
}

export async function getProductBySlug(slug) {
  const response = await axiosInstance.get(
    `/products/${encodeURIComponent(slug)}`
  );

  return getResponseData(response);
}

export async function getProductReviews(productId, { page = 1, limit = 5 } = {}) {
  const response = await axiosInstance.get(`/products/${productId}/reviews`, {
    params: buildProductParams({ page, limit }),
  });

  return getResponseData(response);
}

export async function submitProductReview({ productId, rating, comment }) {
  const response = await axiosInstance.post("/products/review", {
    productId,
    rating: String(rating),
    comment,
  });

  return getResponseData(response);
}

export async function getRandomProducts() {
  const response = await axiosInstance.get("/products/random");

  return getResponseData(response);
}

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