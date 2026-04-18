"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  canHover = false,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const showBackImage = canHover && backImage && isHovered;

  const normalizedFrontImage = frontImage?.startsWith("http")
    ? frontImage
    : `https://www.rdspharma.online${frontImage}`;

  const normalizedBackImage = backImage
    ? backImage.startsWith("http")
      ? backImage
      : `https://www.rdspharma.online${backImage}`
    : null;

  return (
    <article
      className="w-full transition-transform duration-300 hover:-translate-y-1"
      onMouseEnter={() => canHover && setIsHovered(true)}
      onMouseLeave={() => canHover && setIsHovered(false)}
    >
      <Link
        href={href || "/catalog"}
        className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
      >
        {/* Image */}
        <div
          className="relative w-full overflow-hidden bg-white"
          style={{ aspectRatio: "3 / 2" }}
        >
          {isOnSale && <SaleRibbon />}

          {/* Front */}
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              showBackImage ? "opacity-0 scale-[1.04]" : "opacity-100"
            }`}
          >
            <Image
              src={normalizedFrontImage}
              alt={title}
              fill
              sizes="(max-width:768px) 50vw, 25vw"
              className="object-contain p-4"
              priority={priority}
              loading="eager"
            />
          </div>

          {/* Back */}
          {normalizedBackImage && (
            <div
              className={`absolute inset-0 transition-all duration-300 ${
                showBackImage ? "opacity-100" : "opacity-0 scale-[1.04]"
              }`}
            >
              <Image
                src={normalizedBackImage}
                alt={`${title} back`}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-contain p-4"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col items-center px-4 py-5 text-center">
          <h3 className="line-clamp-2 text-sm font-semibold text-soft-black">
            {title}
          </h3>

          <div className="my-3 h-px w-8 bg-[#e4e1db]" />

          <div className="flex items-center gap-2">
            {oldPrice && (
              <span className="text-xs text-secondary line-through">
                {currency} {Number(oldPrice).toFixed(2)}
              </span>
            )}

            <span
              className={`text-base font-bold ${
                isOnSale ? "text-red-500" : "text-soft-black"
              }`}
            >
              {currency} {Number(newPrice).toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
