// components/Blog/BlogCard.jsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const blogCardVariant = {
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

export default function BlogCard({
  title,
  excerpt,
  date,
  category,
  image,
  srcSet,
  href,
}) {
  return (
    <motion.article
      variants={blogCardVariant}
      className="group relative h-full"
    >
      {/* Glow ring */}
      <div
        className={[
          "absolute -inset-[1.5px] rounded-[18px]",
          "bg-gradient-to-br from-main/60 via-main/20 to-transparent",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-400 ease-out",
          "pointer-events-none -z-10",
        ].join(" ")}
      />

      <Link
        href={href}
        className={[
          "flex flex-col h-full",
          "bg-white rounded-2xl overflow-hidden",
          "shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)]",
          "group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(104,188,82,0.1)]",
          "transition-shadow duration-400 ease-out",
          "translate-y-0 group-hover:-translate-y-1.5",
          "transition-transform duration-350 ease-out",
        ].join(" ")}
      >
        {/* ── IMAGE ──────────────────────────────────────────────────────── */}
        <div
          className={[
            "relative w-full overflow-hidden",
            "aspect-[16/10]",
            "bg-[#f4f3f0]",
            "border-b border-gray-100",
          ].join(" ")}
        >
          {/* Vignette */}
          <div className="absolute inset-0 z-10 pointer-events-none transition-shadow duration-400" />

          {/* Green tint */}
          <div
            className={[
              "absolute inset-0 z-10 pointer-events-none",
              "bg-main/0 group-hover:bg-main/[0.04]",
              "transition-colors duration-400 ease-out",
            ].join(" ")}
          />

          {/* Category pill */}
          {/* <div className="absolute top-3 left-3 z-20 pointer-events-none">
            <span
              className={[
                "inline-flex items-center",
                "px-2.5 py-1 rounded-full",
                "bg-white/90 backdrop-blur-sm",
                "font-poppins! text-[10px] font-semibold",
                "uppercase tracking-[0.12em] text-main",
              ].join(" ")}
            >
              {category}
            </span>
          </div> */}

          {/* Image — with srcSet */}
          <img
            src={image}
            srcSet={srcSet}
            sizes="(max-width: 640px) 85vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
            alt={title}
            loading="lazy"
            className={[
              "absolute inset-0 w-full h-full!",
              "object-cover",
              "scale-100 group-hover:scale-[1.04]",
              "transition-transform duration-500 ease-out",
              "will-change-transform",
            ].join(" ")}
          />
        </div>

        {/* ── BODY ───────────────────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-2">
          {/* Date */}
          <time className="font-poppins! text-[10.5px] font-medium uppercase tracking-[0.16em] text-secondary">
            {date}
          </time>

          {/* Title */}
          <h3
            className={[
              "font-oswald! font-medium uppercase",
              "text-[14px] leading-snug tracking-[0.06em]",
              "text-soft-black group-hover:text-main",
              "transition-colors duration-300 ease-out",
              "line-clamp-2",
            ].join(" ")}
          >
            {title}
          </h3>

          {/* Divider */}
          <div className="h-[1.5px] rounded-full bg-main/40 w-8 group-hover:w-12 transition-[width] duration-350 ease-out" />

          {/* Excerpt */}
          <p className="font-poppins! text-[12px] leading-relaxed text-secondary line-clamp-3 flex-1">
            {excerpt}
          </p>

          {/* Read more + Arrow */}
          <div className="flex items-center justify-between gap-3 mt-1">
            <div className="relative">
              <span className="font-poppins! text-[11px] font-semibold uppercase tracking-[0.1em] text-main group-hover:text-">
                Read more
              </span>
              <span
                className={[
                  "absolute bottom-0 left-0 h-[1.5px]",
                  "bg-main",
                  "w-0 group-hover:w-full",
                  "transition-[width] duration-350 ease-out",
                ].join(" ")}
              />
            </div>

            <span
              className={[
                "flex-shrink-0 flex items-center justify-center",
                "w-7 h-7 rounded-full",
                "bg-[#f4f3f0] text-secondary",
                "group-hover:bg-main group-hover:text-white",
                "group-hover:rotate-[360deg]",
                "transition-all duration-400 ease-out",
              ].join(" ")}
            >
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
