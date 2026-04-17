"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PRODUCTS_PER_PAGE = 12;

const VALID_AVAILABILITY = ["in_stock", "out_of_stock"];
const VALID_SORTS = [
  "default",
  "price-asc",
  "price-desc",
  "title-asc",
  "title-desc",
];

function parseAvailability(value) {
  if (!value) return [];

  return Array.from(
    new Set(
      value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => VALID_AVAILABILITY.includes(item))
    )
  );
}

function parsePage(value) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function parseNumericValue(value) {
  if (value === "" || value === null || value === undefined) return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function setPageParam(params, page) {
  if (!page || page <= 1) {
    params.delete("page");
    return;
  }

  params.set("page", String(page));
}

export default function useFilters(products = []) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchParamsString = searchParams.toString();

  const currentParams = useMemo(
    () => new URLSearchParams(searchParamsString),
    [searchParamsString]
  );

  // ─── url-driven state ─────────────────────────────────
  const availability = useMemo(
    () => parseAvailability(currentParams.get("availability")),
    [currentParams]
  );

  const sortBy = useMemo(() => {
    const value = currentParams.get("sort") || "default";
    return VALID_SORTS.includes(value) ? value : "default";
  }, [currentParams]);

  const currentPageFromParams = useMemo(
    () => parsePage(currentParams.get("page")),
    [currentParams]
  );

  const minPriceFromParams = currentParams.get("minPrice") || "";
  const maxPriceFromParams = currentParams.get("maxPrice") || "";

  // ─── local input state for debounced price ────────────
  const [priceRange, setPriceRange] = useState({
    from: minPriceFromParams,
    to: maxPriceFromParams,
  });

  const [debouncedPrice, setDebouncedPrice] = useState({
    from: minPriceFromParams,
    to: maxPriceFromParams,
  });

  // sync local state with url (for back/forward/manual url edits)
  useEffect(() => {
    setPriceRange((prev) =>
      prev.from === minPriceFromParams && prev.to === maxPriceFromParams
        ? prev
        : { from: minPriceFromParams, to: maxPriceFromParams }
    );

    setDebouncedPrice((prev) =>
      prev.from === minPriceFromParams && prev.to === maxPriceFromParams
        ? prev
        : { from: minPriceFromParams, to: maxPriceFromParams }
    );
  }, [minPriceFromParams, maxPriceFromParams]);

  // ─── debounce price inputs ────────────────────────────
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setDebouncedPrice(priceRange);
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [priceRange]);

  // ─── helper: update url ───────────────────────────────
  const updateSearchParams = useCallback(
    (updater, mode = "replace") => {
      const params = new URLSearchParams(searchParamsString);

      updater(params);

      const nextQuery = params.toString();
      const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
      const currentUrl = searchParamsString
        ? `${pathname}?${searchParamsString}`
        : pathname;

      if (nextUrl === currentUrl) return;

      if (mode === "push") {
        router.push(nextUrl, { scroll: false });
      } else {
        router.replace(nextUrl, { scroll: false });
      }
    },
    [pathname, router, searchParamsString]
  );

  // ─── push debounced price to url ──────────────────────
  useEffect(() => {
    const currentMin = currentParams.get("minPrice") || "";
    const currentMax = currentParams.get("maxPrice") || "";

    if (
      debouncedPrice.from === currentMin &&
      debouncedPrice.to === currentMax
    ) {
      return;
    }

    updateSearchParams((params) => {
      const fromValue = parseNumericValue(debouncedPrice.from);
      const toValue = parseNumericValue(debouncedPrice.to);

      if (fromValue === null) {
        params.delete("minPrice");
      } else {
        params.set("minPrice", String(debouncedPrice.from));
      }

      if (toValue === null) {
        params.delete("maxPrice");
      } else {
        params.set("maxPrice", String(debouncedPrice.to));
      }

      setPageParam(params, 1);
    });
  }, [debouncedPrice, currentParams, updateSearchParams]);

  // ─── derived data ─────────────────────────────────────
  const priceStats = useMemo(() => {
    if (!products.length) return { min: 0, max: 0 };

    const prices = products.map((p) => Number(p.newPrice) || 0);

    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  const availabilityCounts = useMemo(() => {
    const inStock = products.filter((p) => p.inStock !== false).length;

    return {
      inStock,
      outOfStock: products.length - inStock,
    };
  }, [products]);

  // ─── filtered + sorted ────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = products;

    // availability
    if (availability.length > 0 && availability.length < 2) {
      const wantInStock = availability.includes("in_stock");

      result = result.filter((p) => {
        const isInStock = p.inStock !== false;
        return wantInStock ? isInStock : !isInStock;
      });
    }

    // price
    const fromPrice =
      debouncedPrice.from !== "" ? Number(debouncedPrice.from) : null;
    const toPrice = debouncedPrice.to !== "" ? Number(debouncedPrice.to) : null;

    if (fromPrice !== null || toPrice !== null) {
      result = result.filter((p) => {
        const price = Number(p.newPrice) || 0;

        if (fromPrice !== null && price < fromPrice) return false;
        if (toPrice !== null && price > toPrice) return false;

        return true;
      });
    }

    // sort
    if (sortBy !== "default") {
      result = [...result];

      switch (sortBy) {
        case "price-asc":
          result.sort(
            (a, b) => (Number(a.newPrice) || 0) - (Number(b.newPrice) || 0)
          );
          break;

        case "price-desc":
          result.sort(
            (a, b) => (Number(b.newPrice) || 0) - (Number(a.newPrice) || 0)
          );
          break;

        case "title-asc":
          result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
          break;

        case "title-desc":
          result.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
          break;
      }
    }

    return result;
  }, [products, availability, debouncedPrice, sortBy]);

  // ─── pagination ───────────────────────────────────────
  const totalFiltered = filteredProducts.length;
  const totalPages =
    totalFiltered > 0 ? Math.ceil(totalFiltered / PRODUCTS_PER_PAGE) : 1;

  const currentPage =
    totalFiltered > 0 ? Math.min(currentPageFromParams, totalPages) : 1;

  const visibleProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  // fix invalid page in url
  useEffect(() => {
    const maxPage = totalFiltered > 0 ? totalPages : 1;

    if (currentPageFromParams > maxPage) {
      updateSearchParams((params) => {
        setPageParam(params, maxPage);
      });
    }
  }, [currentPageFromParams, totalFiltered, totalPages, updateSearchParams]);

  // ─── active filters check ─────────────────────────────
  const hasActiveFilters =
    availability.length > 0 || priceRange.from !== "" || priceRange.to !== "";

  // ─── actions ──────────────────────────────────────────
  const toggleAvailability = useCallback(
    (value) => {
      updateSearchParams((params) => {
        const current = parseAvailability(params.get("availability"));

        const next = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];

        if (next.length === 0 || next.length >= 2) {
          params.delete("availability");
        } else {
          params.set("availability", next.join(","));
        }

        setPageParam(params, 1);
      });
    },
    [updateSearchParams]
  );

  const resetAvailability = useCallback(() => {
    updateSearchParams((params) => {
      params.delete("availability");
      setPageParam(params, 1);
    });
  }, [updateSearchParams]);

  const updatePriceRange = useCallback((field, value) => {
    setPriceRange((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetPriceRange = useCallback(() => {
    setPriceRange({ from: "", to: "" });
    setDebouncedPrice({ from: "", to: "" });

    updateSearchParams((params) => {
      params.delete("minPrice");
      params.delete("maxPrice");
      setPageParam(params, 1);
    });
  }, [updateSearchParams]);

  const updateSort = useCallback(
    (value) => {
      updateSearchParams((params) => {
        if (!value || value === "default") {
          params.delete("sort");
        } else {
          params.set("sort", value);
        }

        setPageParam(params, 1);
      });
    },
    [updateSearchParams]
  );

  const clearAllFilters = useCallback(() => {
    setPriceRange({ from: "", to: "" });
    setDebouncedPrice({ from: "", to: "" });

    updateSearchParams((params) => {
      params.delete("availability");
      params.delete("minPrice");
      params.delete("maxPrice");
      params.delete("sort");
      params.delete("page");
    });
  }, [updateSearchParams]);

  const goToPage = useCallback(
    (page) => {
      updateSearchParams((params) => {
        setPageParam(params, page);
      }, "push");
    },
    [updateSearchParams]
  );

  return {
    availability,
    priceRange,
    sortBy,
    filteredProducts,
    visibleProducts,
    hasActiveFilters,
    priceStats,
    availabilityCounts,
    totalFiltered,
    currentPage,
    totalPages,
    pageSize: PRODUCTS_PER_PAGE,
    toggleAvailability,
    resetAvailability,
    updatePriceRange,
    resetPriceRange,
    updateSort,
    clearAllFilters,
    goToPage,
  };
}
