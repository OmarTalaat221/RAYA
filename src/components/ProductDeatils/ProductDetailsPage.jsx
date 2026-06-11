"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import ProductGallery from "./ProductGallery";
import ProductSummary from "./ProductSummary";
import ProductContentSections from "./ProductContentSections";

const RelatedProducts = dynamic(() => import("./RelatedProducts"), {
  ssr: false,
  loading: () => (
    <section className="container mx-auto mt-16 w-full px-4 sm:mt-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="h-8 w-56 animate-pulse rounded bg-black/5" />
          <div className="mt-2 h-4 w-40 animate-pulse rounded bg-black/5" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-[420px] animate-pulse rounded-[22px] bg-black/5"
          />
        ))}
      </div>
    </section>
  ),
});

const ProductReviews = dynamic(() => import("./ProductReviews"), {
  ssr: false,
  loading: () => (
    <section className="border-t border-black/5 bg-[#f4f3f0] py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-52 animate-pulse rounded bg-black/5" />
        <div className="mt-6 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl border border-black/5 bg-white"
            />
          ))}
        </div>
      </div>
    </section>
  ),
});

const ProductStickyBar = dynamic(() => import("./ProductStickyBar"), {
  ssr: false,
});

export default function ProductDetailsPage({ product }) {
  const mainContentRef = useRef(null);

  useEffect(() => {
    // Check if navigation type is back/forward to preserve scroll restoration
    const navEntries = window.performance.getEntriesByType("navigation");
    const isBackForward = navEntries.length > 0 && navEntries[0].type === "back_forward";

    if (isBackForward) return;

    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [product?.id]);

  return (
    <article className="min-h-screen bg-[#f4f3f0]">
      <div
        ref={mainContentRef}
        className="mx-auto container px-4 py-8 sm:px-6 lg:px-8 lg:py-12 scroll-mt-[110px] md:scroll-mt-[130px]"
      >

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:items-start lg:gap-10">
          <ProductGallery media={product.media} productTitle={product.title} />

          <div className="lg:sticky lg:top-28">
            <ProductSummary product={product} />
          </div>
        </div>
      </div>

      <ProductContentSections
        shortDescription={product.shortDescription}
        contentSections={product.contentSections}
      />

      <ProductReviews productId={product.id} />

      <RelatedProducts currentProductId={product.id} />

      <ProductStickyBar product={product} />
    </article>
  );
}
