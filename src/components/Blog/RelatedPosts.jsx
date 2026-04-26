"use client";

import { motion } from "framer-motion";
import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard, { blogCardVariant } from "./BlogCard";
import "swiper/css";
import "swiper/css/pagination";

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const headingVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const dividerVariant = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function getSlidesPerView(postsLength, desired) {
  return Math.min(postsLength, desired);
}

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) return null;

  const breakpoints = {
    0: {
      slidesPerView: getSlidesPerView(posts.length, 1.08),
      spaceBetween: 14,
    },
    480: {
      slidesPerView: getSlidesPerView(posts.length, 1.16),
      spaceBetween: 16,
    },
    640: {
      slidesPerView: getSlidesPerView(posts.length, 1.45),
      spaceBetween: 18,
    },
    768: {
      slidesPerView: getSlidesPerView(posts.length, 2),
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: getSlidesPerView(posts.length, 2.35),
      spaceBetween: 22,
    },
    1280: {
      slidesPerView: getSlidesPerView(posts.length, 3),
      spaceBetween: 24,
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="mx-auto mt-16 w-full container px-4 sm:mt-20 sm:px-6 lg:mt-24 lg:px-8"
      aria-labelledby="related-posts-heading"
    >
      <div className="mb-10 sm:mb-12">
        <motion.p
          variants={headingVariant}
          className="font-oswald! text-[11px] uppercase tracking-[0.28em] text-main"
        >
          Continue reading
        </motion.p>

        <div className="mt-3 flex items-end justify-between gap-6">
          <motion.h2
            id="related-posts-heading"
            variants={headingVariant}
            className="font-garamond! text-[2rem] leading-[1.05] tracking-[-0.02em] text-soft-black sm:text-[2.6rem] lg:text-[3.2rem]"
          >
            You might also like
          </motion.h2>
        </div>

        <motion.div
          variants={dividerVariant}
          style={{ transformOrigin: "left" }}
          className="mt-5 h-[1.5px] w-full rounded-full bg-black/8"
        />
      </div>

      <motion.div variants={containerVariant}>
        <Swiper
          modules={[A11y, Pagination]}
          breakpoints={breakpoints}
          watchOverflow
          grabCursor={posts.length > 1}
          allowTouchMove={posts.length > 1}
          className="!pb-4 !pt-1"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id} className="!h-auto">
              <div className="h-full px-[1px] pb-3">
                <BlogCard
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  category={post.category}
                  image={post.image}
                  srcSet={post.srcSet}
                  href={post.href}
                  slug={post.slug}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </motion.section>
  );
}
