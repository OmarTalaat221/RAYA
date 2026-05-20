"use client";

import { useCallback, useState, memo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Tag, X, Check } from "lucide-react";
import {
  closeCart,
  applyCoupon,
  removeCoupon,
  clearCouponError,
} from "../../store/cartSlice";
import { formatMoney } from "./cart.utils";
import { clearBuyNowItem } from "../../utils/buyNow";
import "./cart-shimmer.css";

const CartFooter = memo(function CartFooter({
  subtotal,
  currency = "AED",
  qualifiesForFreeShipping,
  loading = false,
  onCashOnDelivery,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const coupon = useSelector((s) => s.cart.coupon);
  const couponDiscount = useSelector((s) => s.cart.couponDiscount);
  const couponLoading = useSelector((s) => s.cart.couponLoading);
  const couponError = useSelector((s) => s.cart.couponError);
  const total = useSelector((s) => s.cart.total);

  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = useCallback(
    (e) => {
      e?.preventDefault?.();
      const code = couponInput.trim();
      if (!code || couponLoading) return;
      dispatch(applyCoupon(code));
    },
    [couponInput, couponLoading, dispatch],
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

  const handleCheckout = useCallback(() => {
    if (loading) return;
    clearBuyNowItem();
    dispatch(closeCart());
    router.push("/checkout");
  }, [loading, dispatch, router]);

  const handleCOD = useCallback(() => {
    if (loading || typeof onCashOnDelivery !== "function") return;
    clearBuyNowItem();
    onCashOnDelivery();
  }, [loading, onCashOnDelivery]);

  const codDisabled = loading || typeof onCashOnDelivery !== "function";
  const hasCoupon = Boolean(coupon?.code);
  const hasDiscount = couponDiscount > 0;

  return (
    <div
      className="shrink-0 border-t border-gray-100 bg-white px-4 pb-4 pt-3
                 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] sm:px-6 sm:pb-6 sm:pt-4"
    >
      {/* ── Coupon section ── */}
      <div className="mb-3 sm:mb-4">
        {!hasCoupon ? (
          <form
            onSubmit={handleApplyCoupon}
            className="flex items-stretch gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={couponInput}
                onChange={handleInputChange}
                placeholder="Coupon code"
                disabled={couponLoading}
                className="font-poppins! h-[42px]! w-full rounded-lg border
                           border-gray-200 bg-white pl-3 pr-3 text-[12.5px]
                           font-medium uppercase tracking-wide text-soft-black
                           outline-none transition-colors duration-200
                           placeholder:font-normal placeholder:normal-case
                           placeholder:tracking-normal placeholder:text-gray-400
                           focus:border-soft-black/40
                           focus:ring-2 focus:ring-soft-black/10
                           disabled:cursor-not-allowed disabled:opacity-60
                           sm:h-[44px] sm:text-[13px]"
              />
            </div>
            <button
              type="submit"
              disabled={couponLoading || !couponInput.trim()}
              className="font-poppins! flex h-[42px] shrink-0 items-center
                         justify-center rounded-lg bg-soft-black px-4
                         text-[12px] font-semibold uppercase tracking-wide
                         text-white transition-all duration-200
                         hover:bg-[#222] active:scale-[0.98]
                         disabled:cursor-not-allowed disabled:opacity-50
                         sm:h-[44px] sm:px-5 sm:text-[12.5px]"
            >
              {couponLoading ? (
                <Loader2 size={14} strokeWidth={2} className="animate-spin" />
              ) : (
                "Apply"
              )}
            </button>
          </form>
        ) : (
          <div
            className="flex items-center justify-between gap-2 rounded-lg
                       border border-main/20 bg-main/5 px-3 py-2.5 sm:px-4"
          >
            <div className="flex min-w-0 items-center gap-2">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center
                           rounded-full bg-main text-white"
              >
                <Check size={12} strokeWidth={3} />
              </div>
              <div className="min-w-0">
                <p
                  className="font-poppins! truncate text-[12.5px] font-semibold
                             uppercase tracking-wide text-soft-black sm:text-[13px]"
                >
                  {coupon.code}
                </p>
                <p
                  className="font-poppins! text-[10.5px] font-medium text-main
                             sm:text-[11px]"
                >
                  {coupon.discountValue}% off applied
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveCoupon}
              aria-label="Remove coupon"
              className="flex h-7 w-7 shrink-0 items-center justify-center
                         rounded-full text-gray-500 transition-colors
                         duration-200 hover:bg-white hover:text-soft-black"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        )}

        {couponError && !hasCoupon && (
          <p className="font-poppins! mt-2 text-[11.5px] font-medium text-red-500">
            {couponError}
          </p>
        )}
      </div>

      {/* ── Summary ── */}
      <div className="mb-1 flex items-center justify-between">
        <span className="font-poppins! text-[13px] font-medium text-gray-500">
          Subtotal
        </span>
        <span
          className={`font-poppins! text-[14px] font-semibold sm:text-[15px] ${
            hasDiscount ? "text-gray-400 line-through" : "text-soft-black"
          }`}
        >
          {formatMoney(subtotal, currency)}
        </span>
      </div>

      {hasDiscount && (
        <>
          <div className="mb-1 flex items-center justify-between">
            <span className="font-poppins! text-[13px] font-medium text-main">
              Discount ({coupon?.discountValue}%)
            </span>
            <span className="font-poppins! text-[14px] font-semibold text-main sm:text-[15px]">
              −{formatMoney(couponDiscount, currency)}
            </span>
          </div>

          <div className="my-2 h-px w-full bg-gray-100" />

          <div className="mb-1 flex items-center justify-between">
            <span className="font-poppins! text-[14px] font-bold text-soft-black">
              Total
            </span>
            <span className="font-poppins! text-lg font-bold text-soft-black sm:text-xl">
              {formatMoney(total, currency)}
            </span>
          </div>
        </>
      )}

      <div
        className="font-poppins! !mb-4 mt-1 text-[11.5px] leading-relaxed
                   text-gray-400 sm:text-xs"
      >
        {qualifiesForFreeShipping
          ? "Free shipping included • Taxes calculated at checkout"
          : "Shipping & taxes calculated at checkout"}
      </div>

      {/* ── Buttons ── */}
      <div className="flex flex-col gap-2.5">
        {typeof onCashOnDelivery === "function" && (
          <button
            type="button"
            onClick={handleCOD}
            disabled={codDisabled}
            className="cart-shimmer-btn relative flex h-[50px] w-full items-center
                       justify-center overflow-hidden rounded-xl bg-soft-black
                       font-poppins! text-[13px] font-semibold tracking-wide
                       text-white transition-all duration-200 hover:bg-[#222]
                       active:scale-[0.98] disabled:cursor-not-allowed
                       disabled:opacity-60 focus-visible:outline-none
                       focus-visible:ring-2 focus-visible:ring-soft-black/40
                       sm:h-[52px] sm:text-[13.5px]"
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading && (
                <Loader2 size={16} strokeWidth={2} className="animate-spin" />
              )}
              Order Now — Cash on Delivery
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className="cart-shimmer-btn-green relative flex h-[50px] w-full
                     items-center justify-center overflow-hidden rounded-xl
                     bg-main font-poppins! text-[13px] font-semibold
                     tracking-wide text-white transition-all duration-200
                     hover:bg-[#5aaa44] active:scale-[0.98]
                     disabled:cursor-not-allowed disabled:opacity-60
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-main/40 sm:h-[52px] sm:text-[13.5px]"
        >
          <span className="relative z-10 flex items-center gap-2">
            {loading && (
              <Loader2 size={16} strokeWidth={2} className="animate-spin" />
            )}
            Check Out
          </span>
        </button>
      </div>
    </div>
  );
});

export default CartFooter;
