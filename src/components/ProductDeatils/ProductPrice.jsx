import { formatMoney, getCurrentPrice } from "./utils";

export default function ProductPrice({
  currency,
  oldPrice,
  newPrice,
  badge,
  isOnSale,
  discountPercentage = 0,
}) {
  const currentPrice = getCurrentPrice(oldPrice, newPrice);
  if (currentPrice === null) return null;

  const showSale =
    Boolean(isOnSale) &&
    typeof oldPrice === "number" &&
    typeof newPrice === "number" &&
    oldPrice > newPrice;

  const formattedCurrent = formatMoney(currentPrice, currency);
  const formattedOld = showSale ? formatMoney(oldPrice, currency) : null;

  const hasDiscount =
    showSale &&
    typeof discountPercentage === "number" &&
    discountPercentage > 0;

  console.log(discountPercentage, "discountPercentage");

  return (
    <div className="rounded-3xl border border-black/5 bg-[#f7f7f4] p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <span className="text-3xl font-semibold tracking-tight text-soft-black sm:text-4xl">
          {formattedCurrent}
        </span>

        {formattedOld ? (
          <span className="pb-1 text-base text-secondary line-through sm:text-lg">
            {formattedOld}
          </span>
        ) : null}

        {hasDiscount ? (
          <span className="inline-flex items-center rounded-full bg-[#ef4444] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_4px_12px_rgba(239,68,68,0.25)]">
            Save {Math.round(discountPercentage)}%
          </span>
        ) : null}

        {showSale && badge && !hasDiscount ? (
          <span className="inline-flex items-center rounded-full bg-[#ef4444]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ef4444]">
            {badge}
          </span>
        ) : null}
      </div>

      <p className="mt-2 text-sm leading-6 text-secondary">
        Price shown in {currency || "AED"}. Final total confirmed at checkout.
      </p>
    </div>
  );
}
