"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import BottomBg from "../../sections/Common/BottomBg/BottomBg";

const AUTOPLAY_DELAY = 5000;

export default function HeroSlider({ banners = [] }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const slides = Array.isArray(banners) ? banners : [];
  const total = slides.length;

  const currentRef = useRef(0);
  const isPausedRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (current >= total && total > 0) {
      setCurrent(0);
      currentRef.current = 0;
    }
  }, [total, current]);

  useEffect(() => {
    const measure = () => {
      const header = document.querySelector("header");
      if (header) setHeaderHeight(header.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  const goTo = useCallback(
    (index) => {
      if (total === 0) return;
      const next = ((index % total) + total) % total;
      currentRef.current = next;
      setCurrent(next);
    },
    [total]
  );

  const goPrev = useCallback(() => goTo(currentRef.current - 1), [goTo]);
  const goNext = useCallback(() => goTo(currentRef.current + 1), [goTo]);

  useEffect(() => {
    if (total < 2) return;

    timerRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        goTo(currentRef.current + 1);
      }
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timerRef.current);
  }, [total, goTo]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev, goNext]);

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

  if (total === 0) {
    return (
      <section
        className="relative w-full bg-[#1a1a1a] overflow-hidden"
        style={{ minHeight: "200px" }}
        aria-label="Hero Slider"
      >
        <BottomBg />
      </section>
    );
  }

  const activeSlide = slides[current] || slides[0];

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
        {slides.map((slide, index) => (
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
              src={slide.image}
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
          {total > 1 && (
            <>
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
            </>
          )}

          {/* Shop Now */}
          <div className="absolute right-3 bottom-4 xsm:right-auto xsm:left-1/2 xsm:-translate-x-1/2 xsm:bottom-14 sm:bottom-16 md:bottom-20">
            <Link
              href={activeSlide.href}
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
          {total > 1 && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-3 sm:bottom-4 md:bottom-5">
              <div className="hidden sm:flex items-center gap-2 sm:gap-3 bg-black/25 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
                <div
                  className="flex items-center gap-1 sm:gap-1.5"
                  role="tablist"
                >
                  {slides.map((_, index) => (
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
          )}
        </div>
      </div>

      <style>{`
        @keyframes progressBar { from { width: 0%; } to { width: 100%; } }
      `}</style>

      <BottomBg />
    </section>
  );
}
