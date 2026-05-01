// components/Cart/CartEmpty.jsx
"use client";

import { memo } from "react";
import { ShoppingBag } from "lucide-react";
import CartRecommendations from "./CartRecommendations";

const CartEmpty = memo(function CartEmpty({ onClose, recommendations }) {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain">
      {/* ── empty message ── */}
      <div className="flex flex-col items-center px-8 pt-14 pb-8">
        <div
          className="mb-5 flex h-20 w-20 items-center justify-center rounded-full
                      bg-gray-50"
        >
          <ShoppingBag size={32} strokeWidth={1.4} className="text-gray-300" />
        </div>
        <h3
          className="font-oswald! mb-2 text-lg font-semibold uppercase
                      tracking-wide text-soft-black"
        >
          Your cart is empty
        </h3>
        <p
          className="font-poppins! mb-6 text-center text-sm leading-relaxed
                     text-gray-400"
        >
          Looks like you haven't added anything yet.
          <br />
          Start exploring our products!
        </p>
        <button
          onClick={onClose}
          className="font-poppins! rounded-xl bg-main px-7 py-3 text-[13px]
                     font-semibold text-white transition-all duration-200
                     hover:bg-[#5aaa44] active:scale-[0.97]
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-main/40"
        >
          Continue Shopping
        </button>
      </div>

      {/* ── recommendations ── */}
      {recommendations?.length > 0 && (
        <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
          <CartRecommendations products={recommendations} />
        </div>
      )}
    </div>
  );
});

export default CartEmpty;
