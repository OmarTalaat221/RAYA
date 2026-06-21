const PRODUCTION_URL = "https://rdspharmaco.com";
const STAGING_URL = "https://raya-phi.vercel.app";

function normalizeSiteUrl(url = "") {
  return String(url).replace(/\/+$/, "");
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? PRODUCTION_URL : STAGING_URL),
);

export const SITE_NAME = "RDS Pharma";

export const SITE_BRAND_TITLE =
  "RDS Pharma | Al Reaya Al Owla Medicine | الرعاية الأولى";

export const SITE_DESCRIPTION =
  "RDS Pharma, also known as Al Reaya Al Owla Medicine and الرعاية الأولى, offers pharmacy, skincare, wellness, beauty, and personal care products in the UAE.";

export const BRAND_ALIASES = [
  "RDS Pharma",
  "RDS",
  "RDS Pharmacy",
  "RDS Pharmaco",
  "rdspharma",
  "rdspharmaco",
  "Al Reaya Al Owla",
  "Al Reaya Al Owla Medicine",
  "AL REAYA AL OWLA",
  "Al Reaya Pharmacy",
  "Al Reaya Medicine",
  "Al Reaya Medical",
  "Raya Pharmacy",
  "الرعاية الأولى",
  "الرعايه الاولى",
  "الرعاية",
  "الرعايه",
  "الرعاية فارما",
  "الرعاية الأولى فارما",
  "الرعاية الأولى للأدوية",
  "الرعاية الأولى الطبية",
  "صيدلية الرعاية",
  "صيدلية الرعاية الأولى",
];

export const DEFAULT_OG_IMAGE = "/favicon.webp";

export const SITEMAP_REVALIDATE = 3600;
export const SITEMAP_PAGE_SIZE = 200;

export const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changefreq: "daily" },
  { path: "/collections", priority: 0.9, changefreq: "weekly" },
  { path: "/collections/all", priority: 0.9, changefreq: "daily" },
  { path: "/blog/news", priority: 0.7, changefreq: "weekly" },
  { path: "/about", priority: 0.7, changefreq: "weekly" },
  { path: "/contact", priority: 0.5, changefreq: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changefreq: "yearly" },
  { path: "/return-policy", priority: 0.3, changefreq: "yearly" },
  { path: "/shipping-policy", priority: 0.3, changefreq: "yearly" },
  { path: "/terms-and-conditions", priority: 0.3, changefreq: "yearly" },
];

export const EXCLUDED_ROUTES = [
  "/api",
  "/login",
  "/register",
  "/forgot-password",
  "/profile",
  "/account",
  "/orders",
  "/addresses",
  "/wishlist",
  "/change-password",
  "/cart",
  "/checkout",
  "/checkout/success",
  "/checkout/cod",
  "/search",
];
