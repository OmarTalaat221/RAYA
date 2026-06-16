// app/sitemap-products.xml/route.js

import { unstable_cache } from "next/cache";
import {
  SITE_URL,
  SITEMAP_REVALIDATE,
  SITEMAP_PAGE_SIZE,
} from "../../lib/site-config";
import { getAllProductsForSitemap } from "../../services/products.service";

export const revalidate = 3600;

const escapeXml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/**
 * Encode slug as a safe URL path segment.
 * This fixes sitemap URLs containing &, ®, *, spaces, Arabic, etc.
 */
const encodePathSegment = (value = "") =>
  encodeURIComponent(String(value).trim()).replace(/[!'()*]/g, (char) =>
    `%${char.charCodeAt(0).toString(16).toUpperCase()}`
  );

const isValidSlug = (slug) => {
  const value = String(slug || "").trim();

  if (!value) return false;

  // Prevent broken nested paths inside /products/{slug}
  if (value.includes("/")) return false;

  // Optional SEO cleanup: do not submit dummy products to sitemap
  if (/^untitled/i.test(value)) return false;

  return true;
};

const getSafeLastmod = (value) => {
  if (!value) return new Date().toISOString();

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }

  return date.toISOString();
};

const getCachedProducts = unstable_cache(
  async () => getAllProductsForSitemap({ pageSize: SITEMAP_PAGE_SIZE }),
  ["sitemap-products"],
  { revalidate: SITEMAP_REVALIDATE, tags: ["sitemap", "products"] }
);

function normalizeItems(items = []) {
  const seen = new Set();
  const normalized = [];

  for (const item of items) {
    const slug = String(item?.slug || "").trim();

    if (!isValidSlug(slug)) continue;

    const key = slug.toLowerCase();

    if (seen.has(key)) continue;

    seen.add(key);

    normalized.push({
      slug,
      encodedSlug: encodePathSegment(slug),
      updatedAt: item.updatedAt || null,
    });
  }

  return normalized;
}

function buildXml(items) {
  const normalizedItems = normalizeItems(items);

  const urls = normalizedItems
    .map((item) => {
      const lastmod = getSafeLastmod(item.updatedAt);

      const loc = `${SITE_URL}/products/${item.encodedSlug}`;

      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function GET() {
  let items = [];

  try {
    items = await getCachedProducts();
  } catch (error) {
    console.error("[sitemap-products] Failed:", error?.message);
  }

  const xml = buildXml(items);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": `public, s-maxage=${SITEMAP_REVALIDATE}, stale-while-revalidate`,
    },
  });
}