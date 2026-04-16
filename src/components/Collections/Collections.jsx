"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import CollectionCard, { cardVariant } from "./CollectionCard";
import { collectionsData } from "./collections";

// ─── Variants ────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// Desktop Grid
// ─────────────────────────────────────────────────────────────────────────────
function DesktopGrid({ items }) {
  const row1 = items.slice(0, 3);
  const row2 = items.slice(3, 5);

  return (
    <div className="space-y-4">
      {/* Row 1 — 3 cards */}
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

      {/* Row 2 — 2 cards centered, same width as row1 cards */}
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
            // Each card = exactly 1/3 of the grid width minus gaps
            // grid-cols-3 gap-4 → each col = (100% - 2*gap) / 3
            style={{ width: "calc((100% - 2 * 1rem) / 3)" }}
            // But parent is full width — so recalc relative to container
            // Better: use % based on known grid
            className="w-[calc(33.333%-11px)]"
          >
            <CollectionCard {...item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile Swiper
// ─────────────────────────────────────────────────────────────────────────────
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
        modules={[Pagination, FreeMode]}
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

// ─────────────────────────────────────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────────────────────────────────────
export default function Collections() {
  return (
    <>
      {/* ── Google Fonts — !important guarantee ───────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');


        .collections-eyebrow {
          font-family: 'Poppins', sans-serif !important;
        }
      `}</style>

      <section className=" w-full bg-[#f4f3f0] py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* ── Section Heading ─────────────────────────────────────────── */}
          <motion.div
            className="text-start md:text-center mb-10 md:mb-14"
            variants={headingVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Decorative top line */}
            <div className="flex items-center justify-start gap-3">
              <span
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-main sm:text-sm font-poppins!"
                // style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Browse by
              </span>
            </div>

            {/* Main heading — EB Garamond italic */}
            <h2
              className="text-[clamp(2rem,5vw,3.5rem)] text-start font-bold leading-tight text-soft-black font-oswald!"
              // style={{
              //   fontSize: "clamp(2rem, 4vw, 3.25rem)",
              // }}
            >
              Collections
            </h2>
          </motion.div>

          {/* ── Cards ───────────────────────────────────────────────────── */}
          <div className="hidden md:block">
            <DesktopGrid items={collectionsData} />
          </div>

          <div className="block md:hidden -mx-4">
            <MobileSwiper items={collectionsData} />
          </div>

          {/* ── CTA ─────────────────────────────────────────────────────── */}
          <motion.div
            className="flex justify-center mt-10 md:mt-14"
            variants={ctaVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href="/catalog"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-soft-black/20 bg-white px-8 py-3 text-sm font-semibold tracking-wide text-soft-black transition-all duration-300 hover:border-main hover:text-main hover:shadow-md"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span
                className="absolute inset-0 origin-left scale-x-0 rounded-full bg-main/5 transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <span className="relative z-10">View All Products</span>
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
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
