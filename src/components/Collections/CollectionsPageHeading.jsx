"use client";

import { motion } from "framer-motion";

const headingVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function CollectionsPageHeading() {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-2xl text-center md:mb-14"
      variants={headingVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className="flex items-center justify-center gap-3">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-main sm:text-sm font-poppins!">
          Browse by
        </span>
      </div>

      <h1
        id="collections-heading"
        className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-soft-black font-oswald!"
      >
        Collections
      </h1>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-secondary sm:text-base font-poppins!">
        Explore featured brands, seasonal offers, and curated ranges from the
        RDS Pharma world.
      </p>
    </motion.div>
  );
}
