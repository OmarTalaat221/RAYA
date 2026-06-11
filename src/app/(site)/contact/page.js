import ContactPage from "../../../components/Contact/ContactPage";

import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
} from "../../../lib/site-config";

export const metadata = {
  title: `Contact Us | ${SITE_NAME}`,
  description:
    "Contact RDS Pharma for support, product inquiries, pharmacy services, orders, and customer care.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    title: `Contact Us | ${SITE_NAME}`,
    description:
      "Contact RDS Pharma for support, product inquiries, pharmacy services, orders, and customer care.",
    url: "/contact",
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
    title: `Contact Us | ${SITE_NAME}`,
    description:
      "Contact RDS Pharma for support, product inquiries, pharmacy services, orders, and customer care.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function Page() {
  return <ContactPage />;
}