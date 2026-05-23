"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Tag, X, Check } from "lucide-react";
import {
  addToCart,
  fetchCart,
  removeFromCart,
  applyCoupon,
  removeCoupon,
  clearCouponError,
} from "../../store/cartSlice";
import { setBuyNowItem } from "../../utils/buyNow";

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

function BoltIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13 2 4.5 13.5h6L9 22l9.5-12h-6L13 2Z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
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

/* ── UAE country detection ── */
function isUAECountry(country) {
  if (!country) return false;
  const normalized = String(country).trim().toUpperCase();
  return (
    normalized === "AE" ||
    normalized === "UAE" ||
    normalized === "UNITED ARAB EMIRATES"
  );
}

export default function ProductPurchaseActions({
  product,
  stockStatus,
  productTitle,
  shortDescription,
}) {
  const t = useTranslations("productDetails");
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    items = [],
    initialized,
    loading,
    actionLoading,
  } = useSelector((state) => state.cart);

  const geoCountry = useSelector((state) => state.geo?.country);
  const isUAE = isUAECountry(geoCountry);

  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const coupon = useSelector((s) => s.cart.coupon);
  const couponDiscount = useSelector((s) => s.cart.couponDiscount);
  const couponLoading = useSelector((s) => s.cart.couponLoading);
  const couponError = useSelector((s) => s.cart.couponError);

  const [couponInput, setCouponInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMode, setSubmitMode] = useState("");
  const [cartError, setCartError] = useState("");

  const timeoutRef = useRef(null);
  const isOutOfStock = stockStatus === "out_of_stock";

  const cartItem = items.find((item) => item.id === product?.id) || null;
  const isInCart = initialized ? Boolean(cartItem) : Boolean(product?.inCart);
  const isCartSyncing = !initialized && loading;
  const disableButton = isInCart
    ? isSubmitting || actionLoading || isCartSyncing
    : isSubmitting || actionLoading || isCartSyncing || isOutOfStock;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!product?.id || initialized) return;
    dispatch(fetchCart());
  }, [dispatch, initialized, product?.id]);

  useEffect(() => {
    if (typeof cartItem?.quantity === "number" && cartItem.quantity > 0) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem?.quantity]);

  function handleDecrease() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }

  function handleIncrease() {
    setQuantity((prev) => prev + 1);
  }

  function handleQtyChange(event) {
    const value = Number(event.target.value);
    if (Number.isNaN(value) || value < 1) {
      setQuantity(1);
      return;
    }
    setQuantity(value);
  }

  const handleApplyCoupon = useCallback(
    (e) => {
      e?.preventDefault?.();
      const code = couponInput.trim();
      if (!code || couponLoading) return;
      // Pass current product as item for discount calculation
      dispatch(
        applyCoupon({
          couponCode: code,
          items: [{ id: product.id, quantity }],
        }),
      );
    },
    [couponInput, couponLoading, dispatch, product.id, quantity],
  );

  const handleRemoveCoupon = useCallback(() => {
    dispatch(removeCoupon());
    setCouponInput("");
  }, [dispatch]);

  const handleInputChange = useCallback(
    (e) => {
      setCouponInput(e.target.value.toUpperCase());
      if (couponError) dispatch(clearCouponError());
    },
    [couponError, dispatch],
  );

  function getButtonText() {
    if (isCartSyncing) return t("actions.loading");
    if (isSubmitting && submitMode === "add") return t("actions.adding");
    if (isSubmitting && submitMode === "remove") return t("actions.removing");
    if (isInCart) return t("actions.removeFromCart");
    return t("actions.addToCart");
  }

  async function handleCartToggle() {
    if (!product?.id || disableButton) return;

    setIsSubmitting(true);
    setSubmitMode(isInCart ? "remove" : "add");
    setCartError("");

    try {
      let action;
      if (isInCart) {
        action = await dispatch(removeFromCart({ productId: product.id }));
      } else {
        action = await dispatch(
          addToCart({
            productId: product.id,
            quantity,
          }),
        );
      }

      if (action.error) {
        throw new Error(
          action.payload || action.error?.message || "Failed to update cart.",
        );
      }
    } catch (error) {
      console.error("[PDP] Cart action failed:", error);
      setCartError(error.message || "Failed to update cart.");
    } finally {
      setIsSubmitting(false);
      setSubmitMode("");
    }
  }

  function getProductImage() {
    const media = Array.isArray(product?.media) ? product.media : [];
    const primary =
      media.find((m) => m?.type === "image" && m?.isPrimary) ||
      media.find((m) => m?.type === "image");
    return product?.frontImage || primary?.src || product?.backImage || "";
  }

  function handleBuyNow() {
    if (!product?.id || isOutOfStock || isSubmitting) return;

    setBuyNowItem({
      productId: product.id,
      quantity,
      title: productTitle,
      image: getProductImage(),
      price: product.newPrice || product.price || 0,
      currency: product.currency || "AED",
    });

    router.push("/checkout");
  }

  function handleCashOnDelivery() {
    if (!product?.id || isOutOfStock || isSubmitting) return;

    setBuyNowItem({
      productId: product.id,
      quantity,
      title: productTitle,
      image: getProductImage(),
      price: product.newPrice || product.price || 0,
      currency: product.currency || "AED",
    });

    router.push("/checkout/cod");
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
    <section
      data-purchase-actions
      className="rounded-[28px] border border-black/5 bg-[#f7f7f4] p-4 sm:p-5"
    >
      {/* ── qty + add to cart ── */}
      <div className="grid gap-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-end">
        <div>
          <label
            htmlFor="product-quantity"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-secondary"
          >
            {t("actions.quantity")}
          </label>
          <div className="flex h-12 items-center rounded-2xl border border-black/8 bg-white">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={
                isOutOfStock || isSubmitting || actionLoading || isCartSyncing
              }
              className="inline-flex h-full w-12 items-center justify-center text-soft-black transition hover:text-main disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={t("actions.decreaseQuantity")}
            >
              <MinusIcon />
            </button>
            <input
              id="product-quantity"
              type="number"
              min="1"
              inputMode="numeric"
              value={quantity}
              onChange={handleQtyChange}
              disabled={
                isOutOfStock || isSubmitting || actionLoading || isCartSyncing
              }
              className="h-full w-full border-0 bg-transparent text-center text-sm font-medium text-soft-black outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={handleIncrease}
              disabled={
                isOutOfStock || isSubmitting || actionLoading || isCartSyncing
              }
              className="inline-flex h-full w-12 items-center justify-center text-soft-black transition hover:text-main disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={t("actions.increaseQuantity")}
            >
              <PlusIcon />
            </button>
          </div>
        </div>

        <button
          type="button"
          disabled={disableButton}
          onClick={handleCartToggle}
          className={`inline-flex h-12 items-center justify-center rounded-2xl px-6 text-sm font-semibold transition ${
            isInCart
              ? "bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
              : "bg-main text-white hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
          }`}
        >
          {isInCart && !isSubmitting && (
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          )}
          {getButtonText()}
        </button>
      </div>

      {/* ── buy now (prominent) ── */}
      <button
        type="button"
        onClick={handleBuyNow}
        disabled={isOutOfStock || isSubmitting || actionLoading}
        className="group relative mt-3 inline-flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-soft-black px-6 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(45,45,45,0.25)] transition hover:bg-[#1a1a1a] hover:shadow-[0_16px_36px_rgba(45,45,45,0.32)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {/* <BoltIcon /> */}
        <span>{t("actions.buyNow")}</span>
      </button>

      {/* ── cash on delivery (UAE only) ── */}
      {isUAE && (
        <button
          type="button"
          onClick={handleCashOnDelivery}
          disabled={isOutOfStock || isSubmitting || actionLoading}
          className="mt-2.5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-6 text-sm font-semibold text-soft-black transition hover:border-main hover:text-main disabled:cursor-not-allowed disabled:opacity-50"
        >
          <TruckIcon />
          <span>{t("actions.cashOnDelivery")}</span>
        </button>
      )}

      {/* ── secure note ── */}
      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-main/10 bg-white p-4">
        <div className="mt-0.5 shrink-0">
          <LockIcon />
        </div>
        <div>
          <p className="text-sm font-medium text-soft-black">
            {t("secure.title")}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {t("secure.description")}
          </p>
        </div>
      </div>

      {/* ── share row ── */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-5">
        <p className="text-sm text-secondary">{t("share.title")}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-black/8 bg-white px-4 text-sm font-medium text-soft-black transition hover:border-main hover:text-main"
          >
            <ShareIcon /> {t("share.share")}
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-black/8 bg-white px-4 text-sm font-medium text-soft-black transition hover:border-main hover:text-main"
          >
            <LinkIcon /> {copied ? t("share.copied") : t("share.copyLink")}
          </button>
        </div>
      </div>
    </section>
  );
}
