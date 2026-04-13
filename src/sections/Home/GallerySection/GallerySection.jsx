// components/GallerySection/GallerySection.jsx

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const GallerySection = () => {
  // بيانات الصور (نفس الداتا بتاعتك)
  const galleryImages = {
    featured: {
      src: "https://res.cloudinary.com/dp7jfs375/image/upload/v1772628027/Image_1_2x_azssyc.png",
      alt: "لحظة من أفراحنا - رئيسية",
    },
    topRow: [
      {
        id: 1,
        src: "https://res.cloudinary.com/dp7jfs375/image/upload/v1772627865/NoPath_-_Copy_4_2x_bdflrd.png",
        alt: "لحظة من أفراحنا 1",
      },
      {
        id: 2,
        src: "https://res.cloudinary.com/dp7jfs375/image/upload/v1772627868/NoPath_-_Copy_3_2x_fiyjxk.png",
        alt: "لحظة من أفراحنا 2",
      },
    ],
    bottomRow: [
      {
        id: 4,
        src: "https://res.cloudinary.com/dp7jfs375/image/upload/v1772627865/NoPath_-_Copy_6_2x_caxzma.png",
        alt: "لحظة من أفراحنا 3",
      },
      {
        id: 5,
        src: "https://res.cloudinary.com/dp7jfs375/image/upload/v1772627866/NoPath_-_Copy_2x_kkn9cm.png",
        alt: "لحظة من أفراحنا 4",
      },
    ],
  };

  // تجميع كل الصور في مصفوفة واحدة عشان يسهل التقليب بينهم في السلايدر
  const allImages = [
    galleryImages.featured,
    ...galleryImages.topRow,
    ...galleryImages.bottomRow,
  ];

  // حالات (States) للتحكم في الـ Lightbox
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // دوال التحكم
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    // منع التمرير في الصفحة الخلفية لما المعرض يفتح
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsOpen(false);
    // إرجاع التمرير للصفحة
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length
    );
  };

  // التحكم عن طريق الكيبورد
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") closeLightbox();
      // بما إن التصميم RTL: السهم الشمال = التالي، السهم اليمين = السابق
      if (e.key === "ArrowLeft") nextImage();
      if (e.key === "ArrowRight") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <section className="w-full bg-white py-10 md:py-14 lg:py-18" dir="rtl">
      <div className="container-custom mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#023048] text-center mb-12 md:mb-16 lg:mb-20">
          لحظات من افراحنا
        </h2>

        {/* Gallery Grid */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-5">
          {/* Right Side - Large Portrait Image (Index 0) */}
          <div
            className="w-full lg:w-[35%] cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            <div className="h-[300px] md:h-[400px] lg:h-full lg:min-h-[500px] rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center"></div>
              <img
                src={galleryImages.featured.src}
                alt={galleryImages.featured.alt}
                className="w-full h-full! object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Left Side - Grid of smaller images */}
          <div className="w-full lg:w-[65%] flex flex-col gap-4 md:gap-5">
            {/* Top Row - 2 small images (Index 1 & 2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 flex-1">
              {galleryImages.topRow.map((image, idx) => (
                <div
                  key={image.id}
                  className="aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group relative"
                  onClick={() => openLightbox(idx + 1)} // Index 1 and 2
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10"></div>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full! object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            {/* Bottom Row - 2 larger images (Index 3 & 4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 flex-1">
              {galleryImages.bottomRow.map((image, idx) => (
                <div
                  key={image.id}
                  className="aspect-[4/3] md:aspect-auto md:h-full min-h-[180px] md:min-h-[200px] rounded-2xl overflow-hidden cursor-pointer group relative"
                  onClick={() => openLightbox(idx + 3)} // Index 3 and 4
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10"></div>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full! object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href={"/gallery"}
            className="px-10 md:px-14 py-3 md:py-4 mt-[50px]
                       bg-[#DCB56D] hover:bg-[#c9a227]
                       text-[#023048] font-semibold text-lg md:text-2xl
                       rounded-xl
                       hover:shadow-lg hover:shadow-[#DCB56D]/30
                       transition-all duration-300"
          >
            معرض الصور
          </Link>
        </div>
      </div>

      {/* ======================================================= */}
      {/* Lightbox / Slider Modal (يظهر فقط عند الضغط على صورة) */}
      {/* ======================================================= */}
      {isOpen && (
        <div className="fixed inset-0 z-[100000000] bg-black/90 backdrop-blur-sm flex items-center justify-center">
          {/* زرار القفل */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-[#DCB56D] transition-colors z-50 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* عداد الصور */}
          <div className="absolute top-8 left-8 text-white text-lg font-medium tracking-widest z-50">
            {currentIndex + 1} / {allImages.length}
          </div>

          {/* زر التقليب للسابق (يمين الشاشة لأننا RTL) */}
          <button
            onClick={prevImage}
            className="absolute right-4 md:right-10 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 p-3 rounded-full transition-all z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* الصورة المعروضة */}
          <div className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center px-12 md:px-24">
            <img
              src={allImages[currentIndex].src}
              alt={allImages[currentIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl animate-fade-in"
            />
          </div>

          {/* زر التقليب للتالي (يسار الشاشة لأننا RTL) */}
          <button
            onClick={nextImage}
            className="absolute left-4 md:left-10 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 p-3 rounded-full transition-all z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
