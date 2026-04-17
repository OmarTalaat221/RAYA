"use client";

import FilterPopover from "./FilterPopover";
import AvailabilityFilter from "./AvailabilityFilter";
import PriceFilter from "./PriceFilter";
import SortDropdown from "./SortDropdown";
import MobileFiltersDrawer from "./MobileFiltersDrawer";

export default function FilterBar({
  availability,
  priceRange,
  priceStats,
  availabilityCounts,
  sortBy,
  totalFiltered,
  onToggleAvailability,
  onResetAvailability,
  onUpdatePrice,
  onResetPrice,
  onUpdateSort,
  currency = "AED",
}) {
  const hasPrice = priceRange.from !== "" || priceRange.to !== "";

  return (
    <>
      {/* ── Desktop / Large Tablet ───────────────────────────────────── */}
      <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-6">
        {/* left: filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary font-poppins!">
            Filter:
          </span>

          <FilterPopover
            label="Availability"
            isActive={availability.length > 0}
          >
            {({ close }) => (
              <AvailabilityFilter
                availability={availability}
                counts={availabilityCounts}
                onToggle={onToggleAvailability}
                onReset={onResetAvailability}
                onClose={close}
              />
            )}
          </FilterPopover>

          <FilterPopover label="Price" isActive={hasPrice}>
            {({ close }) => (
              <PriceFilter
                priceRange={priceRange}
                priceStats={priceStats}
                onUpdate={onUpdatePrice}
                onReset={onResetPrice}
                onClose={close}
                currency={currency}
              />
            )}
          </FilterPopover>
        </div>

        {/* right: sort + count */}
        <div className="flex items-center gap-4">
          <SortDropdown value={sortBy} onChange={onUpdateSort} />

          <span className="text-sm text-secondary font-poppins!">
            {totalFiltered} product{totalFiltered !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Mobile / Tablet ──────────────────────────────────────────── */}
      <div className="lg:hidden space-y-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-secondary font-poppins!">
            {totalFiltered} product{totalFiltered !== 1 ? "s" : ""}
          </span>

          <MobileFiltersDrawer
            availability={availability}
            priceRange={priceRange}
            priceStats={priceStats}
            availabilityCounts={availabilityCounts}
            onToggleAvailability={onToggleAvailability}
            onResetAvailability={onResetAvailability}
            onUpdatePrice={onUpdatePrice}
            onResetPrice={onResetPrice}
            currency={currency}
          />
        </div>

        <div className="w-full sm:max-w-[320px]">
          <SortDropdown value={sortBy} onChange={onUpdateSort} fullWidth />
        </div>
      </div>
    </>
  );
}
