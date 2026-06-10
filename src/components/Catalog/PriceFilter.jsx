"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";

function PriceFilter({
  priceRange,
  priceStats,
  onUpdate,
  onReset,
  onClose,
  currency = "AED",
}) {
  /* ── Local draft state (not applied until user clicks Apply) ── */
  const [localFrom, setLocalFrom] = useState(priceRange.from ?? "");
  const [localTo, setLocalTo] = useState(priceRange.to ?? "");

  /* ── Sync local state when parent values change externally (reset / URL change) ── */
  useEffect(() => {
    setLocalFrom(priceRange.from ?? "");
  }, [priceRange.from]);

  useEffect(() => {
    setLocalTo(priceRange.to ?? "");
  }, [priceRange.to]);

  const hasAppliedValues = priceRange.from !== "" || priceRange.to !== "";
  const hasLocalChanges =
    String(localFrom) !== String(priceRange.from ?? "") ||
    String(localTo) !== String(priceRange.to ?? "");

  const maxPrice = useMemo(() => {
    const value = Number(priceStats?.max) || 0;
    return value.toFixed(2);
  }, [priceStats?.max]);

  const handleReset = useCallback(() => {
    setLocalFrom("");
    setLocalTo("");
    onReset();
    onClose?.();
  }, [onReset, onClose]);

  const handleFromChange = useCallback((event) => {
    setLocalFrom(event.target.value);
  }, []);

  const handleToChange = useCallback((event) => {
    setLocalTo(event.target.value);
  }, []);

  const handleApply = useCallback(() => {
    /* ── Apply both values to parent ── */
    onUpdate("from", localFrom);
    onUpdate("to", localTo);
    onClose?.();
  }, [localFrom, localTo, onUpdate, onClose]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleApply();
      }
    },
    [handleApply],
  );

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary font-poppins!">
          Price
        </span>

        {hasAppliedValues && (
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-medium text-main underline underline-offset-2 transition-colors hover:text-main/80 font-poppins!"
          >
            Reset
          </button>
        )}
      </div>

      <div className="mb-5 rounded-xl bg-[#f4f3f0] px-4 py-3">
        <p className="text-[13px] text-secondary font-poppins!">
          The highest price is{" "}
          <span className="font-semibold text-soft-black">
            {currency} {maxPrice}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end sm:gap-4">
        <div>
          <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-secondary font-poppins!">
            From
          </label>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12px] font-medium text-secondary font-poppins!">
              {currency}
            </span>

            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={localFrom}
              onChange={handleFromChange}
              onKeyDown={handleKeyDown}
              placeholder="0.00"
              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-14 pr-4 text-[15px] font-medium text-soft-black outline-none transition-all duration-200 placeholder:text-gray-300 focus:border-main/40 focus:ring-2 focus:ring-main/10 font-poppins!"
            />
          </div>
        </div>

        <div className="hidden sm:flex h-12 items-center justify-center px-1">
          <div className="h-px w-4 bg-gray-300" />
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-secondary font-poppins!">
            To
          </label>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12px] font-medium text-secondary font-poppins!">
              {currency}
            </span>

            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={localTo}
              onChange={handleToChange}
              onKeyDown={handleKeyDown}
              placeholder={maxPrice}
              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-14 pr-4 text-[15px] font-medium text-soft-black outline-none transition-all duration-200 placeholder:text-gray-300 focus:border-main/40 focus:ring-2 focus:ring-main/10 font-poppins!"
            />
          </div>
        </div>
      </div>

      {/* ── Apply button ── */}
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={handleApply}
          disabled={!hasLocalChanges}
          aria-label="Apply price filter"
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-main px-4 text-[12.5px] font-semibold text-white shadow-[0_8px_18px_rgba(104,188,82,0.22)] transition-all duration-200 hover:bg-[#5fb14a] disabled:pointer-events-none disabled:opacity-40 font-poppins!"
        >
          <Check size={14} strokeWidth={2.5} />
          Apply
        </button>
      </div>
    </div>
  );
}

export default memo(PriceFilter);