"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RefreshCw } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import CollectionCard, { cardVariant } from "./CollectionCard";
import { getAllCategories } from "../../services/categories.service";
import { adaptCategoriesToCollections } from "./category.adapter";

// ─── Background Pattern ───────────────────────────────────────────────────────
const AboutBackgroundPattern = React.memo(function AboutBackgroundPattern() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none absolute inset-0 z-0 select-none overflow-hidden
        opacity-[0.30]
      "
    >
      <motion.div
        className="relative h-full w-full scale-[1.18] sm:scale-[1.12] md:scale-[1.06] lg:scale-[1.02]"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -8, 0, 8, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        <Image
          src="/assets/image/pattern-1.png"
          alt=""
          fill
          quality={70}
          loading="lazy"
          sizes="(max-width: 639px) 140vw, (max-width: 767px) 120vw, 100vw"
          className="object-contain object-center md:object-cover md:object-center"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-[linear-gradient(180deg,rgba(244,243,240,0.98)_0%,rgba(244,243,240,0.4)_20%,rgba(244,243,240,0.18)_58%,rgba(244,243,240,0.98)_100%)]
        "
      />
    </div>
  );
});

// ─── Static "All" card — always first ────────────────────────────────────────
const ALL_COLLECTION_CARD = {
  id: "__all__",
  title: "Collection",
  slug: "all",
  href: "/collections/all",
  image:
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=750",
  srcSet: [
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=165 165w",
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=330 330w",
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=535 535w",
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=750 750w",
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=1000 1000w",
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=1500 1500w",
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=3000 3000w",
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787 5000w",
  ].join(", "),
};

// ─── Animation Variants ──────────────────────────────────────────────────────
const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const headingVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const ctaVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.45 },
  },
};

// ─── Desktop Grid ────────────────────────────────────────────────────────────
function DesktopGrid({ items }) {
  const row1 = items.slice(0, 3);
  const row2 = items.slice(3, 5);

  return (
    <div className="space-y-4">
      <motion.div
        className="grid grid-cols-3 gap-4"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {row1.map((item) => (
          <CollectionCard key={item.id} {...item} />
        ))}
      </motion.div>

      {row2.length > 0 && (
        <motion.div
          className="flex justify-center gap-4"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {row2.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariant}
              className="w-[calc(33.333%-11px)]"
            >
              <CollectionCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ─── Inline Skeletons ────────────────────────────────────────────────────────
function DesktopSkeletonInline() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[5/3] animate-pulse rounded-2xl bg-white/60"
          />
        ))}
      </div>
      <div className="flex justify-center gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[5/3] w-[calc(33.333%-11px)] animate-pulse rounded-2xl bg-white/60"
          />
        ))}
      </div>
    </div>
  );
}

function MobileSkeletonInline() {
  return (
    <div className="flex gap-3 overflow-hidden px-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[5/3] w-[85vw] max-w-[320px] shrink-0 animate-pulse rounded-2xl bg-white/60"
        />
      ))}
    </div>
  );
}

// ─── Mobile Swiper ───────────────────────────────────────────────────────────
const swiperStyles = `
  .collections-swiper .swiper-pagination-bullets {
    position: relative !important;
    bottom: auto !important;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 16px;
  }
  .collections-swiper .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: #d1d5db;
    opacity: 1;
    margin: 0 !important;
    transition: width 0.3s ease, background 0.3s ease;
  }
  .collections-swiper .swiper-pagination-bullet-active {
    background: #68bc52;
    width: 20px;
    border-radius: 3px;
  }
`;

function MobileSwiper({ items }) {
  return (
    <>
      <style>{swiperStyles}</style>
      <Swiper
        modules={[Pagination, FreeMode, Autoplay]}
        className="collections-swiper !overflow-visible"
        breakpoints={{
          0: { slidesPerView: 1.15, spaceBetween: 12 },
          480: { slidesPerView: 1.6, spaceBetween: 14 },
          600: { slidesPerView: 2.2, spaceBetween: 16 },
        }}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        freeMode={{ enabled: true, sticky: false, momentumRatio: 0.55 }}
        pagination={{ clickable: true, type: "bullets" }}
        grabCursor
        observer
        observeParents
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id} className="!h-auto pb-8">
            <motion.div
              className="h-full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.06,
              }}
            >
              <CollectionCard {...item} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────
export default function Collections() {
  const [apiItems, setApiItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollections = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllCategories({ page: 1, limit: 100 });
      const adapted = adaptCategoriesToCollections(data?.items ?? [], "en");
      setApiItems(adapted);
    } catch (err) {
      console.error("[Collections] Failed to fetch categories:", err);
      setError(err.response?.data?.message || "Failed to load collections.");
      setApiItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const items = [ALL_COLLECTION_CARD, ...apiItems];
  const displayItems = items.slice(0, 5);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        .collections-eyebrow {
          font-family: 'Poppins', sans-serif !important;
        }
      `}</style>

      <section className="relative w-full overflow-hidden bg-[#f4f3f0] py-8 sm:py-10 md:py-12 lg:py-16">
        <AboutBackgroundPattern />

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          {/* ── Section Heading ── */}
          <motion.div
            className="mb-10 text-start md:mb-14 md:text-center"
            variants={headingVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="flex items-center justify-start gap-3">
              <span className="font-garamond! mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-main sm:text-sm">
                Browse by
              </span>
            </div>
            <h2 className="font-oswald! text-start text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-soft-black">
              Collections
            </h2>
          </motion.div>

          {/* ── Content ── */}
          {isLoading ? (
            <>
              <div className="hidden md:block">
                <DesktopSkeletonInline />
              </div>
              <div className="block md:hidden">
                <MobileSkeletonInline />
              </div>
            </>
          ) : error ? (
            <div className="flex flex-col items-center py-16">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="font-poppins! mb-2 text-base font-medium text-soft-black">
                Something went wrong
              </p>
              <p className="font-poppins! mb-6 max-w-sm text-center text-sm text-secondary">
                {error}
              </p>
              <button
                onClick={fetchCollections}
                className="font-poppins! inline-flex items-center gap-2 rounded-xl
                           bg-main px-6 py-2.5 text-[13px] font-semibold text-white
                           transition-all duration-200 hover:bg-[#5aaa44]
                           active:scale-[0.97] focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-main/40"
              >
                <RefreshCw size={14} strokeWidth={2} />
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="hidden md:block">
                <DesktopGrid items={displayItems} />
              </div>
              <div className="-mx-4 block md:hidden">
                <MobileSwiper items={displayItems} />
              </div>
            </>
          )}

          {/* ── CTA ── */}
          {!isLoading && !error && (
            <motion.div
              className="mt-10 flex justify-center md:mt-14"
              variants={ctaVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link
                href="/collections"
                className="group relative inline-flex items-center gap-2 overflow-hidden
                           rounded-full border border-soft-black/20 bg-white px-8 py-3
                           text-sm font-semibold tracking-wide text-soft-black
                           transition-all duration-300 hover:border-main hover:text-main
                           hover:shadow-md"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span
                  className="absolute inset-0 origin-left scale-x-0 rounded-full
                             bg-main/5 transition-transform duration-500
                             group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <span className="relative z-10">View All Collections</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative z-10 transition-transform duration-300
                             group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
