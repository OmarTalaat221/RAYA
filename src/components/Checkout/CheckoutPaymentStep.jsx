"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

function PaymentUnavailable({ onBack }) {
  const t = useTranslations("checkout.payment");

  return (
    <div>
      <h2 className="mb-6 text-xl font-oswald! text-soft-black sm:text-2xl">
        {t("title")}
      </h2>

      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4">
        <p className="text-sm leading-6 text-red-600">{t("unavailable")}</p>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-5 text-sm font-medium text-soft-black transition duration-200 hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/10"
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
          {t("backToShipping")}
        </button>
      </div>
    </div>
  );
}

export default function CheckoutPaymentStep({ orderId, clientSecret, onBack }) {
  const router = useRouter();
  const t = useTranslations("checkout.payment");

  const handleComplete = useCallback(() => {
    router.replace(
      orderId
        ? `/checkout/success?orderId=${encodeURIComponent(orderId)}`
        : "/checkout/success"
    );
  }, [orderId, router]);

  const fetchClientSecret = useCallback(
    () => Promise.resolve(clientSecret),
    [clientSecret]
  );

  const embeddedOptions = useMemo(
    () => ({
      fetchClientSecret,
      onComplete: handleComplete,
    }),
    [fetchClientSecret, handleComplete]
  );

  if (!stripePromise || !clientSecret) {
    return <PaymentUnavailable onBack={onBack} />;
  }

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-oswald! text-soft-black sm:text-2xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm leading-6 text-secondary">
            {t("description")}
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-4 text-sm font-medium text-soft-black transition duration-200 hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/10"
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
          {t("back")}
        </button>
      </div>

      <div className="rounded-[20px] border border-black/5 bg-[#fafaf9] p-3 sm:p-4">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={embeddedOptions}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>

      <p className="mt-4 text-center text-xs text-secondary">
        {t("cardSecure")}
      </p>
    </div>
  );
}
