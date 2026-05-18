// lib/site-config.js

/**
 * Single source of truth for site URLs and SEO config.
 * Change SITE_URL here when domain switches from Vercel to production.
 */

const PRODUCTION_URL = "https://rdspharma.cloud";
const STAGING_URL = "https://raya-phi.vercel.app";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? PRODUCTION_URL : STAGING_URL);

export const SITE_NAME = "RDS Pharma";

export const SITE_DESCRIPTION =
  "Premium pharmacy, skincare, wellness and beauty essentials.";

/* ─── Sitemap config ─────────────────────────────────────────────────────── */

export const SITEMAP_REVALIDATE = 3600; // 1 hour
export const SITEMAP_PAGE_SIZE = 100; // Items per API page when paginating

/* ─── Static routes (excluded from dynamic sitemaps) ─────────────────────── */

export const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changefreq: "daily" },
  { path: "/collections", priority: 0.9, changefreq: "weekly" },
  { path: "/collections/all", priority: 0.9, changefreq: "daily" },
  { path: "/blog/news", priority: 0.7, changefreq: "weekly" },
  { path: "/contact", priority: 0.5, changefreq: "monthly" },
];

/* ─── Routes excluded from sitemap ───────────────────────────────────────── */

export const EXCLUDED_ROUTES = [
  "/checkout",
  "/checkout/success",
  "/checkout/cod",
  "/search",
  "/login",
  "/register",
  "/account",
  "/cart",
];
