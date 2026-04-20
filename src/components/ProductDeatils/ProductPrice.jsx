import { formatMoney, getCurrentPrice } from "./utils";

export default function ProductPrice({
  currency,
  oldPrice,
  newPrice,
  badge,
  isOnSale,
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

        {showSale && badge ? (
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
