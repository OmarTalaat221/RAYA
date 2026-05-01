// components/Cart/CartItem.jsx
"use client";

import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "../../store/cartSlice";
import { formatMoney, resolveMediaSrc, getCartItemHref } from "./cart.utils";

const CartItem = memo(function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleIncrement = useCallback(() => {
    dispatch(incrementQuantity(item.id));
  }, [dispatch, item.id]);

  const handleDecrement = useCallback(() => {
    dispatch(decrementQuantity(item.id));
  }, [dispatch, item.id]);

  const handleRemove = useCallback(() => {
    dispatch(removeItem(item.id));
  }, [dispatch, item.id]);

  const lineTotal = item.price * item.quantity;
  const imageSrc = resolveMediaSrc(item.image);
  const href = getCartItemHref(item);

  return (
    <div
      className="group relative flex gap-3.5 rounded-xl border border-gray-100
                  bg-white p-3 transition-shadow duration-200
                  hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:gap-4 sm:p-3.5"
    >
      {/* ── image ── */}
      <Link
        href={href}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg
                   bg-[#f8f8f6] sm:h-[88px] sm:w-[88px]"
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={item.title}
            fill
            sizes="88px"
            className="object-contain p-1.5 transition-transform duration-300
                       group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs text-gray-300">No image</span>
          </div>
        )}
      </Link>

      {/* ── details ── */}
      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        {/* top row: title + remove */}
        <div className="flex items-start justify-between gap-2">
          <Link
            href={href}
            className="font-poppins! line-clamp-2 text-[13px] font-medium leading-snug
                       text-soft-black transition-colors duration-200
                       hover:text-main sm:text-sm"
          >
            {item.title}
          </Link>
          <button
            onClick={handleRemove}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full
                       text-gray-300 transition-all duration-200
                       hover:bg-red-50 hover:text-red-400
                       focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-red-200"
            aria-label={`Remove ${item.title}`}
          >
            <Trash2 size={14} strokeWidth={1.8} />
          </button>
        </div>

        {/* bottom row: stepper + price */}
        <div className="mt-2 flex items-center justify-between">
          {/* quantity stepper */}
          <div
            className="inline-flex items-center overflow-hidden rounded-lg
                        border border-gray-200 bg-gray-50/50"
          >
            <button
              onClick={handleDecrement}
              className="flex h-8 w-8 items-center justify-center text-gray-500
                         transition-colors duration-150 hover:bg-gray-100
                         hover:text-soft-black"
              aria-label="Decrease quantity"
            >
              <Minus size={13} strokeWidth={2} />
            </button>
            <span
              className="font-poppins! flex h-8 w-9 items-center justify-center
                         text-[13px] font-semibold text-soft-black"
            >
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={item.quantity >= item.maxQuantity}
              className="flex h-8 w-8 items-center justify-center text-gray-500
                         transition-colors duration-150 hover:bg-gray-100
                         hover:text-soft-black disabled:cursor-not-allowed
                         disabled:opacity-30"
              aria-label="Increase quantity"
            >
              <Plus size={13} strokeWidth={2} />
            </button>
          </div>

          {/* line price */}
          <span className="font-poppins! text-[13px] font-semibold text-soft-black sm:text-sm">
            {formatMoney(lineTotal)}
          </span>
        </div>
      </div>
    </div>
  );
});

export default CartItem;
