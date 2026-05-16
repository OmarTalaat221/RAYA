"use client";

import { useState, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

/* ═══════════════════════════════════════════════
   Stripe
   ═══════════════════════════════════════════════ */

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder"
);

/* ═══════════════════════════════════════════════
   Mock Payment Form (when no real clientSecret)
   ═══════════════════════════════════════════════ */

const MockPaymentForm = memo(function MockPaymentForm({ orderId, onBack }) {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const handleMockPay = useCallback(
    async (e) => {
      e.preventDefault();
      setProcessing(true);

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      router.push(`/checkout/success?orderId=${orderId}`);
    },
    [orderId, router]
  );

  return (
    <div>
      <h2 className="mb-6 text-xl font-oswald! text-soft-black sm:text-2xl">
        Payment Details
      </h2>

      <form onSubmit={handleMockPay} className="space-y-6">
        {/* Mock info banner */}
        <div className="rounded-2xl border border-main/20 bg-main/5 px-4 py-3">
          <div className="flex items-start gap-2.5">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-main"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm leading-6 text-soft-black">
              <span className="font-medium">Demo Mode</span> — The payment
              gateway is not connected yet. Click &quot;Pay Now&quot; to
              simulate a successful payment and see the full flow.
            </p>
          </div>
        </div>

        {/* Mock card fields preview */}
        <div className="space-y-4 rounded-2xl border border-black/5 bg-[#fafaf9] p-4 sm:p-5">
          {/* Card number */}
          <div className="space-y-2">
            <label className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black">
              Card Number
            </label>
            <div className="flex w-full cursor-not-allowed items-center rounded-2xl border border-black/10 bg-white px-4 py-3">
              <span className="text-sm text-secondary">
                •••• •••• •••• 4242
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Expiry */}
            <div className="space-y-2">
              <label className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black">
                Expiry Date
              </label>
              <div className="flex w-full cursor-not-allowed items-center rounded-2xl border border-black/10 bg-white px-4 py-3">
                <span className="text-sm text-secondary">12 / 28</span>
              </div>
            </div>

            {/* CVC */}
            <div className="space-y-2">
              <label className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black">
                CVC
              </label>
              <div className="flex w-full cursor-not-allowed items-center rounded-2xl border border-black/10 bg-white px-4 py-3">
                <span className="text-sm text-secondary">•••</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            disabled={processing}
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-5 text-sm font-medium text-soft-black transition duration-200 hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/10 disabled:opacity-60"
          >
            <svg
              className="h-4 w-4"
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
            Back
          </button>

          <button
            type="submit"
            disabled={processing}
            className="flex h-14 flex-[2] items-center justify-center gap-3 rounded-2xl bg-main px-5 text-sm font-medium uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(104,188,82,0.28)] transition duration-200 hover:bg-[#5eae49] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/20 disabled:cursor-not-allowed disabled:opacity-80"
          >
            {processing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Processing Payment...
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
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
                Pay Now
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-secondary">
          This is a demo payment. No real charges will be made.
        </p>
      </form>
    </div>
  );
});

MockPaymentForm.displayName = "MockPaymentForm";

/* ═══════════════════════════════════════════════
   Real Stripe Payment Form
   ═══════════════════════════════════════════════ */

function StripeForm({ orderId, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success?orderId=${orderId}`,
      },
    });

    if (stripeError) {
      setError(
        stripeError.type === "card_error" ||
          stripeError.type === "validation_error"
          ? stripeError.message
          : "An unexpected error occurred. Please try again."
      );
      setProcessing(false);
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-oswald! text-soft-black sm:text-2xl">
        Payment Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-black/5 bg-[#fafaf9] p-4 sm:p-5">
          <PaymentElement options={{ layout: "tabs" }} />
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm leading-6 text-red-600">{error}</p>
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            disabled={processing}
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-5 text-sm font-medium text-soft-black transition duration-200 hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/10 disabled:opacity-60"
          >
            <svg
              className="h-4 w-4"
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
            Back
          </button>

          <button
            type="submit"
            disabled={processing || !stripe || !elements}
            className="flex h-14 flex-[2] items-center justify-center gap-3 rounded-2xl bg-main px-5 text-sm font-medium uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(104,188,82,0.28)] transition duration-200 hover:bg-[#5eae49] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/20 disabled:cursor-not-allowed disabled:opacity-80"
          >
            {processing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Processing Payment...
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
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
                Pay Now
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-secondary">
          Your card information is encrypted and processed securely by Stripe.
          We never store your card details.
        </p>
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Main Export — decides mock vs real
   ═══════════════════════════════════════════════ */

export default function CheckoutPaymentStep({
  orderId,
  clientSecret,
  isMockMode,
  stripeAppearance,
  onBack,
}) {
  /* ── Mock mode ── */
  if (isMockMode) {
    return <MockPaymentForm orderId={orderId} onBack={onBack} />;
  }

  /* ── Real Stripe ── */
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: stripeAppearance,
      }}
    >
      <StripeForm orderId={orderId} onBack={onBack} />
    </Elements>
  );
}
