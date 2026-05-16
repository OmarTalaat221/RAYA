"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════
   Image resolver (matches cart.adapter.js logic)
   ═══════════════════════════════════════════════ */

const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://rdspharma.cloud";

function resolveImage(src) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/cdn/shop/")) return `https://www.rdspharma.online${src}`;
  const clean = src.startsWith("/") ? src : `/${src}`;
  return `${IMAGE_BASE_URL}${clean}`;
}

/* ═══════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════ */

const CheckoutSummary = memo(function CheckoutSummary({
  items,
  subtotal: cartSubtotal,
  serverSummary,
}) {
  const subtotal = serverSummary?.subtotal ?? cartSubtotal ?? 0;
  const shipping = serverSummary?.shipping ?? 0;
  const discount = serverSummary?.discount ?? 0;
  const tax = serverSummary?.tax ?? 0;
  const total = serverSummary?.total ?? subtotal + shipping - discount + tax;

  return (
    <div className="lg:sticky lg:top-8">
      <div className="rounded-[20px] border border-black/5 bg-[#fafaf9] p-5 sm:p-6">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-oswald! text-soft-black">
            Order Summary
          </h2>
          <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-xs font-medium text-secondary">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Items */}
        <div className="space-y-3.5 mb-5">
          {items.map((item) => {
            const imageSrc = resolveImage(item.image);
            const lineTotal = (item.price * item.quantity).toFixed(2);

            return (
              <div key={item.id} className="flex gap-3.5">
                {/* Image */}
                <div className="relative h-[56px] w-[56px] flex-shrink-0  rounded-xl border border-black/5 bg-white">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={item.title || "Product"}
                      fill
                      className="object-contain p-1.5"
                      sizes="56px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-[10px] text-secondary">No img</span>
                    </div>
                  )}

                  {/* Quantity badge */}
                  <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-soft-black text-[9px] font-bold text-white">
                    {item.quantity}
                  </span>
                </div>

                {/* Info */}
                <div className="flex flex-1 items-center justify-between gap-2 min-w-0">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium leading-5 text-soft-black">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-secondary">
                      {item.price.toFixed(2)} {item.currency || "AED"} ×{" "}
                      {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-[13px] font-semibold text-soft-black whitespace-nowrap">
                    {lineTotal}{" "}
                    <span className="text-[10px] font-normal text-secondary">
                      {item.currency || "AED"}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-black/5 my-4" />

        {/* Breakdown */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Subtotal</span>
            <span className="font-medium text-soft-black">
              {subtotal.toFixed(2)} AED
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-secondary">Shipping</span>
            <span
              className={
                shipping === 0
                  ? "font-medium text-main"
                  : "font-medium text-soft-black"
              }
            >
              {shipping === 0 ? "Free" : `${shipping.toFixed(2)} AED`}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-main">Discount</span>
              <span className="font-medium text-main">
                -{discount.toFixed(2)} AED
              </span>
            </div>
          )}

          {tax > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Tax</span>
              <span className="font-medium text-soft-black">
                {tax.toFixed(2)} AED
              </span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="border-t border-black/5 mt-4 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-oswald! font-bold text-soft-black">
              Total
            </span>
            <span className="text-xl font-oswald! font-bold text-soft-black">
              {total.toFixed(2)}{" "}
              <span className="text-sm font-medium text-secondary">AED</span>
            </span>
          </div>
        </div>

        {/* Continue shopping */}
        <div className="mt-5 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary transition hover:text-main"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
});

CheckoutSummary.displayName = "CheckoutSummary";

export default CheckoutSummary;
