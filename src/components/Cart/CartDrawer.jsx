// components/Cart/CartDrawer.jsx
"use client";

import { memo, useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { closeCart } from "../../store/cartSlice";
import { PRODUCTS } from "../FeaturedProducts/products";
import FreeShippingBar from "./FreeShippingBar";
import CartItemList from "./CartItemList";
import CartRecommendations from "./CartRecommendations";
import CartFooter from "./CartFooter";
import CartEmpty from "./CartEmpty";

/* ── animation constants outside render ── */
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

const MAX_RECOMMENDATIONS = 4;

const CartDrawer = memo(function CartDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector((s) => s.cart.isOpen);
  const items = useSelector((s) => s.cart.items);
  const subtotal = useSelector((s) => s.cart.subtotal);
  const itemCount = useSelector((s) => s.cart.itemCount);
  const qualifiesForFreeShipping = useSelector(
    (s) => s.cart.qualifiesForFreeShipping
  );
  const freeShippingRemaining = useSelector(
    (s) => s.cart.freeShippingRemaining
  );
  const freeShippingThreshold = useSelector(
    (s) => s.cart.freeShippingThreshold
  );

  /* ── close handler ── */
  const handleClose = useCallback(() => {
    dispatch(closeCart());
  }, [dispatch]);

  /* ── Escape key ── */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  /* ── lock body scroll ── */
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

  /* ── recommendations: products not in cart ── */
  const recommendations = useMemo(() => {
    const cartIds = new Set(items.map((i) => i.id));
    return PRODUCTS.filter(
      (p) => !cartIds.has(p.id) && p.stockStatus !== "out_of_stock"
    ).slice(0, MAX_RECOMMENDATIONS);
  }, [items]);

  const isEmpty = items.length === 0;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* ── backdrop ── */}
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

          {/* ── drawer ── */}
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
            {/* ─── header ─── */}
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

            {isEmpty ? (
              /* ─── empty state + recommendations ─── */
              <CartEmpty
                onClose={handleClose}
                recommendations={recommendations}
              />
            ) : (
              <>
                {/* ─── scrollable content ─── */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                  {/* free shipping */}
                  <div className="px-5 pt-4 sm:px-6">
                    <FreeShippingBar
                      qualifies={qualifiesForFreeShipping}
                      remaining={freeShippingRemaining}
                      threshold={freeShippingThreshold}
                      subtotal={subtotal}
                    />
                  </div>

                  {/* cart items */}
                  <div className="px-5 py-4 sm:px-6">
                    <CartItemList items={items} />
                  </div>

                  {/* recommendations */}
                  {recommendations.length > 0 && (
                    <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
                      <CartRecommendations products={recommendations} />
                    </div>
                  )}

                  {/* bottom breathing room */}
                  <div className="h-2" />
                </div>

                {/* ─── sticky footer ─── */}
                <CartFooter
                  subtotal={subtotal}
                  qualifiesForFreeShipping={qualifiesForFreeShipping}
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
