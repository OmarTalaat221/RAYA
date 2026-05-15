// components/Cart/CartRecommendations.jsx
"use client";

import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { Plus } from "lucide-react";
import { addToCart } from "../../store/cartSlice";
import { formatMoney } from "./cart.utils";

const RecommendationItem = memo(function RecommendationItem({ product }) {
  const dispatch = useDispatch();

  const handleAdd = useCallback(() => {
    dispatch(addToCart({ productId: product.id, quantity: 1 }));
  }, [dispatch, product.id]);

  const imageSrc = product.image || product.frontImage || "";
  const price = product.newPrice ?? product.oldPrice ?? product.price ?? 0;
  const currency = product.currency || "AED";

  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-gray-100
                  bg-white px-3 py-2.5 transition-shadow duration-200
                  hover:shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
    >
      {/* thumbnail */}
      <div
        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg
                    bg-[#f8f8f6]"
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            sizes="56px"
            className="object-contain p-1"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[10px] text-gray-300">No img</span>
          </div>
        )}
      </div>

      {/* info */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className="font-poppins! line-clamp-1 text-[12.5px] font-medium
                     leading-snug text-soft-black"
        >
          {product.title}
        </span>
        <span className="font-poppins! text-[12px] font-semibold text-main">
          {formatMoney(price, currency)}
        </span>
      </div>

      {/* add button */}
      <button
        onClick={handleAdd}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                   bg-main text-white shadow-sm transition-all duration-200
                   hover:bg-[#5aaa44] hover:shadow-md active:scale-95
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-main/40"
        aria-label={`Add ${product.title} to cart`}
      >
        <Plus size={16} strokeWidth={2.2} />
      </button>
    </div>
  );
});

const CartRecommendations = memo(function CartRecommendations({ products }) {
  if (!products?.length) return null;

  return (
    <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
      <h3
        className="font-oswald! mb-3 text-[13px] font-semibold uppercase
                    tracking-wider text-gray-400 sm:text-sm"
      >
        You might also like
      </h3>
      <div className="flex flex-col gap-2">
        {products.map((product) => (
          <RecommendationItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
});

export default CartRecommendations;
