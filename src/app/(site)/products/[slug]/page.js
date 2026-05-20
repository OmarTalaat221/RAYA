import { notFound } from "next/navigation";
import ProductDetailsPage from "../../../../components/ProductDeatils/ProductDetailsPage";
import { getProductBySlug } from "../../../../services/products.service";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

function pickTranslation(translations = [], lang = "en") {
  if (!Array.isArray(translations) || translations.length === 0) return null;
  return translations.find((t) => t?.lang === lang) || translations[0] || null;
}

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function buildProductMedia(product, title) {
  if (Array.isArray(product.media) && product.media.length > 0) {
    return product.media.map((item, index) => ({
      alt: item?.alt || `${title} media ${index + 1}`,
      src: item?.src || "",
      role: item?.role || (item?.type === "video" ? "video" : "image"),
      type: item?.type === "video" ? "video" : "image",
      isPrimary: Boolean(item?.isPrimary),
      poster: item?.poster || undefined,
    }));
  }

  const fallbackMedia = [];

  if (product.frontImage) {
    fallbackMedia.push({
      alt: `${title} front image`,
      src: product.frontImage,
      role: "front_image",
      type: "image",
      isPrimary: true,
    });
  }

  if (product.backImage && product.backImage !== product.frontImage) {
    fallbackMedia.push({
      alt: `${title} back image`,
      src: product.backImage,
      role: "back_image",
      type: "image",
    });
  }

  return fallbackMedia;
}

function adaptProductForDetails(product, lang = "en") {
  if (!product) return null;

  const translation = pickTranslation(product.translations, lang);
  const categoryTranslation = pickTranslation(
    product.category?.translations,
    lang
  );

  const title = translation?.title || "Untitled";
  const slug = translation?.slug || product.id;
  const oldPrice = toNumber(product.oldPrice);
  const newPrice = toNumber(product.newPrice);

  return {
    id: product.id,
    categoryId: product.categoryId || "",
    title,
    slug,
    href: translation?.href || `/products/${slug}`,
    shortDescription: translation?.shortDescription || "",
    contentSections: Array.isArray(translation?.contentSections)
      ? translation.contentSections
      : [],
    oldPrice,
    newPrice,
    currency: product.currency || "AED",
    isOnSale: Boolean(product.isOnSale),

    /* ── NEW ── */
    discountPercentage: toNumber(product.discountPercentage) || 0,
    discountValue: toNumber(product.discountValue) || 0,

    brand: product.brand || "",
    sku: product.sku || "",
    badge: typeof product.badge === "string" ? product.badge.trim() : "",
    stockStatus: product.stockStatus || "",
    rating: typeof product.rating === "number" ? product.rating : 0,
    reviewCount:
      typeof product.reviewCount === "number" ? product.reviewCount : 0,
    limitedOffer: product.limitedOffer || null,
    category: categoryTranslation?.title || "",
    frontImage: product.frontImage || "",
    backImage: product.backImage || "",
    media: buildProductMedia(product, title),
    inCart: Boolean(product.inCart),
  };
}

async function fetchProduct(slug) {
  try {
    const data = await getProductBySlug(slug);
    if (!data) return null;
    return adaptProductForDetails(data, "en");
  } catch (error) {
    if (error?.response?.status === 404) return null;
    console.error("[ProductPage] Failed to fetch product:", error);
    throw error;
  }
}

/* ─── metadata ────────────────────────────────────────────────────────────── */

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const product = await fetchProduct(slug);

    if (!product) {
      return {
        title: "Product not found | RDS Pharma",
        description: "The requested product could not be found.",
      };
    }

    return {
      title: `${product.title} | RDS Pharma`,
      description: product.shortDescription || product.title,
    };
  } catch {
    return {
      title: "Product | RDS Pharma",
      description: "Explore premium products at RDS Pharma.",
    };
  }
}

/* ─── page ────────────────────────────────────────────────────────────────── */

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = await fetchProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsPage product={product} />;
}
