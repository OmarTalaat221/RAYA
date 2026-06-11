import { getLocale } from "next-intl/server";

import {
  SITE_NAME,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "../../../lib/site-config";

export const metadata = {
  title: `Shipping Policy | ${SITE_NAME}`,
  description:
    "Read RDS Pharma Shipping Policy, including UAE delivery, global shipping, and free delivery terms.",
  alternates: {
    canonical: "/shipping-policy",
  },
  openGraph: {
    type: "website",
    title: `Shipping Policy | ${SITE_NAME}`,
    description:
      "Read RDS Pharma Shipping Policy, including UAE delivery, global shipping, and free delivery terms.",
    url: "/shipping-policy",
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
    title: `Shipping Policy | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

const content = {
  en: {
    title: "Shipping policy",
    lines: [
      "Free Delivery over 400AED",
      "Delivery within UAE and Global Shipping Available",
    ],
  },
  ar: {
    title: "سياسة الشحن",
    lines: [
      "توصيل مجاني للطلبات التي تزيد عن 400 درهم",
      "التوصيل داخل الإمارات والشحن الدولي متاح",
    ],
  },
};

export default async function ShippingPolicy() {
  const locale = await getLocale();
  const page = locale === "ar" ? content.ar : content.en;
  const isRTL = locale === "ar";

  return (
    <main
      className="bg-white py-12 font-sans md:py-20"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-10 text-center text-[clamp(2.25rem,5vw,3.25rem)] font-medium leading-tight text-soft-black">
          {page.title}
        </h1>

        <div className="space-y-4 text-base leading-8 text-soft-black/75">
          {page.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </main>
  );
}