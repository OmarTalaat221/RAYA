"use client";

import { useSearchParams } from "next/navigation";
import {
  Suspense,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { fetchCart } from "../../store/cartSlice";
import { getCheckoutSessionStatus } from "../../services/checkout.service";

const SESSION_KEY = "rds-checkout-session";
const SUCCESS = new Set([
  "PAID",
  "SUCCEEDED",
  "SUCCESS",
  "COMPLETED",
  "CONFIRMED",
]);
const PENDING = new Set([
  "PENDING",
  "PROCESSING",
  "REQUIRES_ACTION",
  "PENDING_PAYMENT",
  "AWAITING_PAYMENT",
]);
const FAILED = new Set([
  "FAILED",
  "CANCELLED",
  "CANCELED",
  "EXPIRED",
  "PAYMENT_FAILED",
  "DECLINED",
]);
const POLL_INTERVAL = 3500;
const MAX_POLLS = 12;

function norm(s) {
  return String(s || "")
    .trim()
    .toUpperCase();
}

function kind(s) {
  const n = norm(s);
  if (SUCCESS.has(n)) return "success";
  if (FAILED.has(n)) return "failed";
  if (PENDING.has(n)) return "pending";
  return n ? "neutral" : "pending";
}

function toNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function toCur(v) {
  const c = String(v || "AED").trim();
  return c ? c.toUpperCase() : "AED";
}

function clearStored(oid) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return;
    const p = JSON.parse(raw);
    if (!oid || p?.orderId === oid) {
      window.sessionStorage.removeItem(SESSION_KEY);
    }
  } catch {
    /* ignore */
  }
}

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

function StatusIcon({ k }) {
  if (k === "failed") {
    return (
      <div className="mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-red-50">
        <svg
          className="h-9 w-9 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    );
  }
  if (k === "pending" || k === "neutral") {
    return (
      <div className="mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-main/10">
        <span className="h-9 w-9 animate-spin rounded-full border-2 border-main/25 border-t-main" />
      </div>
    );
  }
  return (
    <div className="mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-main/10">
      <svg
        className="h-9 w-9 text-main"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

const HEADINGS = {
  success: "Order Confirmed",
  failed: "Payment Not Completed",
  pending: "Payment Processing",
};

const DESCRIPTIONS = {
  success:
    "Thank you for your purchase! Your order has been placed successfully and is being processed.",
  failed:
    "We could not confirm your payment for this order. Please try checkout again or contact support if the issue continues.",
  pending:
    "We are still waiting for the final payment confirmation from Stripe. This page refreshes automatically.",
};

function SuccessContent() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(orderId));
  const [error, setError] = useState("");

  const pollRef = useRef(0);
  const syncedRef = useRef(false);

  const fetchStatus = useCallback(
    async ({ signal, silent = false } = {}) => {
      if (!orderId) return;
      if (!silent) setLoading(true);

      try {
        const res = await getCheckoutSessionStatus(orderId, { signal });
        setData(res?.data || res);
        setError("");
      } catch (e) {
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return;
        setError(
          e?.response?.data?.message ||
            "We could not verify your order status right now."
        );
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [orderId]
  );

  useEffect(() => {
    pollRef.current = 0;
    syncedRef.current = false;
  }, [orderId]);

  useEffect(() => {
    if (!orderId) return;
    clearStored(orderId);
    const c = new AbortController();
    fetchStatus({ signal: c.signal });
    return () => c.abort();
  }, [orderId, fetchStatus]);

  useEffect(() => {
    if (!data) return;
    const isCOD = searchParams.get("method") === "cod";
    const rawStatus = data?.status;
    const k = isCOD && norm(rawStatus) === "PENDING" ? "success" : kind(rawStatus);

    if (k !== "pending") return;
    if (pollRef.current >= MAX_POLLS) return;
    const t = window.setTimeout(() => {
      pollRef.current += 1;
      fetchStatus({ silent: true });
    }, POLL_INTERVAL);
    return () => window.clearTimeout(t);
  }, [data, fetchStatus, searchParams]);

  useEffect(() => {
    if (!data || syncedRef.current) return;
    const isCOD = searchParams.get("method") === "cod";
    const rawStatus = data?.status;
    const k = isCOD && norm(rawStatus) === "PENDING" ? "success" : kind(rawStatus);

    if (k === "success") {
      syncedRef.current = true;
      dispatch(fetchCart());
    }
  }, [data, dispatch, searchParams]);

  const handleRetry = useCallback(() => fetchStatus(), [fetchStatus]);

  if (!orderId) {
    return (
      <div className="rounded-[30px] border border-black/5 bg-white/95 p-6 shadow-[0_24px_80px_rgba(45,45,45,0.10)] backdrop-blur-sm sm:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-black/5">
            <svg
              className="h-9 w-9 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="mb-3 text-[1.75rem] leading-tight font-oswald! text-soft-black sm:text-3xl">
            Missing Order Reference
          </h1>

          <p className="mb-8 max-w-[42ch] text-sm leading-6 text-secondary">
            We could not find an order reference in the page URL. Please return
            to the shop and try again.
          </p>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="flex h-12 items-center justify-center rounded-2xl bg-main px-8 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(104,188,82,0.24)] transition duration-200 hover:bg-[#5eae49] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/20"
            >
              Back to Home
            </Link>

            <Link
              href="/checkout"
              className="flex h-12 items-center justify-center rounded-2xl border border-black/10 bg-white px-8 text-sm font-medium text-soft-black transition duration-200 hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/10"
            >
              Go to Checkout
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const method = searchParams.get("method");
  const isCOD = method === "cod";

  // For COD, treat PENDING as SUCCESS since payment is collected on delivery
  const rawStatus = data?.status;
  const k = isCOD && norm(rawStatus) === "PENDING" ? "success" : kind(rawStatus);

  const heading =
    loading && !data
      ? "Checking Order Status"
      : isCOD && k === "success"
        ? "Order Confirmed (COD)"
        : HEADINGS[k] || "Order Update";

  const description =
    loading && !data
      ? "Please wait while we verify the latest payment status for your order."
      : isCOD && k === "success"
        ? "Thank you for your purchase! Your Cash on Delivery order has been successfully placed."
        : DESCRIPTIONS[k] || "We are checking the latest status of your order.";

  const status = isCOD && norm(rawStatus) === "PENDING" ? "CONFIRMED" : norm(rawStatus) || "PENDING";
  const total = toNum(data?.total);
  const currencyCode = toCur(data?.currency);
  const email = data?.shippingAddress?.email || "";

  return (
    <div className="rounded-[30px] border border-black/5 bg-white/95 p-6 shadow-[0_24px_80px_rgba(45,45,45,0.10)] backdrop-blur-sm sm:p-10">
      <div className="flex flex-col items-center text-center">
        <StatusIcon k={loading && !data ? "pending" : k} />

        <h1 className="mb-3 text-[1.75rem] leading-tight font-oswald! text-soft-black sm:text-3xl">
          {heading}
        </h1>

        <p className="mb-4 max-w-[42ch] text-sm leading-6 text-secondary">
          {description}
        </p>

        {error && (
          <div className="mb-5 w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm leading-6 text-red-600">{error}</p>
          </div>
        )}

        <div className="mb-6 grid w-full gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-[#f4f3f0] px-4 py-3.5">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-secondary">
              Order Reference
            </span>
            <span className="mt-1 block break-all text-sm font-oswald! font-semibold tracking-[0.08em] text-soft-black">
              {orderId}
            </span>
          </div>

          <div className="rounded-2xl bg-[#f4f3f0] px-4 py-3.5">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-secondary">
              Status
            </span>
            <span
              className={`mt-1 block text-sm font-oswald! font-semibold tracking-[0.08em] ${
                k === "success"
                  ? "text-main"
                  : k === "failed"
                    ? "text-red-500"
                    : "text-soft-black"
              }`}
            >
              {status}
            </span>
          </div>

          <div className="rounded-2xl bg-[#f4f3f0] px-4 py-3.5">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-secondary">
              Total
            </span>
            <span className="mt-1 block text-sm font-oswald! font-semibold tracking-[0.08em] text-soft-black">
              {total.toFixed(2)} {currencyCode}
            </span>
          </div>
        </div>

        {email ? (
          <p className="mb-3 text-sm leading-6 text-secondary">
            Updates for this order will be sent to{" "}
            <span className="font-medium text-soft-black">{email}</span>.
          </p>
        ) : null}

        {k === "success" && (
          <p className="mb-8 text-sm leading-6 text-secondary">
            A confirmation email will be sent to you shortly with your order
            details and tracking information.
          </p>
        )}

        {k === "failed" && (
          <p className="mb-8 text-sm leading-6 text-secondary">
            If your card was charged unexpectedly, please wait a few moments and
            refresh this page before retrying checkout.
          </p>
        )}

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          {k === "failed" ? (
            <>
              <Link
                href="/checkout"
                className="flex h-12 items-center justify-center rounded-2xl bg-main px-8 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(104,188,82,0.24)] transition duration-200 hover:bg-[#5eae49] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/20"
              >
                Try Checkout Again
              </Link>
              <Link
                href="/"
                className="flex h-12 items-center justify-center rounded-2xl border border-black/10 bg-white px-8 text-sm font-medium text-soft-black transition duration-200 hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/10"
              >
                Back to Home
              </Link>
            </>
          ) : k === "pending" || loading ? (
            <>
              <button
                type="button"
                onClick={handleRetry}
                className="flex h-12 items-center justify-center rounded-2xl bg-main px-8 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(104,188,82,0.24)] transition duration-200 hover:bg-[#5eae49] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/20"
              >
                Refresh Status
              </button>
              <Link
                href="/"
                className="flex h-12 items-center justify-center rounded-2xl border border-black/10 bg-white px-8 text-sm font-medium text-soft-black transition duration-200 hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/10"
              >
                Back to Home
              </Link>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccess() {
  return (
    <main className="relative flex min-h-screen min-h-dvh items-center justify-center overflow-hidden bg-[#f4f3f0] px-4 py-10 font-poppins! sm:px-6 lg:px-8">
      <BackgroundBlobs />

      <div className="relative z-10 mx-auto w-full max-w-[1080px]">
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

        <Suspense
          fallback={
            <div className="flex min-h-[300px] items-center justify-center rounded-[30px] border border-black/5 bg-white/95 shadow-[0_24px_80px_rgba(45,45,45,0.10)]">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-main/30 border-t-main" />
            </div>
          }
        >
          <SuccessContent />
        </Suspense>

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
