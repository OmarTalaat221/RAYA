"use client";

import { useState, useEffect, useCallback, memo, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CheckoutShippingForm from "./CheckoutShippingForm";
import CheckoutSummary from "./CheckoutSummary";
import { fetchCart } from "../../store/cartSlice";
import { createCODOrder } from "../../services/checkout.service";
import { getBuyNowItem, clearBuyNowItem } from "../../utils/buyNow";

/* ═══════════════════════════════════════════════
   Background blobs
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
   Loading Skeleton
   ═══════════════════════════════════════════════ */

const CheckoutSkeleton = memo(function CheckoutSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
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
   Submit Error Banner
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
   Inner component 
   ═══════════════════════════════════════════════ */

function CheckoutCODInner() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { items, subtotal, initialized, loading } = useSelector(
    (state) => state.cart,
  );

  /* ── coupon from Redux ── */
  const coupon = useSelector((state) => state.cart.coupon);
  const couponDiscount = useSelector((state) => state.cart.couponDiscount);
  const cartTotal = useSelector((state) => state.cart.total);

  const [shippingData, setShippingData] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [buyNowItem, setBuyNowItemState] = useState(null);
  const [buyNowChecked, setBuyNowChecked] = useState(false);

  useEffect(() => {
    const item = getBuyNowItem();
    setBuyNowItemState(item);
    setBuyNowChecked(true);
  }, []);

  const isBuyNowMode = Boolean(buyNowItem?.productId);

  const effectiveItems = isBuyNowMode
    ? [
        {
          id: buyNowItem.productId,
          quantity: buyNowItem.quantity || 1,
          title: buyNowItem.title || "",
          image: buyNowItem.image || "",
          price: buyNowItem.price || 0,
          currency: buyNowItem.currency || "AED",
        },
      ]
    : items;

  useEffect(() => {
    if (isBuyNowMode) return;
    if (!initialized) {
      dispatch(fetchCart());
    }
  }, [initialized, dispatch, isBuyNowMode]);

  const handleShippingSubmit = useCallback(
    async (formData) => {
      setIsSubmitting(true);
      setSubmitError("");

      try {
        const response = await createCODOrder({
          cartItems: effectiveItems,
          shippingInfo: formData,
          couponCode: coupon?.code || "",
        });

        const data = response?.data || response;
        setShippingData(formData);

        if (isBuyNowMode) {
          clearBuyNowItem();
        }

        router.replace(
          `/checkout/success?orderId=${encodeURIComponent(
            data?.orderId || "",
          )}&method=cod`,
          { scroll: false },
        );

        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        const message =
          error?.response?.data?.errors?.join("\n") ||
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again.";

        setSubmitError(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [effectiveItems, router, isBuyNowMode, coupon?.code],
  );

  useEffect(() => {
    if (!buyNowChecked) return;
    if (isBuyNowMode) return;
    if (initialized && items.length === 0) {
      router.replace("/");
    }
  }, [initialized, items.length, router, isBuyNowMode, buyNowChecked]);

  if (!buyNowChecked) {
    return <CheckoutSkeleton />;
  }

  if (!isBuyNowMode && (!initialized || loading)) {
    return <CheckoutSkeleton />;
  }

  if (!isBuyNowMode && initialized && items.length === 0) {
    return null;
  }

  const effectiveSubtotal = isBuyNowMode
    ? (buyNowItem.price || 0) * (buyNowItem.quantity || 1)
    : subtotal;

  /* ── Build client-side summary with discount ── */
  const clientSummary =
    !isBuyNowMode && coupon?.code && couponDiscount > 0
      ? {
          currency: items[0]?.currency || "AED",
          subtotal,
          shipping: 0,
          discountAmount: couponDiscount,
          total: cartTotal,
          orderItems: [],
          coupon,
        }
      : null;

  return (
    <>
      <div className="mb-8 flex items-center justify-center gap-3 sm:mb-10">
        <h2 className="font-oswald! text-2xl font-semibold uppercase tracking-wide text-soft-black sm:text-3xl">
          Cash On Delivery
        </h2>
      </div>

      <SubmitErrorBanner error={submitError} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <CheckoutShippingForm
            onSubmit={handleShippingSubmit}
            loading={isSubmitting}
            initialData={shippingData}
            submitLabel="Complete Order"
          />
        </div>

        <div className="lg:col-span-5">
          <CheckoutSummary
            items={effectiveItems}
            subtotal={effectiveSubtotal}
            serverSummary={clientSummary}
          />
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   Main Export
   ═══════════════════════════════════════════════ */

export default function CheckoutCODPage() {
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
          <Suspense fallback={<CheckoutSkeleton />}>
            <CheckoutCODInner />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
