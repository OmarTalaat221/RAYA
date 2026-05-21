/* ═══════════════════════════════════════════════
   Blog Adapter
   ═══════════════════════════════════════════════
   Transforms API responses into the shapes
   that BlogCard and BlogDetailsPage expect.

   - API is the single source of truth.
   - No static / fallback data.
   - blogTranslations is the primary source
     for title, excerpt, category, meta.
   ═══════════════════════════════════════════════ */

/**
 * Derives a readable title from a slug.
 * Fallback only — used when blogTranslations is empty.
 *
 * "orchid-silk-hand-cream" → "Orchid Silk Hand Cream"
 */
function titleFromSlug(slug) {
  if (!slug) return "Untitled";

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Extracts the best matching translation.
 */
function getTranslation(translations, lang = "en") {
  if (!translations?.length) return {};
  return translations.find((t) => t.lang === lang) || translations[0] || {};
}

/**
 * Resolves srcSet from API format (array) to
 * a string that <img srcSet> expects.
 */
function resolveSrcSet(srcSet) {
  if (!srcSet) return "";
  if (typeof srcSet === "string") return srcSet;
  if (Array.isArray(srcSet)) return srcSet.join(", ");
  return "";
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "https://rdspharma.cloud";

function resolveMediaSrc(src) {
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

/**
 * Resolves product href from product translations.
 */
function getProductHref(product) {
  if (!product) return "";

  const translation = getTranslation(product.translations);

  if (translation.href) return translation.href;
  if (translation.slug) return `/products/${translation.slug}`;

  return "";
}

/* ═══════════════════════════════════════════════
   List Adapter
   ═══════════════════════════════════════════════ */

/**
 * Adapts a single blog item from the list API
 * into the shape that BlogCard expects.
 *
 * BlogCard needs:
 *   id, title, excerpt, category, date, image, srcSet, slug
 */
export function adaptBlogItem(item) {
  if (!item) return null;

  const translation = getTranslation(item.blogTranslations);

  const title = translation.title || item.title || titleFromSlug(item.slug);

  const excerpt =
    translation.excerpt ||
    translation.description ||
    item.excerpt ||
    item.description ||
    "";

  const category = translation.category || item.category || "";

  return {
    id: item.id,
    title,
    excerpt,
    category,
    date: item.date || "",
    image: resolveMediaSrc(item.image),
    srcSet: resolveSrcSet(item.srcSet),
    slug: item.slug || "",
    isFeatured: item.isFeatured || false,
  };
}

/**
 * Adapts the full /blogs/all API response.
 *
 * Supports both old and new pagination shapes:
 *
 * Old (metadata):
 *   { total, totalPages, currentPage, limit }
 *
 * New (pagination):
 *   { totalItems, totalPages, page, limit, hasNextPage }
 *
 * Returns { posts, metadata } in a normalized shape.
 */
export function adaptBlogListResponse(apiData) {
  if (!apiData?.data) {
    return {
      posts: [],
      metadata: {
        total: 0,
        totalPages: 1,
        currentPage: 1,
        limit: 6,
      },
    };
  }

  const items = apiData.data.items || [];

  /* ── Normalize pagination ── */
  const raw = apiData.data.pagination || apiData.data.metadata || {};

  const metadata = {
    total: raw.totalItems ?? raw.total ?? 0,
    totalPages: raw.totalPages ?? 1,
    currentPage: raw.page ?? raw.currentPage ?? 1,
    limit: raw.limit ?? 6,
    hasNextPage: raw.hasNextPage ?? false,
  };

  const posts = items.map(adaptBlogItem).filter(Boolean);

  return { posts, metadata };
}

/* ═══════════════════════════════════════════════
   Detail Adapter
   ═══════════════════════════════════════════════ */

/**
 * Adapts a single blog detail response into
 * the shape that BlogDetailsPage expects.
 *
 * Reads from blogTranslations first,
 * then falls back to root-level fields.
 */
export function adaptBlogDetail(apiData, fallbackListItem = null) {
  if (!apiData?.data && !fallbackListItem) return null;

  const item = apiData?.data || fallbackListItem || {};

  const translationsSource = item.blogTranslations?.length
    ? item.blogTranslations
    : fallbackListItem?.blogTranslations || [];

  const translation = getTranslation(translationsSource);

  const slug = item.slug || fallbackListItem?.slug || "";

  const title =
    translation.title ||
    item.title ||
    fallbackListItem?.title ||
    titleFromSlug(slug);

  const excerpt =
    translation.excerpt ||
    translation.description ||
    item.excerpt ||
    item.description ||
    fallbackListItem?.excerpt ||
    "";

  const content =
    translation.content ||
    translation.body ||
    item.content ||
    item.body ||
    excerpt ||
    "";

  const category =
    translation.category || item.category || fallbackListItem?.category || "";

  const metaTitle = translation.meta_title || title;

  const metaDescription = translation.meta_description || excerpt;

  const metaKeywords = translation.meta_keywords || "";

  const ctaHref =
    getProductHref(item.product || fallbackListItem?.product) || "";

  return {
    id: item.id || fallbackListItem?.id || "",
    slug,
    title,
    excerpt,
    content,
    category,
    image: item.image || fallbackListItem?.image || "",
    srcSet: resolveSrcSet(item.srcSet || fallbackListItem?.srcSet),
    date: item.date || fallbackListItem?.date || "",
    publishedAt:
      item.createdAt ||
      item.date ||
      fallbackListItem?.createdAt ||
      fallbackListItem?.date ||
      "",
    shareUrl: `/blog/news/${slug}`,
    ctaHref,
    ctaLabel: ctaHref ? "View Product" : "",
    isFeatured: item.isFeatured || fallbackListItem?.isFeatured || false,
    productId: item.productId || fallbackListItem?.productId || null,
    meta_title: metaTitle,
    meta_description: metaDescription,
    meta_keywords: metaKeywords,
  };
}

/* ═══════════════════════════════════════════════
   Related Blogs Adapter
   ═══════════════════════════════════════════════ */

/**
 * Adapts a single item from relatedBlogs array
 * into the shape that RelatedPosts / BlogCard expects.
 *
 * BlogCard needs:
 *   id, title, excerpt, category, date, image, srcSet, slug, href
 */
export function adaptRelatedBlog(item) {
  if (!item?.slug) return null;

  const translation = getTranslation(item.blogTranslations);

  const title = translation.title || item.title || titleFromSlug(item.slug);

  const excerpt =
    translation.excerpt ||
    translation.description ||
    item.excerpt ||
    item.description ||
    "";

  const category = translation.category || item.category || "";

  return {
    id: item.id || item.slug,
    title,
    excerpt,
    category,
    date: item.date || "",
    image: item.image || "",
    srcSet: resolveSrcSet(item.srcSet),
    slug: item.slug,
    href: `/blog/news/${item.slug}`,
  };
}