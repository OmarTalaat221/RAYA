"use client";

import { Check } from "lucide-react";

export default function AvailabilityFilter({
  availability,
  counts,
  onToggle,
  onReset,
  onClose,
}) {
  const options = [
    { key: "in_stock", label: "In stock", count: counts.inStock },
    { key: "out_of_stock", label: "Out of stock", count: counts.outOfStock },
  ];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary font-poppins!">
          Availability
        </span>

        {availability.length > 0 && (
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

      <div className="space-y-1">
        {options.map((option) => {
          const isChecked = availability.includes(option.key);

          return (
            <label
              key={option.key}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-gray-50"
            >
              <span
                className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-150 ${
                  isChecked
                    ? "border-main bg-main text-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {isChecked && <Check size={12} strokeWidth={3} />}
              </span>

              <span className="flex-1 text-sm text-soft-black font-poppins!">
                {option.label}
              </span>

              <span className="text-xs text-secondary font-poppins!">
                ({option.count})
              </span>

              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(option.key)}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
