"use client";

import { motion } from "framer-motion";
// import BlogCard from "@/components/Blog/BlogCard";
import NewsPagination from "./NewsPagination";
import BlogCard from "./BlogCard";

const headingVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

function EmptyState() {
  return (
    <div className="mx-auto max-w-2xl rounded-[28px] border border-dashed border-soft-black/10 bg-white px-6 py-14 text-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-main font-poppins!">
        No articles yet
      </p>

      <h3 className="font-oswald! text-2xl font-bold uppercase text-soft-black">
        Nothing to show right now
      </h3>

      <p className="mx-auto mt-3 max-w-md font-poppins! text-sm leading-relaxed text-secondary">
        We’re preparing fresh updates, skincare insights, and wellness news.
        Please check back soon.
      </p>
    </div>
  );
}

export default function NewsListingPage({
  posts = [],
  currentPage = 1,
  totalPages = 1,
  total = 0,
  pageSize = 6,
  title = "Latest News",
  eyebrow = "From the Journal",
  subtitle = "Skincare insights, wellness stories, and product news curated for your everyday routine.",
}) {
  return (
    <section className="w-full bg-[#f4f3f0] py-10 sm:py-12 md:py-14 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-start md:mb-14 md:text-center"
          variants={headingVariant}
          initial="hidden"
          animate="visible"
        >
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-main sm:text-sm font-garamond!">
            {eyebrow}
          </span>

          <h1 className="text-[clamp(2.1rem,5vw,4rem)] font-bold leading-tight text-soft-black font-oswald!">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl font-poppins! text-sm leading-relaxed text-secondary md:mx-auto md:text-[15px]">
            {subtitle}
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <motion.div
              key={currentPage}
              className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-7"
              variants={containerVariant}
              initial="hidden"
              animate="visible"
            >
              {posts.map((post, index) => (
                <BlogCard key={`${post.id}-${index}`} {...post} />
              ))}
            </motion.div>

            <NewsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              total={total}
              pageSize={pageSize}
            />
          </>
        )}
      </div>
    </section>
  );
}
