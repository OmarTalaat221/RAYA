"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../FeaturedProducts/ProductCard";
import { getRandomProducts } from "../../services/products.service";
import { adaptRelatedProducts } from "./related-products.adapter";

import "swiper/css";

const MAX_RELATED_PRODUCTS = 8;

function clampSlides(itemsLength, desired) {
  if (!itemsLength || itemsLength < 1) return desired;
  return Math.min(itemsLength, desired);
}

export default function RelatedProducts({ currentProductId }) {
  const t = useTranslations("productDetails.related");
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);

  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const hasMultipleItems = products.length > 1;

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
      {
        threshold: 0.08,
        rootMargin: "300px 0px",
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [hasLoadedOnce]);

  useEffect(() => {
    if (!hasLoadedOnce) return;

    let active = true;

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const data = await getRandomProducts();

        if (!active) return;

        const adapted = adaptRelatedProducts(data, currentProductId).slice(
          0,
          MAX_RELATED_PRODUCTS,
        );

        setProducts(adapted);
      } catch (err) {
        if (!active) return;
        setError(err?.message || t("failedToLoad"));
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, [hasLoadedOnce, currentProductId, t]);

  const breakpoints = useMemo(
    () => ({
      0: {
        slidesPerView: clampSlides(products.length, 1.25),
        spaceBetween: 14,
      },
      480: {
        slidesPerView: clampSlides(products.length, 1.6),
        spaceBetween: 16,
      },
      640: {
        slidesPerView: clampSlides(products.length, 2.1),
        spaceBetween: 18,
      },
      768: {
        slidesPerView: clampSlides(products.length, 2.6),
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: clampSlides(products.length, 3.2),
        spaceBetween: 22,
      },
      1280: {
        slidesPerView: clampSlides(products.length, 4),
        spaceBetween: 24,
      },
    }),
    [products.length],
  );

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

  return (
    <section
      ref={sectionRef}
      className="container mx-auto mt-16 w-full px-4 sm:mt-12 sm:px-6 lg:px-8"
      aria-labelledby="related-products-heading"
    >
      <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="related-products-heading"
            className="text-2xl font-bold uppercase tracking-wide text-soft-black font-oswald! sm:text-3xl"
          >
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-secondary">
            {t("subtitle")}
          </p>
        </div>

        {hasMultipleItems && (
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-soft-black transition-colors duration-200 hover:border-main/30 hover:text-main disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={t("previous")}
            >
              <ArrowLeft size={16} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-soft-black transition-colors duration-200 hover:border-main/30 hover:text-main disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={t("next")}
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

      {error && !loading && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && products.length === 0 && hasLoadedOnce && (
        <p className="text-sm text-secondary">
          No related products available right now.
        </p>
      )}

      {!loading && products.length > 0 && (
        <Swiper
          key={`related-${products.length}`}
          modules={[A11y]}
          breakpoints={breakpoints}
          watchOverflow
          grabCursor={products.length > 1}
          allowTouchMove={products.length > 1}
          speed={550}
          resistanceRatio={0.85}
          preloadImages={false}
          lazyPreloadPrevNext={1}
          observer={false}
          observeParents={false}
          updateOnWindowResize
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
                discountPercentage={product.discountPercentage} /* ← أضف ده */
                inCart={product.inCart}
                priority={idx === 0}
                canHover
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
