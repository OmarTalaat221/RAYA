"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function CollectionCard({ title, image, srcSet, href }) {
  return (
    <motion.article variants={cardVariant} className="group relative h-full">
      <div
        className={[
          "absolute -inset-[1.5px] rounded-[18px]",
          "bg-gradient-to-br from-main/60 via-main/20 to-transparent",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-400 ease-out",
          "pointer-events-none",
          "-z-10",
        ].join(" ")}
      />

      <Link
        href={href}
        className={[
          "flex flex-col h-full",
          "bg-white rounded-2xl overflow-hidden",
          // Base shadow
          "shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)]",
          // Hover shadow — deeper
          "group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(104,188,82,0.1)]",
          "transition-shadow duration-400 ease-out",
          // Lift — pure CSS transform (GPU) — أسرع من Framer
          "translate-y-0 group-hover:-translate-y-1.5",
          "transition-transform duration-350 ease-out",
        ].join(" ")}
      >
        {/* ═══════════════════════════════════════════════════
            IMAGE AREA
        ═══════════════════════════════════════════════════ */}
        <div
          className={[
            "relative w-full overflow-hidden",
            "aspect-[5/3]",
            // Clean white bg — يبيّن الصورة أحسن
            "bg-white",
            // Thin bottom border
            "border-b border-gray-100",
          ].join(" ")}
        >
          {/* Subtle inner vignette — premium feel */}
          <div
            className={[
              "absolute inset-0 z-10 pointer-events-none",
              // "shadow-[inset_0_0_40px_rgba(0,0,0,0.04)]",
              // "group-hover:shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]",
              "transition-shadow duration-400",
            ].join(" ")}
          />

          {/* Green tint overlay on hover */}
          <div
            className={[
              "absolute inset-0 z-10 pointer-events-none",
              "bg-main/0 group-hover:bg-main/[0.04]",
              "transition-colors duration-400 ease-out",
            ].join(" ")}
          />

          {/* The image */}
          <img
            src={image}
            srcSet={srcSet}
            sizes="(max-width: 640px) 85vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
            alt={title}
            loading="lazy"
            className={[
              "absolute inset-0 w-full h-full!",
              "object-contain",
              "p-5",
              // Scale — pure CSS (GPU composited)
              "scale-100 group-hover:scale-[1.06]",
              "transition-transform duration-500 ease-out",
              // GPU hint
              "will-change-transform",
            ].join(" ")}
            style={{ translateZ: 0 }}
          />
        </div>

        {/* ═══════════════════════════════════════════════════
            CARD FOOTER
        ═══════════════════════════════════════════════════ */}
        <div
          className={[
            "flex items-center justify-between gap-3",
            "px-5 py-[14px]",
            "mt-auto",
          ].join(" ")}
        >
          {/* Title + animated underline */}
          <div className="relative overflow-hidden">
            <span
              className={[
                "block",
                "font-['Oswald']! font-medium uppercase",
                "text-[13px] tracking-[0.12em]",
                "text-soft-black group-hover:text-main",
                "transition-colors duration-300 ease-out",
              ].join(" ")}
            >
              {title}
            </span>

            {/* Underline slide-in */}
            <span
              className={[
                "absolute bottom-0 left-0 h-[1.5px]",
                "bg-main",
                "w-0 group-hover:w-full",
                "transition-[width] duration-350 ease-out",
              ].join(" ")}
            />
          </div>

          {/* Arrow badge */}
          <span
            className={[
              "flex-shrink-0",
              "flex items-center justify-center",
              "w-7 h-7 rounded-full",
              // Default state
              "bg-[#f4f3f0] text-secondary",
              // Hover state
              "group-hover:bg-main group-hover:text-white",
              // Arrow rotates from ↗ to → feel
              "group-hover:rotate-[360deg]",
              // Transitions
              "transition-all duration-400 ease-out",
            ].join(" ")}
          >
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
