// lib/site-config.js

/**
 * Single source of truth for site URLs and SEO config.
 */

const PRODUCTION_URL = "https://rdspharmaco.com";
const STAGING_URL = "https://raya-phi.vercel.app";

function normalizeSiteUrl(url = "") {
  return String(url).replace(/\/+$/, "");
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? PRODUCTION_URL : STAGING_URL)
);

export const SITE_NAME = "RDS Pharma";

export const SITE_DESCRIPTION =
  "RDS Pharma offers pharmacy, skincare, wellness, beauty, and personal care essentials with trusted online shopping.";

export const DEFAULT_OG_IMAGE = "/favicon.png";

/* ─── Sitemap config ─────────────────────────────────────────────────────── */

export const SITEMAP_REVALIDATE = 3600;
export const SITEMAP_PAGE_SIZE = 100;

/* ─── Static routes ──────────────────────────────────────────────────────── */

export const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changefreq: "daily" },
  { path: "/collections", priority: 0.9, changefreq: "weekly" },
  { path: "/collections/all", priority: 0.9, changefreq: "daily" },
  { path: "/blog/news", priority: 0.7, changefreq: "weekly" },
  { path: "/contact", priority: 0.5, changefreq: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changefreq: "yearly" },
  { path: "/return-policy", priority: 0.3, changefreq: "yearly" },
  { path: "/shipping-policy", priority: 0.3, changefreq: "yearly" },
  { path: "/terms-and-conditions", priority: 0.3, changefreq: "yearly" },
];

/* ─── Routes excluded from crawling / sitemap ───────────────────────────── */

export const EXCLUDED_ROUTES = [
  "/api",
  "/checkout",
  "/checkout/success",
  "/checkout/cod",
  "/search",
  "/login",
  "/register",
  "/forgot-password",
  "/account",
  "/cart",
];