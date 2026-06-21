import HeroBanner from "../../components/HeroBanner";
import SpecialOffer from "../../sections/Home/SpecialOffer";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Collections from "../../components/Collections/Collections.jsx";
import BlogSection from "../../components/Blog/BlogSection.jsx";
import { getHomeData } from "../../services/home.service";
import {
  adaptHomeResponse,
  EMPTY_HOME_DATA,
} from "../../sections/Home/home.adapter";

import {
  SITE_URL,
  SITE_NAME,
  SITE_BRAND_TITLE,
  SITE_DESCRIPTION,
  BRAND_ALIASES,
  DEFAULT_OG_IMAGE,
} from "../../lib/site-config";

const HOME_SEO_KEYWORDS = [
  "RDS Pharma",
  "RDS",
  "RDS Pharmacy",
  "RDS Pharma UAE",
  "RDS Pharma Sharjah",
  "RDS Pharma online",
  "RDS Pharma online pharmacy",
  "RDS Pharmaco",
  "rdspharma",
  "rdspharmaco",
  "Al Reaya Al Owla",
  "Al Reaya Al Owla Medicine",
  "AL REAYA AL OWLA",
  "Al Reaya Pharmacy",
  "Al Reaya Medicine",
  "Al Reaya Medical",
  "Al Reaya Al Owla UAE",
  "Al Reaya Al Owla Sharjah",
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
  "RDS products",
  "RDS skincare",
  "RDS wellness",
  "RDS beauty",
  "RDS supplements",
  "online pharmacy UAE",
  "online pharmacy Sharjah",
  "UAE pharmacy products",
  "Sharjah pharmacy products",
  "skincare UAE",
  "beauty products UAE",
  "wellness products UAE",
  "personal care UAE",
  "pharmacy skincare wellness beauty",
  "Skinage",
  "Skinage UAE",
  "Skinage collagen",
  "Skinage collagen prestige",
  "Skinage collagen tri active",
  "Skinage advanced 5000 collagen",
  "Skinage hairboost",
  "Denefis",
  "Denefis UAE",
  "Denefis serum",
  "Denefis vitamin c serum",
  "Denefis 24k gold serum",
  "Denefis collagen serum",
  "Omniflex",
  "Omniflex UAE",
  "Omniflex FlexVital",
  "Omniflex syrup",
  "Bellyslim",
  "Yasenka",
  "Vitamin Code",
];

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_BRAND_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Pharmacy, Skincare, Wellness, Beauty",
  keywords: HOME_SEO_KEYWORDS,
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_BRAND_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "RDS Pharma - Al Reaya Al Owla Medicine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_BRAND_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  other: {
    "geo.region": "AE-SH",
    "geo.placename": "Sharjah, United Arab Emirates",
    "business:contact_data:locality": "Sharjah",
    "business:contact_data:country_name": "United Arab Emirates",
  },
};

export default async function HomePage() {
  let homeData = EMPTY_HOME_DATA;

  try {
    const response = await getHomeData();
    homeData = adaptHomeResponse(response, "en");
  } catch (error) {
    console.error("[HomePage] failed to fetch home data:", error);
  }

  const allBrandAliases = Array.from(
    new Set([
      ...BRAND_ALIASES,
      "RDS Pharmacy",
      "RDS Pharmaco",
      "rdspharma",
      "rdspharmaco",
      "Al Reaya Medicine",
      "Al Reaya Medical",
      "صيدلية الرعاية",
      "صيدلية الرعاية الأولى",
      "الرعاية الأولى للأدوية",
      "الرعاية الأولى الطبية",
    ]),
  );

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: "Al Reaya Al Owla Medicine",
    alternateName: allBrandAliases,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon.png`,
    },
    image: `${SITE_URL}/favicon.png`,
    description: SITE_DESCRIPTION,
    areaServed: [
      {
        "@type": "Country",
        name: "United Arab Emirates",
      },
      {
        "@type": "City",
        name: "Sharjah",
      },
    ],
    knowsAbout: [
      "Pharmacy products",
      "Skincare",
      "Wellness",
      "Beauty products",
      "Personal care",
      "Supplements",
      "Collagen products",
      "Hair care",
      "Skinage",
      "Denefis",
      "Omniflex",
      "Yasenka",
    ],
    brand: [
      {
        "@type": "Brand",
        name: "RDS Pharma",
      },
      {
        "@type": "Brand",
        name: "Skinage",
      },
      {
        "@type": "Brand",
        name: "Denefis",
      },
      {
        "@type": "Brand",
        name: "Omniflex",
      },
      {
        "@type": "Brand",
        name: "Yasenka",
      },
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: allBrandAliases,
    url: SITE_URL,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: ["en", "ar"],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: SITE_BRAND_TITLE,
    description: SITE_DESCRIPTION,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon.png`,
    },
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="sr-only" aria-label="RDS Pharma brand information">
        <h1>RDS Pharma - Al Reaya Al Owla Medicine - الرعاية الأولى</h1>
        <p>
          RDS Pharma, also known as Al Reaya Al Owla Medicine and الرعاية
          الأولى, is a UAE-based online pharmacy, skincare, wellness, beauty,
          and personal care supplier. The brand may also be searched as RDS, RDS
          Pharmacy, Al Reaya, Al Reaya Al Owla, الرعاية, الرعايه, or الرعاية
          الأولى.
        </p>
      </section>

      <div style={{ overflow: "hidden" }}>
        <HeroBanner banners={homeData.banners} />
        <SpecialOffer />
        <FeaturedProducts products={homeData.products} />
        <Collections categories={homeData.categories} />
        <BlogSection blogs={homeData.blogs} />
      </div>
    </>
  );
}
