"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import ProductCard from "./ProductCard";
import { PRODUCTS } from "./products";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function ProductsSlider() {
  return (
    <div className="relative">
      <style>{`
        .featured-swiper .swiper-pagination {
          position: relative;
          margin-top: 1.5rem;
          bottom: unset;
        }

        .featured-swiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #2d2d2d;
          opacity: 0.2;
          transition: all 0.3s ease;
          border-radius: 9999px;
        }

        .featured-swiper .swiper-pagination-bullet-active {
          width: 22px;
          background: #68bc52;
          opacity: 1;
          border-radius: 9999px;
        }

        .featured-swiper .swiper-wrapper {
          align-items: stretch;
        }

        .featured-swiper .swiper-slide {
          height: auto;
        }
      `}</style>

      <Swiper
        className="featured-swiper !overflow-visible"
        modules={[Pagination, A11y, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={700}
        loop={PRODUCTS?.filter((p) => p.isOnSale)?.slice(0, 8).length > 1}
        observer={true}
        observeParents={true}
        updateOnWindowResize={true}
        watchOverflow={true}
        grabCursor={true}
        spaceBetween={16}
        slidesPerView={1.15}
        breakpoints={{
          375: { slidesPerView: 1.2, spaceBetween: 16 },
          480: { slidesPerView: 1.45, spaceBetween: 16 },
          640: { slidesPerView: 2.1, spaceBetween: 18 },
          768: { slidesPerView: 3, spaceBetween: 20 },
        }}
        a11y={{
          prevSlideMessage: "Previous product",
          nextSlideMessage: "Next product",
        }}
      >
        {PRODUCTS?.filter((p) => p.isOnSale)
          ?.slice(0, 8)
          .map((product, index) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} priority={index < 2} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

function DesktopGrid() {
  return (
    <motion.div
      className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      {PRODUCTS?.filter((p) => p.isOnSale)
        ?.slice(0, 8)
        .map((product, index) => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard {...product} priority={index < 4} />
          </motion.div>
        ))}
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="w-full overflow-hidden bg-[#f4f3f0] py-8 sm:py-12 md:py-16"
      aria-label="Featured Products"
    >
      <div className="mx-auto w-full container">
        {/* Header */}
        <div className="mb-10 px-4 sm:px-6 md:mb-14">
          <span
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-main sm:text-sm"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Our Selection
          </span>

          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-soft-black"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Featured Products
          </h2>
        </div>

        {/* Mobile / Tablet slider */}
        <div className="px-4 sm:px-6 md:hidden">
          {mounted ? <ProductsSlider /> : null}
        </div>

        {/* Desktop grid */}
        <div className="hidden px-4 sm:px-6 md:block ">
          <DesktopGrid />
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center px-4 sm:mt-14">
          <Link
            href="/collections/offers"
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
        </div>
      </div>
    </section>
  );
}
