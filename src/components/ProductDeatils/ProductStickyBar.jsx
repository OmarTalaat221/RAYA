"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { addToCart, removeFromCart } from "../../store/cartSlice";
import { setBuyNowItem } from "../../utils/buyNow";

function isUAECountry(country) {
  if (!country) return false;
  const normalized = String(country).trim().toUpperCase();
  return (
    normalized === "AE" ||
    normalized === "UAE" ||
    normalized === "UNITED ARAB EMIRATES"
  );
}

function BoltIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13 2 4.5 13.5h6L9 22l9.5-12h-6L13 2Z" />
    </svg>
  );
}

export default function ProductStickyBar({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { items = [], initialized } = useSelector((state) => state.cart);
  const geoCountry = useSelector((state) => state.geo?.country);
  const isUAE = isUAECountry(geoCountry);

  const [isVisible, setIsVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = items.find((item) => item.id === product?.id) || null;
  const isInCart = initialized ? Boolean(cartItem) : Boolean(product?.inCart);
  const isOutOfStock = product?.stockStatus === "out_of_stock";

  /* ── IntersectionObserver: show when original actions leave viewport ── */
  useEffect(() => {
    const target = document.querySelector("[data-purchase-actions]");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [product?.id]);

  const handleCartToggle = useCallback(async () => {
    if (!product?.id || isAdding || (isOutOfStock && !isInCart)) return;
    setIsAdding(true);
    try {
      if (isInCart) {
        await dispatch(removeFromCart({ productId: product.id })).unwrap();
      } else {
        await dispatch(addToCart({ productId: product.id, quantity: 1 })).unwrap();
      }
    } catch {
      /* handled by Redux */
    } finally {
      setIsAdding(false);
    }
  }, [product?.id, isAdding, isInCart, isOutOfStock, dispatch]);

  const handleBuyNow = useCallback(() => {
    if (!product?.id || isOutOfStock) return;

    const media = Array.isArray(product?.media) ? product.media : [];
    const primary =
      media.find((m) => m?.type === "image" && m?.isPrimary) ||
      media.find((m) => m?.type === "image");
    const image = product?.frontImage || primary?.src || product?.backImage || "";

    setBuyNowItem({
      productId: product.id,
      quantity: 1,
      title: product.title,
      image,
      price: product.newPrice || product.price || 0,
      currency: product.currency || "AED",
    });
    router.push("/checkout");
  }, [product, isOutOfStock, router]);

  if (!product?.id) return null;

  const thumb = product?.media?.[0]?.url || product?.frontImage;
  const normalizedThumb = thumb
    ? thumb.startsWith("http")
      ? thumb
      : `https://www.rdspharma.online${thumb}`
    : null;

  const currency = product?.currency || "AED";
  const price = Number(product?.newPrice || 0).toFixed(2);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-[100] transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      }`}
      aria-hidden={!isVisible}
    >
      <div className="pointer-events-auto border-t border-black/5 bg-white/95 shadow-[0_-8px_28px_rgba(0,0,0,0.08)] backdrop-blur-md">
        <div className="container mx-auto flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
          {/* ── Thumb ── */}
          {normalizedThumb && (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-black/5 bg-[#f7f7f4] sm:h-14 sm:w-14">
              <Image
                src={normalizedThumb}
                alt={product.title || ""}
                fill
                sizes="56px"
                className="object-contain p-1.5"
              />
            </div>
          )}

          {/* ── Info ── */}
          <div className="flex min-w-0 flex-1 flex-col">
            <h4 className="line-clamp-1 text-xs font-semibold text-soft-black sm:text-sm">
              {product.title}
            </h4>
            <p className="text-sm font-bold text-main sm:text-base">
              {currency} {price}
            </p>
          </div>

          {/* ── Buy Now (hidden on very small screens) ── */}
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className="hidden h-10 items-center justify-center gap-1.5 rounded-xl bg-soft-black px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white shadow-[0_6px_16px_rgba(45,45,45,0.2)] transition hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-50 xsm:inline-flex sm:h-11 sm:px-5"
          >
            {/* <BoltIcon /> */}
            <span>Buy</span>
          </button>

          {/* ── Add to Cart / Added ── */}
          <button
            type="button"
            onClick={handleCartToggle}
            disabled={isAdding || (isOutOfStock && !isInCart)}
            className={`inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl px-4 text-xs font-semibold uppercase tracking-[0.1em] transition sm:h-11 sm:px-5 ${
              isInCart
                ? "bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
                : "bg-main text-white shadow-[0_6px_16px_rgba(104,188,82,0.28)] hover:bg-[#5eae49] disabled:cursor-not-allowed disabled:opacity-60"
            }`}
            aria-label={isInCart ? "Remove from cart" : "Add to cart"}
          >
            {isAdding ? (
              <span
                className={`h-3.5 w-3.5 animate-spin rounded-full border-2 ${
                  isInCart
                    ? "border-red-600/40 border-t-red-600"
                    : "border-white/40 border-t-white"
                }`}
              />
            ) : isInCart ? (
              <>
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
                <span>Remove</span>
              </>
            ) : (
              <span>Add to Cart</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}