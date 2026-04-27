import sanitizeHtml from "sanitize-html";

// ─── Media ────────────────────────────────────────────────────────────────────

export function resolveMediaSrc(src) {
  if (!src) return "";

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  if (src.startsWith("/cdn/shop/")) {
    return `https://www.rdspharma.online${src}`;
  }

  return src;
}

export function toAbsoluteUrl(path = "") {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.rdspharma.online";

  try {
    return new URL(path, baseUrl).toString();
  } catch {
    return baseUrl;
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
// Maps the existing blogData shape → what BlogDetailsPage expects.
// The original blogData object is NEVER mutated.

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
// Returns:
// 1) prioritized posts from relatedIds first
// 2) then the rest of posts
// 3) excluding current post
// This preserves old data and lets the related section show all other posts.

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
