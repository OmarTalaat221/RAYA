// app/(site)/about/page.jsx

import AboutPage from "../../../components/About/AboutPage";

const SITE_URL = "https://rdspharma.cloud";

export const metadata = {
  title:
    "About Us | Al Reaya Al Owla — Trusted Pharmacy & Medical Equipment in UAE",
  description:
    "Al Reaya Al Owla is one of the leading distributors of pharmaceutical supplies and medical equipment in the UAE. Established in 2017, built on trust and excellence.",
  keywords: [
    "Al Reaya Al Owla",
    "RDS Pharma",
    "UAE pharmacy",
    "Sharjah pharmacy",
    "pharmaceutical distributor UAE",
    "medical equipment UAE",
    "authentic skincare UAE",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Al Reaya Al Owla — Pharmaceutical Excellence Since 2017",
    description:
      "One of the leading distributors of pharmaceutical supplies and medical equipment in the UAE.",
    url: `${SITE_URL}/about`,
    siteName: "RDS Pharma",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/assets/image/raya-place.webp`,
        width: 1200,
        height: 630,
        alt: "Al Reaya Al Owla — About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Al Reaya Al Owla",
    description:
      "Pharmaceutical excellence since 2017 — based in the UAE.",
    images: [`${SITE_URL}/assets/image/raya-place.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Al Reaya Al Owla",
  url: `${SITE_URL}/about`,
  description:
    "Al Reaya Al Owla — one of the leading distributors of pharmaceutical supplies and medical equipment in the UAE. Established 2017.",
  mainEntity: {
    "@type": "Organization",
    name: "Al Reaya Al Owla",
    alternateName: "RDS Pharma",
    legalName: "Al Reaya Al Owla Medicine and Medical Equipment Store LLC",
    url: SITE_URL,
    logo: "https://res.cloudinary.com/dbvh5i83q/image/upload/v1776082859/rds_logo_xpmbfn.webp",
    image: `${SITE_URL}/assets/image/raya-place.webp`,
    foundingDate: "2017",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Salim Al Owais building shop 2, Al Quliaha",
      addressLocality: "Sharjah",
      addressCountry: "AE",
    },
    sameAs: [
      "https://www.facebook.com/rdspharma",
      "https://www.instagram.com/rdspharma",
      "https://twitter.com/rdspharma",
      "https://www.youtube.com/@rdspharma",
      "https://www.tiktok.com/@rdspharma",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "info@rdspharma.online",
      areaServed: "AE",
      availableLanguage: ["en", "ar"],
    },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutPage />
    </>
  );
}