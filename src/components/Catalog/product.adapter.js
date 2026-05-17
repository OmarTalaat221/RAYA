const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://rdspharma.cloud";

const FALLBACK_IMAGE = "";

function clean(value) {
  return typeof value === "string" ? value.trim() : value;
}

function pickTranslation(translations = [], lang = "en") {
  if (!Array.isArray(translations) || translations.length === 0) return null;

  return (
    translations.find((t) => clean(t?.lang) === lang) ?? translations[0] ?? null
  );
}

export function resolveProductImage(src) {
  const value = clean(src);

  if (!value) return FALLBACK_IMAGE;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("/cdn/shop/")) {
    return `https://www.rdspharma.online${value}`;
  }

  const cleanPath = value.startsWith("/") ? value : `/${value}`;

  return `${IMAGE_BASE_URL}${cleanPath}`.replace(/([^:]\/)\/+/g, "$1");
}

function isInStock(stockStatus) {
  if (!stockStatus) return true;
  return String(stockStatus).trim().toLowerCase() === "in_stock";
}

function normalizeMedia(media = []) {
  if (!Array.isArray(media)) return [];

  return media
    .map((item) => {
      if (typeof item === "string") {
        return resolveProductImage(item);
      }

      if (item && typeof item === "object") {
        return {
          ...item,
          src: resolveProductImage(item.src),
          alt: clean(item.alt) || "",
          type: item.type || "image",
          role: item.role || "gallery_image",
          isPrimary: Boolean(item.isPrimary),
        };
      }

      return null;
    })
    .filter(Boolean);
}

function getCategoryTitle(category, lang = "en") {
  if (!category) return "";

  if (typeof category === "string") return clean(category) || "";

  const translation = pickTranslation(category.translations, lang);

  return (
    clean(translation?.title) ||
    clean(category.title) ||
    clean(category.name) ||
    ""
  );
}

export function adaptApiProduct(product, lang = "en") {
  if (!product) return null;

  const translation = pickTranslation(product.translations, lang);

  const title =
    clean(translation?.title) || clean(product.title) || "Untitled product";

  const slug =
    clean(translation?.slug) || clean(product.slug) || clean(product.id);

  const href =
    clean(translation?.href) ||
    clean(product.href) ||
    (slug ? `/products/${slug}` : "#");

  const oldPrice = Number(product.oldPrice) || 0;
  const newPrice = Number(product.newPrice) || 0;

  const frontImage = resolveProductImage(product.frontImage);
  const backImage = resolveProductImage(product.backImage);

  return {
    id: product.id,
    slug,
    href,
    sku: clean(product.sku) || "",

    title,
    shortDescription:
      clean(translation?.shortDescription) ||
      clean(product.shortDescription) ||
      "",

    frontImage,
    backImage,
    media: normalizeMedia(product.media),

    oldPrice,
    newPrice,
    currency: clean(product.currency) || "AED",
    isOnSale: Boolean(product.isOnSale),

    brand: clean(product.brand) || "",
    badge: clean(product.badge) || "",
    category: getCategoryTitle(product.category, lang),
    categoryId: product.categoryId || product.category?.id || null,

    stockStatus: clean(product.stockStatus) || "in_stock",
    inStock: isInStock(product.stockStatus),

    rating: Number(product.rating) || 0,
    reviewCount: Number(product.reviewCount) || 0,

    limitedOffer: product.limitedOffer ?? {
      enabled: false,
      endsAt: null,
    },

    contentSections: Array.isArray(translation?.contentSections)
      ? translation.contentSections
      : Array.isArray(product.contentSections)
        ? product.contentSections
        : [],

    translations: product.translations || [],
    raw: product,
    inCart: product.inCart ?? false,
  };
}

export function adaptApiProducts(products = [], lang = "en") {
  if (!Array.isArray(products)) return [];
  products = products.map((p) => adaptApiProduct(p, lang)).filter(Boolean);
  console.log(products, "products");
  return products;
}
