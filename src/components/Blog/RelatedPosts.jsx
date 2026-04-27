"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "./BlogCard";
import "swiper/css";

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

function formatCounter(value) {
  return String(value).padStart(2, "0");
}

export default function RelatedPosts({ posts }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(posts?.length > 1);

  const hasMultiplePosts = posts && posts.length > 1;

  const breakpoints = useMemo(
    () => ({
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
    }),
    [posts.length]
  );

  const updateSwiperState = useCallback((swiper) => {
    if (!swiper) return;

    setActiveIndex(swiper.realIndex || 0);
    setCanPrev(!swiper.isBeginning);
    setCanNext(!swiper.isEnd);
  }, []);

  const handleSwiperInit = useCallback(
    (swiper) => {
      swiperRef.current = swiper;
      updateSwiperState(swiper);
    },
    [updateSwiperState]
  );

  const handlePrev = useCallback(() => {
    if (!swiperRef.current || !hasMultiplePosts) return;
    swiperRef.current.slidePrev();
  }, [hasMultiplePosts]);

  const handleNext = useCallback(() => {
    if (!swiperRef.current || !hasMultiplePosts) return;
    swiperRef.current.slideNext();
  }, [hasMultiplePosts]);

  if (!posts || posts.length === 0) return null;

  const progress = ((activeIndex + 1) / posts.length) * 100;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="container mx-auto mt-16 w-full px-4 sm:mt-20 sm:px-6 lg:mt-24 lg:px-8"
      aria-labelledby="related-posts-heading"
    >
      <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <motion.p
            variants={headingVariant}
            className="font-oswald! text-[11px] uppercase tracking-[0.28em] text-main"
          >
            Continue reading
          </motion.p>

          <motion.h2
            id="related-posts-heading"
            variants={headingVariant}
            className="mt-3 font-garamond! text-[2rem] leading-[1.05] tracking-[-0.02em] text-soft-black sm:text-[2.6rem] lg:text-[3.2rem]"
          >
            You might also like
          </motion.h2>
        </div>

        {hasMultiplePosts ? (
          <motion.div
            variants={headingVariant}
            className="flex items-center gap-3 self-start sm:self-auto"
          >
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-soft-black transition-colors duration-200 hover:border-main/30 hover:text-main disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous related post"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-soft-black transition-colors duration-200 hover:border-main/30 hover:text-main disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next related post"
            >
              <ArrowRight size={16} />
            </button>
          </motion.div>
        ) : null}
      </div>

      <motion.div
        variants={dividerVariant}
        style={{ transformOrigin: "left" }}
        className="mb-8 h-[1.5px] w-full rounded-full bg-black/8 sm:mb-10"
      />

      <motion.div variants={containerVariant}>
        <Swiper
          modules={[A11y]}
          breakpoints={breakpoints}
          watchOverflow
          grabCursor={hasMultiplePosts}
          allowTouchMove={hasMultiplePosts}
          speed={650}
          onSwiper={handleSwiperInit}
          onSlideChange={updateSwiperState}
          onResize={updateSwiperState}
          onBreakpoint={updateSwiperState}
          className=" !pt-1"
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
