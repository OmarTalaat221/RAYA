"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://rdspharma.cloud";

function resolveImage(src) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/cdn/shop/")) return `https://www.rdspharma.online${src}`;
  const clean = src.startsWith("/") ? src : `/${src}`;
  return `${IMAGE_BASE_URL}${clean}`;
}

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function toCurrency(v, fallback = "AED") {
  const code = String(v || fallback).trim();
  return code ? code.toUpperCase() : fallback;
}

function resolveOrderItemImage(item) {
  const product = item?.product || {};
  const media = Array.isArray(product?.media) ? product.media : [];
  const primary =
    media.find((m) => m?.type === "image" && m?.isPrimary) ||
    media.find((m) => m?.type === "image");
  return resolveImage(
    product?.frontImage || primary?.src || product?.backImage || ""
  );
}

const CheckoutSummary = memo(function CheckoutSummary({
  items,
  subtotal: cartSubtotal,
  serverSummary,
}) {
  const locale = useLocale();
  const t = useTranslations("checkout.summary");

  const summaryItems = useMemo(() => {
    if (
      Array.isArray(serverSummary?.orderItems) &&
      serverSummary.orderItems.length
    ) {
      return serverSummary.orderItems.map((item) => {
        const product = item?.product || {};
        const translations = Array.isArray(product?.translations)
          ? product.translations
          : [];
        const translation =
          translations.find((entry) => entry.lang === locale) ||
          translations.find((entry) => entry.lang === "en") ||
          translations[0] ||
          {};
        const accurateTitle =
          translation?.title ||
          item?.productName ||
          product?.title ||
          item?.title ||
          t("productFallback");

        return {
          id: item?.id || item?.productId,
          title: accurateTitle,
          image: resolveOrderItemImage(item),
          quantity: toNumber(item?.quantity) || 1,
          price: toNumber(item?.unitPrice),
          currency: toCurrency(item?.currency || serverSummary?.currency),
        };
      });
    }

    return (items || []).map((item) => {
      const product = item?.product || {};
      const translations = Array.isArray(product?.translations)
        ? product.translations
        : [];
      const translation =
        translations.find((entry) => entry.lang === locale) ||
        translations.find((entry) => entry.lang === "en") ||
        translations[0] ||
        {};
      const accurateTitle =
        translation?.title ||
        item?.title ||
        product?.title ||
        t("productFallback");

      return {
        id: item?.id,
        title: accurateTitle,
        image: resolveImage(item?.image || ""),
        quantity: toNumber(item?.quantity) || 1,
        price: toNumber(item?.price),
        currency: toCurrency(item?.currency),
      };
    });
  }, [items, locale, serverSummary, t]);

  const currencyCode = toCurrency(
    serverSummary?.currency || summaryItems[0]?.currency
  );

  const subtotal = toNumber(serverSummary?.subtotal ?? cartSubtotal ?? 0);
  const shipping = toNumber(serverSummary?.shipping ?? 0);
  const discount = toNumber(
    serverSummary?.discountAmount ?? serverSummary?.discount ?? 0
  );
  const tax = toNumber(serverSummary?.tax ?? 0);
  const total = toNumber(
    serverSummary?.total ?? subtotal + shipping - discount + tax
  );

  return (
    <div className="lg:sticky lg:top-8">
      <div className="rounded-[20px] border border-black/5 bg-[#fafaf9] p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-oswald! text-soft-black">
            {t("title")}
          </h2>
          <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-xs font-medium text-secondary">
            {summaryItems.length}{" "}
            {summaryItems.length === 1 ? t("item") : t("items")}
          </span>
        </div>

        <div className="mb-5 space-y-3.5">
          {summaryItems.map((item) => {
            const lineTotal = toNumber(item.price * item.quantity).toFixed(2);

            return (
              <div key={item.id} className="flex gap-3.5">
                <div className="relative h-[56px] w-[56px] flex-shrink-0 rounded-xl border border-black/5 bg-white">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-1.5"
                      sizes="56px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-[10px] text-secondary">
                        {t("noImage")}
                      </span>
                    </div>
                  )}

                  <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-soft-black text-[9px] font-bold text-white">
                    {item.quantity}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium leading-5 text-soft-black">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-secondary">
                      {item.price.toFixed(2)} {item.currency} × {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 whitespace-nowrap text-[13px] font-semibold text-soft-black">
                    {lineTotal}{" "}
                    <span className="text-[10px] font-normal text-secondary">
                      {item.currency}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="my-4 border-t border-black/5" />

        <div className="space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-secondary">{t("subtotal")}</span>
            <span className="font-medium text-soft-black">
              {subtotal.toFixed(2)} {currencyCode}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-secondary">{t("shipping")}</span>
            <span
              className={
                shipping === 0
                  ? "font-medium text-main"
                  : "font-medium text-soft-black"
              }
            >
              {shipping === 0
                ? t("free")
                : `${shipping.toFixed(2)} ${currencyCode}`}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-main">{t("discount")}</span>
              <span className="font-medium text-main">
                -{discount.toFixed(2)} {currencyCode}
              </span>
            </div>
          )}

          {tax > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-secondary">{t("tax")}</span>
              <span className="font-medium text-soft-black">
                {tax.toFixed(2)} {currencyCode}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 border-t border-black/5 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-oswald! font-bold text-soft-black">
              {t("total")}
            </span>
            <span className="text-xl font-oswald! font-bold text-soft-black">
              {total.toFixed(2)}{" "}
              <span className="text-sm font-medium text-secondary">
                {currencyCode}
              </span>
            </span>
          </div>
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary transition hover:text-main"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t("continueShopping")}
          </Link>
        </div>
      </div>
    </div>
  );
});

CheckoutSummary.displayName = "CheckoutSummary";

export default CheckoutSummary;
