"use client";

import { memo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, AlertCircle } from "lucide-react";
import { closeCart, fetchCart, clearError } from "../../store/cartSlice";
import FreeShippingBar from "./FreeShippingBar";
import CartItemList from "./CartItemList";
import CartRecommendations from "./CartRecommendations";
import CartFooter from "./CartFooter";
import CartEmpty from "./CartEmpty";

const BACKDROP_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};
const BACKDROP_TRANSITION = { duration: 0.25, ease: "easeOut" };

const DRAWER_VARIANTS = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};
const DRAWER_TRANSITION = {
  type: "spring",
  stiffness: 380,
  damping: 36,
  mass: 0.8,
};

const CartDrawer = memo(function CartDrawer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isOpen = useSelector((s) => s.cart.isOpen);
  const items = useSelector((s) => s.cart.items);
  const subtotal = useSelector((s) => s.cart.subtotal);
  const itemCount = useSelector((s) => s.cart.itemCount);
  const loading = useSelector((s) => s.cart.loading);
  const actionLoading = useSelector((s) => s.cart.actionLoading);
  const error = useSelector((s) => s.cart.error);
  const initialized = useSelector((s) => s.cart.initialized);
  const qualifiesForFreeShipping = useSelector(
    (s) => s.cart.qualifiesForFreeShipping,
  );
  const freeShippingRemaining = useSelector(
    (s) => s.cart.freeShippingRemaining,
  );
  const freeShippingThreshold = useSelector(
    (s) => s.cart.freeShippingThreshold,
  );

  const geoCountry = useSelector((s) => s.geo?.country || "");
  const isUAE = /^(ae|are|united arab emirates)$/i.test(geoCountry.trim());

  useEffect(() => {
    if (isOpen && !initialized) {
      dispatch(fetchCart());
    }
  }, [isOpen, initialized, dispatch]);

  const handleClose = useCallback(() => {
    dispatch(closeCart());
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleRetry = useCallback(() => {
    dispatch(clearError());
    dispatch(fetchCart());
  }, [dispatch]);

  const isEmpty = items.length === 0;

  const currency =
    items.length > 0 && items[0]?.currency ? items[0].currency : "AED";

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-2499 bg-black/20 backdrop-blur-[2px]"
            variants={BACKDROP_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={BACKDROP_TRANSITION}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Drawer - NOT full width on mobile */}
          <motion.aside
            className="fixed inset-y-0 right-0 z-2500 flex w-[88%] max-w-[400px] 
                       flex-col bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.08)]
                       sm:w-[420px] sm:max-w-none md:w-[460px] lg:w-[480px]"
            variants={DRAWER_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={DRAWER_TRANSITION}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div
              className="flex shrink-0 items-center justify-between border-b 
                         border-gray-100 px-4 py-4 sm:px-6 sm:py-5"
            >
              <div className="flex items-baseline gap-2">
                <h2
                  className="font-oswald! text-lg font-semibold uppercase
                             tracking-wide text-soft-black sm:text-2xl"
                >
                  Your Cart
                </h2>
                {itemCount > 0 && (
                  <span
                    className="rounded-full bg-main/10 px-2 py-0.5 text-[10px]
                               font-semibold text-main sm:px-2.5 sm:text-xs"
                  >
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
              <button
                onClick={handleClose}
                className="group flex h-8 w-8 items-center justify-center rounded-full
                           transition-colors duration-200 hover:bg-gray-100
                           focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-main/40 sm:h-9 sm:w-9"
                aria-label="Close cart"
              >
                <X
                  size={18}
                  strokeWidth={1.8}
                  className="text-gray-500 transition-colors duration-200
                             group-hover:text-soft-black sm:size-5"
                />
              </button>
            </div>

            {/* Error */}
            {error && (
              <div
                className="mx-4 mt-3 flex shrink-0 items-center gap-2 rounded-xl 
                           border border-red-100 bg-red-50/60 px-3 py-2.5 sm:mx-6 sm:gap-2.5 sm:px-4 sm:py-3"
              >
                <AlertCircle
                  size={14}
                  strokeWidth={2}
                  className="shrink-0 text-red-400 sm:size-4"
                />
                <p className="font-poppins! flex-1 text-[11px] font-medium text-red-600 sm:text-[12.5px]">
                  {error}
                </p>
                <button
                  onClick={handleRetry}
                  className="font-poppins! shrink-0 text-[11px] font-semibold
                             text-red-500 underline underline-offset-2
                             transition-colors duration-200 hover:text-red-700 sm:text-[12px]"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Content */}
            {loading && !initialized ? (
              <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="h-7 w-7 animate-spin rounded-full border-[2.5px]
                               border-gray-200 border-t-main sm:h-8 sm:w-8"
                  />
                  <span className="font-poppins! text-xs text-gray-400 sm:text-sm">
                    Loading your cart…
                  </span>
                </div>
              </div>
            ) : isEmpty ? (
              <CartEmpty onClose={handleClose} recommendations={[]} />
            ) : (
              <>
                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                  <div className="px-4 pt-3 sm:px-6 sm:pt-4">
                    <FreeShippingBar
                      qualifies={qualifiesForFreeShipping}
                      remaining={freeShippingRemaining}
                      threshold={freeShippingThreshold}
                      subtotal={subtotal}
                    />
                  </div>

                  <div className="px-4 py-3 sm:px-6 sm:py-4">
                    <CartItemList items={items} />
                  </div>

                  <CartRecommendations />

                  <div className="h-2" />
                </div>

                {/* Footer */}
                <CartFooter
                  subtotal={subtotal}
                  currency={currency}
                  qualifiesForFreeShipping={qualifiesForFreeShipping}
                  loading={actionLoading}
                  onCashOnDelivery={
                    isUAE
                      ? () => {
                          dispatch(closeCart());
                          router.push("/checkout/cod");
                        }
                      : undefined
                  }
                />
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});

export default CartDrawer;
