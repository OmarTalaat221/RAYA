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
/* ─── Banners ─── */
function adaptBanner(banner, lang = "en") {
  const targetType = banner?.targetType || "";
  const target = banner?.target || null;

  let href = "/";
  let alt = "RDS Pharma Banner";

  switch (targetType) {
    case "product": {
      const translation = resolveTranslation(target?.translations, lang);
      const slug = translation?.slug || "";
      href = slug ? `/products/${slug}` : "/collections/all";
      alt = translation?.title || alt;
      break;
    }

    case "category": {
      const translation = resolveTranslation(target?.translations, lang);
      const slug = translation?.slug || "";
      href = slug ? `/collections/${slug}` : "/collections/all";
      alt = translation?.title || alt;
      break;
    }

    case "blog": {
      const translation = resolveTranslation(target?.blogTranslations, lang);
      const slug = target?.slug || "";
      href = slug ? `/blog/news/${slug}` : "/blog/news";
      alt = translation?.title || alt;
      break;
    }

    default: {
      // fallback — try product first, then category, then blog
      if (banner?.product) {
        const translation = resolveTranslation(
          banner.product?.translations,
          lang
        );
        const slug = translation?.slug || "";
        href = slug ? `/products/${slug}` : "/collections/all";
        alt = translation?.title || alt;
      }
      break;
    }
  }

  return {
    id: banner?.id,
    image: resolveMediaSrc(banner?.image || ""),
    alt,
    href,
    targetType,
    targetId: banner?.targetId || null,
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
    inCart: Boolean(product?.inCart),
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

import { adaptCategoriesToCollections } from "../../components/Collections/category.adapter";

/* ─── Main adapter ─── */
export function adaptHomeResponse(apiData, lang = "en") {
  const root = apiData?.data ?? apiData ?? {};

  const rawBanners = Array.isArray(root?.banners) ? root.banners : [];
  const rawProducts = Array.isArray(root?.products) ? root.products : [];
  const rawBlogs = Array.isArray(root?.blogs) ? root.blogs : [];
  const rawCategories = Array.isArray(root?.categories) ? root.categories : [];

  return {
    banners: rawBanners.map((banner) => adaptBanner(banner, lang)),
    products: rawProducts.map((product) => adaptProduct(product, lang)),
    blogs: rawBlogs.map((blog) => adaptBlog(blog, lang)),
    categories: adaptCategoriesToCollections(rawCategories, lang),
  };
}

export const EMPTY_HOME_DATA = {
  banners: [],
  products: [],
  blogs: [],
  categories: [],
};
