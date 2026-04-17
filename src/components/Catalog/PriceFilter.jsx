"use client";

export default function PriceFilter({
  priceRange,
  priceStats,
  onUpdate,
  onReset,
  onClose,
  currency = "AED",
}) {
  const hasValues = priceRange.from !== "" || priceRange.to !== "";

  return (
    <div className="w-[320px]">
      {/* header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary font-poppins!">
          Price
        </span>

        {hasValues && (
          <button
            onClick={() => {
              onReset();
              onClose?.();
            }}
            className="text-xs font-medium text-main underline underline-offset-2 transition-colors hover:text-main/80 font-poppins!"
          >
            Reset
          </button>
        )}
      </div>

      {/* info line */}
      <div className="mb-5 rounded-xl bg-[#f4f3f0] px-4 py-3">
        <p className="text-[13px] text-secondary font-poppins!">
          The highest price is{" "}
          <span className="font-semibold text-soft-black">
            {currency} {priceStats.max.toFixed(2)}
          </span>
        </p>
      </div>

      {/* inputs */}
      <div className="flex items-end gap-4">
        {/* from */}
        <div className="flex-1">
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
              value={priceRange.from}
              onChange={(e) => onUpdate("from", e.target.value)}
              placeholder="0.00"
              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-14 pr-4 text-[15px] font-medium text-soft-black outline-none transition-all duration-200 placeholder:text-gray-300 focus:border-main/40 focus:ring-2 focus:ring-main/10 font-poppins!"
            />
          </div>
        </div>

        {/* separator */}
        <div className="mb-3 flex h-12 items-center px-1">
          <div className="h-px w-4 bg-gray-300" />
        </div>

        {/* to */}
        <div className="flex-1">
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
              value={priceRange.to}
              onChange={(e) => onUpdate("to", e.target.value)}
              placeholder={priceStats.max.toFixed(2)}
              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-14 pr-4 text-[15px] font-medium text-soft-black outline-none transition-all duration-200 placeholder:text-gray-300 focus:border-main/40 focus:ring-2 focus:ring-main/10 font-poppins!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
