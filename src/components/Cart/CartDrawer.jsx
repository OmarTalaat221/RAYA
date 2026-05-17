"use client";

import { memo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const isOpen = useSelector((s) => s.cart.isOpen);
  const items = useSelector((s) => s.cart.items);
  const subtotal = useSelector((s) => s.cart.subtotal);
  const itemCount = useSelector((s) => s.cart.itemCount);
  const loading = useSelector((s) => s.cart.loading);
  const actionLoading = useSelector((s) => s.cart.actionLoading);
  const error = useSelector((s) => s.cart.error);
  const initialized = useSelector((s) => s.cart.initialized);
  const qualifiesForFreeShipping = useSelector(
    (s) => s.cart.qualifiesForFreeShipping
  );
  const freeShippingRemaining = useSelector(
    (s) => s.cart.freeShippingRemaining
  );
  const freeShippingThreshold = useSelector(
    (s) => s.cart.freeShippingThreshold
  );

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

          <motion.aside
            className="fixed right-0 top-0 z-2500 flex h-full w-full flex-col
                       bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.08)]
                       sm:w-[420px] md:w-[460px] lg:w-[480px]"
            variants={DRAWER_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={DRAWER_TRANSITION}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div
              className="flex items-center justify-between border-b border-gray-100
                         px-5 py-4 sm:px-6 sm:py-5"
            >
              <div className="flex items-baseline gap-2.5">
                <h2
                  className="font-oswald! text-xl font-semibold uppercase
                             tracking-wide text-soft-black sm:text-2xl"
                >
                  Your Cart
                </h2>
                {itemCount > 0 && (
                  <span
                    className="rounded-full bg-main/10 px-2.5 py-0.5 text-xs
                               font-semibold text-main"
                  >
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
              <button
                onClick={handleClose}
                className="group flex h-9 w-9 items-center justify-center rounded-full
                           transition-colors duration-200 hover:bg-gray-100
                           focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-main/40"
                aria-label="Close cart"
              >
                <X
                  size={20}
                  strokeWidth={1.8}
                  className="text-gray-500 transition-colors duration-200
                             group-hover:text-soft-black"
                />
              </button>
            </div>

            {error && (
              <div
                className="mx-5 mt-3 flex items-center gap-2.5 rounded-xl border
                           border-red-100 bg-red-50/60 px-4 py-3 sm:mx-6"
              >
                <AlertCircle
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 text-red-400"
                />
                <p className="font-poppins! flex-1 text-[12.5px] font-medium text-red-600">
                  {error}
                </p>
                <button
                  onClick={handleRetry}
                  className="font-poppins! shrink-0 text-[12px] font-semibold
                             text-red-500 underline underline-offset-2
                             transition-colors duration-200 hover:text-red-700"
                >
                  Retry
                </button>
              </div>
            )}

            {loading && !initialized ? (
              <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="h-8 w-8 animate-spin rounded-full border-[2.5px]
                               border-gray-200 border-t-main"
                  />
                  <span className="font-poppins! text-sm text-gray-400">
                    Loading your cart…
                  </span>
                </div>
              </div>
            ) : isEmpty ? (
              <CartEmpty onClose={handleClose} recommendations={[]} />
            ) : (
              <>
                <div className="flex-1 overflow-y-auto overscroll-contain">
                  <div className="px-5 pt-4 sm:px-6">
                    <FreeShippingBar
                      qualifies={qualifiesForFreeShipping}
                      remaining={freeShippingRemaining}
                      threshold={freeShippingThreshold}
                      subtotal={subtotal}
                    />
                  </div>

                  <div className="px-5 py-4 sm:px-6">
                    <CartItemList items={items} />
                  </div>

                  <CartRecommendations products={[]} />

                  <div className="h-2" />
                </div>

                <CartFooter
                  subtotal={subtotal}
                  currency={currency}
                  qualifiesForFreeShipping={qualifiesForFreeShipping}
                  loading={actionLoading}
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
