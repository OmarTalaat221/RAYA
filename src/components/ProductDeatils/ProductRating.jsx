function StarIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.39 8.72c-.783-.57-.38-1.81.588-1.81H6.44a1 1 0 0 0 .951-.69l1.07-3.292Z" />
    </svg>
  );
}

export default function ProductRating({ rating, reviewCount }) {
  if (typeof rating !== "number") return null;

  const widthPercent = `${Math.max(0, Math.min(100, (rating / 5) * 100))}%`;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-secondary">
      <div className="flex items-center gap-2">
        {/* star display */}
        <div className="relative h-4 w-[92px]">
          <div className="absolute inset-0 flex items-center gap-1 text-gray-200">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={`bg-${i}`} className="h-4 w-4" />
            ))}
          </div>
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: widthPercent }}
          >
            <div className="flex w-[92px] items-center gap-1 text-main">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={`fg-${i}`} className="h-4 w-4" />
              ))}
            </div>
          </div>
        </div>

        <span className="font-medium text-soft-black">{rating.toFixed(1)}</span>
      </div>

      {typeof reviewCount === "number" ? (
        <span>
          {reviewCount} review{reviewCount === 1 ? "" : "s"}
        </span>
      ) : null}
    </div>
  );
}
