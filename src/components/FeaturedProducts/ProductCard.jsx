"use client";

import { useState, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import SaleRibbon from "./SaleRibbon";
import { addToCart, removeFromCart } from "../../store/cartSlice";
// import { addToCart, removeFromCart } from "@/store/cartSlice";

/* ═══════════════════════════════════════════════
   Cart Button
   ═══════════════════════════════════════════════ */

const CartToggleButton = memo(function CartToggleButton({
  isInCart,
  isLoading,
  onAdd,
  onRemove,
}) {
  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isLoading) return;

      if (isInCart) {
        onRemove();
      } else {
        onAdd();
      }
    },
    [isInCart, isLoading, onAdd, onRemove]
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      aria-label={isInCart ? "Remove from cart" : "Add to cart"}
      className={`flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold uppercase tracking-[0.1em] transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
        isInCart
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-main/8 text-main hover:bg-main/15"
      }`}
    >
      {isLoading ? (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current/30 border-t-current" />
      ) : isInCart ? (
        <>
          {/* Trash icon */}
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Remove
        </>
      ) : (
        <>
          {/* Plus icon */}
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add to Cart
        </>
      )}
    </button>
  );
});

CartToggleButton.displayName = "CartToggleButton";

/* ═══════════════════════════════════════════════
   Main ProductCard
   ═══════════════════════════════════════════════ */

export default function ProductCard({
  id,
  title,
  href,
  frontImage,
  backImage,
  oldPrice,
  newPrice,
  currency = "AED",
  isOnSale = false,
  priority = false,
  canHover = false,
}) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  /* ── Cart state ── */
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === id);

  /* ── Actions ── */
  const handleAdd = useCallback(async () => {
    if (!id) return;
    setLocalLoading(true);
    try {
      await dispatch(addToCart({ productId: id, quantity: 1 })).unwrap();
    } catch {
      /* error handled by Redux */
    } finally {
      setLocalLoading(false);
    }
  }, [id, dispatch]);

  const handleRemove = useCallback(async () => {
    if (!id) return;
    setLocalLoading(true);
    try {
      await dispatch(removeFromCart({ productId: id })).unwrap();
    } catch {
      /* error handled by Redux */
    } finally {
      setLocalLoading(false);
    }
  }, [id, dispatch]);

  /* ── Image ── */
  const showBackImage = canHover && backImage && isHovered;

  const normalizedFrontImage = frontImage?.startsWith("http")
    ? frontImage
    : `https://www.rdspharma.online${frontImage}`;

  const normalizedBackImage = backImage
    ? backImage.startsWith("http")
      ? backImage
      : `https://www.rdspharma.online${backImage}`
    : null;

  return (
    <article
      className="h-full w-full transition-transform duration-300 hover:-translate-y-1"
      onMouseEnter={() => canHover && setIsHovered(true)}
      onMouseLeave={() => canHover && setIsHovered(false)}
    >
      <div className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
        {/* ── Image (clickable → PDP) ── */}
        <Link
          href={href || "/catalog"}
          className="relative block w-full overflow-hidden bg-white"
          style={{ aspectRatio: "2.5 / 2" }}
        >
          {isOnSale && <SaleRibbon />}

          {/* Front */}
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              showBackImage ? "scale-[1.04] opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src={normalizedFrontImage}
              alt={title}
              fill
              sizes="(max-width:768px) 50vw, 25vw"
              className="object-contain p-4"
              priority={priority}
              loading="eager"
            />
          </div>

          {/* Back */}
          {normalizedBackImage && (
            <div
              className={`absolute inset-0 transition-all duration-300 ${
                showBackImage ? "opacity-100" : "scale-[1.04] opacity-0"
              }`}
            >
              <Image
                src={normalizedBackImage}
                alt={`${title} back`}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-contain p-4"
                loading="lazy"
              />
            </div>
          )}
        </Link>

        {/* ── Body ── */}
        <div className="flex flex-1 flex-col items-center px-4 py-5 text-center">
          {/* Title (clickable → PDP) */}
          <Link href={href || "/catalog"}>
            <h3 className="min-h-[3.75rem] line-clamp-3 text-sm font-semibold leading-5 text-soft-black transition-colors duration-200 hover:text-main">
              {title}
            </h3>
          </Link>

          <div className="my-3 h-px w-8 bg-[#e4e1db]" />

          {/* Price */}
          <div className="flex items-center gap-2">
            {oldPrice > newPrice && (
              <span className="text-xs text-secondary line-through">
                {currency} {Number(oldPrice).toFixed(2)}
              </span>
            )}

            <span
              className={`text-base font-bold ${
                isOnSale ? "text-red-500" : "text-soft-black"
              }`}
            >
              {currency} {Number(newPrice).toFixed(2)}
            </span>
          </div>

          {/* ── Cart Button ── */}
          <div className="mt-4 w-full">
            <CartToggleButton
              isInCart={isInCart}
              isLoading={localLoading}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
