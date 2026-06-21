// components/Profile/orders.adapter.js

const VISIBLE_STATUSES = ["FULFIL", "SHIPPED", "CANCELLED", "RETURN"];

function clean(v) {
  return typeof v === "string" ? v.trim() : v;
}

function normalizeStatus(status) {
  return String(status || "")
    .trim()
    .toUpperCase();
}

function resolveImage(src) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/cdn/shop/")) return `https://www.rdspharma.online${src}`;
  return src;
}

function getProductTitle(product) {
  if (!product) return "";
  const translations = Array.isArray(product.translations)
    ? product.translations
    : [];
  const en = translations.find((t) => t?.lang === "en");
  return en?.title || translations[0]?.title || product.title || "";
}

function getProductHref(product) {
  if (!product) return "";
  const translations = Array.isArray(product.translations)
    ? product.translations
    : [];
  const en = translations.find((t) => t?.lang === "en");
  const slug = en?.slug || translations[0]?.slug || "";
  return slug ? `/products/${slug}` : "";
}

function adaptOrderItem(item) {
  const product = item?.product || {};
  return {
    id: item?.id || "",
    productId: item?.productId || "",
    productSku: item?.productSku || "",
    productName: item?.productName || getProductTitle(product),
    productHref: getProductHref(product),
    unitPrice: Number(item?.unitPrice) || 0,
    quantity: Number(item?.quantity) || 0,
    totalPrice: Number(item?.totalPrice) || 0,
    currency: (item?.currency || "").toUpperCase(),
    image: resolveImage(product?.frontImage || product?.backImage || ""),
  };
}

export function adaptOrder(raw) {
  if (!raw) return null;

  const status = normalizeStatus(raw.status);
  const items = Array.isArray(raw.items) ? raw.items.map(adaptOrderItem) : [];

  return {
    id: raw.id || "",
    shortId: raw.id ? raw.id.split("-")[0].toUpperCase() : "",
    status,
    subtotal: Number(raw.subtotal) || 0,
    total: Number(raw.total) || 0,
    discountAmount: Number(raw.discountAmount) || 0,
    shippingAmount: Number(raw.shippingAmount) || 0,
    currency: (raw.currency || "").toUpperCase(),
    shippingType: clean(raw.shippingType) || "",
    couponCode: clean(raw.couponCode) || "",
    createdAt: raw.createdAt || null,
    updatedAt: raw.updatedAt || null,
    items,
    shippingAddress: raw.shippingAddress || null,
    payments: Array.isArray(raw.payments) ? raw.payments : [],
  };
}

export function adaptOrders(rawList = []) {
  if (!Array.isArray(rawList)) return [];
  return rawList
    .map(adaptOrder)
    .filter(Boolean)
    .filter((order) => VISIBLE_STATUSES.includes(order.status));
}

export function adaptOrdersResponse(apiData) {
  const data = apiData?.data || apiData || {};
  const items = adaptOrders(data.items || []);
  const pagination = data.pagination || {};

  return {
    items,
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || 20,
      totalItems: pagination.totalItems || items.length,
      totalPages: pagination.totalPages || 1,
      hasNextPage: Boolean(pagination.hasNextPage),
    },
  };
}

/* For order details endpoint (response shape: data.result) */
export function adaptOrderDetailResponse(apiData) {
  const result = apiData?.data?.result || apiData?.data || apiData;
  return adaptOrder(result);
}
