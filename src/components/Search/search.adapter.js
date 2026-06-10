import { resolveMediaSrc } from "./search.utils";

export const EMPTY_SEARCH_RESULTS = {
  categories: [],
  products: [],
  blogs: [],
  totalCount: 0,
};

function titleFromSlug(value = "") {
  return String(value ?? "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function stripHtml(value = "") {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateText(value = "", maxLength = 160) {
  const text = stripHtml(value);

  if (!text) return "";
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trim()}…`;
}

function stripLocalePrefix(path) {
  if (typeof path !== "string") return path;
  return path.replace(/^\/(?:ar|en)(?=\/|$)/, "") || "/";
}

function resolveTranslation(translations = [], lang = "en") {
  if (!Array.isArray(translations) || translations.length === 0) return null;

  return (
    translations.find((item) => item?.lang === lang) || translations[0] || null
  );
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function getMediaImageByRole(media = [], role) {
  if (!Array.isArray(media)) return "";

  const match = media.find(
    (item) => item?.type === "image" && item?.role === role
  );

  return match?.src || "";
}

function adaptCategoryItem(item, lang = "en") {
  const translation = resolveTranslation(item?.translations, lang);
  const slug = translation?.slug || "";
  const title = translation?.title?.trim() || titleFromSlug(slug || item?.id);

  return {
    id: item?.id || slug || title,
    title,
    slug,
    href: stripLocalePrefix(
      translation?.href || (slug ? `/collections/${slug}` : "/collections")
    ),
    image: resolveMediaSrc(item?.image || ""),
    srcSet: Array.isArray(item?.srcSet) ? item.srcSet : [],
  };
}

function adaptProductItem(item, lang = "en") {
  const translation = resolveTranslation(item?.translations, lang);
  const slug = translation?.slug || "";

  const oldPrice = toNumber(item?.oldPrice);
  const newPrice = toNumber(item?.newPrice);
  const effectivePrice = newPrice ?? oldPrice ?? 0;

  const frontImage = resolveMediaSrc(
    item?.frontImage || getMediaImageByRole(item?.media, "front_image") || ""
  );

  const backImage = resolveMediaSrc(
    item?.backImage || getMediaImageByRole(item?.media, "back_image") || ""
  );

  return {
    id: item?.id || slug || item?.sku || "",
    title:
      translation?.title?.trim() ||
      titleFromSlug(slug || item?.sku || item?.id),
    slug,
    href: slug ? `/products/${slug}` : "/products",
    frontImage,
    backImage,
    oldPrice: oldPrice ?? effectivePrice,
    newPrice: effectivePrice,
    currency: item?.currency || "",
    isOnSale: Boolean(item?.isOnSale),
    brand: item?.brand || "",
    stockStatus: item?.stockStatus || "",
    shortDescription: truncateText(translation?.shortDescription || "", 140),
    inCart: Boolean(item?.inCart),
  };
}

function adaptBlogItem(item, lang = "en") {
  const translation = resolveTranslation(item?.blogTranslations, lang);
  const slug = item?.slug || "";

  return {
    id: item?.id || slug || "",
    title: translation?.title?.trim() || titleFromSlug(slug || item?.id),
    slug,
    href: stripLocalePrefix(
      translation?.href ||
        (slug ? `/blog/news/${slug}?id=${item?.id}` : "/blog/news")
    ),
    image: resolveMediaSrc(item?.image || ""),
    srcSet: Array.isArray(item?.srcSet) ? item.srcSet : [],
    date: item?.date || "",
    category: translation?.category || "",
    excerpt: truncateText(translation?.excerpt || "", 180),
  };
}

export function adaptSearchResponse(apiData, lang = "en") {
  const root = apiData?.data ?? apiData ?? {};
  const rawCategories = Array.isArray(root?.categories) ? root.categories : [];
  const rawProducts = Array.isArray(root?.products) ? root.products : [];
  const rawBlogs = Array.isArray(root?.blogs) ? root.blogs : [];

  const categories = rawCategories.map((item) => adaptCategoryItem(item, lang));
  const products = rawProducts.map((item) => adaptProductItem(item, lang));
  const blogs = rawBlogs.map((item) => adaptBlogItem(item, lang));

  return {
    categories,
    products,
    blogs,
    totalCount: categories.length + products.length + blogs.length,
  };
}
