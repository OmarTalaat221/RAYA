"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { buildSearchPageHref, formatMoney } from "./search.utils";
import { adaptSearchResponse, EMPTY_SEARCH_RESULTS } from "./search.adapter";
import { getSearchSuggests } from "../../services/search.service";

/* ─── debounce hook ─── */
function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

/* ─── animation tokens ─── */
const panelVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const panelTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] };

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

function isCanceledError(error) {
  return (
    error?.code === "ERR_CANCELED" ||
    error?.name === "CanceledError" ||
    error?.message === "canceled"
  );
}

/* ─── rows ─── */
const CategoryRow = memo(function CategoryRow({ category, onSelect }) {
  const handleClick = useCallback(() => {
    onSelect(category.href);
  }, [category.href, onSelect]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors duration-150 hover:bg-[#f3faf0]"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#f5f5f3] sm:h-14 sm:w-14">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.title}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-oswald! text-[10px] uppercase tracking-[0.2em] text-main">
          Category
        </p>

        <h4 className="mt-0.5 line-clamp-1 font-poppins! text-[13px] font-medium leading-snug text-soft-black">
          {category.title}
        </h4>
      </div>

      <ChevronRight
        size={14}
        strokeWidth={1.8}
        className="shrink-0 text-gray-300 transition-colors duration-150 group-hover:text-main"
      />
    </button>
  );
});

CategoryRow.displayName = "CategoryRow";

const ProductRow = memo(function ProductRow({ product, onSelect }) {
  const handleClick = useCallback(() => {
    onSelect(product.href);
  }, [product.href, onSelect]);

  console.log(product, "product");

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex w-full items-center gap-2.5 rounded-xl p-2 text-left transition-colors duration-150 hover:bg-[#f3faf0]"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#f5f5f3] sm:h-14 sm:w-14">
        {product.frontImage ? (
          <Image
            src={product.frontImage}
            alt={product.title || "Product"}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        {product.brand ? (
          <p className="font-oswald! text-[10px] uppercase tracking-[0.2em] text-main">
            {product.brand}
          </p>
        ) : null}

        <h4 className="mt-0.5 line-clamp-1 font-poppins! text-[13px] font-medium leading-snug text-soft-black">
          {product.title}
        </h4>

        <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
          {product.newPrice != null ? (
            <span className="font-poppins! text-[13px] font-semibold text-soft-black">
              {formatMoney(product.newPrice, product.currency)}
            </span>
          ) : null}

          {product.isOnSale && product.oldPrice != null ? (
            <span className="font-poppins! text-[11px] text-secondary line-through">
              {formatMoney(product.oldPrice, product.currency)}
            </span>
          ) : null}
        </div>
      </div>

      <ChevronRight
        size={14}
        strokeWidth={1.8}
        className="shrink-0 text-gray-300 transition-colors duration-150 group-hover:text-main"
      />
    </button>
  );
});

ProductRow.displayName = "ProductRow";

const BlogRow = memo(function BlogRow({ blog, onSelect }) {
  const handleClick = useCallback(() => {
    onSelect(blog.href);
  }, [blog.href, onSelect]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex w-full items-center gap-2.5 rounded-xl p-2 text-left transition-colors duration-150 hover:bg-[#f3faf0]"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#f5f5f3] sm:h-14 sm:w-14">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title || "Blog post"}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {blog.category ? (
            <p className="font-oswald! text-[10px] uppercase tracking-[0.2em] text-main">
              {blog.category}
            </p>
          ) : null}
          {blog.date ? (
            <p className="text-[10px] uppercase tracking-[0.16em] text-secondary">
              {blog.date}
            </p>
          ) : null}
        </div>

        <h4 className="mt-0.5 line-clamp-2 font-poppins! text-[13px] font-medium leading-snug text-soft-black">
          {blog.title}
        </h4>
      </div>

      <ChevronRight
        size={14}
        strokeWidth={1.8}
        className="shrink-0 text-gray-300 transition-colors duration-150 group-hover:text-main"
      />
    </button>
  );
});

BlogRow.displayName = "BlogRow";

/* ─── skeleton ─── */
const SKELETON_ITEMS = [0, 1, 2, 3];

const LoadingColumn = memo(function LoadingColumn() {
  return (
    <div className="space-y-2">
      {SKELETON_ITEMS.map((i) => (
        <div
          key={i}
          className="flex animate-pulse items-center gap-2.5 rounded-xl bg-gray-50 p-2"
        >
          <div className="h-12 w-12 rounded-lg bg-gray-200/70 sm:h-14 sm:w-14" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-12 rounded-full bg-gray-100" />
            <div className="h-3 w-4/5 rounded-full bg-gray-200" />
            <div className="h-3 w-1/3 rounded-full bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
});

LoadingColumn.displayName = "LoadingColumn";

const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <LoadingColumn />
      <LoadingColumn />
      <LoadingColumn />
    </div>
  );
});

LoadingSkeleton.displayName = "LoadingSkeleton";

/* ─── states ─── */
const EmptyResults = memo(function EmptyResults({ query, onSearch }) {
  const handleClick = useCallback(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div className="py-5 text-center sm:py-6">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#f6fbf4] text-main sm:h-11 sm:w-11">
        <SearchX size={18} strokeWidth={1.8} />
      </div>

      <p className="mt-2 font-garamond! text-lg text-soft-black sm:mt-2.5 sm:text-xl">
        No results found
      </p>

      <p className="mx-auto mt-1 max-w-xs font-poppins! text-[13px] leading-6 text-secondary sm:mt-1.5 sm:max-w-sm">
        We couldn't find anything matching "{query}". Try another keyword.
      </p>

      <button
        type="button"
        onClick={handleClick}
        className="mt-3 inline-flex items-center justify-center rounded-full bg-main px-4 py-2 font-poppins! text-[13px] font-medium text-white transition-colors duration-150 hover:bg-[#5baa47]"
      >
        Search for "{query}"
      </button>
    </div>
  );
});

EmptyResults.displayName = "EmptyResults";

const ErrorState = memo(function ErrorState({ onRetry }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-center">
      <p className="font-poppins! text-sm leading-6 text-red-600">
        Something went wrong while fetching search results.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-3 inline-flex items-center justify-center rounded-full bg-main px-4 py-2 font-poppins! text-[13px] font-medium text-white transition-colors duration-150 hover:bg-[#5baa47]"
      >
        Try again
      </button>
    </div>
  );
});

ErrorState.displayName = "ErrorState";

/* ─── section block ─── */
const ResultColumn = memo(function ResultColumn({ label, children }) {
  return (
    <div>
      <p className="mb-1.5 font-oswald! text-[10px] uppercase tracking-[0.28em] text-main sm:mb-2">
        {label}
      </p>

      <div className="space-y-0.5">{children}</div>
    </div>
  );
});

ResultColumn.displayName = "ResultColumn";

/* ─── main overlay ─── */
export default function SearchOverlay({ open = false, onClose }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const requestIdRef = useRef(0);

  const [query, setQuery] = useState("");
  const [retryNonce, setRetryNonce] = useState(0);
  const [results, setResults] = useState(EMPTY_SEARCH_RESULTS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedQuery = useDebouncedValue(query, 250);

  const trimmed = query.trim();
  const debouncedTrimmed = debouncedQuery.trim();
  const displayQuery = trimmed || debouncedTrimmed;

  const limitedResults = useMemo(() => {
    return {
      categories: (results.categories || []).slice(0, 4),
      products: (results.products || []).slice(0, 4),
      blogs: (results.blogs || []).slice(0, 4),
    };
  }, [results]);

  const hasQuery = displayQuery.length > 0;
  const hasCategories = limitedResults.categories.length > 0;
  const hasProducts = limitedResults.products.length > 0;
  const hasBlogs = limitedResults.blogs.length > 0;
  const hasResults = hasCategories || hasProducts || hasBlogs;
  const showEmpty = hasQuery && !isLoading && !error && !hasResults;
  const showDropdown = hasQuery || isLoading || Boolean(error);

  const navigateToSearch = useCallback(
    (q = "") => {
      const nextQuery = String(q ?? "").trim();
      onClose();
      router.push(buildSearchPageHref(nextQuery));
    },
    [onClose, router]
  );

  const navigateToHref = useCallback(
    (href) => {
      onClose();
      router.push(href);
    },
    [onClose, router]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    setResults(EMPTY_SEARCH_RESULTS);
    setError("");
    inputRef.current?.focus();
  }, []);

  const handleInputChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const handleInputKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        navigateToSearch(query);
      }
    },
    [navigateToSearch, query]
  );

  const handleBottomAction = useCallback(() => {
    navigateToSearch(displayQuery);
  }, [navigateToSearch, displayQuery]);

  const handleRetry = useCallback(() => {
    setRetryNonce((prev) => prev + 1);
  }, []);

  /* ─── fetch API ─── */
  useEffect(() => {
    if (!open) return;

    if (!debouncedTrimmed) {
      setIsLoading(false);
      setError("");
      setResults(EMPTY_SEARCH_RESULTS);
      return;
    }

    const currentRequestId = requestIdRef.current + 1;
    requestIdRef.current = currentRequestId;

    const controller = new AbortController();

    setIsLoading(true);
    setError("");

    getSearchSuggests(debouncedTrimmed, { signal: controller.signal })
      .then((response) => {
        if (requestIdRef.current !== currentRequestId) return;
        setResults(adaptSearchResponse(response, "en"));
      })
      .catch((fetchError) => {
        if (isCanceledError(fetchError)) return;
        if (requestIdRef.current !== currentRequestId) return;

        console.error("[SearchOverlay] search fetch failed:", fetchError);
        setResults(EMPTY_SEARCH_RESULTS);
        setError(
          fetchError?.response?.data?.message ||
            "Something went wrong while fetching results."
        );
      })
      .finally(() => {
        if (requestIdRef.current !== currentRequestId) return;
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [open, debouncedTrimmed, retryNonce]);

  /* ─── Escape key ─── */
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* ─── autofocus ─── */
  useEffect(() => {
    if (!open) return;

    const id = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => window.clearTimeout(id);
  }, [open]);

  /* ─── reset on close ─── */
  useEffect(() => {
    if (open) return;

    const id = window.setTimeout(() => {
      setQuery("");
      setResults(EMPTY_SEARCH_RESULTS);
      setIsLoading(false);
      setError("");
    }, 180);

    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <>
          <motion.div
            key="search-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 z-1100 bg-black/12"
            aria-hidden="true"
          />

          <motion.div
            key="search-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={panelTransition}
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
            className="pointer-events-none fixed inset-x-0 top-0 z-1200 px-3 pt-2.5 sm:px-5 sm:pt-3.5 md:px-6 md:pt-4"
          >
            <div className="mx-auto w-full max-w-[720px] lg:max-w-[960px]">
              <div className="pointer-events-auto overflow-hidden rounded-2xl border border-white/70 bg-white/95 shadow-[0_12px_40px_rgba(0,0,0,0.10)] backdrop-blur-sm sm:rounded-[24px]">
                <div className="flex items-center gap-2.5 px-3.5 py-3 sm:gap-3 sm:px-5 sm:py-3.5">
                  <Search
                    size={18}
                    strokeWidth={1.8}
                    className="shrink-0 text-secondary"
                  />

                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Search products, categories, blogs…"
                    autoComplete="off"
                    spellCheck="false"
                    className="h-8 flex-1 border-none bg-transparent font-poppins! text-sm text-soft-black outline-none placeholder:text-secondary sm:h-9 sm:text-[15px]"
                  />

                  {isLoading ? (
                    <LoaderCircle
                      size={16}
                      strokeWidth={1.8}
                      className="shrink-0 animate-spin text-main"
                    />
                  ) : null}

                  {trimmed ? (
                    <button
                      type="button"
                      onClick={handleClear}
                      aria-label="Clear search"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-secondary transition-colors duration-150 hover:bg-gray-100 hover:text-soft-black sm:h-8 sm:w-8"
                    >
                      <X size={15} strokeWidth={1.8} />
                    </button>
                  ) : null}

                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close search"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-soft-black transition-colors duration-150 hover:border-main/25 hover:text-main sm:h-9 sm:w-9"
                  >
                    <X size={15} strokeWidth={1.8} />
                  </button>
                </div>

                {showDropdown ? (
                  <div className="border-t border-gray-100 px-3.5 pb-3.5 pt-3 sm:px-5 sm:pb-4 sm:pt-3.5">
                    <div className="max-h-[55vh] overflow-y-auto sm:max-h-[380px]">
                      {isLoading ? (
                        <LoadingSkeleton />
                      ) : error ? (
                        <ErrorState onRetry={handleRetry} />
                      ) : showEmpty ? (
                        <EmptyResults
                          query={displayQuery}
                          onSearch={navigateToSearch}
                        />
                      ) : (
                        <div className="space-y-3 sm:space-y-4">
                          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {hasCategories ? (
                              <ResultColumn label="Categories">
                                {limitedResults.categories.map((category) => (
                                  <CategoryRow
                                    key={category.id}
                                    category={category}
                                    onSelect={navigateToHref}
                                  />
                                ))}
                              </ResultColumn>
                            ) : null}

                            {hasProducts ? (
                              <ResultColumn label="Products">
                                {limitedResults.products.map((product) => (
                                  <ProductRow
                                    key={product.id}
                                    product={product}
                                    onSelect={navigateToHref}
                                  />
                                ))}
                              </ResultColumn>
                            ) : null}

                            {hasBlogs ? (
                              <ResultColumn label="Blogs">
                                {limitedResults.blogs.map((blog) => (
                                  <BlogRow
                                    key={blog.id}
                                    blog={blog}
                                    onSelect={navigateToHref}
                                  />
                                ))}
                              </ResultColumn>
                            ) : null}
                          </div>

                          <button
                            type="button"
                            onClick={handleBottomAction}
                            className="group flex w-full items-center justify-between gap-2 rounded-xl border border-gray-100 bg-[#f8faf6] px-3 py-2.5 text-left transition-colors duration-150 hover:bg-[#eef8ea] sm:gap-3 sm:px-3.5 sm:py-3"
                          >
                            <div className="flex min-w-0 items-center gap-2">
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-main shadow-sm sm:h-8 sm:w-8">
                                <Search size={13} strokeWidth={1.8} />
                              </div>

                              <p className="truncate font-poppins! text-[13px] font-medium text-soft-black">
                                Search for "{displayQuery}"
                              </p>
                            </div>

                            <ArrowRight
                              size={14}
                              strokeWidth={1.8}
                              className="shrink-0 text-gray-300 transition-colors duration-150 group-hover:text-main"
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
