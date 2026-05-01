// components/Cart/cart.utils.js

export function formatMoney(value, currency = "AED.") {
  if (value == null || isNaN(value)) return `${currency} 0.00`;
  return `${currency} ${Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function resolveMediaSrc(src) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/cdn/shop/")) return `https://www.rdspharma.online${src}`;
  return src;
}

export function resolveCartImage(product) {
  if (!product) return "";
  if (product.image) return resolveMediaSrc(product.image);
  if (product.media?.length) {
    const img = product.media.find((m) => m.type === "image");
    if (img?.src) return resolveMediaSrc(img.src);
  }
  if (product.frontImage) return resolveMediaSrc(product.frontImage);
  if (product.backImage) return resolveMediaSrc(product.backImage);
  return "";
}

export function getCartItemHref(item) {
  if (item.slug) return `/products/${item.slug}`;
  if (item.href) return item.href;
  return "#";
}

export function buildCartProduct(product, quantity = 1) {
  return {
    id: product.id,
    title: product.title,
    price: product.newPrice ?? product.oldPrice ?? 0,
    image: resolveCartImage(product),
    slug: product.slug || "",
    maxQuantity: product.stockStatus === "out_of_stock" ? 0 : 99,
    quantity: Math.max(1, quantity),
  };
}
