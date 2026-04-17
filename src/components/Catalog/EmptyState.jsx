"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

export default function EmptyState({ onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
        <SearchX size={28} className="text-secondary" strokeWidth={1.5} />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-soft-black font-oswald!">
        No products found
      </h3>

      <p className="mb-6 max-w-sm text-sm text-secondary font-poppins!">
        Try adjusting your filters or clearing them to see all available
        products.
      </p>

      <button
        onClick={onClear}
        className="rounded-full border border-main bg-main/5 px-6 py-2.5 text-sm font-semibold text-main transition-all duration-200 hover:bg-main hover:text-white font-poppins!"
      >
        Clear all filters
      </button>
    </motion.div>
  );
}
