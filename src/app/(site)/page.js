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

export const metadata = {
  title: SITE_BRAND_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
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
};

export default async function HomePage() {
  let homeData = EMPTY_HOME_DATA;

  try {
    const response = await getHomeData();
    homeData = adaptHomeResponse(response, "en");
  } catch (error) {
    console.error("[HomePage] failed to fetch home data:", error);
  }

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: BRAND_ALIASES,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    description: SITE_DESCRIPTION,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: BRAND_ALIASES,
    url: SITE_URL,
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

      <section className="sr-only" aria-label="RDS Pharma brand information">
        <h1>RDS Pharma - Al Reaya Al Owla Medicine - الرعاية الأولى</h1>
        <p>
          RDS Pharma, also known as Al Reaya Al Owla Medicine and الرعاية
          الأولى, is a UAE-based pharmacy, skincare, wellness, beauty, and
          personal care products supplier. The brand may also be searched as
          RDS, Al Reaya, الرعاية, or الرعايه.
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