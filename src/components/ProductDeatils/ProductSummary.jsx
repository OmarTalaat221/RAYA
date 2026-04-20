import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";
import ProductCountdown from "./ProductCountdown";
import ProductPurchaseActions from "./ProductPurchaseActions";
import { getStockUi } from "./utils";

export default function ProductSummary({ product }) {
  const stockUi = getStockUi(product.stockStatus);

  return (
    <aside className="rounded-[32px] border border-black/5 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.05)] sm:p-8">
      {/* ── brand / category pills ── */}
      <div className="flex flex-wrap items-center gap-2">
        {product.brand ? (
          <span className="inline-flex items-center rounded-full bg-main/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-main">
            {product.brand}
          </span>
        ) : null}

        {product.category && product.category !== product.brand ? (
          <span className="inline-flex items-center rounded-full bg-[#f4f3f0] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
            {product.category}
          </span>
        ) : null}
      </div>

      {/* ── title ── */}
      <h1 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] text-soft-black font-oswald!">
        {product.title}
      </h1>

      {/* ── short description ── */}
      {product.shortDescription ? (
        <p className="mt-3 max-w-xl text-base leading-7 text-secondary">
          {product.shortDescription}
        </p>
      ) : null}

      {/* ── sku + stock ── */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-secondary">
        {product.sku ? (
          <span>
            SKU:{" "}
            <span className="font-medium text-soft-black">{product.sku}</span>
          </span>
        ) : null}

        {product.stockStatus ? (
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${stockUi.pillClassName}`}
          >
            <span className={`h-2 w-2 rounded-full ${stockUi.dotClassName}`} />
            {stockUi.label}
          </span>
        ) : null}
      </div>

      {/* ── rating ── */}
      <ProductRating
        rating={product.rating}
        reviewCount={product.reviewCount}
      />

      {/* ── price ── */}
      <div className="mt-6">
        <ProductPrice
          currency={product.currency}
          oldPrice={product.oldPrice}
          newPrice={product.newPrice}
          badge={product.badge}
          isOnSale={product.isOnSale}
        />
      </div>

      {/* ── countdown ── */}
      {product.limitedOffer?.enabled === true &&
      product.limitedOffer?.endsAt ? (
        <div className="mt-5">
          <ProductCountdown endsAt={product.limitedOffer.endsAt} />
        </div>
      ) : null}

      {/* ── purchase actions (client) ── */}
      <div className="mt-6">
        <ProductPurchaseActions
          stockStatus={product.stockStatus}
          productTitle={product.title}
          shortDescription={product.shortDescription}
        />
      </div>
    </aside>
  );
}
