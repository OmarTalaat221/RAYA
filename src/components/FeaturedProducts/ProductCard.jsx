"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SaleRibbon from "./SaleRibbon";

export default function ProductCard({
  title,
  href,
  frontImage,
  backImage,
  oldPrice,
  newPrice,
  currency = "AED",
  isOnSale = false,
  priority = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);

  const hasBackImage = Boolean(backImage);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateHoverCapability = () => {
      setCanHover(mediaQuery.matches);
    };

    updateHoverCapability();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateHoverCapability);
      return () =>
        mediaQuery.removeEventListener("change", updateHoverCapability);
    } else {
      mediaQuery.addListener(updateHoverCapability);
      return () => mediaQuery.removeListener(updateHoverCapability);
    }
  }, []);

  const showBackImage = hasBackImage && canHover && isHovered;

  const normalizedFrontImage = frontImage?.startsWith("http")
    ? frontImage
    : `https://www.rdspharma.online${frontImage}`;

  const normalizedBackImage = backImage
    ? backImage.startsWith("http")
      ? backImage
      : `https://www.rdspharma.online${backImage}`
    : null;

  return (
    <motion.article
      className="w-full"
      onHoverStart={() => {
        if (canHover) setIsHovered(true);
      }}
      onHoverEnd={() => {
        if (canHover) setIsHovered(false);
      }}
      whileHover={canHover ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <Link
        href={href || "/catalog"}
        className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#68bc52] focus-visible:ring-offset-2"
        aria-label={`View ${title}`}
      >
        {/* Image Area */}
        <div
          className="relative w-full overflow-hidden bg-white"
          style={{ aspectRatio: "1 / 1" }}
        >
          {isOnSale && <SaleRibbon />}

          {/* Front Image */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: showBackImage ? 0 : 1,
              scale: showBackImage ? 1.04 : 1,
            }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Image
              src={normalizedFrontImage}
              alt={title}
              fill
              sizes="(max-width: 480px) 80vw, (max-width: 768px) 45vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-4 sm:p-5"
              priority={priority}
              unoptimized
            />
          </motion.div>

          {/* Back Image */}
          {normalizedBackImage && (
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: showBackImage ? 1 : 0,
                scale: showBackImage ? 1 : 1.04,
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <Image
                src={normalizedBackImage}
                alt={`${title} back`}
                fill
                sizes="(max-width: 480px) 80vw, (max-width: 768px) 45vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain p-4 sm:p-5"
                loading="lazy"
                unoptimized
              />
            </motion.div>
          )}
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col items-center px-4 py-5 text-center sm:px-5 sm:py-6">
          <h3
            className="line-clamp-2 min-h-[2.8em] text-sm font-semibold leading-snug text-[#2d2d2d] sm:text-[0.95rem]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {title}
          </h3>

          <div className="my-3 h-px w-8 bg-[#e4e1db]" />

          <div className="flex flex-wrap items-center justify-center gap-2">
            {oldPrice ? (
              <span
                className="text-xs text-[#93979A] line-through sm:text-sm"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {currency} {Number(oldPrice).toFixed(2)}
              </span>
            ) : null}

            <span
              className={`text-base font-bold sm:text-lg ${
                isOnSale ? "text-red-500" : "text-[#2d2d2d]"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {currency} {Number(newPrice).toFixed(2)}
            </span>
          </div>

          <span
            className="mt-3 hidden text-[11px] font-semibold uppercase tracking-wider text-[#68bc52] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
            aria-hidden="true"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            View Product →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
