"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://rdspharma.cloud";

function resolveMediaSrc(src) {
  if (!src) return "";

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  if (src.startsWith("/cdn/shop/")) {
    return `https://www.rdspharma.online${src}`;
  }

  if (src.startsWith("uploads/") || src.startsWith("/uploads/")) {
    const cleanPath = src.startsWith("/") ? src : `/${src}`;
    return `${IMAGE_BASE_URL}${cleanPath}`;
  }

  return src;
}

function PlayIcon({ className = "h-6 w-6 text-white" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8.5 6.75c0-1.07 1.154-1.744 2.088-1.219l7.1 4c.95.535.95 1.903 0 2.438l-7.1 4A1.4 1.4 0 0 1 8.5 14.75v-8Z" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function EmptyGallery() {
  return (
    <div className="flex aspect-[4/5] items-center justify-center rounded-3xl border border-dashed border-black/10 bg-[#f7f7f4] text-center">
      <div className="px-6">
        <p className="text-sm font-medium text-soft-black">No product media</p>
        <p className="mt-2 text-sm text-secondary">
          Images and videos will appear here.
        </p>
      </div>
    </div>
  );
}

function MainSlide({ item, index, isPrimary, productTitle }) {
  const resolvedSrc = resolveMediaSrc(item.src);
  const resolvedPoster = item.poster ? resolveMediaSrc(item.poster) : undefined;

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#f7f7f4]">
      <span className="absolute bottom-4 right-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-soft-black shadow-sm backdrop-blur-sm">
        {String(index + 1).padStart(2, "0")}
      </span>

      {item.type === "video" ? (
        <video
          className="h-full! w-full! object-contain"
          controls
          playsInline
          preload={isPrimary ? "metadata" : "none"}
          poster={resolvedPoster}
          aria-label={item.alt || productTitle || "Product video"}
        >
          <source src={resolvedSrc} />
        </video>
      ) : (
        <div className="absolute inset-6 sm:inset-8">
          <Image
            src={resolvedSrc}
            alt={item.alt || productTitle || "Product image"}
            fill
            priority={isPrimary}
            fetchPriority={isPrimary ? "high" : "auto"}
            loading={isPrimary ? "eager" : "lazy"}
            sizes="(min-width: 1280px) 680px, (min-width: 1024px) 52vw, 100vw"
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}

function ThumbSlide({ item, active, productTitle }) {
  const resolvedSrc = resolveMediaSrc(item.src);
  const resolvedPoster = item.poster ? resolveMediaSrc(item.poster) : null;

  return (
    <div
      className={`relative aspect-square cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
        active
          ? "border-main shadow-[0_0_0_3px_rgba(104,188,82,0.15)]"
          : "border-transparent hover:border-main/30"
      }`}
    >
      {item.type === "video" ? (
        <>
          {resolvedPoster ? (
            <Image
              src={resolvedPoster}
              alt={item.alt || productTitle || "Video thumbnail"}
              fill
              loading="lazy"
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-[#1a1a1a]" />
          )}
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
              <PlayIcon className="h-5 w-5 text-white" />
            </div>
          </div>
        </>
      ) : (
        <Image
          src={resolvedSrc}
          alt={item.alt || productTitle || "Thumbnail"}
          fill
          loading="lazy"
          sizes="80px"
          className="object-cover"
        />
      )}
    </div>
  );
}

export default function ProductGallery({ media, productTitle }) {
  const items = Array.isArray(media) && media.length > 0 ? media : [];
  const thumbsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const primaryIndex = useMemo(() => {
    const idx = items.findIndex((m) => m.isPrimary === true);
    return idx >= 0 ? idx : 0;
  }, [items]);

  useEffect(() => {
    setActiveIndex(primaryIndex);
  }, [primaryIndex]);

  const goTo = useCallback(
    (index) => {
      if (!items.length) return;
      const next = Math.max(0, Math.min(items.length - 1, index));
      setActiveIndex(next);
    },
    [items.length]
  );

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(items.length - 1, prev + 1));
  }, [items.length]);

  useEffect(() => {
    const activeThumb = thumbsRef.current?.querySelector(
      `[data-thumb-index="${activeIndex}"]`
    );

    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    if (items.length <= 1) return;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length, goPrev, goNext]);

  useEffect(() => {
    const videos = document.querySelectorAll("[data-product-gallery] video");
    videos.forEach((video, idx) => {
      if (idx !== activeIndex) {
        video.pause?.();
      }
    });
  }, [activeIndex]);

  if (items.length === 0) {
    return (
      <section className="overflow-hidden rounded-[32px] border border-black/5 bg-white p-4 shadow-[0_20px_60px_rgba(17,24,39,0.05)] sm:p-5">
        <EmptyGallery />
      </section>
    );
  }

  return (
    <section
      data-product-gallery
      className="overflow-hidden rounded-[32px] border border-black/5 bg-white p-4 shadow-[0_20px_60px_rgba(17,24,39,0.05)] sm:p-5"
      aria-label="Product media gallery"
    >
      <div className="relative overflow-hidden rounded-3xl">
        <MainSlide
          item={items[activeIndex]}
          index={activeIndex}
          isPrimary={activeIndex === primaryIndex}
          productTitle={productTitle}
        />

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              className="absolute left-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/8 bg-white/90 text-soft-black shadow-sm backdrop-blur-sm transition hover:border-main hover:text-main disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Previous media"
            >
              <ChevronLeftIcon />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === items.length - 1}
              className="absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/8 bg-white/90 text-soft-black shadow-sm backdrop-blur-sm transition hover:border-main hover:text-main disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Next media"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div
          ref={thumbsRef}
          className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:gap-3"
        >
          {items.map((item, index) => (
            <button
              key={`thumb-${item.role || item.type}-${index}`}
              type="button"
              data-thumb-index={index}
              onClick={() => goTo(index)}
              className="w-[72px] shrink-0 sm:w-20"
              aria-label={`Show media ${index + 1}`}
              aria-current={index === activeIndex}
            >
              <ThumbSlide
                item={item}
                active={index === activeIndex}
                productTitle={productTitle}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}