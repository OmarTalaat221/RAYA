"use client";
import { useReducedMotion, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

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
          src="/assets/image/pattern-4.png"
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

export default function SpecialOffer() {
  const t = useTranslations("home.specialOffer");

  return (
    <section className="relative w-full overflow-hidden bg-[#f4f3f0] md:block py-8 sm:py-10 md:py-12 lg:py-16">
      <AboutBackgroundPattern />

      <div className="container relative z-10 w-full px-4 sm:px-6 mx-auto flex flex-col items-center gap-10 sm:gap-12 md:gap-14 lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
        {/* ===== LEFT: Text Content ===== */}
        <div className="flex-1 w-full max-w-[40rem] flex flex-col items-center text-center lg:max-w-none lg:items-start lg:text-left">
          {/* Badge */}
          <span className="inline-block text-main text-sm sm:text-base font-semibold tracking-[0.2em] uppercase mb-4 sm:mb-6 font-poppins!">
            {t("limitedTime")}
          </span>

          {/* Heading */}
          <div className="mb-6 sm:mb-8 w-full flex flex-col items-center lg:items-start">
            <h2 className="font-oswald! text-soft-black font-bold leading-[0.95] tracking-tight text-[2.85rem] sm:text-[3.6rem] md:text-[4.4rem] lg:text-[4.8rem] xl:text-[5.8rem]">
              {t("title")}
            </h2>

            <span
              className="font-garamond! inline-block text-main font-semibold uppercase italic leading-[0.85] tracking-[0.08em] text-[1.6rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[2.6rem] xl:text-[3.2rem] -mt-3 sm:-mt-4 md:-mt-5 lg:-mt-5 xl:-mt-6 -rotate-3"
              style={{
                textShadow: "2px 2px 0 rgba(255,255,255,0.96)",
              }}
            >
              {t("exclusive")}
            </span>
          </div>

          {/* Divider */}
          <div className="w-10 h-[2px] bg-main mb-6 sm:mb-8" />

          {/* Description */}
          <p className="text-secondary text-sm sm:text-base md:text-lg leading-relaxed w-full max-w-[34rem] font-poppins!">
            {t("descriptionPrefix")}
            <span className="text-soft-black font-medium">
              {" "}
              {t("productName")}{" "}
            </span>
            {t("descriptionSuffix")}
          </p>

          {/* CTA */}
          <Link
            href="/collections/skinage"
            className="group relative mt-8 sm:mt-10 inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-main text-white rounded-full px-7 py-3 sm:px-9 sm:py-3.5 text-sm sm:text-base font-semibold tracking-wide overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-main/30 hover:scale-105 font-poppins!"
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              aria-hidden="true"
            />
            <span className="relative z-10">{t("shopNow")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
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

        {/* ===== RIGHT: Promotional Image ===== */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <div className="relative w-full xl:max-w-[560px]">
            <img
              src="https://www.rdspharma.online/cdn/shop/files/e2w.jpg?v=1765268114&width=750"
              srcSet="
                https://www.rdspharma.online/cdn/shop/files/e2w.jpg?v=1765268114&width=165 165w,
                https://www.rdspharma.online/cdn/shop/files/e2w.jpg?v=1765268114&width=360 360w,
                https://www.rdspharma.online/cdn/shop/files/e2w.jpg?v=1765268114&width=535 535w,
                https://www.rdspharma.online/cdn/shop/files/e2w.jpg?v=1765268114&width=750 750w,
                https://www.rdspharma.online/cdn/shop/files/e2w.jpg?v=1765268114&width=1070 1070w,
                https://www.rdspharma.online/cdn/shop/files/e2w.jpg?v=1765268114&width=1500 1500w
              "
              sizes="(max-width: 639px) 100vw, (max-width: 767px) 88vw, (max-width: 1023px) 76vw, (max-width: 1279px) 44vw, 560px"
              alt="Skinage Collagen Prestige Ampoules Special Offer"
              loading="lazy"
              decoding="async"
              draggable={false}
              className="relative z-10 block w-full h-auto rounded-2xl sm:rounded-3xl"
              style={{ display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
