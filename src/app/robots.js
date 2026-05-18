// app/robots.js

import { SITE_URL, EXCLUDED_ROUTES } from "../lib/site-config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: EXCLUDED_ROUTES,
      },
      // Block AI scrapers (optional - remove if you want indexing by AI)
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ClaudeBot",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
