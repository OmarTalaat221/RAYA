// components/About/AboutPage.jsx

"use client";

import { useTranslations } from "next-intl";
import AboutBanner from "./AboutBanner";
import AboutStory from "./AboutStory";
import AboutCompany from "./AboutCompany";

export default function AboutPage() {
  const t = useTranslations("about");


  return (
    <main className="bg-[#f4f3f0] text-soft-black">
      <AboutBanner
        slides={["/assets/image/raya-banner.webp"]}
        title={t("banner.title")}
        subtitle={t("banner.description")}
      />

      <AboutStory t={t} />

      <AboutCompany t={t} />
    </main>
  );
}