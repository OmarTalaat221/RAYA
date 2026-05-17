function resolveMediaSrc(src) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/cdn/shop/")) return `https://www.rdspharma.online${src}`;
  return src;
}

function titleFromSlug(value = "") {
  return String(value ?? "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function resolveTranslation(translations = [], lang = "en") {
  if (!Array.isArray(translations) || translations.length === 0) return null;
  return (
    translations.find((item) => item?.lang === lang) || translations[0] || null
  );
}

function getMediaImageByRole(media = [], role) {
  if (!Array.isArray(media)) return "";
  const match = media.find(
    (item) => item?.type === "image" && item?.role === role
  );
  return match?.src || "";
}

/* ─── Banners ─── */
function adaptBanner(banner, lang = "en") {
  const product = banner?.product || null;
  const translation = product
    ? resolveTranslation(product?.translations, lang)
    : null;

  const slug = translation?.slug || "";
  const productHref = slug ? `/products/${slug}` : "/collections/all";

  return {
    id: banner?.id,
    image: resolveMediaSrc(banner?.image || ""),
    alt: translation?.title || "RDS Pharma Banner",
    href: productHref,
    productId: banner?.productId || null,
  };
}

/* ─── Products ─── */
function adaptProduct(product, lang = "en") {
  const translation = resolveTranslation(product?.translations, lang);
  const slug = translation?.slug || "";

  const oldPrice = toNumber(product?.oldPrice);
  const newPrice = toNumber(product?.newPrice);

  const frontImage = resolveMediaSrc(
    product?.frontImage ||
      getMediaImageByRole(product?.media, "front_image") ||
      ""
  );

  const backImage = resolveMediaSrc(
    product?.backImage ||
      getMediaImageByRole(product?.media, "back_image") ||
      ""
  );

  return {
    id: product?.id,
    title:
      translation?.title?.trim() ||
      titleFromSlug(slug || product?.sku || product?.id),
    slug,
    href: translation?.href || (slug ? `/products/${slug}` : "/products"),
    frontImage,
    backImage,
    oldPrice,
    newPrice,
    currency: product?.currency || "AED",
    isOnSale: Boolean(product?.isOnSale),
    brand: product?.brand || "",
    sku: product?.sku || "",
    badge: product?.badge || "",
    stockStatus: product?.stockStatus || "",
  };
}

/* ─── Blogs ─── */
function adaptBlog(blog, lang = "en") {
  const translation = resolveTranslation(blog?.blogTranslations, lang);
  const slug = blog?.slug || "";

  return {
    id: blog?.id,
    title: translation?.title?.trim() || titleFromSlug(slug || blog?.id),
    slug,
    image: resolveMediaSrc(blog?.image || ""),
    srcSet: Array.isArray(blog?.srcSet) ? blog.srcSet.join(", ") : "",
    date: blog?.date || "",
    excerpt: translation?.excerpt || "",
    category: translation?.category || "",
  };
}

/* ─── Main adapter ─── */
export function adaptHomeResponse(apiData, lang = "en") {
  const root = apiData?.data ?? apiData ?? {};

  const rawBanners = Array.isArray(root?.banners) ? root.banners : [];
  const rawProducts = Array.isArray(root?.products) ? root.products : [];
  const rawBlogs = Array.isArray(root?.blogs) ? root.blogs : [];

  return {
    banners: rawBanners.map((banner) => adaptBanner(banner, lang)),
    products: rawProducts.map((product) => adaptProduct(product, lang)),
    blogs: rawBlogs.map((blog) => adaptBlog(blog, lang)),
  };
}

export const EMPTY_HOME_DATA = {
  banners: [],
  products: [],
  blogs: [],
};
