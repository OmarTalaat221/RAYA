import DOMPurify from "isomorphic-dompurify";

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
    // value might already be a pre-formatted string like "Jan 12, 2025"
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

// ─── Rich text sanitizer ───────────────────────────────────────────────────────

export function sanitizeRichText(html = "") {
  if (typeof html !== "string") return "";

  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel", "loading", "srcset", "sizes"],
  });
}

// ─── Adapter ──────────────────────────────────────────────────────────────────
// Maps the existing blogData shape → what BlogDetailsPage expects.
// The original blogData object is NEVER mutated.

export function adaptBlogPost(post) {
  if (!post) return null;

  return {
    // ── identity ──────────────────────────────────────────────────
    id: post.id,
    slug: post.slug,

    // ── display fields ────────────────────────────────────────────
    title: post.title ?? "",
    excerpt: post.excerpt ?? "",
    category: post.category ?? "",

    // ── dates ─────────────────────────────────────────────────────
    // keep publishedAt as ISO string for <time dateTime>
    publishedAt: post.publishedAt ?? "",
    // keep the pre-formatted date string as a fallback label
    date: post.date ?? "",

    // ── image ─────────────────────────────────────────────────────
    // blogData uses `image` — same key BlogDetailsPage reads
    image: post.image ?? "",

    // ── rich text body ────────────────────────────────────────────
    // blogData stores body in `description`; BlogDetailsPage reads `content`
    content: post.description ?? "",

    // ── sharing ───────────────────────────────────────────────────
    // blogData has `shareUrl`; fall back to `href` then slug-based path
    shareUrl: post.shareUrl || post.href || `/blog/news/${post.slug}`,

    // ── CTA (optional per-post override; defaults used in component) ──
    ctaHref: post.ctaHref ?? "/",
    ctaLabel: post.ctaLabel ?? "Order it now from RDS",

    // ── related (preserved, not used in detail page yet) ──────────
    relatedPosts: post.relatedPosts ?? [],
  };
}

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
