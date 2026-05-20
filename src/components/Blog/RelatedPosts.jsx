"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "./BlogCard";
import "swiper/css";

const breakpoints = {
  0: {
    slidesPerView: 1.08,
    spaceBetween: 14,
  },
  480: {
    slidesPerView: 1.6,
    spaceBetween: 16,
  },
  640: {
    slidesPerView: 2.1,
    spaceBetween: 18,
  },
  768: {
    slidesPerView: 2.6,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 3.2,
    spaceBetween: 22,
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
};

export default function RelatedPosts({ posts }) {
  const swiperRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const hasMultiplePosts = posts && posts.length > 1;

  const updateSwiperState = useCallback((swiper) => {
    if (!swiper) return;

    if (swiper.isLocked) {
      setCanPrev(false);
      setCanNext(false);
      return;
    }

    setCanPrev(!swiper.isBeginning);
    setCanNext(!swiper.isEnd);
  }, []);

  const handleSwiperInit = useCallback(
    (swiper) => {
      swiperRef.current = swiper;
      updateSwiperState(swiper);
    },
    [updateSwiperState],
  );

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slideNext();
  }, []);

  if (!posts || posts.length === 0) return null;

  return (
    <section
      className="container mx-auto mt-16 w-full px-4 sm:mt-12 sm:px-6 lg:px-8"
      aria-labelledby="related-posts-heading"
    >
      <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="related-posts-heading"
            className="text-2xl font-bold uppercase tracking-wide text-soft-black font-oswald! sm:text-3xl"
          >
            You Might Also Like
          </h2>
          <p className="mt-1 text-sm text-secondary">
            More reads related to this topic
          </p>
        </div>

        {hasMultiplePosts && (
          <div className="flex items-center gap-3 self-start sm:self-auto">
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
          </div>
        )}
      </div>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="mb-8 h-[1.5px] w-full rounded-full bg-black/8 sm:mb-10"
      />

      <Swiper
        modules={[A11y]}
        breakpoints={breakpoints}
        watchOverflow={false}
        grabCursor={hasMultiplePosts}
        allowTouchMove={hasMultiplePosts}
        speed={550}
        resistanceRatio={0.85}
        observer={false}
        observeParents={false}
        updateOnWindowResize
        onSwiper={handleSwiperInit}
        onSlideChange={updateSwiperState}
        onResize={updateSwiperState}
        onBreakpoint={updateSwiperState}
        className="!pt-1 !pb-3"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id} style={{ height: "auto" }}>
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
    </section>
  );
}
