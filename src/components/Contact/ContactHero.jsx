"use client";

import { motion } from "framer-motion";

const headingVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ContactHero() {
  return (
    <section className="w-full bg-[#f4f3f0]  pb-0! py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-3xl text-start md:text-center"
          variants={headingVariant}
          initial="hidden"
          animate="visible"
        >
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-main sm:text-sm font-garamond!">
            Get in Touch
          </span>

          <h1 className="text-[clamp(2.1rem,5vw,4rem)] font-bold leading-tight text-soft-black font-oswald!">
            Contact Us
          </h1>

          <p className="mt-4 max-w-2xl font-poppins! text-sm leading-relaxed text-secondary md:mx-auto md:text-[15px]">
            Have a question about our products, need help with an order, or want
            to explore a partnership? We'd love to hear from you. Reach out and
            our team will get back to you as soon as possible.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
