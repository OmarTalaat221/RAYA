// app/sitemap-static.xml/route.js

import {
  SITE_URL,
  STATIC_ROUTES,
  SITEMAP_REVALIDATE,
} from "../../lib/site-config";

export const revalidate = 3600;

function generateStaticXml() {
  const now = new Date().toISOString();

  const urls = STATIC_ROUTES.map((route) => {
    return `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function GET() {
  const xml = generateStaticXml();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": `public, s-maxage=${SITEMAP_REVALIDATE}, stale-while-revalidate`,
    },
  });
}
