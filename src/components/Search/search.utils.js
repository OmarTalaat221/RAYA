const SEARCH_PAGE_ROUTE = "/search";

/* ─── encode / decode search query ─── */
export function encodeSearchQuery(query = "") {
  const trimmed = String(query ?? "").trim();
  if (!trimmed) return "";

  try {
    return btoa(encodeURIComponent(trimmed));
  } catch {
    return encodeURIComponent(trimmed);
  }
}

export function decodeSearchQuery(encoded = "") {
  const trimmed = String(encoded ?? "").trim();
  if (!trimmed) return "";

  try {
    return decodeURIComponent(atob(trimmed));
  } catch {
    try {
      return decodeURIComponent(trimmed);
    } catch {
      return trimmed;
    }
  }
}

/* ─── media ─── */
export function resolveMediaSrc(src) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/cdn/shop/")) return `https://www.rdspharma.online${src}`;
  return src;
}

/* ─── text normalize ─── */
export function normalizeSearchText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* ─── search matching ─── */
function getProductMatchScore(product, normalizedQuery) {
  if (!normalizedQuery || !product) return 0;

  const title = normalizeSearchText(product.title);
  const brand = normalizeSearchText(product.brand);
  const category = normalizeSearchText(product.category);
  const slug = normalizeSearchText(product.slug);
  const desc = normalizeSearchText(product.shortDescription);

  let score = 0;

  if (title.startsWith(normalizedQuery)) score += 120;
  else if (title.includes(normalizedQuery)) score += 96;

  if (brand.startsWith(normalizedQuery)) score += 78;
  else if (brand.includes(normalizedQuery)) score += 60;

  if (category.startsWith(normalizedQuery)) score += 66;
  else if (category.includes(normalizedQuery)) score += 54;

  if (slug.includes(normalizedQuery)) score += 28;
  if (desc.includes(normalizedQuery)) score += 18;

  if (product.isOnSale) score += 6;
  if (product.stockStatus === "in_stock") score += 4;

  return score;
}

export function getCatalogSearchResults(products = [], query = "") {
  const nq = normalizeSearchText(query);
  if (!nq) return products;

  return products
    .map((p, i) => ({ p, i, s: getProductMatchScore(p, nq) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map((x) => x.p);
}

/* ─── href builders ─── */
export function buildSearchPageHref(query = "") {
  const trimmed = String(query ?? "").trim();
  if (!trimmed) return SEARCH_PAGE_ROUTE;

  const encoded = encodeSearchQuery(trimmed);
  return `${SEARCH_PAGE_ROUTE}?q=${encodeURIComponent(encoded)}`;
}

export function getSearchSuggestions(products = [], query = "", limit = 4) {
  const nq = normalizeSearchText(query);
  if (!nq) return [];

  const map = new Map();

  products.forEach((p) => {
    const addItem = (label, type) => {
      const nl = normalizeSearchText(label);
      if (!nl) return;

      const existing = map.get(nl);
      if (existing) {
        existing.count += 1;
        return;
      }

      map.set(nl, {
        id: nl,
        label: String(label).trim(),
        type,
        count: 1,
      });
    };

    addItem(p?.brand, "Brand");
    addItem(p?.category, "Category");
  });

  return [...map.values()]
    .map((s) => {
      const nl = normalizeSearchText(s.label);
      let score = s.count;

      if (nl.startsWith(nq)) score += 100;
      else if (nl.includes(nq)) score += 72;
      else score = 0;

      return { ...s, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.count - a.count)
    .slice(0, limit);
}

export function getOverlaySearchProducts(products = [], query = "", limit = 4) {
  const nq = normalizeSearchText(query);
  if (!nq) return [];

  return getCatalogSearchResults(products, query).slice(0, limit);
}

/* ─── product helpers ─── */
export function getProductSearchHref(product = {}) {
  if (product?.href) return product.href;
  if (product?.slug) return `/products/${product.slug}`;
  return SEARCH_PAGE_ROUTE;
}

export function getProductSearchImage(product = {}) {
  const src =
    product?.media?.find((m) => m?.type === "image" && m?.isPrimary)?.src ||
    product?.media?.find((m) => m?.type === "image")?.src ||
    product?.frontImage ||
    product?.backImage ||
    "";

  return resolveMediaSrc(src);
}

export function formatMoney(value, currency = "AED") {
  if (value == null || value === "") return "";

  const n = Number(value);

  try {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency,
      maximumFractionDigits: Number.isInteger(n) ? 0 : 2,
    }).format(n);
  } catch {
    return `${n} ${currency}`;
  }
}
