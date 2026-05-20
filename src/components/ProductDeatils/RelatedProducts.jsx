"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../FeaturedProducts/ProductCard";
import { getRandomProducts } from "../../services/products.service";
import { adaptRelatedProducts } from "./related-products.adapter";

import "swiper/css";

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

function clampSlides(itemsLength, desired) {
  if (!itemsLength || itemsLength < 1) return desired;
  return Math.min(itemsLength, desired);
}

export default function RelatedProducts({ currentProductId }) {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);

  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const hasMultipleItems = products.length > 1;

  /* ── Lazy load on scroll ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasLoadedOnce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasLoadedOnce(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasLoadedOnce]);

  /* ── Fetch when section enters viewport ── */
  useEffect(() => {
    if (!hasLoadedOnce) return;

    let active = true;
    setLoading(true);
    setError("");

    getRandomProducts()
      .then((data) => {
        if (!active) return;
        const adapted = adaptRelatedProducts(data, currentProductId);
        setProducts(adapted);
      })
      .catch((err) => {
        if (!active) return;
        setError(err?.message || "Failed to load related products.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [hasLoadedOnce, currentProductId]);

  const breakpoints = useMemo(
    () => ({
      0: {
        slidesPerView: clampSlides(products.length, 1.4),
        spaceBetween: 14,
      },
      480: {
        slidesPerView: clampSlides(products.length, 2),
        spaceBetween: 16,
      },
      640: {
        slidesPerView: clampSlides(products.length, 2.4),
        spaceBetween: 18,
      },
      768: {
        slidesPerView: clampSlides(products.length, 3),
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: clampSlides(products.length, 3.5),
        spaceBetween: 22,
      },
      1280: {
        slidesPerView: clampSlides(products.length, 4),
        spaceBetween: 24,
      },
    }),
    [products.length]
  );

  const updateSwiperState = useCallback((swiper) => {
    if (!swiper) return;
    if (swiper.isLocked) {
      setCanPrev(false);
      setCanNext(false);
    } else {
      setCanPrev(!swiper.isBeginning);
      setCanNext(!swiper.isEnd);
    }
  }, []);

  const handleSwiperInit = useCallback(
    (swiper) => {
      swiperRef.current = swiper;
      updateSwiperState(swiper);
    },
    [updateSwiperState]
  );

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slideNext();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="container mx-auto mt-16 w-full px-4 sm:mt-12 sm:px-6 lg:px-8"
      aria-labelledby="related-products-heading"
    >
      {/* ── Header ── */}
      <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="related-products-heading"
            className="text-2xl font-bold uppercase tracking-wide text-soft-black font-oswald! sm:text-3xl"
          >
            You May Also Like
          </h2>
          <p className="mt-1 text-sm text-secondary">
            Hand-picked picks based on this product
          </p>
        </div>

        {hasMultipleItems && (
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-soft-black transition-colors duration-200 hover:border-main/30 hover:text-main disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous related product"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-soft-black transition-colors duration-200 hover:border-main/30 hover:text-main disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next related product"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* ── Divider (self-animating) ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="mb-8 h-[1.5px] w-full rounded-full bg-black/8 sm:mb-10"
      />

      {/* ── Loading skeleton ── */}
      {loading && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-[420px] animate-pulse rounded-[22px] bg-black/5"
            />
          ))}
        </div>
      )}

      {/* ── Error ── */}
      {error && !loading && <p className="text-sm text-red-500">{error}</p>}

      {/* ── Empty ── */}
      {!loading && !error && products.length === 0 && hasLoadedOnce && (
        <p className="text-sm text-secondary">
          No related products available right now.
        </p>
      )}

      {/* ── Slider (no motion wrapper) ── */}
      {!loading && products.length > 0 && (
        <Swiper
          key={`related-${products.length}`}
          modules={[A11y]}
          breakpoints={breakpoints}
          watchOverflow
          grabCursor={products.length > 1}
          allowTouchMove={products.length > 1}
          speed={650}
          onSwiper={handleSwiperInit}
          onSlideChange={updateSwiperState}
          onResize={updateSwiperState}
          onBreakpoint={updateSwiperState}
          className="!pt-1 !pb-3"
        >
          {products.map((product, idx) => (
            <SwiperSlide key={product.id} style={{ height: "auto" }}>
              <ProductCard
                id={product.id}
                title={product.title}
                href={product.href}
                frontImage={product.frontImage}
                backImage={product.backImage}
                oldPrice={product.oldPrice}
                newPrice={product.newPrice}
                currency={product.currency}
                isOnSale={product.isOnSale}
                inCart={product.inCart}
                priority={idx < 2}
                canHover
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}