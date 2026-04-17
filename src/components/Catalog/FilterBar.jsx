"use client";

import FilterPopover from "./FilterPopover";
import AvailabilityFilter from "./AvailabilityFilter";
import PriceFilter from "./PriceFilter";
import SortDropdown from "./SortDropdown";

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
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* left: filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary font-poppins!">
          Filter:
        </span>

        {/* availability */}
        <FilterPopover label="Availability" isActive={availability.length > 0}>
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

        {/* price */}
        <FilterPopover
          label="Price"
          isActive={priceRange.from !== "" || priceRange.to !== ""}
        >
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

        <span className="hidden text-sm text-secondary sm:block font-poppins!">
          {totalFiltered} product{totalFiltered !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
