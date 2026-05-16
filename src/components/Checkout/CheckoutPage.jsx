"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
// import { fetchCart } from "@/store/cartSlice";
// import { createPaymentIntent } from "@/services/checkout.service";
import CheckoutShippingForm from "./CheckoutShippingForm";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutPaymentStep from "./CheckoutPaymentStep";
import { fetchCart } from "../../store/cartSlice";
import { createPaymentIntent } from "../../services/checkout.service";

/* ═══════════════════════════════════════════════
   Background blobs (same visual language as auth)
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
   Step Indicator
   ═══════════════════════════════════════════════ */

const STEPS = [
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
];

const StepIndicator = memo(function StepIndicator({ currentStep }) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="mb-8 flex items-center justify-center gap-3 sm:mb-10">
      {STEPS.map((step, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <div key={step.key} className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition duration-200 ${
                  isCompleted
                    ? "bg-main text-white"
                    : isActive
                      ? "bg-main text-white shadow-[0_4px_16px_rgba(104,188,82,0.3)]"
                      : "bg-black/5 text-secondary"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>

              <span
                className={`text-sm font-medium transition duration-200 ${
                  isActive || isCompleted ? "text-soft-black" : "text-secondary"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                className={`h-[1.5px] w-10 rounded-full transition duration-200 sm:w-16 ${
                  isCompleted ? "bg-main" : "bg-black/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
});

StepIndicator.displayName = "StepIndicator";

/* ═══════════════════════════════════════════════
   Empty Cart
   ═══════════════════════════════════════════════ */

const EmptyCartState = memo(function EmptyCartState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-black/5">
        <svg
          className="h-9 w-9 text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </div>

      <h2 className="mb-2 text-xl font-oswald! text-soft-black">
        Your cart is empty
      </h2>

      <p className="mb-8 max-w-[36ch] text-sm leading-6 text-secondary">
        Add some products to your cart before proceeding to checkout.
      </p>

      <Link
        href="/collections"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-main px-8 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(104,188,82,0.24)] transition duration-200 hover:bg-[#5eae49]"
      >
        Browse Products
      </Link>
    </div>
  );
});

EmptyCartState.displayName = "EmptyCartState";

/* ═══════════════════════════════════════════════
   Loading Skeleton
   ═══════════════════════════════════════════════ */

const CheckoutSkeleton = memo(function CheckoutSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center justify-center gap-3">
        <div className="h-8 w-8 rounded-full bg-black/5" />
        <div className="h-4 w-16 rounded-lg bg-black/5" />
        <div className="h-[1.5px] w-10 rounded-full bg-black/5" />
        <div className="h-8 w-8 rounded-full bg-black/5" />
        <div className="h-4 w-16 rounded-lg bg-black/5" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          <div className="h-6 w-40 rounded-lg bg-black/5" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[72px] rounded-2xl bg-black/5" />
            <div className="h-[72px] rounded-2xl bg-black/5" />
          </div>
          <div className="h-[72px] rounded-2xl bg-black/5" />
          <div className="h-[72px] rounded-2xl bg-black/5" />
          <div className="h-[72px] rounded-2xl bg-black/5" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[72px] rounded-2xl bg-black/5" />
            <div className="h-[72px] rounded-2xl bg-black/5" />
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="h-80 rounded-[20px] bg-black/5" />
        </div>
      </div>
    </div>
  );
});

CheckoutSkeleton.displayName = "CheckoutSkeleton";

/* ═══════════════════════════════════════════════
   Submit Error Display
   ═══════════════════════════════════════════════ */

function SubmitErrorBanner({ error }) {
  if (!error) return null;

  const lines = error.split("\n").filter(Boolean);

  return (
    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
      {lines.length <= 1 ? (
        <p role="alert" className="text-sm leading-6 text-red-600">
          {error}
        </p>
      ) : (
        <ul role="alert" className="space-y-1">
          {lines.map((line, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm leading-6 text-red-600"
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              {line}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Main CheckoutPage
   ═══════════════════════════════════════════════ */

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const { items, subtotal, initialized, loading } = useSelector(
    (state) => state.cart
  );

  const [step, setStep] = useState("shipping");
  const [shippingData, setShippingData] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [serverSummary, setServerSummary] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);

  /* ── Ensure cart is loaded ── */
  useEffect(() => {
    if (!initialized) {
      dispatch(fetchCart());
    }
  }, [initialized, dispatch]);

  /* ── Handle shipping submit ── */
  const handleShippingSubmit = useCallback(async (formData) => {
    setIsCreatingIntent(true);
    setSubmitError("");

    try {
      const response = await createPaymentIntent(formData);
      const data = response.data || response;

      setClientSecret(data.clientSecret);
      setOrderId(data.orderId);
      setServerSummary(data.summary || null);
      setShippingData(formData);
      setStep("payment");

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.join("\n") ||
        "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setIsCreatingIntent(false);
    }
  }, []);

  /* ── Handle back ── */
  const handleBackToShipping = useCallback(() => {
    setStep("shipping");
    setClientSecret(null);
    setSubmitError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ── Stripe appearance (matches our design system) ── */
  const stripeAppearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#68bc52",
      colorBackground: "#ffffff",
      colorText: "#2d2d2d",
      colorDanger: "#ef4444",
      fontFamily: "Poppins, sans-serif",
      borderRadius: "16px",
      spacingUnit: "4px",
    },
    rules: {
      ".Input": {
        border: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "none",
        padding: "12px 16px",
        fontSize: "14px",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      },
      ".Input:focus": {
        border: "1px solid rgba(104,188,82,0.6)",
        boxShadow: "0 0 0 4px rgba(104,188,82,0.1)",
      },
      ".Label": {
        fontWeight: "500",
        fontSize: "13px",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        marginBottom: "8px",
        color: "#2d2d2d",
      },
      ".Tab": {
        borderRadius: "12px",
        border: "1px solid rgba(0,0,0,0.1)",
      },
      ".Tab--selected": {
        borderColor: "#68bc52",
        backgroundColor: "rgba(104,188,82,0.04)",
      },
      ".Error": {
        fontSize: "13px",
        color: "#ef4444",
      },
    },
  };

  /* ── Loading state ── */
  if (!initialized || loading) {
    return (
      <main className="relative flex min-h-screen items-start justify-center overflow-hidden bg-[#f4f3f0] px-4 py-10 font-poppins! sm:px-6 lg:px-8">
        <BackgroundBlobs />
        <div className="relative z-10 mx-auto w-full container">
          <div className="mb-6 flex justify-center sm:mb-8">
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
          <div className="rounded-[30px] border border-black/5 bg-white/95 p-5 shadow-[0_24px_80px_rgba(45,45,45,0.10)] backdrop-blur-sm sm:p-8 lg:p-10">
            <CheckoutSkeleton />
          </div>
        </div>
      </main>
    );
  }

  /* ── Empty cart ── */
  if (initialized && items.length === 0) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f3f0] px-4 py-10 font-poppins! sm:px-6 lg:px-8">
        <BackgroundBlobs />
        <div className="relative z-10 mx-auto w-full max-w-[520px]">
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
          <div className="rounded-[30px] border border-black/5 bg-white/95 p-6 shadow-[0_24px_80px_rgba(45,45,45,0.10)] backdrop-blur-sm sm:p-8">
            <EmptyCartState />
          </div>
        </div>
      </main>
    );
  }

  /* ── Determine if mock mode (no real Stripe) ── */
  const isMockMode =
    !clientSecret || clientSecret === "MOCK_SECRET_FOR_UI_TESTING";

  return (
    <main className="relative flex min-h-screen items-start justify-center overflow-hidden bg-[#f4f3f0] px-4 py-10 font-poppins! sm:px-6 lg:px-8">
      <BackgroundBlobs />

      <div className="relative z-10 mx-auto w-full container">
        {/* ── Logo ── */}
        <div className="mb-6 flex justify-center sm:mb-8">
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

        {/* ── Card ── */}
        <div className="rounded-[30px] border border-black/5 bg-white/95 p-5 shadow-[0_24px_80px_rgba(45,45,45,0.10)] backdrop-blur-sm sm:p-8 lg:p-10">
          <StepIndicator currentStep={step} />

          <SubmitErrorBanner error={submitError} />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            {/* ── Left: Form ── */}
            <div className="lg:col-span-7">
              {step === "shipping" && (
                <CheckoutShippingForm
                  onSubmit={handleShippingSubmit}
                  loading={isCreatingIntent}
                  initialData={shippingData}
                />
              )}

              {step === "payment" && (
                <CheckoutPaymentStep
                  orderId={orderId}
                  clientSecret={clientSecret}
                  isMockMode={isMockMode}
                  stripeAppearance={stripeAppearance}
                  onBack={handleBackToShipping}
                />
              )}
            </div>

            {/* ── Right: Summary ── */}
            <div className="lg:col-span-5">
              <CheckoutSummary
                items={items}
                subtotal={subtotal}
                serverSummary={serverSummary}
              />
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center">
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
          <p className="text-xs text-secondary">
            Your data is encrypted and secured by Stripe
          </p>
        </div>
      </div>
    </main>
  );
}
