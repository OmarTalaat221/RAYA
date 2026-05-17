"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { LoaderCircle, Search, SearchX, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductCard from "../FeaturedProducts/ProductCard";
import useCanHover from "../Catalog/useCanHover";
import { buildSearchPageHref } from "./search.utils";
import { EMPTY_SEARCH_RESULTS } from "./search.adapter";

/* ─── states ─── */

const SearchPromptState = memo(function SearchPromptState() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:p-8 md:p-10">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f6fbf4] text-main sm:h-12 sm:w-12">
        <Search size={20} strokeWidth={1.8} />
      </div>

      <h2 className="mt-3 font-garamond! text-xl text-soft-black sm:mt-4 sm:text-2xl md:text-[2rem]">
        Search products
      </h2>

      <p className="mx-auto mt-2 max-w-2xl font-poppins! text-[13px] leading-6 text-secondary sm:text-sm sm:leading-7">
        Enter a product name, brand, or keyword to explore matching items.
      </p>
    </div>
  );
});

SearchPromptState.displayName = "SearchPromptState";

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
        We couldn't find any products matching "{query}". Try another keyword.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-main px-5 py-2.5 font-poppins! text-sm font-medium text-white transition-colors duration-150 hover:bg-[#5baa47] sm:mt-5"
      >
        Clear search
      </button>
    </div>
  );
});

SearchNoResults.displayName = "SearchNoResults";

const SearchErrorState = memo(function SearchErrorState({ onRetry }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-white p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:p-8">
      <h2 className="font-garamond! text-xl text-soft-black sm:text-2xl">
        Search is unavailable right now
      </h2>

      <p className="mx-auto mt-2 max-w-lg font-poppins! text-[13px] leading-6 text-secondary sm:text-sm sm:leading-7">
        Something went wrong while fetching the latest search results. Please
        try again.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-main px-5 py-2.5 font-poppins! text-sm font-medium text-white transition-colors duration-150 hover:bg-[#5baa47]"
      >
        Try again
      </button>
    </div>
  );
});

SearchErrorState.displayName = "SearchErrorState";

/* ─── main ─── */

export default function SearchPageClient({
  initialQuery = "",
  initialResults = EMPTY_SEARCH_RESULTS,
  errorMessage = "",
}) {
  const router = useRouter();
  const canHover = useCanHover();
  const inputRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const activeQuery = initialQuery.trim();
  const products = initialResults?.products || [];

  const hasActiveQuery = activeQuery.length > 0;
  const hasError = Boolean(errorMessage) && hasActiveQuery;
  const hasProducts = products.length > 0;
  const hasNoResults = hasActiveQuery && !hasError && !hasProducts;

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const nextQuery = query.trim();

      if (!nextQuery) {
        setQuery("");
        startTransition(() => {
          router.replace("/search", { scroll: false });
        });
        return;
      }

      if (nextQuery === activeQuery) return;

      startTransition(() => {
        router.push(buildSearchPageHref(nextQuery), { scroll: false });
      });
    },
    [query, activeQuery, router]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    startTransition(() => {
      router.replace("/search", { scroll: false });
    });
    inputRef.current?.focus();
  }, [router]);

  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const handleRetry = useCallback(() => {
    if (!activeQuery) return;

    startTransition(() => {
      router.replace(buildSearchPageHref(activeQuery), { scroll: false });
    });
  }, [activeQuery, router]);

  const title = hasActiveQuery
    ? `Products for "${activeQuery}"`
    : "Search Products";

  const subtitle = hasActiveQuery
    ? "Browse matching products fetched directly from the API."
    : "Use product names, brands, or keywords to explore the catalog faster.";

  const resultsLabel = hasActiveQuery
    ? `${products.length} ${products.length === 1 ? "product" : "products"}`
    : "Ready to search";

  return (
    <>
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:mb-8 sm:p-6 md:p-8">
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

        <form onSubmit={handleSubmit} className="mt-5 sm:mt-6">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-gray-200 bg-[#f9f9f8] px-3.5 py-2.5 transition-colors duration-200 focus-within:border-main/35 sm:gap-3 sm:rounded-2xl sm:px-5 sm:py-3.5">
              <Search
                size={18}
                strokeWidth={1.8}
                className="shrink-0 text-secondary sm:[&]:h-5 sm:[&]:w-5"
              />

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search products..."
                autoComplete="off"
                spellCheck="false"
                autoFocus
                className="h-7 flex-1 border-none bg-transparent font-poppins! text-sm text-soft-black outline-none placeholder:text-secondary sm:h-8 sm:text-[15px]"
              />

              {isPending ? (
                <LoaderCircle
                  size={16}
                  strokeWidth={1.8}
                  className="shrink-0 animate-spin text-main sm:[&]:h-[18px] sm:[&]:w-[18px]"
                />
              ) : null}

              {query.trim() ? (
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
              disabled={isPending}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-main px-5 font-poppins! text-sm font-medium text-white transition-colors duration-150 hover:bg-[#5baa47] disabled:cursor-not-allowed disabled:opacity-80 sm:h-14 sm:rounded-2xl sm:px-6"
            >
              {isPending ? (
                <>
                  <LoaderCircle
                    size={16}
                    strokeWidth={1.8}
                    className="animate-spin"
                  />
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </form>
      </div>

      {!hasActiveQuery ? (
        <SearchPromptState />
      ) : hasError ? (
        <SearchErrorState onRetry={handleRetry} />
      ) : hasNoResults ? (
        <SearchNoResults query={activeQuery} onClear={handleClear} />
      ) : (
        <div className="space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-oswald! text-[11px] uppercase tracking-[0.28em] text-main">
                Products
              </p>
              <h2 className="mt-1 font-garamond! text-2xl text-soft-black sm:text-[2rem]">
                Matching Results
              </h2>
            </div>

            <div className="hidden rounded-full bg-[#f6fbf4] px-3 py-1.5 font-poppins! text-sm font-medium text-soft-black sm:inline-flex">
              {products.length} {products.length === 1 ? "product" : "products"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                href={product.href}
                frontImage={product.frontImage}
                backImage={product.backImage}
                oldPrice={product.oldPrice}
                newPrice={product.newPrice}
                currency={product.currency}
                isOnSale={product.isOnSale}
                priority={index < 4}
                canHover={canHover}
                inCart={product.inCart}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
