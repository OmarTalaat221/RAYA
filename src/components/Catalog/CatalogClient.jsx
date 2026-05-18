"use client";

import { motion, AnimatePresence } from "framer-motion";
import useCanHover from "./useCanHover";
import useFilters from "./useFilters";
import FilterBar from "./FilterBar";
import ActiveFilters from "./ActiveFilters";
import ProductsGrid from "./ProductsGrid";
import LoadMoreButton from "./LoadMoreButton";
import EmptyState from "./EmptyState";

const PRODUCTS_PER_PAGE = 12;

/**
 * source = "all"            → Server driven
 * source = "category:<slug>" → Server driven
 */
function isServerSource(source) {
  return typeof source === "string" && source.length > 0;
}

export default function CatalogClient({
  products = [],
  pagination = null,
  highestPrice = 0,
  title = "All Products",
  subtitle = "",
  currency = "AED",
  source = null,
}) {
  const canHover = useCanHover();
  const serverDriven = isServerSource(source);

  const filters = useFilters(products, {
    serverDriven,
    serverHighestPrice: highestPrice,
  });

  const totalPages = serverDriven
    ? (pagination?.totalPages || 1)
    : filters.totalPages;

  const totalItems = serverDriven
    ? (pagination?.totalItems || 0)
    : filters.totalFiltered;

  const showEmpty =
    serverDriven ? products.length === 0 : filters.totalFiltered === 0;

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
          {showEmpty ? (
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
