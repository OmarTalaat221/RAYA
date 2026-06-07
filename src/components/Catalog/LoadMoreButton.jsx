"use client";

import { memo, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function buildPages(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) pages.push("start-ellipsis");

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (end < totalPages - 1) pages.push("end-ellipsis");

  pages.push(totalPages);

  return pages;
}

function LoadMoreButton({
  currentPage,
  totalPages,
  total,
  pageSize,
  onPageChange,
}) {
  const pages = useMemo(
    () => buildPages(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const rangeStart = useMemo(() => {
    if (total === 0) return 0;
    return (currentPage - 1) * pageSize + 1;
  }, [currentPage, pageSize, total]);

  const rangeEnd = useMemo(
    () => Math.min(currentPage * pageSize, total),
    [currentPage, pageSize, total],
  );

  const progressWidth = useMemo(
    () => `${Math.min((currentPage / totalPages) * 100, 100)}%`,
    [currentPage, totalPages],
  );

  const handlePaginationChange = useCallback(
    (page) => {
      if (page < 1 || page > totalPages || page === currentPage) return;

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      onPageChange(page);

      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
      });
    },
    [currentPage, totalPages, onPageChange],
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 pt-10">
      <div className="h-1 w-40 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-main transition-all duration-500"
          style={{ width: progressWidth }}
        />
      </div>

      <p className="text-xs text-secondary font-poppins!">
        Showing {rangeStart}-{rangeEnd} of {total} products
      </p>

      <nav
        aria-label="Catalog pagination"
        className="flex flex-wrap items-center justify-center gap-2"
      >
        <button
          type="button"
          onClick={() => handlePaginationChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex h-10 items-center gap-1 rounded-full border border-soft-black/15 bg-white px-4 text-sm font-medium text-soft-black transition-all duration-300 disabled:pointer-events-none disabled:opacity-40 hover:border-main hover:text-main font-poppins!"
        >
          <ChevronLeft size={16} />
          <span>Prev</span>
        </button>

        {pages.map((page, index) => {
          if (typeof page !== "number") {
            return (
              <span
                key={`${page}-${index}`}
                className="flex h-10 min-w-10 items-center justify-center px-1 text-sm text-secondary font-poppins!"
              >
                …
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => handlePaginationChange(page)}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-4 text-sm font-medium transition-all duration-300 font-poppins! ${
                isActive
                  ? "border-main bg-main text-white shadow-[0_10px_24px_rgba(104,188,82,0.22)]"
                  : "border-soft-black/15 bg-white text-soft-black hover:border-main hover:text-main"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => handlePaginationChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex h-10 items-center gap-1 rounded-full border border-soft-black/15 bg-white px-4 text-sm font-medium text-soft-black transition-all duration-300 disabled:pointer-events-none disabled:opacity-40 hover:border-main hover:text-main font-poppins!"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
}

export default memo(LoadMoreButton);
