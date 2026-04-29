"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LoaderCircle, Search, SearchX, X } from "lucide-react";
import { useRouter } from "next/navigation";
import CatalogClient from "../Catalog/CatalogClient";
import { buildSearchPageHref, getCatalogSearchResults } from "./search.utils";

function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

function SearchNoResults({ query, onClear }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:p-10">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f6fbf4] text-main">
        <SearchX size={22} strokeWidth={1.8} />
      </div>

      <h2 className="mt-4 font-garamond! text-2xl text-soft-black sm:text-[2rem]">
        No products found
      </h2>

      <p className="mx-auto mt-2 max-w-2xl font-poppins! text-sm leading-7 text-secondary sm:text-[15px]">
        We couldn’t find anything matching "{query}". Try another product name,
        brand, or category.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-5 inline-flex items-center justify-center rounded-full bg-main px-5 py-2.5 font-poppins! text-sm font-medium text-white transition-colors duration-150 hover:bg-[#5baa47]"
      >
        Back to all products
      </button>
    </div>
  );
}

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
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:p-6 md:mb-8 md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-oswald! text-[11px] uppercase tracking-[0.28em] text-main">
              Search
            </p>

            <h1 className="mt-3 font-garamond! text-3xl leading-none text-soft-black sm:text-4xl md:text-[2.8rem]">
              {title}
            </h1>

            <p className="mt-3 max-w-3xl font-poppins! text-sm leading-7 text-secondary sm:text-[15px]">
              {subtitle}
            </p>
          </div>

          <div className="inline-flex items-center rounded-full bg-[#f6fbf4] px-4 py-2 font-poppins! text-sm font-medium text-soft-black">
            {resultsLabel}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-[#f9f9f8] px-4 py-3 transition-colors duration-200 focus-within:border-main/35 sm:px-5 sm:py-4">
              <Search
                size={20}
                strokeWidth={1.8}
                className="flex-shrink-0 text-secondary"
              />

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands, and categories"
                autoComplete="off"
                spellCheck="false"
                autoFocus
                className="h-8 flex-1 border-none bg-transparent font-poppins! text-[15px] text-soft-black outline-none placeholder:text-secondary sm:text-base"
              />

              {isTyping ? (
                <LoaderCircle
                  size={18}
                  strokeWidth={1.8}
                  className="flex-shrink-0 animate-spin text-main"
                />
              ) : null}

              {trimmed ? (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear search"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-secondary transition-colors duration-150 hover:bg-gray-100 hover:text-soft-black"
                >
                  <X size={18} strokeWidth={1.8} />
                </button>
              ) : null}
            </div>

            <button
              type="submit"
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-main px-6 font-poppins! text-sm font-medium text-white transition-colors duration-150 hover:bg-[#5baa47] sm:h-[60px]"
            >
              Search
            </button>
          </div>
        </form>
      </div>

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
