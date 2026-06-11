import { Suspense } from "react";
import NewsPageClient from "../../../../components/Blog/NewsPageClient";
import NewsPageFallback from "../../../../components/Blog/NewsPageFallback";

import {
  SITE_NAME,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "../../../../lib/site-config";

export const metadata = {
  title: `Latest News | ${SITE_NAME}`,
  description:
    "Explore the latest skincare, wellness, pharmacy, and beauty news from RDS Pharma.",
  alternates: {
    canonical: "/blog/news",
  },
  openGraph: {
    type: "website",
    title: `Latest News | ${SITE_NAME}`,
    description:
      "Explore the latest skincare, wellness, pharmacy, and beauty news from RDS Pharma.",
    url: "/blog/news",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Latest News | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function NewsPage() {
  return (
    <Suspense fallback={<NewsPageFallback />}>
      <NewsPageClient />
    </Suspense>
  );
}