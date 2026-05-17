const SEARCH_PAGE_ROUTE = "/search";

function encodeBase64(value = "") {
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    return window.btoa(value);
  }

  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "utf-8").toString("base64");
  }

  return value;
}

function decodeBase64(value = "") {
  if (typeof window !== "undefined" && typeof window.atob === "function") {
    return window.atob(value);
  }

  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "base64").toString("utf-8");
  }

  return value;
}

/* ─── encode / decode search query ─── */
export function encodeSearchQuery(query = "") {
  const trimmed = String(query ?? "").trim();
  if (!trimmed) return "";

  try {
    return encodeBase64(encodeURIComponent(trimmed));
  } catch {
    return encodeURIComponent(trimmed);
  }
}

export function decodeSearchQuery(encoded = "") {
  const trimmed = String(encoded ?? "").trim();
  if (!trimmed) return "";

  try {
    return decodeURIComponent(decodeBase64(trimmed));
  } catch {
    try {
      return decodeURIComponent(trimmed);
    } catch {
      return trimmed;
    }
  }
}

/* ─── href builders ─── */
export function buildSearchPageHref(query = "") {
  const trimmed = String(query ?? "").trim();
  if (!trimmed) return SEARCH_PAGE_ROUTE;

  const encoded = encodeSearchQuery(trimmed);
  return `${SEARCH_PAGE_ROUTE}?q=${encodeURIComponent(encoded)}`;
}

/* ─── media ─── */
export function resolveMediaSrc(src) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/cdn/shop/")) return `https://www.rdspharma.online${src}`;
  return src;
}

/* ─── money ─── */
export function formatMoney(value, currency) {
  if (value == null || value === "") return "";

  const amount = Number(value);

  if (!Number.isFinite(amount)) return "";

  try {
    if (currency) {
      return new Intl.NumberFormat("en-AE", {
        style: "currency",
        currency,
        maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
      }).format(amount);
    }

    return new Intl.NumberFormat("en-AE", {
      maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
  } catch {
    const fallback = new Intl.NumberFormat("en-AE", {
      maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);

    return currency ? `${fallback} ${currency}` : fallback;
  }
}
