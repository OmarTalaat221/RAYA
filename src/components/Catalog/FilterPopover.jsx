"use client";

import { memo, useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

function FilterPopover({ label, isActive = false, children, align = "left" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, close]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={toggleOpen}
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 font-poppins! ${
          isActive
            ? "border-main/30 bg-main/5 text-main"
            : "border-gray-200 bg-white text-soft-black hover:border-gray-300 hover:bg-gray-50"
        }`}
      >
        {label}

        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute top-full z-50 mt-2 min-w-[350px] rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.10)] ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {typeof children === "function" ? children({ close }) : children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(FilterPopover);
