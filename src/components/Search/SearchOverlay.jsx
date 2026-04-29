"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  LoaderCircle,
  Search,
  SearchX,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "../FeaturedProducts/products";
import {
  buildSearchPageHref,
  formatMoney,
  getOverlaySearchProducts,
  getProductSearchHref,
  getProductSearchImage,
  getSearchSuggestions,
} from "./search.utils";

function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

function SuggestionRow({ suggestion, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(suggestion.label)}
      className="group flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left transition-colors duration-150 hover:bg-[#f3faf0]"
    >
      <div className="min-w-0">
        <p className="truncate font-poppins! text-[13px] font-medium text-soft-black">
          {suggestion.label}
        </p>
        <p className="mt-0.5 font-poppins! text-[10px] uppercase tracking-[0.18em] text-secondary">
          {suggestion.type}
        </p>
      </div>

      <ArrowRight
        size={14}
        strokeWidth={1.8}
        className="flex-shrink-0 text-gray-300 transition-colors duration-150 group-hover:text-main"
      />
    </button>
  );
}

function ProductRow({ product, onSelect }) {
  const imageSrc = getProductSearchImage(product);
  const href = getProductSearchHref(product);
  const price = product?.newPrice ?? product?.oldPrice;
  const oldPrice =
    product?.isOnSale && product?.oldPrice ? product.oldPrice : null;

  return (
    <button
      type="button"
      onClick={() => onSelect(href)}
      className="group flex w-full items-center gap-2.5 rounded-xl p-2 text-left transition-colors duration-150 hover:bg-[#f3faf0]"
    >
      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-[#f5f5f3]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product?.title || "Product"}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        {product?.brand ? (
          <p className="font-oswald! text-[10px] uppercase tracking-[0.2em] text-main">
            {product.brand}
          </p>
        ) : null}

        <h4 className="mt-0.5 line-clamp-1 font-poppins! text-[13px] font-medium leading-snug text-soft-black">
          {product?.title}
        </h4>

        <div className="mt-1 flex items-center gap-1.5">
          {price != null ? (
            <span className="font-poppins! text-[13px] font-semibold text-soft-black">
              {formatMoney(price, product?.currency || "AED")}
            </span>
          ) : null}

          {oldPrice ? (
            <span className="font-poppins! text-[11px] text-secondary line-through">
              {formatMoney(oldPrice, product?.currency || "AED")}
            </span>
          ) : null}
        </div>
      </div>

      <ChevronRight
        size={14}
        strokeWidth={1.8}
        className="flex-shrink-0 text-gray-300 transition-colors duration-150 group-hover:text-main"
      />
    </button>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-[0.72fr_1.28fr]">
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`sg-${i}`}
            className="animate-pulse rounded-xl bg-gray-50 px-3 py-2.5"
          >
            <div className="h-3 w-3/5 rounded-full bg-gray-200" />
            <div className="mt-1.5 h-2.5 w-12 rounded-full bg-gray-100" />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`pr-${i}`}
            className="flex animate-pulse items-center gap-2.5 rounded-xl bg-gray-50 p-2"
          >
            <div className="h-14 w-14 rounded-lg bg-gray-200/70" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 w-12 rounded-full bg-gray-100" />
              <div className="h-3 w-4/5 rounded-full bg-gray-200" />
              <div className="h-3 w-1/3 rounded-full bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyResults({ query, onSearch }) {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f6fbf4] text-main">
        <SearchX size={20} strokeWidth={1.8} />
      </div>

      <p className="mt-2.5 font-garamond! text-lg text-soft-black sm:text-xl">
        No results found
      </p>

      <p className="mx-auto mt-1.5 max-w-sm font-poppins! text-[13px] leading-6 text-secondary">
        We couldn’t find anything matching "{query}". Try another keyword.
      </p>

      <button
        type="button"
        onClick={() => onSearch(query)}
        className="mt-3 inline-flex items-center justify-center rounded-full bg-main px-4 py-2 font-poppins! text-[13px] font-medium text-white transition-colors duration-150 hover:bg-[#5baa47]"
      >
        Search for "{query}"
      </button>
    </div>
  );
}

export default function SearchOverlay({ open = false, onClose }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebouncedValue(query, 250);

  const trimmed = query.trim();
  const debouncedTrimmed = debouncedQuery.trim();
  const displayQuery = trimmed || debouncedTrimmed;

  const isLoading = open && trimmed.length > 0 && trimmed !== debouncedTrimmed;

  const suggestions = useMemo(
    () => getSearchSuggestions(PRODUCTS, debouncedTrimmed, 4),
    [debouncedTrimmed]
  );

  const products = useMemo(
    () => getOverlaySearchProducts(PRODUCTS, debouncedTrimmed, 4),
    [debouncedTrimmed]
  );

  const hasQuery = displayQuery.length > 0;
  const hasSuggestions = suggestions.length > 0;
  const hasProducts = products.length > 0;
  const hasResults = hasSuggestions || hasProducts;
  const showEmpty = hasQuery && !hasResults && !isLoading;
  const showDropdown = isLoading || hasQuery;

  const navigateToSearch = useCallback(
    (q = "") => {
      onClose();
      router.push(buildSearchPageHref(String(q ?? "").trim()));
    },
    [onClose, router]
  );

  const navigateToProduct = useCallback(
    (href) => {
      onClose();
      router.push(href);
    },
    [onClose, router]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (open) return;
    const id = window.setTimeout(() => setQuery(""), 180);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <>
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 z-[1100] bg-black/12"
            aria-hidden="true"
          />

          <motion.div
            key="search-panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
            className="pointer-events-none fixed inset-x-0 top-0 z-[1200] px-4 pt-3 sm:px-6 sm:pt-4"
          >
            <div className="mx-auto w-full max-w-[980px]">
              <div className="pointer-events-auto overflow-hidden rounded-[28px] border border-white/70 bg-white/95 shadow-[0_14px_42px_rgba(0,0,0,0.10)] backdrop-blur-sm">
                <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
                  <Search
                    size={18}
                    strokeWidth={1.8}
                    className="flex-shrink-0 text-secondary"
                  />

                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        navigateToSearch(query);
                      }
                    }}
                    placeholder="Search products, brands, categories…"
                    autoComplete="off"
                    spellCheck="false"
                    className="h-9 flex-1 border-none bg-transparent font-poppins! text-[15px] text-soft-black outline-none placeholder:text-secondary sm:text-base"
                  />

                  {isLoading ? (
                    <LoaderCircle
                      size={16}
                      strokeWidth={1.8}
                      className="flex-shrink-0 animate-spin text-main"
                    />
                  ) : null}

                  {trimmed ? (
                    <button
                      type="button"
                      onClick={handleClear}
                      aria-label="Clear search"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-secondary transition-colors duration-150 hover:bg-gray-100 hover:text-soft-black"
                    >
                      <X size={16} strokeWidth={1.8} />
                    </button>
                  ) : null}

                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close search"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-soft-black transition-colors duration-150 hover:border-main/25 hover:text-main"
                  >
                    <X size={16} strokeWidth={1.8} />
                  </button>
                </div>

                {showDropdown ? (
                  <div className="border-t border-gray-100 px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
                    <div className="max-h-[380px] overflow-y-auto">
                      {isLoading ? (
                        <LoadingSkeleton />
                      ) : showEmpty ? (
                        <EmptyResults
                          query={displayQuery}
                          onSearch={navigateToSearch}
                        />
                      ) : (
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-[0.72fr_1.28fr]">
                            <div>
                              <p className="mb-2 font-oswald! text-[10px] uppercase tracking-[0.28em] text-main">
                                Suggestions
                              </p>

                              {hasSuggestions ? (
                                <div className="space-y-0.5">
                                  {suggestions.map((s) => (
                                    <SuggestionRow
                                      key={s.id}
                                      suggestion={s}
                                      onSelect={navigateToSearch}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <p className="px-3 py-2 font-poppins! text-[13px] text-secondary">
                                  No matching suggestions.
                                </p>
                              )}
                            </div>

                            <div>
                              <p className="mb-2 font-oswald! text-[10px] uppercase tracking-[0.28em] text-main">
                                Products
                              </p>

                              {hasProducts ? (
                                <div className="space-y-0.5">
                                  {products.map((p) => (
                                    <ProductRow
                                      key={p.id}
                                      product={p}
                                      onSelect={navigateToProduct}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <p className="px-3 py-2 font-poppins! text-[13px] text-secondary">
                                  No matching products.
                                </p>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => navigateToSearch(displayQuery)}
                            className="group flex w-full items-center justify-between gap-3 rounded-xl border border-gray-100 bg-[#f8faf6] px-3.5 py-3 text-left transition-colors duration-150 hover:bg-[#eef8ea]"
                          >
                            <div className="flex min-w-0 items-center gap-2.5">
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-main shadow-sm">
                                <Search size={14} strokeWidth={1.8} />
                              </div>

                              <p className="font-poppins! text-[13px] font-medium text-soft-black">
                                Search for "{displayQuery}"
                              </p>
                            </div>

                            <ArrowRight
                              size={14}
                              strokeWidth={1.8}
                              className="flex-shrink-0 text-gray-300 transition-colors duration-150 group-hover:text-main"
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
