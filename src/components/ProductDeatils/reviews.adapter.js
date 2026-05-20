// components/ProductDeatils/reviews.adapter.js

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function adaptReviewItem(raw) {
  if (!raw) return null;

  const userName =
    raw?.user?.name ||
    raw?.user?.firstName ||
    raw?.user?.fullName ||
    "Anonymous";

  return {
    id: raw.id,
    productId: raw.productId,
    rating: toNumber(raw.rating),
    comment: raw.comment || "",
    createdAt: raw.createdAt || null,
    userName,
  };
}

export function adaptReviewsResponse(data) {
  const items = Array.isArray(data?.items) ? data.items : [];
  const pagination = data?.pagination || {};

  return {
    items: items.map(adaptReviewItem).filter(Boolean),
    pagination: {
      page: toNumber(pagination.page) || 1,
      limit: toNumber(pagination.limit) || 5,
      totalItems: toNumber(pagination.totalItems) || 0,
      totalPages: toNumber(pagination.totalPages) || 0,
      hasNextPage: Boolean(pagination.hasNextPage),
    },
  };
}