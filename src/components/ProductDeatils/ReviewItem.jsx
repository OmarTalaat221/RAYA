"use client";

import { memo } from "react";
import { StarRating } from "./StarRating";

function formatDate(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function getInitials(name) {
  if (!name) return "A";
  const parts = String(name).trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "A";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const ReviewItem = memo(function ReviewItem({ review }) {
  if (!review) return null;

  return (
    <article className="flex gap-4 rounded-2xl border border-black/5 bg-white p-4 sm:p-5">
      {/* avatar */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-main/10 text-sm font-semibold text-main">
        {getInitials(review.userName)}
      </div>

      {/* content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-soft-black">
              {review.userName}
            </h4>
            <span className="text-xs text-secondary">
              {formatDate(review.createdAt)}
            </span>
          </div>
          <StarRating rating={review.rating} size={14} />
        </div>

        {review.comment && (
          <p className="mt-2 text-sm leading-6 text-soft-black/80">
            {review.comment}
          </p>
        )}
      </div>
    </article>
  );
});

export default ReviewItem;