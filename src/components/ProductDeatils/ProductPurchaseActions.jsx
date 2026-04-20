"use client";

import { useEffect, useRef, useState } from "react";

/* ── tiny inline icons ── */
function MinusIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 4.25a.75.75 0 0 1 .75.75v4.25H15a.75.75 0 0 1 0 1.5h-4.25V15a.75.75 0 0 1-1.5 0v-4.25H5a.75.75 0 0 1 0-1.5h4.25V5a.75.75 0 0 1 .75-.75Z" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-main"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M7 10V8a5 5 0 0 1 10 0v2" />
      <rect x="4" y="10" width="16" height="10" rx="2.5" />
      <path d="M12 14v2.5" />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M7 12v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-7" />
      <path d="M12 16V4" />
      <path d="m8.5 7.5 3.5-3.5 3.5 3.5" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10 5" />
      <path d="M14 11a5 5 0 0 0-7.07 0L5.52 12.4a5 5 0 0 0 7.07 7.07L14 19" />
    </svg>
  );
}

export default function ProductPurchaseActions({
  stockStatus,
  productTitle,
  shortDescription,
}) {
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);
  const isOutOfStock = stockStatus === "out_of_stock";

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleDecrease() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function handleIncrease() {
    setQuantity((q) => Math.min(99, q + 1));
  }

  function handleQtyChange(e) {
    const v = Number(e.target.value);
    if (Number.isNaN(v)) {
      setQuantity(1);
      return;
    }
    setQuantity(Math.max(1, Math.min(99, v)));
  }

  async function handleCopyLink() {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  async function handleShare() {
    if (typeof window === "undefined") return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: productTitle,
          text: shortDescription || productTitle,
          url: window.location.href,
        });
        return;
      } catch {
        return;
      }
    }
    await handleCopyLink();
  }

  return (
    <section className="rounded-[28px] border border-black/5 bg-[#f7f7f4] p-4 sm:p-5">
      {/* ── qty + add to cart ── */}
      <div className="grid gap-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-end">
        <div>
          <label
            htmlFor="product-quantity"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-secondary"
          >
            Quantity
          </label>
          <div className="flex h-12 items-center rounded-2xl border border-black/8 bg-white">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={isOutOfStock}
              className="inline-flex h-full w-12 items-center justify-center text-soft-black transition hover:text-main disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <MinusIcon />
            </button>
            <input
              id="product-quantity"
              type="number"
              min="1"
              max="99"
              inputMode="numeric"
              value={quantity}
              onChange={handleQtyChange}
              disabled={isOutOfStock}
              className="h-full w-full border-0 bg-transparent text-center text-sm font-medium text-soft-black outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={handleIncrease}
              disabled={isOutOfStock}
              className="inline-flex h-full w-12 items-center justify-center text-soft-black transition hover:text-main disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <PlusIcon />
            </button>
          </div>
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-main px-6 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add to Cart
        </button>
      </div>

      {/* ── buy now ── */}
      <button
        type="button"
        disabled={isOutOfStock}
        className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-2xl border border-black/8 bg-white px-6 text-sm font-semibold text-soft-black transition hover:border-main hover:text-main disabled:cursor-not-allowed disabled:opacity-50"
      >
        Buy Now
      </button>

      {/* ── secure note ── */}
      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-main/10 bg-white p-4">
        <div className="mt-0.5 shrink-0">
          <LockIcon />
        </div>
        <div>
          <p className="text-sm font-medium text-soft-black">
            Secure payment at checkout
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            All major payment methods available. Final order details confirmed
            before payment.
          </p>
        </div>
      </div>

      {/* ── share row ── */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-5">
        <p className="text-sm text-secondary">Share this product</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-black/8 bg-white px-4 text-sm font-medium text-soft-black transition hover:border-main hover:text-main"
          >
            <ShareIcon /> Share
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-black/8 bg-white px-4 text-sm font-medium text-soft-black transition hover:border-main hover:text-main"
          >
            <LinkIcon /> {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>
    </section>
  );
}
