// components/Cart/CartEmpty.jsx
"use client";

import { memo } from "react";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import CartRecommendations from "./CartRecommendations";

const CartEmpty = memo(function CartEmpty({ onClose, recommendations }) {
  const t = useTranslations("cart.emptyState");

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
          {t("title")}
        </h3>
        <p
          className="font-poppins! mb-6 text-center text-sm leading-relaxed
                     text-gray-400"
        >
          {t("descriptionLine1")}
          <br />
          {t("descriptionLine2")}
        </p>
        <button
          onClick={onClose}
          className="font-poppins! rounded-xl bg-main px-7 py-3 text-[13px]
                     font-semibold text-white transition-all duration-200
                     hover:bg-[#5aaa44] active:scale-[0.97]
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-main/40"
        >
          {t("continueShopping")}
        </button>
      </div>

      {/* ── recommendations — ready for API ── */}
      <CartRecommendations products={recommendations} />
    </div>
  );
});

export default CartEmpty;
