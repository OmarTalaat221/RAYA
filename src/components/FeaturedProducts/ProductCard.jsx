"use client";

import { useState, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SaleRibbon from "./SaleRibbon";
import { addToCart, removeFromCart } from "../../store/cartSlice";

/* ═══════════════════════════════════════════════
   Cart Button
   ═══════════════════════════════════════════════ */

const CartToggleButton = memo(function CartToggleButton({
  isInCart,
  isLoading,
  onAdd,
}) {
  const t = useTranslations("catalog");

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isLoading || isInCart) return;
      onAdd();
    },
    [isInCart, isLoading, onAdd],
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading || isInCart}
      aria-label={isInCart ? "Already in cart" : "Add to cart"}
      className={`flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold uppercase tracking-[0.1em] text-white transition duration-200 ${
        isInCart
          ? "cursor-not-allowed bg-main/60 opacity-70"
          : "bg-main hover:bg-[#5eae49] disabled:cursor-not-allowed disabled:opacity-60"
      }`}
    >
      {isLoading ? (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : isInCart ? (
        <>
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          {t("added")}
        </>
      ) : (
        <>
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
          {t("addToCart")}
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
  discountPercentage = 0,
  priority = false,
  canHover = false,
  inCart = false,
}) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  /* ═══════════════════════════════════════════════
     Cart state
     ═══════════════════════════════════════════════ */
  const cartItems = useSelector((state) => state.cart.items);
  const isCartInitialized = useSelector((state) => state.cart.initialized);

  const isInCart = isCartInitialized
    ? cartItems.some((item) => item.id === id)
    : inCart;

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

  /* ── Image ── */
  const showBackImage = canHover && backImage && isHovered;

  const normalizedFrontImage = frontImage?.startsWith("http")||frontImage.startsWith("https")
    ? frontImage
    : `https://www.rdspharma.online${frontImage}`;

  const normalizedBackImage = backImage
    ? backImage.startsWith("http")||backImage.startsWith("https")
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
          {isOnSale && <SaleRibbon discountPercentage={discountPercentage} />}

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
            />
          </div>
        </div>
      </div>
    </article>
  );
}
