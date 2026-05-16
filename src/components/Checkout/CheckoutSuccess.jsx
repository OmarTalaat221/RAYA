"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, memo } from "react";
import Link from "next/link";
import Image from "next/image";

/* ═══════════════════════════════════════════════
   Background
   ═══════════════════════════════════════════════ */

const BackgroundBlobs = memo(function BackgroundBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-[-100px] top-[-120px] h-[260px] w-[260px] rounded-full bg-main/10 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-80px] h-[300px] w-[300px] rounded-full bg-[#2d2d2d]/7 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.45),transparent_35%,rgba(255,255,255,0.16))]" />
    </div>
  );
});

BackgroundBlobs.displayName = "BackgroundBlobs";

/* ═══════════════════════════════════════════════
   Success Content (reads searchParams)
   ═══════════════════════════════════════════════ */

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="rounded-[30px] border border-black/5 bg-white/95 p-6 shadow-[0_24px_80px_rgba(45,45,45,0.10)] backdrop-blur-sm sm:p-10">
      <div className="flex flex-col items-center text-center">
        {/* Success icon */}
        <div className="mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-main/10">
          <svg
            className="h-9 w-9 text-main"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="mb-3 text-[1.75rem] leading-tight font-oswald! text-soft-black sm:text-3xl">
          Order Confirmed
        </h1>

        {/* Description */}
        <p className="mb-4 max-w-[42ch] text-sm leading-6 text-secondary">
          Thank you for your purchase! Your order has been placed successfully
          and is being processed.
        </p>

        {/* Order reference */}
        {orderId && (
          <div className="mb-6 inline-flex flex-col items-center rounded-2xl bg-[#f4f3f0] px-6 py-3.5">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-secondary">
              Order Reference
            </span>
            <span className="mt-1 text-lg font-oswald! font-semibold tracking-wider text-soft-black">
              {orderId}
            </span>
          </div>
        )}

        {/* Email note */}
        <p className="mb-8 text-sm leading-6 text-secondary">
          A confirmation email will be sent to you shortly with your order
          details and tracking information.
        </p>

        {/* CTAs */}
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="flex h-12 items-center justify-center rounded-2xl bg-main px-8 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(104,188,82,0.24)] transition duration-200 hover:bg-[#5eae49] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/20"
          >
            Back to Home
          </Link>

          <Link
            href="/collections"
            className="flex h-12 items-center justify-center rounded-2xl border border-black/10 bg-white px-8 text-sm font-medium text-soft-black transition duration-200 hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/10"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Main Export
   ═══════════════════════════════════════════════ */

export default function CheckoutSuccess() {
  return (
    <main className="relative flex min-h-screen min-h-dvh items-center justify-center overflow-hidden bg-[#f4f3f0] px-4 py-10 font-poppins! sm:px-6 lg:px-8">
      <BackgroundBlobs />

      <div className="relative z-10 mx-auto w-full max-w-[520px]">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Link href="/" className="relative block h-[72px] w-[72px]">
            <Image
              src="https://res.cloudinary.com/dbvh5i83q/image/upload/v1776082859/rds_logo_xpmbfn.webp"
              alt="RDS Pharma Logo"
              fill
              priority
              sizes="72px"
              className="object-contain"
            />
          </Link>
        </div>

        {/* Card */}
        <Suspense
          fallback={
            <div className="flex min-h-[300px] items-center justify-center rounded-[30px] border border-black/5 bg-white/95 shadow-[0_24px_80px_rgba(45,45,45,0.10)]">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-main/30 border-t-main" />
            </div>
          }
        >
          <SuccessContent />
        </Suspense>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <svg
            className="h-3.5 w-3.5 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <p className="text-xs text-secondary">Secured by Stripe</p>
        </div>
      </div>
    </main>
  );
}
