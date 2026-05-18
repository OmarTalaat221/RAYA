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

const getCachedProducts = unstable_cache(
  async () => getAllProductsForSitemap({ pageSize: SITEMAP_PAGE_SIZE }),
  ["sitemap-products"],
  { revalidate: SITEMAP_REVALIDATE, tags: ["sitemap", "products"] }
);

function buildXml(items) {
  const urls = items
    .map((item) => {
      const lastmod = item.updatedAt
        ? new Date(item.updatedAt).toISOString()
        : new Date().toISOString();

      return `  <url>
    <loc>${escapeXml(`${SITE_URL}/products/${item.slug}`)}</loc>
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
