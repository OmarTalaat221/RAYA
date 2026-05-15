"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCanHover from "./useCanHover";
import useFilters from "./useFilters";
import FilterBar from "./FilterBar";
import ActiveFilters from "./ActiveFilters";
import ProductsGrid from "./ProductsGrid";
import LoadMoreButton from "./LoadMoreButton";
import EmptyState from "./EmptyState";
import {
  getProducts,
  getProductsByCategorySlug,
} from "../../services/products.service";
import { adaptApiProducts } from "./product.adapter";
import { sortToApiParams } from "./sort.utils";
import { availabilityToApiParam, priceRangeToApiParam } from "./filters.utils";

const PRODUCTS_PER_PAGE = 12;

/**
 * source = "all"            → GET /products
 * source = "category:<slug>" → GET /products/category/<slug>
 */
function isServerSource(source) {
  return typeof source === "string" && source.length > 0;
}

export default function CatalogClient({
  products: initialProducts = [],
  title = "All Products",
  subtitle = "",
  currency = "AED",
  source = null, // "all" | "category:skincare" | null (static)
}) {
  const canHover = useCanHover();
  const serverDriven = isServerSource(source);

  // ─── Server-driven state ────────────────────────────────────────────────────
  const [serverProducts, setServerProducts] = useState([]);
  const [serverPagination, setServerPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
  });
  const [highestPrice, setHighestPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(serverDriven);

  const productsForFilters = serverDriven ? serverProducts : initialProducts;

  const filters = useFilters(productsForFilters, {
    serverDriven,
    serverHighestPrice: highestPrice,
  });

  // ─── API fetcher ────────────────────────────────────────────────────────────
  const fetchFromApi = useCallback(
    async ({ page, sortBy, sortOrder, in_stock, priceRange }) => {
      if (!serverDriven) return;

      setIsLoading(true);

      try {
        const params = {
          page,
          limit: PRODUCTS_PER_PAGE,
          sortBy,
          sortOrder,
          in_stock,
          priceRange,
        };

        let response;

        if (source === "all") {
          response = await getProducts(params);
        } else if (source.startsWith("category:")) {
          const slug = source.replace("category:", "");
          response = await getProductsByCategorySlug(slug, params);
        }

        const payload = response?.data ?? response;
        const productsBlock =
          payload?.products ?? payload?.data?.products ?? payload;

        if (!productsBlock) {
          setServerProducts([]);
          setServerPagination({
            page: 1,
            totalPages: 1,
            totalItems: 0,
            hasNextPage: false,
          });
          setHighestPrice(0);
          return;
        }

        let rawItems = [];

        if (Array.isArray(productsBlock.items)) {
          rawItems = productsBlock.items;
        } else if (Array.isArray(payload?.items)) {
          rawItems = payload.items;
        } else if (Array.isArray(productsBlock)) {
          rawItems = productsBlock;
        }

        if (rawItems.length > 0 && Array.isArray(rawItems[0]?.products)) {
          rawItems = rawItems.flatMap((item) => item.products || []);
        }

        const adapted = adaptApiProducts(rawItems, "en");
        setServerProducts(adapted);

        const pagination =
          productsBlock.pagination ?? payload?.pagination ?? {};

        setServerPagination({
          page: pagination.page ?? page,
          totalPages: pagination.totalPages ?? 1,
          totalItems: pagination.totalItems ?? adapted.length,
          hasNextPage: Boolean(pagination.hasNextPage),
        });

        const apiHighest = Number(
          payload?.highestPrice ??
            payload?.highest_price ??
            payload?.data?.highestPrice ??
            payload?.data?.highest_price ??
            0
        );

        if (Number.isFinite(apiHighest) && apiHighest > 0) {
          setHighestPrice(apiHighest);
        }
      } catch (error) {
        console.error("[CatalogClient] fetch failed:", error);
        setServerProducts([]);
        setServerPagination({
          page: 1,
          totalPages: 1,
          totalItems: 0,
          hasNextPage: false,
        });
        setHighestPrice(0);
      } finally {
        setIsLoading(false);
      }
    },
    [serverDriven, source]
  );
  // ─── Build API params from filters ──────────────────────────────────────────
  const apiQuery = useMemo(() => {
    const { sortBy, sortOrder } = sortToApiParams(filters.sortBy);
    const in_stock = availabilityToApiParam(filters.availability);
    const priceRange = priceRangeToApiParam(
      filters.debouncedPrice,
      highestPrice
    );

    return {
      page: filters.currentPage,
      sortBy,
      sortOrder,
      in_stock,
      priceRange,
    };
  }, [
    filters.sortBy,
    filters.currentPage,
    filters.availability,
    filters.debouncedPrice,
    highestPrice,
  ]);

  // ─── Trigger fetch on query change ──────────────────────────────────────────
  useEffect(() => {
    if (!serverDriven) return;
    fetchFromApi(apiQuery);
  }, [serverDriven, apiQuery, fetchFromApi]);

  // ─── Derived display state ──────────────────────────────────────────────────
  const totalPages = serverDriven
    ? serverPagination.totalPages
    : filters.totalPages;

  const totalItems = serverDriven
    ? serverPagination.totalItems
    : filters.totalFiltered;

  const showEmpty =
    !isLoading &&
    (serverDriven ? serverProducts.length === 0 : filters.totalFiltered === 0);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:p-5"
      >
        <FilterBar
          availability={filters.availability}
          priceRange={filters.priceRange}
          priceStats={filters.priceStats}
          availabilityCounts={filters.availabilityCounts}
          sortBy={filters.sortBy}
          totalFiltered={totalItems}
          onToggleAvailability={filters.toggleAvailability}
          onResetAvailability={filters.resetAvailability}
          onUpdatePrice={filters.updatePriceRange}
          onResetPrice={filters.resetPriceRange}
          onUpdateSort={filters.updateSort}
          currency={currency}
        />
      </motion.div>

      <AnimatePresence>
        {filters.hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mb-6 overflow-hidden"
          >
            <ActiveFilters
              availability={filters.availability}
              priceRange={filters.priceRange}
              onResetAvailability={filters.resetAvailability}
              onResetPrice={filters.resetPriceRange}
              onClearAll={filters.clearAllFilters}
              currency={currency}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProductsGrid products={[]} isLoading />
            </motion.div>
          ) : showEmpty ? (
            <EmptyState key="empty" onClear={filters.clearAllFilters} />
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProductsGrid
                products={filters.visibleProducts}
                canHover={canHover}
              />

              {totalPages > 1 && (
                <LoadMoreButton
                  currentPage={filters.currentPage}
                  totalPages={totalPages}
                  total={totalItems}
                  pageSize={PRODUCTS_PER_PAGE}
                  onPageChange={filters.goToPage}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
