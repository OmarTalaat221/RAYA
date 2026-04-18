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
      <div className="pointer-events-none absolute -inset-[1.5px] -z-10 rounded-[18px] bg-linear-to-br from-main/60 via-main/20 to-transparent opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100" />

      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)] translate-y-0 transition-transform duration-350 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(104,188,82,0.1)]"
      >
        {/* IMAGE */}
        <div className="relative w-full overflow-hidden border-b border-gray-100 bg-[#f4f3f0] aspect-16/10">
          <div className="pointer-events-none absolute inset-0 z-10 transition-shadow duration-400" />

          <div className="pointer-events-none absolute inset-0 z-10 bg-main/0 transition-colors duration-400 ease-out group-hover:bg-main/4" />

          <img
            src={image}
            srcSet={srcSet}
            sizes="(max-width: 767px) 92vw, (max-width: 1279px) 46vw, 31vw"
            alt={title}
            loading="lazy"
            className="absolute inset-0 h-full! w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
          />
        </div>

        {/* BODY */}
        <div className="flex flex-1 flex-col gap-2 px-5 pt-4 pb-5">
          <time className="font-poppins! text-[10.5px] font-medium uppercase tracking-[0.16em] text-secondary">
            {date}
          </time>

          <h3 className="line-clamp-2 font-oswald! text-[14px] font-medium uppercase leading-snug tracking-[0.06em] text-soft-black transition-colors duration-300 ease-out group-hover:text-main">
            {title}
          </h3>

          <div className="h-[1.5px] w-8 rounded-full bg-main/40 transition-[width] duration-350 ease-out group-hover:w-12" />

          <p className="line-clamp-3 flex-1 font-poppins! text-[12px] leading-relaxed text-secondary">
            {excerpt}
          </p>

          <div className="mt-1 flex items-center justify-between gap-3">
            <div className="relative">
              <span className="font-poppins! text-[11px] font-semibold uppercase tracking-[0.1em] text-main transition-colors duration-300 ease-out group-hover:text-main">
                Read more
              </span>

              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-main transition-[width] duration-350 ease-out group-hover:w-full" />
            </div>

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f4f3f0] text-secondary transition-all duration-400 ease-out group-hover:rotate-[360deg] group-hover:bg-main group-hover:text-white">
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
