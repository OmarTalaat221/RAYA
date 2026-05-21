"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { getProductReviews } from "../../services/products.service";
import { adaptReviewsResponse } from "./reviews.adapter";
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";

const PAGE_SIZE = 5;

export default function ProductReviews({ productId }) {
  const t = useTranslations("productDetails.reviews");
  const sectionRef = useRef(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    hasNextPage: true,
    totalItems: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  /* ── Lazy load on scroll into viewport ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasLoadedOnce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasLoadedOnce(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasLoadedOnce]);

  /* ── Fetch reviews page ── */
  const fetchPage = useCallback(
    async (nextPage) => {
      if (!productId || loading) return;
      setLoading(true);
      setError("");

      try {
        const data = await getProductReviews(productId, {
          page: nextPage,
          limit: PAGE_SIZE,
        });

        const adapted = adaptReviewsResponse(data);

        setReviews((prev) =>
          nextPage === 1 ? adapted.items : [...prev, ...adapted.items]
        );
        setPagination({
          page: adapted.pagination.page,
          hasNextPage: adapted.pagination.hasNextPage,
          totalItems: adapted.pagination.totalItems,
        });
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            t("failedToLoad")
        );
      } finally {
        setLoading(false);
      }
    },
    [productId, loading, t]
  );

  /* ── Initial fetch when section enters viewport ── */
  useEffect(() => {
    if (!hasLoadedOnce || pagination.page > 0) return;
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLoadedOnce]);

  /* ── Handle new review submission ── */
  const handleReviewSubmitted = useCallback((newReview) => {
    setReviews((prev) => [newReview, ...prev]);
    setPagination((prev) => ({
      ...prev,
      totalItems: prev.totalItems + 1,
    }));
    setShowForm(false);
  }, []);

  const handleViewMore = useCallback(() => {
    fetchPage(pagination.page + 1);
  }, [fetchPage, pagination.page]);

  const isEmpty = hasLoadedOnce && !loading && reviews.length === 0 && !error;
  const isInitialLoading = hasLoadedOnce && loading && reviews.length === 0;

  return (
    <section
      ref={sectionRef}
      className="border-t border-black/5 bg-[#f4f3f0] py-12 sm:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wide text-soft-black font-oswald! sm:text-3xl">
              {t("title")}
            </h2>
            {pagination.totalItems > 0 && (
              <p className="mt-1 text-sm text-secondary">
                {pagination.totalItems}{" "}
                {pagination.totalItems === 1 ? t("singular") : t("plural")}
              </p>
            )}
          </div>

          {!showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-soft-black px-6 text-sm font-semibold text-white transition hover:bg-[#1a1a1a]"
            >
              {t("write")}
            </button>
          )}
        </div>

        {/* form */}
        {showForm && (
          <div className="mb-6 sm:mb-8">
            <ReviewForm
              productId={productId}
              onSubmitted={handleReviewSubmitted}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* loading skeleton (initial only) */}
        {isInitialLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-2xl border border-black/5 bg-white"
              />
            ))}
          </div>
        )}

        {/* error */}
        {error && reviews.length === 0 && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* empty state */}
        {isEmpty && !showForm && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-black/5 bg-white py-12 text-center">
            <p className="text-base font-medium text-soft-black">
              {t("emptyTitle")}
            </p>
            <p className="mt-2 max-w-[36ch] text-sm text-secondary">
              {t("emptyDescription")}
            </p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-main px-6 text-sm font-semibold text-white transition hover:brightness-95"
            >
              {t("writeFirst")}
            </button>
          </div>
        )}

        {/* list */}
        {reviews.length > 0 && (
          <div className="space-y-3">
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        )}

        {/* view more */}
        {pagination.hasNextPage && reviews.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleViewMore}
              disabled={loading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-6 text-sm font-medium text-soft-black transition hover:border-main hover:text-main disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
                  {t("loading")}
                </>
              ) : (
                t("viewMore")
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
