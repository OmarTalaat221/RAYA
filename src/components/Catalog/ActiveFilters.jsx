"use client";

import { X } from "lucide-react";

export default function ActiveFilters({
  availability,
  priceRange,
  onResetAvailability,
  onResetPrice,
  onClearAll,
  currency = "AED",
}) {
  const chips = [];

  if (availability.includes("in_stock")) {
    chips.push({
      key: "in_stock",
      label: "In stock",
      onRemove: () => onResetAvailability(),
    });
  }

  if (availability.includes("out_of_stock")) {
    chips.push({
      key: "out_of_stock",
      label: "Out of stock",
      onRemove: () => onResetAvailability(),
    });
  }

  if (priceRange.from !== "" || priceRange.to !== "") {
    const from =
      priceRange.from !== ""
        ? `${currency} ${Number(priceRange.from).toFixed(2)}`
        : `${currency} 0.00`;
    const to =
      priceRange.to !== ""
        ? `${currency} ${Number(priceRange.to).toFixed(2)}`
        : "Max";

    chips.push({
      key: "price",
      label: `${from} – ${to}`,
      onRemove: () => onResetPrice(),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-soft-black shadow-sm font-poppins!"
        >
          {chip.label}

          <button
            onClick={chip.onRemove}
            aria-label={`Remove filter: ${chip.label}`}
            className="ml-0.5 rounded-full p-0.5 text-secondary transition-colors hover:bg-gray-100 hover:text-soft-black"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        </span>
      ))}

      <button
        onClick={onClearAll}
        className="text-xs font-medium text-main underline underline-offset-2 transition-colors hover:text-main/80 font-poppins!"
      >
        Clear all
      </button>
    </div>
  );
}
