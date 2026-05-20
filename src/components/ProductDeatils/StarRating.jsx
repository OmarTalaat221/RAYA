"use client";

import { useState } from "react";

/* ─── Display-only stars ─── */
export function StarRating({ rating = 0, size = 14 }) {
  const rounded = Math.round(Number(rating) * 2) / 2;

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(rounded);
        const half = !filled && star - 0.5 <= rounded;

        return (
          <svg
            key={star}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={
              filled || half ? "text-amber-400" : "text-black/15"
            }
            fill="currentColor"
            aria-hidden="true"
          >
            {half ? (
              <>
                <defs>
                  <linearGradient id={`half-${star}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="rgba(0,0,0,0.15)" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#half-${star})`}
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </>
            ) : (
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            )}
          </svg>
        );
      })}
    </div>
  );
}

/* ─── Interactive input stars ─── */
export function StarRatingInput({ value = 0, onChange, size = 28, disabled = false }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= (hovered || value);

        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !disabled && setHovered(star)}
            onMouseLeave={() => !disabled && setHovered(0)}
            className="transition-transform duration-150 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={`Rate ${star} ${star === 1 ? "star" : "stars"}`}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={active ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              className={active ? "text-amber-400" : "text-black/25"}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}