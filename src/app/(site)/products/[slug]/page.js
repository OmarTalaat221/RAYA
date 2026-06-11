import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import ProductDetailsPage from "../../../../components/ProductDeatils/ProductDetailsPage";
import { getProductBySlug } from "../../../../services/products.service";

import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "../../../../lib/site-config";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

function pickTranslation(translations = [], lang = "en") {
  if (!Array.isArray(translations) || translations.length === 0) return null;
  return translations.find((t) => t?.lang === lang) || translations[0] || null;
}

function stripLocalePrefix(path) {
  if (typeof path !== "string") return path;
  return path.replace(/^\/(?:ar|en)(?=\/|$)/, "") || "/";
}

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function absoluteUrl(path = "/") {
  if (!path) return SITE_URL;

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function cleanText(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateText(value = "", max = 155) {
  const text = cleanText(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

function getProductImage(product) {
  return (
    product?.media?.find((item) => item?.type === "image" && item?.src)?.src ||
    product?.frontImage ||
    product?.backImage ||
    DEFAULT_OG_IMAGE
  );
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
    href: stripLocalePrefix(translation?.href || `/products/${slug}`),
    shortDescription: translation?.shortDescription || "",
    contentSections: Array.isArray(translation?.contentSections)
      ? translation.contentSections
      : [],
    oldPrice,
    newPrice,
    currency: product.currency || "AED",
    isOnSale: Boolean(product.isOnSale),

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

async function fetchProduct(slug, lang = "en") {
  try {
    const data = await getProductBySlug(slug);
    if (!data) return null;
    return adaptProductForDetails(data, lang);
  } catch (error) {
    if (error?.response?.status === 404) return null;
    console.error("[ProductPage] Failed to fetch product:", error);
    throw error;
  }
}

/* ─── metadata ────────────────────────────────────────────────────────────── */

export async function generateMetadata({ params }) {
  const locale = await getLocale();
  const { slug } = await params;

  try {
    const product = await fetchProduct(slug, locale);

    if (!product) {
      return {
        title: `Product not found | ${SITE_NAME}`,
        description: "The requested product could not be found.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const title = `${product.title} | ${SITE_NAME}`;
    const description =
      truncateText(product.shortDescription) ||
      `${product.title} is available at ${SITE_NAME}.`;

    const canonical = absoluteUrl(`/products/${slug}`);
    const image = absoluteUrl(getProductImage(product));

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        type: "website",
        title,
        description,
        url: canonical,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: product.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: `Product | ${SITE_NAME}`,
      description: SITE_DESCRIPTION,
    };
  }
}

/* ─── page ────────────────────────────────────────────────────────────────── */

export default async function ProductPage({ params }) {
  const locale = await getLocale();
  const { slug } = await params;

  const product = await fetchProduct(slug, locale);

  if (!product) {
    notFound();
  }

  const productImage = absoluteUrl(getProductImage(product));
  const price = product.newPrice ?? product.oldPrice;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [productImage],
    description:
      cleanText(product.shortDescription) ||
      `${product.title} is available at ${SITE_NAME}.`,
    sku: product.sku || String(product.id),
    brand: {
      "@type": "Brand",
      name: product.brand || SITE_NAME,
    },
    ...(price !== null && price !== undefined
      ? {
          offers: {
            "@type": "Offer",
            url: absoluteUrl(`/products/${slug}`),
            priceCurrency: product.currency || "AED",
            price: String(price),
            availability: product.stockStatus?.toLowerCase().includes("out")
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        }
      : {}),
    ...(product.rating > 0 && product.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(product.rating),
            reviewCount: String(product.reviewCount),
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <ProductDetailsPage product={product} />
    </>
  );
}