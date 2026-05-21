const FALLBACK_TITLE = "Untitled";

function resolveCollectionImage(src) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/cdn/shop/")) return `https://www.rdspharma.online${src}`;
  return src;
}

function resolveSrcSet(srcSetArray) {
  if (!Array.isArray(srcSetArray) || srcSetArray.length === 0) return "";
  return srcSetArray
    .map((entry) => {
      const parts = entry.trim().split(/\s+/);
      const url = parts[0] || "";
      const descriptor = parts.slice(1).join(" ");
      const resolved = resolveCollectionImage(url);
      return descriptor ? `${resolved} ${descriptor}` : resolved;
    })
    .join(", ");
}

function pickTranslation(translations = [], lang = "en") {
  if (!Array.isArray(translations) || translations.length === 0) return null;
  return translations.find((t) => t?.lang === lang) ?? translations[0] ?? null;
}

function stripLocalePrefix(path) {
  if (typeof path !== "string") return path;
  return path.replace(/^\/(?:ar|en)(?=\/|$)/, "") || "/";
}

export function adaptCategoryToCollection(category, lang = "en") {
  if (!category) return null;

  const translation = pickTranslation(category.translations, lang);
  const title = translation?.title || FALLBACK_TITLE;
  const slug = translation?.slug || category.id;

  return {
    id: category.id,
    title,
    slug,
    href: stripLocalePrefix(translation?.href || `/collections/${slug}`),
    image: resolveCollectionImage(category.image),
    srcSet: resolveSrcSet(category.srcSet),
    meta: {
      metaTitle: translation?.meta_title || title,
      metaDescription: translation?.meta_description || "",
      metaKeywords: translation?.meta_keywords || "",
    },
  };
}

export function adaptCategoriesToCollections(categories = [], lang = "en") {
  if (!Array.isArray(categories)) return [];
  return categories
    .map((c) => adaptCategoryToCollection(c, lang))
    .filter(Boolean);
}
