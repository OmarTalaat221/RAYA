"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LoaderCircle, Search, SearchX, X } from "lucide-react";
import { useRouter } from "next/navigation";
import CatalogClient from "../Catalog/CatalogClient";
import { buildSearchPageHref, getCatalogSearchResults } from "./search.utils";

/* ─── debounce ─── */
function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

/* ─── no results ─── */
const SearchNoResults = memo(function SearchNoResults({ query, onClear }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:p-8 md:p-10">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f6fbf4] text-main sm:h-12 sm:w-12">
        <SearchX size={20} strokeWidth={1.8} />
      </div>

      <h2 className="mt-3 font-garamond! text-xl text-soft-black sm:mt-4 sm:text-2xl md:text-[2rem]">
        No products found
      </h2>

      <p className="mx-auto mt-1.5 max-w-lg font-poppins! text-[13px] leading-6 text-secondary sm:mt-2 sm:text-sm sm:leading-7">
        We couldn't find anything matching "{query}". Try another product name,
        brand, or category.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-main px-5 py-2.5 font-poppins! text-sm font-medium text-white transition-colors duration-150 hover:bg-[#5baa47] sm:mt-5"
      >
        Back to all products
      </button>
    </div>
  );
});

/* ─── main ─── */
export default function SearchPageClient({
  products = [],
  initialQuery = "",
  currency = "AED",
}) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [query, setQuery] = useState(initialQuery);

  const debouncedQuery = useDebouncedValue(query, 250);
  const trimmed = query.trim();
  const debouncedTrimmed = debouncedQuery.trim();
  const isTyping = trimmed.length > 0 && trimmed !== debouncedTrimmed;

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filteredProducts = useMemo(() => {
    if (!debouncedTrimmed) return products;
    return getCatalogSearchResults(products, debouncedTrimmed);
  }, [products, debouncedTrimmed]);

  const hasActiveQuery = debouncedTrimmed.length > 0;
  const hasNoResults = hasActiveQuery && filteredProducts.length === 0;

  /* ─── handlers ─── */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      router.push(buildSearchPageHref(query), { scroll: false });
    },
    [query, router]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    router.replace("/search", { scroll: false });
    inputRef.current?.focus();
  }, [router]);

  const handleChange = useCallback((e) => setQuery(e.target.value), []);

  /* ─── display strings ─── */
  const title = debouncedTrimmed
    ? `Results for "${debouncedTrimmed}"`
    : "Search the Catalog";

  const subtitle = debouncedTrimmed
    ? "Browse matching products and refine the list using the catalog filters."
    : "Use product names, brands, or categories to explore the catalog faster.";

  const resultsLabel =
    filteredProducts.length === 1
      ? "1 product"
      : `${filteredProducts.length} products`;

  return (
    <>
      {/* ─── header card ─── */}
      <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:mb-6 sm:p-6 md:mb-8 md:p-8">
        <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 flex-1">
            <p className="font-oswald! text-[11px] uppercase tracking-[0.28em] text-main">
              Search
            </p>

            <h1 className="mt-2 font-garamond! text-2xl leading-tight text-soft-black sm:mt-3 sm:text-3xl md:text-4xl lg:text-[2.8rem]">
              {title}
            </h1>

            <p className="mt-2 max-w-3xl font-poppins! text-[13px] leading-6 text-secondary sm:mt-3 sm:text-sm sm:leading-7 md:text-[15px]">
              {subtitle}
            </p>
          </div>

          <div className="inline-flex shrink-0 items-center self-start rounded-full bg-[#f6fbf4] px-3.5 py-1.5 font-poppins! text-[13px] font-medium text-soft-black sm:px-4 sm:py-2 sm:text-sm lg:self-auto">
            {resultsLabel}
          </div>
        </div>

        {/* ─── search form ─── */}
        <form onSubmit={handleSubmit} className="mt-5 sm:mt-6">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-gray-200 bg-[#f9f9f8] px-3.5 py-2.5 transition-colors duration-200 focus-within:border-main/35 sm:gap-3 sm:rounded-2xl sm:px-5 sm:py-3.5">
              <Search
                size={18}
                strokeWidth={1.8}
                className="shrink-0 text-secondary sm:[&]:w-5 sm:[&]:h-5"
              />

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search products, brands, and categories"
                autoComplete="off"
                spellCheck="false"
                autoFocus
                className="h-7 flex-1 border-none bg-transparent font-poppins! text-sm text-soft-black outline-none placeholder:text-secondary sm:h-8 sm:text-[15px]"
              />

              {isTyping ? (
                <LoaderCircle
                  size={16}
                  strokeWidth={1.8}
                  className="shrink-0 animate-spin text-main sm:[&]:w-[18px] sm:[&]:h-[18px]"
                />
              ) : null}

              {trimmed ? (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear search"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-secondary transition-colors duration-150 hover:bg-gray-100 hover:text-soft-black sm:h-9 sm:w-9"
                >
                  <X size={16} strokeWidth={1.8} />
                </button>
              ) : null}
            </div>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-main px-5 font-poppins! text-sm font-medium text-white transition-colors duration-150 hover:bg-[#5baa47] sm:h-14 sm:rounded-2xl sm:px-6"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* ─── results ─── */}
      {hasNoResults ? (
        <SearchNoResults query={debouncedTrimmed} onClear={handleClear} />
      ) : (
        <CatalogClient
          key={`search-${debouncedTrimmed || "all"}`}
          products={filteredProducts}
          title={title}
          subtitle={subtitle}
          currency={currency}
        />
      )}
    </>
  );
}
