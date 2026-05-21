// components/Cart/CartRecommendations.jsx
"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Plus, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { addToCart } from "../../store/cartSlice";
import { getRandomProducts } from "../../services/products.service";
import { formatMoney } from "./cart.utils";

const TARGET_COUNT = 3;
const REFRESH_THRESHOLD = 2;
const REFRESH_COOLDOWN_MS = 30 * 1000; // 30 seconds

/* ─── Adapter ─────────────────────────────────────────────────────── */

function resolveImage(src) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/cdn/shop/")) return `https://www.rdspharma.online${src}`;
  return src;
}

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function adaptRandomProduct(raw, locale) {
  if (!raw) return null;
  const translations = Array.isArray(raw?.translations) ? raw.translations : [];
  const translation =
    translations.find((entry) => entry.lang === locale) ||
    translations.find((entry) => entry.lang === "en") ||
    translations[0] ||
    {};
  return {
    id: raw.id,
    title: translation.title || "Product",
    image: resolveImage(raw.frontImage),
    newPrice: toNumber(raw.newPrice),
    oldPrice: toNumber(raw.oldPrice),
    currency: raw.currency || "AED",
  };
}

/* ─── Single Item ─────────────────────────────────────────────────── */

const RecommendationItem = memo(function RecommendationItem({
  product,
  onAdded,
}) {
  const t = useTranslations("cart.recommendations");
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = useCallback(async () => {
    if (isAdding) return;
    setIsAdding(true);
    try {
      const action = await dispatch(
        addToCart({ productId: product.id, quantity: 1 })
      );
      if (addToCart.fulfilled.match(action)) {
        onAdded?.(product.id);
      }
    } finally {
      setIsAdding(false);
    }
  }, [dispatch, product.id, onAdded, isAdding]);

  const price = product.newPrice ?? product.oldPrice ?? 0;
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
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="56px"
            className="object-contain p-1"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[10px] text-gray-300">{t("noImage")}</span>
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
        disabled={isAdding}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                   bg-main text-white shadow-sm transition-all duration-200
                   hover:bg-[#5aaa44] hover:shadow-md active:scale-95
                   disabled:cursor-not-allowed disabled:opacity-60
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-main/40"
        aria-label={t("addToCart", { title: product.title })}
      >
        {isAdding ? (
          <Loader2 size={14} strokeWidth={2.2} className="animate-spin" />
        ) : (
          <Plus size={16} strokeWidth={2.2} />
        )}
      </button>
    </div>
  );
});

/* ─── Skeleton ────────────────────────────────────────────────────── */

const RecommendationsSkeleton = memo(function RecommendationsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-xl border border-gray-100
                     bg-white px-3 py-2.5"
        >
          <div className="h-14 w-14 shrink-0 animate-pulse rounded-lg bg-gray-100" />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="h-3 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-gray-100" />
        </div>
      ))}
    </div>
  );
});

/* ─── Main ────────────────────────────────────────────────────────── */

const CartRecommendations = memo(function CartRecommendations() {
  const locale = useLocale();
  const t = useTranslations("cart.recommendations");
  const cartItems = useSelector((state) => state.cart.items);
  const cartInitialized = useSelector((state) => state.cart.initialized);

  const [pool, setPool] = useState([]); // adapted random products pool
  const [removedIds, setRemovedIds] = useState(new Set()); // dismissed locally
  const [loading, setLoading] = useState(false);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  const lastFetchAtRef = useRef(0);
  const inFlightRef = useRef(false);

  /* ── Cart IDs for exclusion ── */
  const cartIds = useMemo(
    () => new Set(cartItems.map((item) => item.id)),
    [cartItems]
  );

  /* ── Visible recommendations: pool minus (cart + locally removed) ── */
  const visible = useMemo(() => {
    return pool
      .filter((p) => !cartIds.has(p.id))
      .filter((p) => !removedIds.has(p.id))
      .slice(0, TARGET_COUNT);
  }, [pool, cartIds, removedIds]);

  /* ── Fetch logic with cooldown ── */
  const fetchRandom = useCallback(
    async ({ force = false } = {}) => {
      if (inFlightRef.current) return;

      const now = Date.now();
      if (!force && now - lastFetchAtRef.current < REFRESH_COOLDOWN_MS) {
        return;
      }

      inFlightRef.current = true;
      setLoading(true);

      try {
        const data = await getRandomProducts();
        const adapted = (Array.isArray(data) ? data : [])
          .map((product) => adaptRandomProduct(product, locale))
          .filter(Boolean);

        // Merge with existing pool, deduplicate by id
        setPool((prev) => {
          const map = new Map();
          [...prev, ...adapted].forEach((p) => {
            if (p?.id) map.set(p.id, p);
          });
          return Array.from(map.values());
        });

        lastFetchAtRef.current = Date.now();
        setHasFetchedOnce(true);
      } catch {
        /* silent fail — not critical */
      } finally {
        inFlightRef.current = false;
        setLoading(false);
      }
    },
    [locale]
  );

  /* ── Initial fetch (once cart is initialized) ── */
  useEffect(() => {
    if (!cartInitialized) return;
    if (hasFetchedOnce) return;
    fetchRandom({ force: true });
  }, [cartInitialized, hasFetchedOnce, fetchRandom]);

  /* ── Auto-refresh when visible count drops below threshold ── */
  useEffect(() => {
    if (!hasFetchedOnce) return;
    if (loading) return;
    if (visible.length >= REFRESH_THRESHOLD) return;

    // Try to fetch (cooldown will skip if too recent)
    fetchRandom();
  }, [visible.length, hasFetchedOnce, loading, fetchRandom]);

  /* ── Handle add: optimistic local removal ── */
  const handleAdded = useCallback((productId) => {
    setRemovedIds((prev) => {
      const next = new Set(prev);
      next.add(productId);
      return next;
    });
  }, []);

  /* ── Render decisions ── */

  // Initial loading (haven't fetched yet) → show skeleton
  if (!hasFetchedOnce && loading) {
    return (
      <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
        <h3
          className="font-oswald! mb-3 text-[13px] font-semibold uppercase
                     tracking-wider text-gray-400 sm:text-sm"
        >
          {t("title")}
        </h3>
        <RecommendationsSkeleton />
      </div>
    );
  }

  // Nothing to show → hide section
  if (visible.length === 0) return null;

  return (
    <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
      <h3
        className="font-oswald! mb-3 text-[13px] font-semibold uppercase
                   tracking-wider text-gray-400 sm:text-sm"
      >
        {t("title")}
      </h3>
      <div className="flex flex-col gap-2">
        {visible.map((product) => (
          <RecommendationItem
            key={product.id}
            product={product}
            onAdded={handleAdded}
          />
        ))}
      </div>
    </div>
  );
});

export default CartRecommendations;
