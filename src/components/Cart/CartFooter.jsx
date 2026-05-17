"use client";

import { useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import { closeCart } from "../../store/cartSlice";
import { formatMoney } from "./cart.utils";
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

  const handleCheckout = useCallback(() => {
    if (loading) return;
    dispatch(closeCart());
    router.push("/checkout");
  }, [loading, dispatch, router]);

  const handleCOD = useCallback(() => {
    if (loading || typeof onCashOnDelivery !== "function") return;
    onCashOnDelivery();
  }, [loading, onCashOnDelivery]);

  const codDisabled = loading || typeof onCashOnDelivery !== "function";

  return (
    <div
      className="shrink-0 border-t border-gray-100 bg-white px-5 pb-5 pt-4
                  shadow-[0_-4px_16px_rgba(0,0,0,0.03)] sm:px-6 sm:pb-6"
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="font-poppins! text-sm font-medium text-gray-500">
          Subtotal
        </span>
        <span className="font-poppins! text-lg font-bold text-soft-black sm:text-xl">
          {formatMoney(subtotal, currency)}
        </span>
      </div>

      <div
        className="font-poppins! !mb-4 text-[11.5px] leading-relaxed
                   text-gray-400 sm:text-xs"
      >
        {qualifiesForFreeShipping
          ? "Free shipping included • Taxes calculated at checkout"
          : "Shipping & taxes calculated at checkout"}
      </div>

      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          onClick={handleCOD}
          disabled={codDisabled}
          title={
            typeof onCashOnDelivery !== "function"
              ? "Cash on delivery is not available yet."
              : undefined
          }
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
