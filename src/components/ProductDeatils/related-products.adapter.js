// components/ProductDeatils/related-products.adapter.js

function resolveImage(src) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/cdn/shop/")) return `https://www.rdspharma.online${src}`;
  return src;
}

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function adaptRelatedProduct(raw) {
  if (!raw) return null;

  const translation = raw?.translations?.[0] || {};
  const slug = translation.slug || raw.slug || "";

  if (!slug) return null;

  return {
    id: raw.id,
    title: translation.title || "Untitled Product",
    href: `/products/${slug}`,
    frontImage: resolveImage(raw.frontImage),
    backImage: resolveImage(raw.backImage),
    oldPrice: toNumber(raw.oldPrice),
    newPrice: toNumber(raw.newPrice),
    currency: raw.currency || "AED",
    isOnSale: Boolean(raw.isOnSale),
    inCart: Boolean(raw.inCart),
  };
}

export function adaptRelatedProducts(data, excludeId = null) {
  if (!Array.isArray(data)) return [];
  return data
    .map(adaptRelatedProduct)
    .filter(Boolean)
    .filter((p) => (excludeId ? p.id !== excludeId : true));
}