import sanitizeHtml from "sanitize-html";
import { SITE_URL } from "../../lib/site-config";

// ─── Media ────────────────────────────────────────────────────────────────────

const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL || "https://rdspharma.cloud";

export function resolveMediaSrc(src) {
  if (!src) return "";

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  if (src.startsWith("/cdn/shop/")) {
    return `https://www.rdspharma.online${src}`;
  }

  if (src.startsWith("uploads/") || src.startsWith("/uploads/")) {
    const cleanPath = src.startsWith("/") ? src : `/${src}`;
    return `${IMAGE_BASE_URL}${cleanPath}`;
  }

  return src;
}

export function toAbsoluteUrl(path = "") {
  try {
    return new URL(path, SITE_URL).toString();
  } catch {
    return SITE_URL;
  }
}

// ─── Date ─────────────────────────────────────────────────────────────────────

export function formatBlogDate(value) {
  if (!value) return "";

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

// ─── Rich text sanitizer ──────────────────────────────────────────────────────

export function sanitizeRichText(html = "") {
  if (typeof html !== "string") return "";

  try {
    return sanitizeHtml(html, {
      allowedTags: [
        "p",
        "br",
        "strong",
        "b",
        "em",
        "i",
        "u",
        "a",
        "ul",
        "ol",
        "li",
        "blockquote",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "img",
        "figure",
        "figcaption",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "hr",
      ],
      allowedAttributes: {
        a: ["href", "target", "rel"],
        img: ["src", "alt", "title", "loading", "srcset", "sizes"],
        th: ["colspan", "rowspan"],
        td: ["colspan", "rowspan"],
      },
      allowedSchemes: ["http", "https", "mailto"],
      transformTags: {
        a: sanitizeHtml.simpleTransform("a", {
          target: "_blank",
          rel: "noopener noreferrer",
        }),
      },
    });
  } catch (error) {
    console.error("sanitizeRichText failed:", error);
    return "";
  }
}

// ─── Adapter ──────────────────────────────────────────────────────────────────

export function adaptBlogPost(post) {
  if (!post) return null;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title ?? "",
    excerpt: post.excerpt ?? "",
    category: post.category ?? "",
    publishedAt: post.publishedAt ?? "",
    date: post.date ?? "",
    image: post.image ?? "",
    content: post.description ?? "",
    shareUrl: post.shareUrl || post.href || `/blog/news/${post.slug}`,
    ctaHref: post.ctaHref ?? "/",
    ctaLabel: post.ctaLabel ?? "Order it now from RDS",
    relatedPosts: post.relatedPosts ?? [],
  };
}

// ─── Related posts ────────────────────────────────────────────────────────────

export function getRelatedPosts(allPosts, relatedIds = [], currentPostId) {
  if (!Array.isArray(allPosts) || allPosts.length === 0) return [];

  const prioritizedPosts = Array.isArray(relatedIds)
    ? relatedIds
        .map((id) => allPosts.find((post) => post.id === id))
        .filter(Boolean)
    : [];

  const excludedIds = new Set([
    currentPostId,
    ...prioritizedPosts.map((post) => post.id),
  ]);

  const remainingPosts = allPosts.filter((post) => !excludedIds.has(post.id));

  return [...prioritizedPosts, ...remainingPosts];
}