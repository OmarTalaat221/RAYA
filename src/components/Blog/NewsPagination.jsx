"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

export default function NewsPagination({
  currentPage,
  totalPages,
  total,
  pageSize,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const pages = buildPages(currentPage, totalPages);
  const rangeStart = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, total);

  const createPageHref = (page) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const handlePaginationChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    router.push(createPageHref(page), { scroll: false });

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 pt-10 md:pt-12">
      <div className="h-1 w-40 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-main transition-all duration-500"
          style={{
            width: `${Math.min((currentPage / totalPages) * 100, 100)}%`,
          }}
        />
      </div>

      <p className="text-xs text-secondary font-poppins!">
        Showing {rangeStart}-{rangeEnd} of {total} articles
      </p>

      <nav
        aria-label="News pagination"
        className="flex flex-wrap items-center justify-center gap-2"
      >
        <button
          type="button"
          onClick={() => handlePaginationChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex h-10 items-center gap-1 rounded-full border border-soft-black/15 bg-white px-4 text-sm font-medium text-soft-black transition-all duration-300 hover:border-main hover:text-main disabled:pointer-events-none disabled:opacity-40 font-poppins!"
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
          className="inline-flex h-10 items-center gap-1 rounded-full border border-soft-black/15 bg-white px-4 text-sm font-medium text-soft-black transition-all duration-300 hover:border-main hover:text-main disabled:pointer-events-none disabled:opacity-40 font-poppins!"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
}
