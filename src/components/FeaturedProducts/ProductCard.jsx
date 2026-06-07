"use client";

import { useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SaleRibbon from "./SaleRibbon";
import { addToCart } from "../../store/cartSlice";

const IMAGE_HOST = "https://www.rdspharma.online";

function normalizeImage(src) {
  if (!src) return null;

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  if (src.startsWith("/")) {
    return `${IMAGE_HOST}${src}`;
  }

  return `${IMAGE_HOST}/${src}`;
}

const CartToggleButton = memo(function CartToggleButton({
  isInCart,
  isLoading,
  onAdd,
}) {
  const t = useTranslations("catalog");

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

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

function ProductCard({
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

  const productKey = id === undefined || id === null ? "" : String(id);

  const isCartInitialized = useSelector((state) => state.cart.initialized);

  const isInCartFromStore = useSelector((state) =>
    productKey ? Boolean(state.cart.itemIds?.[productKey]) : false,
  );

  const isLoading = useSelector(
    (state) =>
      Boolean(state.cart.actionLoading) &&
      String(state.cart.actionProductId) === productKey,
  );

  const isInCart = isCartInitialized ? isInCartFromStore : inCart;

  const normalizedFrontImage = normalizeImage(frontImage);
  const normalizedBackImage =
    canHover && backImage ? normalizeImage(backImage) : null;

  const productHref = href || "/catalog";
  const safeTitle = title || "Product";
  const safeOldPrice = Number(oldPrice) || 0;
  const safeNewPrice = Number(newPrice) || 0;
  const showOldPrice = safeOldPrice > safeNewPrice;

  const handleAdd = useCallback(() => {
    if (!id || isLoading || isInCart) return;

    dispatch(addToCart({ productId: id, quantity: 1 }));
  }, [id, isLoading, isInCart, dispatch]);

  return (
    <article className="h-full w-full transition-transform duration-300 hover:-translate-y-1">
      <div className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
        <Link
          href={productHref}
          className="relative block w-full overflow-hidden bg-white"
          style={{ aspectRatio: "2.5 / 2" }}
        >
          {isOnSale && <SaleRibbon discountPercentage={discountPercentage} />}

          <div
            className={`absolute inset-0 transition-all duration-300 ${
              normalizedBackImage
                ? "group-hover:scale-[1.04] group-hover:opacity-0"
                : ""
            }`}
          >
            {normalizedFrontImage && (
              <Image
                src={normalizedFrontImage}
                alt={safeTitle}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain p-4"
                priority={priority}
              />
            )}
          </div>

          {normalizedBackImage && (
            <div className="absolute inset-0 scale-[1.04] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
              <Image
                src={normalizedBackImage}
                alt={`${safeTitle} back`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain p-4"
              />
            </div>
          )}
        </Link>

        <div className="flex flex-1 flex-col items-center px-4 py-5 text-center">
          <Link href={productHref}>
            <h3 className="min-h-[3.75rem] line-clamp-3 text-sm font-semibold leading-5 text-soft-black transition-colors duration-200 hover:text-main">
              {safeTitle}
            </h3>
          </Link>

          <div className="my-3 h-px w-8 bg-[#e4e1db]" />

          <div className="flex items-center gap-2">
            {showOldPrice && (
              <span className="text-xs text-secondary line-through">
                {currency} {safeOldPrice.toFixed(2)}
              </span>
            )}

            <span
              className={`text-base font-bold ${
                isOnSale ? "text-red-500" : "text-soft-black"
              }`}
            >
              {currency} {safeNewPrice.toFixed(2)}
            </span>
          </div>

          <div className="mt-4 w-full">
            <CartToggleButton
              isInCart={isInCart}
              isLoading={isLoading}
              onAdd={handleAdd}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
