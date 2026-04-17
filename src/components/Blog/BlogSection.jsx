// components/Blog/BlogSection.jsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import BlogCard, { blogCardVariant } from "./BlogCard";
import { blogData } from "./blog";

// ─── Same variant names & values as Collections.jsx ──────────────────────────
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

// ─── Swiper styles — same pattern as collections-swiper ──────────────────────
const swiperStyles = `
  .blog-swiper .swiper-pagination-bullets {
    position: relative !important;
    bottom: auto !important;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 16px;
  }
  .blog-swiper .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: #d1d5db;
    opacity: 1;
    margin: 0 !important;
    transition: width 0.3s ease, background 0.3s ease;
  }
  .blog-swiper .swiper-pagination-bullet-active {
    background: #68bc52;
    width: 20px;
    border-radius: 3px;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Desktop Grid — 4 cols (blog cards are narrower than collection cards)
// ─────────────────────────────────────────────────────────────────────────────
function DesktopGrid({ items }) {
  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-3 gap-4"
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {items.map((post) => (
        <BlogCard key={post.id} {...post} />
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile Swiper — same config pattern as MobileSwiper in Collections
// ─────────────────────────────────────────────────────────────────────────────
function MobileSwiper({ items }) {
  return (
    <>
      <style>{swiperStyles}</style>
      <Swiper
        modules={[Pagination, FreeMode]}
        className="blog-swiper !overflow-visible"
        breakpoints={{
          0: { slidesPerView: 1.1, spaceBetween: 12 },
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
              <BlogCard {...item} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Section — identical shell to Collections.jsx
// ─────────────────────────────────────────────────────────────────────────────
export default function BlogSection() {
  return (
    <section className="w-full bg-[#f4f3f0] py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* ── Heading — same structure as Collections ──────────────────── */}
        <motion.div
          className="text-start md:text-center mb-10 md:mb-14"
          variants={headingVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Eyebrow — identical className pattern */}
          <div className="flex items-center justify-start gap-3">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-main sm:text-sm font-garamond!">
              From the Journal
            </span>
          </div>

          {/* Title — identical className pattern */}
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] text-start font-bold leading-tight text-soft-black font-oswald!">
            Latest Articles
          </h2>
        </motion.div>

        {/* ── Desktop grid ─────────────────────────────────────────────── */}
        <div className="hidden md:block">
          <DesktopGrid items={blogData.slice(0, 3)} />
        </div>

        {/* ── Mobile swiper ────────────────────────────────────────────── */}
        <div className="block md:hidden -mx-4">
          <MobileSwiper items={blogData.slice(0, 3)} />
        </div>

        {/* ── CTA — identical ghost button pattern ─────────────────────── */}
        <motion.div
          className="flex justify-center mt-10 md:mt-14"
          variants={ctaVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link
            href="/blogs"
            className={[
              "group relative inline-flex items-center gap-2",
              "overflow-hidden rounded-full",
              "border border-soft-black/20 bg-white",
              "px-8 py-3",
              "text-sm font-semibold tracking-wide text-soft-black font-poppins!",
              "transition-all duration-300",
              "hover:border-main hover:text-main hover:shadow-md",
            ].join(" ")}
          >
            {/* Sweep bg — same as Collections CTA */}
            <span
              className="absolute inset-0 origin-left scale-x-0 rounded-full bg-main/5 transition-transform duration-500 group-hover:scale-x-100"
              aria-hidden="true"
            />

            <span className="relative z-10">View All Articles</span>

            {/* Arrow — same SVG as Collections */}
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
  );
}
