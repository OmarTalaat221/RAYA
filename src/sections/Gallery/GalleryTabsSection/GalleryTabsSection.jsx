// sections/Gallery/GalleryTabsSection.jsx

"use client";
import { useState, useEffect } from "react";
import {
  galleryImages,
  galleryCategories,
} from "../../../utils/data/galleryData";
import GalleryGrid from "../GalleryGrid";

const GalleryTabsSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Lightbox States
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter images based on active tab
  const filteredImages =
    activeTab === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeTab);

  // ========== Lightbox Controls ==========
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredImages.length) % filteredImages.length
    );
  };

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") closeLightbox();
      // RTL: ArrowLeft = next, ArrowRight = prev
      if (e.key === "ArrowLeft") nextImage();
      if (e.key === "ArrowRight") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredImages.length]);

  // Reset index when tab changes to avoid out of bounds
  useEffect(() => {
    setCurrentIndex(0);
    // Close lightbox if open when changing tabs
    if (isOpen) {
      closeLightbox();
    }
  }, [activeTab]);

  return (
    <section className="py-10 md:py-14 lg:py-18 bg-white" dir="rtl">
      <div className="container mx-auto ">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16">
          {galleryCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`
                px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg
                transition-all duration-300
                ${
                  activeTab === category.id
                    ? "bg-[#DCB56D] text-[#023048] "
                    : "bg-transparent text-[#023048] hover:bg-[#DCB56D]/10"
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Pass the openLightbox function */}
        <GalleryGrid images={filteredImages} onImageClick={openLightbox} />
      </div>

      {/* ======================================================= */}
      {/* Lightbox / Slider Modal */}
      {/* ======================================================= */}
      {isOpen && filteredImages.length > 0 && (
        <div
          className="fixed inset-0 z-[100000000] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox} // Close when clicking backdrop
        >
          {/* Prevent closing when clicking on content */}
          <div onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="fixed top-6 right-6 text-white hover:text-[#DCB56D] transition-colors z-50 p-2"
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

            {/* Image Counter */}
            <div className="fixed top-8 left-8 text-white text-lg font-medium tracking-widest z-50">
              {currentIndex + 1} / {filteredImages.length}
            </div>

            {/* Previous Button (Right side for RTL) */}
            {filteredImages.length > 1 && (
              <button
                onClick={prevImage}
                className="fixed right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 p-3 rounded-full transition-all z-50"
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
            )}

            {/* Current Image */}
            <div className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center px-12 md:px-24">
              <img
                src={filteredImages[currentIndex]?.src}
                alt={filteredImages[currentIndex]?.alt || "صورة من المعرض"}
                className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
              />
            </div>

            {/* Next Button (Left side for RTL) */}
            {filteredImages.length > 1 && (
              <button
                onClick={nextImage}
                className="fixed left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 p-3 rounded-full transition-all z-50"
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
            )}

            {/* Thumbnails (Optional) */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] p-2">
              {filteredImages.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentIndex === idx
                      ? "border-[#DCB56D] scale-110"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt || "thumbnail"}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryTabsSection;
