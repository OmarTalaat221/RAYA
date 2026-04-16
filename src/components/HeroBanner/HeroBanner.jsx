// components/HeroSlider/HeroSlider.jsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const SLIDES = [
  {
    id: 1,
    href: "/denefis",
    alt: "Denefis Banner",
    src: "https://www.rdspharma.online/cdn/shop/files/Denefis_Banner_Website.png?v=1774427049&width=1500",
    srcset:
      "https://www.rdspharma.online/cdn/shop/files/Denefis_Banner_Website.png?v=1774427049&width=375 375w, https://www.rdspharma.online/cdn/shop/files/Denefis_Banner_Website.png?v=1774427049&width=550 550w, https://www.rdspharma.online/cdn/shop/files/Denefis_Banner_Website.png?v=1774427049&width=750 750w, https://www.rdspharma.online/cdn/shop/files/Denefis_Banner_Website.png?v=1774427049&width=1100 1100w, https://www.rdspharma.online/cdn/shop/files/Denefis_Banner_Website.png?v=1774427049&width=1500 1500w, https://www.rdspharma.online/cdn/shop/files/Denefis_Banner_Website.png?v=1774427049&width=1780 1780w, https://www.rdspharma.online/cdn/shop/files/Denefis_Banner_Website.png?v=1774427049&width=2000 2000w, https://www.rdspharma.online/cdn/shop/files/Denefis_Banner_Website.png?v=1774427049&width=3000 3000w, https://www.rdspharma.online/cdn/shop/files/Denefis_Banner_Website.png?v=1774427049&width=3840 3840w",
  },
  {
    id: 2,
    href: "/skinage",
    alt: "Skinage Collagen Banner",
    src: "https://www.rdspharma.online/cdn/shop/files/Skinage_product_Collagen_web_5_copy.jpg?v=1724410645&width=1500",
    srcset:
      "https://www.rdspharma.online/cdn/shop/files/Skinage_product_Collagen_web_5_copy.jpg?v=1724410645&width=375 375w, https://www.rdspharma.online/cdn/shop/files/Skinage_product_Collagen_web_5_copy.jpg?v=1724410645&width=550 550w, https://www.rdspharma.online/cdn/shop/files/Skinage_product_Collagen_web_5_copy.jpg?v=1724410645&width=750 750w, https://www.rdspharma.online/cdn/shop/files/Skinage_product_Collagen_web_5_copy.jpg?v=1724410645&width=1100 1100w, https://www.rdspharma.online/cdn/shop/files/Skinage_product_Collagen_web_5_copy.jpg?v=1724410645&width=1500 1500w, https://www.rdspharma.online/cdn/shop/files/Skinage_product_Collagen_web_5_copy.jpg?v=1724410645&width=1780 1780w, https://www.rdspharma.online/cdn/shop/files/Skinage_product_Collagen_web_5_copy.jpg?v=1724410645&width=2000 2000w, https://www.rdspharma.online/cdn/shop/files/Skinage_product_Collagen_web_5_copy.jpg?v=1724410645&width=3000 3000w, https://www.rdspharma.online/cdn/shop/files/Skinage_product_Collagen_web_5_copy.jpg?v=1724410645&width=3840 3840w",
  },
  {
    id: 3,
    href: "/catalog",
    alt: "Beauty Banner",
    src: "https://www.rdspharma.online/cdn/shop/files/Beauty_banner.jpg?v=1739260743&width=1500",
    srcset:
      "https://www.rdspharma.online/cdn/shop/files/Beauty_banner.jpg?v=1739260743&width=375 375w, https://www.rdspharma.online/cdn/shop/files/Beauty_banner.jpg?v=1739260743&width=550 550w, https://www.rdspharma.online/cdn/shop/files/Beauty_banner.jpg?v=1739260743&width=750 750w, https://www.rdspharma.online/cdn/shop/files/Beauty_banner.jpg?v=1739260743&width=1100 1100w, https://www.rdspharma.online/cdn/shop/files/Beauty_banner.jpg?v=1774427049&width=1500 1500w, https://www.rdspharma.online/cdn/shop/files/Beauty_banner.jpg?v=1739260743&width=1780 1780w, https://www.rdspharma.online/cdn/shop/files/Beauty_banner.jpg?v=1739260743&width=2000 2000w, https://www.rdspharma.online/cdn/shop/files/Beauty_banner.jpg?v=1739260743&width=3000 3000w, https://www.rdspharma.online/cdn/shop/files/Beauty_banner.jpg?v=1739260743&width=3840 3840w",
  },
  {
    id: 4,
    href: "/catalog",
    alt: "OMNIFLEX Products Banner",
    src: "https://www.rdspharma.online/cdn/shop/files/OMNIFLEX_Products.jpg?v=1724410164&width=1500",
    srcset:
      "https://www.rdspharma.online/cdn/shop/files/OMNIFLEX_Products.jpg?v=1724410164&width=375 375w, https://www.rdspharma.online/cdn/shop/files/OMNIFLEX_Products.jpg?v=1724410164&width=550 550w, https://www.rdspharma.online/cdn/shop/files/OMNIFLEX_Products.jpg?v=1724410164&width=750 750w, https://www.rdspharma.online/cdn/shop/files/OMNIFLEX_Products.jpg?v=1724410164&width=1100 1100w, https://www.rdspharma.online/cdn/shop/files/OMNIFLEX_Products.jpg?v=1724410164&width=1500 1500w, https://www.rdspharma.online/cdn/shop/files/OMNIFLEX_Products.jpg?v=1724410164&width=1780 1780w, https://www.rdspharma.online/cdn/shop/files/OMNIFLEX_Products.jpg?v=1724410164&width=2000 2000w, https://www.rdspharma.online/cdn/shop/files/OMNIFLEX_Products.jpg?v=1724410164&width=3000 3000w, https://www.rdspharma.online/cdn/shop/files/OMNIFLEX_Products.jpg?v=1724410164&width=3840 3840w",
  },
  {
    id: 5,
    href: "/catalog",
    alt: "Active Body Banner",
    src: "https://www.rdspharma.online/cdn/shop/files/Active_Body_Banner.jpg?v=1739260746&width=1500",
    srcset:
      "https://www.rdspharma.online/cdn/shop/files/Active_Body_Banner.jpg?v=1739260746&width=375 375w, https://www.rdspharma.online/cdn/shop/files/Active_Body_Banner.jpg?v=1739260746&width=550 550w, https://www.rdspharma.online/cdn/shop/files/Active_Body_Banner.jpg?v=1739260746&width=750 750w, https://www.rdspharma.online/cdn/shop/files/Active_Body_Banner.jpg?v=1739260746&width=1100 1100w, https://www.rdspharma.online/cdn/shop/files/Active_Body_Banner.jpg?v=1739260746&width=1500 1500w, https://www.rdspharma.online/cdn/shop/files/Active_Body_Banner.jpg?v=1739260746&width=1780 1780w, https://www.rdspharma.online/cdn/shop/files/Active_Body_Banner.jpg?v=1739260746&width=2000 2000w, https://www.rdspharma.online/cdn/shop/files/Active_Body_Banner.jpg?v=1739260746&width=3000 3000w, https://www.rdspharma.online/cdn/shop/files/Active_Body_Banner.jpg?v=1739260746&width=3840 3840w",
  },
];

const AUTOPLAY_DELAY = 5000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const total = SLIDES.length;

  // ✅ الحل الأساسي: useRef للـ current عشان الـ interval يشوف القيمة الجديدة دايماً
  const currentRef = useRef(0);
  const isPausedRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // قياس الهيدر
  useEffect(() => {
    const measure = () => {
      const header = document.querySelector("header");
      if (header) setHeaderHeight(header.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ✅ goTo بتقرأ من currentRef مش من closure
  const goTo = useCallback(
    (index) => {
      const next = ((index % total) + total) % total;
      currentRef.current = next;
      setCurrent(next);
    },
    [total]
  );

  const goPrev = useCallback(() => goTo(currentRef.current - 1), [goTo]);
  const goNext = useCallback(() => goTo(currentRef.current + 1), [goTo]);

  // ✅ Autoplay — interval واحد بس طول عمر الكومبوننت
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        goTo(currentRef.current + 1);
      }
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ✅ empty deps — بيشتغل مرة واحدة بس

  // Keyboard
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev, goNext]);

  // Touch
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > diffY) {
      diffX > 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      className="relative w-full bg-[#1a1a1a] select-none overflow-hidden"
      style={{ maxHeight: `calc(100vh - ${headerHeight}px)`, height: "100%" }}
      aria-label="Hero Slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            aria-hidden={index !== current}
            style={{
              position: index === current ? "relative" : "absolute",
              inset: 0,
              width: "100%",
              opacity: index === current ? 1 : 0,
              zIndex: index === current ? 10 : 0,
              transition: "opacity 0.6s ease-in-out",
              pointerEvents: index === current ? "auto" : "none",
            }}
          >
            <img
              src={slide.src}
              srcSet={slide.srcset}
              sizes="100vw"
              alt={slide.alt}
              draggable={false}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                objectFit: "unset",
                objectPosition: "center",
              }}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ height: "100%" }}
      >
        <div className="relative w-full h-full pointer-events-auto">
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="hidden sm:flex absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 items-center justify-center rounded-full bg-main/70 hover:bg-main backdrop-blur-sm border border-white/60 text-white shadow-sm hover:shadow-md transition-all"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>

          <button
            onClick={goNext}
            aria-label="Next slide"
            className="hidden sm:flex absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 items-center justify-center rounded-full bg-main/70 hover:bg-main backdrop-blur-sm border border-white/60 text-white shadow-sm hover:shadow-md transition-all"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>

          {/* Shop Now */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-14 sm:bottom-16 md:bottom-20">
            <Link
              href={SLIDES[current].href}
              className="group relative inline-flex items-center gap-2 bg-main text-white rounded-full px-5 py-2 sm:px-7 sm:py-3 text-xs sm:text-sm md:text-base font-semibold tracking-wide whitespace-nowrap overflow-hidden transition-all hover:shadow-xl hover:shadow-main/30 hover:scale-105"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                aria-hidden="true"
              />
              <span className="relative z-10">Shop Now</span>
              <ArrowRight
                size={14}
                strokeWidth={2.5}
                className="relative z-10 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Dots + Counter */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 sm:bottom-4 md:bottom-5">
            <div className="hidden sm:flex items-center gap-2 sm:gap-3 bg-black/25 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
              <div
                className="flex items-center gap-1 sm:gap-1.5"
                role="tablist"
              >
                {SLIDES.map((_, index) => (
                  <button
                    key={index}
                    role="tab"
                    aria-selected={index === current}
                    onClick={() => goTo(index)}
                    className={`rounded-full transition-all ${
                      index === current
                        ? "w-5 sm:w-6 h-1 sm:h-1.5 bg-white"
                        : "w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
              <span className="w-px h-2.5 sm:h-3 bg-white/30" />
              <span className="text-white font-medium tabular-nums tracking-widest text-[10px] sm:text-xs">
                {String(current + 1).padStart(2, "0")}/
                {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Progress Bar — بتتـ reset مع كل current جديد */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/10"
        aria-hidden="true"
      >
        <div
          key={`progress-${current}`}
          className="h-full bg-main"
          style={{
            animation: isPaused
              ? "none"
              : `progressBar ${AUTOPLAY_DELAY}ms linear forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes progressBar { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </section>
  );
}
