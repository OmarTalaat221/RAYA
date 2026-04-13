// app/gallery/page.jsx

import React from "react";
import PageBanner from "../../components/PagesBanner";
import GalleryTabsSection from "../../sections/Gallery/GalleryTabsSection";
import ScrollTopButton from "~/sections/Common/Scroll";

const Gallery = () => {
  return (
    <>
      {/* ===== Banner Section ===== */}
      <PageBanner
        useWhiteGradient={true} // ✅ هيستخدم الـ Gradient الأبيض
        mediaSrc="https://res.cloudinary.com/dp7jfs375/image/upload/v1772704864/white-wedding-banner-template-fr_vd4ivl.png"
        gradientColor="#DCB56D"
        overlayStrength={80}
        align="right"
        showBottomFade={true}
        bottomFadeColor="white"
        className="h-[60vh]! md:h-[80vh]!"
      >
        {/* Banner Content */}
        <div className="flex flex-col w-full justify-center md:justify-end items-center md:items-start h-full">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#023048] mb-4 leading-tight">
            المعرض
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#000000] leading-relaxed">
            خدمات زواج وافراح متكاملة في اوروبا
          </p>
        </div>
      </PageBanner>

      <GalleryTabsSection />

      <ScrollTopButton />
    </>
  );
};

export default Gallery;
