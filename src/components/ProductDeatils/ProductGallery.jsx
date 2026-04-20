"use client";

import { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Keyboard } from "swiper/modules";
import { getMediaRoleLabel } from "./utils";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

function resolveMediaSrc(src) {
  if (!src) {
    return "";
  }

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  if (src.startsWith("/cdn/shop/")) {
    return `https://www.rdspharma.online${src}`;
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
  const label = getMediaRoleLabel(item);
  const resolvedSrc = resolveMediaSrc(item.src);
  const resolvedPoster = item.poster ? resolveMediaSrc(item.poster) : undefined;

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#f7f7f4]">
      {/* <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-soft-black shadow-sm backdrop-blur-sm">
        {label}
      </span> */}

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
  const label = getMediaRoleLabel(item);
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
              sizes="(min-width: 640px) 80px, 72px"
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
          sizes="(min-width: 640px) 80px, 72px"
          className="object-cover"
        />
      )}

      {/* <span className="absolute left-1.5 top-1.5 z-10 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-soft-black shadow-sm">
        {label}
      </span> */}
    </div>
  );
}

export default function ProductGallery({ media, productTitle }) {
  const items = Array.isArray(media) && media.length > 0 ? media : [];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const primaryIndex = useMemo(() => {
    const idx = items.findIndex((m) => m.isPrimary === true);
    return idx >= 0 ? idx : 0;
  }, [items]);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.activeIndex);

    swiper.slides.forEach((slide, i) => {
      const video = slide.querySelector("video");

      if (video && i !== swiper.activeIndex) {
        video.pause();
      }
    });
  }, []);

  if (items.length === 0) {
    return (
      <section className="overflow-hidden rounded-[32px] border border-black/5 bg-white p-4 shadow-[0_20px_60px_rgba(17,24,39,0.05)] sm:p-5">
        <EmptyGallery />
      </section>
    );
  }

  return (
    <section
      className="overflow-hidden rounded-[32px] border border-black/5 bg-white p-4 shadow-[0_20px_60px_rgba(17,24,39,0.05)] sm:p-5"
      aria-label="Product media gallery"
    >
      <Swiper
        modules={[Keyboard, Thumbs]}
        initialSlide={primaryIndex}
        keyboard={{ enabled: true }}
        spaceBetween={16}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        onInit={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        onSlideChange={handleSlideChange}
        className="overflow-hidden rounded-3xl"
      >
        {items.map((item, index) => (
          <SwiperSlide key={`main-${item.role || item.type}-${index}`}>
            <MainSlide
              item={item}
              index={index}
              isPrimary={index === primaryIndex}
              productTitle={productTitle}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {items.length > 1 && (
        <div className="mt-4">
          <Swiper
            modules={[FreeMode, Thumbs]}
            onSwiper={setThumbsSwiper}
            watchSlidesProgress
            freeMode
            spaceBetween={10}
            slidesPerView="auto"
            className="!overflow-visible"
          >
            {items.map((item, index) => (
              <SwiperSlide
                key={`thumb-${item.role || item.type}-${index}`}
                className="!w-[72px] sm:!w-20"
              >
                <ThumbSlide
                  item={item}
                  active={index === activeIndex}
                  productTitle={productTitle}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}
