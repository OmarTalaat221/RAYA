import {
  SITE_NAME,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "../../../lib/site-config";

export const metadata = {
  title: `Collections | ${SITE_NAME}`,
  description:
    "Browse RDS Pharma collections including pharmacy, skincare, wellness, beauty, and personal care products.",
  alternates: {
    canonical: "/collections",
  },
  openGraph: {
    type: "website",
    title: `Collections | ${SITE_NAME}`,
    description:
      "Browse RDS Pharma collections including pharmacy, skincare, wellness, beauty, and personal care products.",
    url: "/collections",
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
    title: `Collections | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function CollectionsLayout({ children }) {
  return children;
}