"use client";

import { useState } from "react";
import { StarRatingInput } from "./StarRating";
import { submitProductReview } from "../../services/products.service";

export default function ReviewForm({ productId, onSubmitted, onCancel }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (rating < 1) {
      setError("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write a comment.");
      return;
    }

    setSubmitting(true);

    try {
      const created = await submitProductReview({
        productId,
        rating,
        comment: comment.trim(),
      });

      onSubmitted?.({
        id: created?.id || `temp-${Date.now()}`,
        productId,
        rating,
        comment: comment.trim(),
        createdAt: created?.createdAt || new Date().toISOString(),
        userName: "Anonymous",
      });

      setRating(0);
      setComment("");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to submit review. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-black/5 bg-[#fafaf9] p-5 sm:p-6"
    >
      <h3 className="mb-4 text-base font-semibold text-soft-black">
        Write a Review
      </h3>

      {/* rating */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
          Your Rating
        </label>
        <StarRatingInput
          value={rating}
          onChange={setRating}
          disabled={submitting}
        />
      </div>

      {/* comment */}
      <div className="mb-4">
        <label
          htmlFor="review-comment"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-secondary"
        >
          Your Review
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={submitting}
          rows={4}
          placeholder="Share your experience with this product..."
          className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm leading-6 text-soft-black outline-none transition placeholder:text-secondary/70 focus:border-main disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {/* error */}
      {error && (
        <p className="mb-3 text-sm text-red-500">{error}</p>
      )}

      {/* actions */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-main px-6 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Submitting...
            </>
          ) : (
            "Submit Review"
          )}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-6 text-sm font-medium text-soft-black transition hover:border-black/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}