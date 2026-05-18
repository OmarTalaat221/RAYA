// app/sitemap-blog.xml/route.js

import { unstable_cache } from "next/cache";
import {
  SITE_URL,
  SITEMAP_REVALIDATE,
  SITEMAP_PAGE_SIZE,
} from "../../lib/site-config";
import { getAllBlogsForSitemap } from "../../services/blogs.service";

export const revalidate = 3600;

const escapeXml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const getCachedBlogs = unstable_cache(
  async () => getAllBlogsForSitemap({ pageSize: 50 }),
  ["sitemap-blog"],
  { revalidate: SITEMAP_REVALIDATE, tags: ["sitemap", "blog"] }
);

function buildXml(items) {
  const urls = items
    .map((item) => {
      const lastmod = item.updatedAt
        ? new Date(item.updatedAt).toISOString()
        : new Date().toISOString();

      return `  <url>
    <loc>${escapeXml(`${SITE_URL}/blog/news/${item.slug}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
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
    items = await getCachedBlogs();
  } catch (error) {
    console.error("[sitemap-blog] Failed:", error?.message);
  }

  const xml = buildXml(items);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": `public, s-maxage=${SITEMAP_REVALIDATE}, stale-while-revalidate`,
    },
  });
}
