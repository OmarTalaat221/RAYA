// components/Cart/cart.adapter.js

const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://rdspharma.cloud";

function resolveCartProductImage(src) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/cdn/shop/")) return `https://www.rdspharma.online${src}`;
  const cleanPath = src.startsWith("/") ? src : `/${src}`;
  return `${IMAGE_BASE_URL}${cleanPath}`;
}

function getBestImage(product) {
  if (!product) return "";
  if (product.frontImage) return resolveCartProductImage(product.frontImage);
  if (product.backImage) return resolveCartProductImage(product.backImage);
  if (product.media?.length) {
    const img = product.media.find(
      (m) => m.type === "image" || typeof m === "string"
    );
    const src = typeof img === "string" ? img : img?.src;
    if (src) return resolveCartProductImage(src);
  }
  return "";
}

function getTranslation(translations, lang = "en") {
  if (!translations?.length) return {};
  return translations.find((t) => t.lang === lang) || translations[0] || {};
}

function stripLocalePrefix(path) {
  if (typeof path !== "string") return path;
  return path.replace(/^\/(?:ar|en)(?=\/|$)/, "") || "/";
}

export function adaptCartItem(cartItem, lang = "en") {
  const product = cartItem.product || {};
  const translation = getTranslation(product.translations, lang);

  return {
    id: cartItem.productId,
    cartItemId: cartItem.id,
    title: translation.title || "Untitled",
    slug: translation.slug || "",
    href: stripLocalePrefix(
      translation.href ||
        (translation.slug ? `/products/${translation.slug}` : "#")
    ),
    price: cartItem.price ?? product.newPrice ?? product.oldPrice ?? 0,
    image: getBestImage(product),
    quantity: cartItem.quantity || 1,
    maxQuantity: product.stockStatus === "out_of_stock" ? 0 : 99,
    currency: product.currency || "AED",
    oldPrice: product.oldPrice ?? null,
    newPrice: product.newPrice ?? null,
    isOnSale: product.isOnSale || false,
    stockStatus: product.stockStatus || "in_stock",
  };
}

export function adaptCartResponse(apiData, lang = "en") {
  if (!apiData) {
    return { items: [], subtotal: 0 };
  }

  const items = (apiData.items || []).map((item) => adaptCartItem(item, lang));

  return {
    items,
    subtotal: apiData.totalCartPrice ?? 0,
  };
}
