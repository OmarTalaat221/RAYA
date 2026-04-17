"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { blogData } from "./blog";
import NewsListingPage from "./NewsListingPage";

const PAGE_SIZE = 6;

export default function NewsPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawPage = Number(searchParams.get("page") || "1");
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const total = blogData.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  useEffect(() => {
    if (currentPage === safeCurrentPage) return;

    const params = new URLSearchParams(searchParams.toString());

    if (safeCurrentPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(safeCurrentPage));
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [currentPage, safeCurrentPage, pathname, router, searchParams]);

  const paginatedPosts = useMemo(() => {
    const start = (safeCurrentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return blogData.slice(start, end);
  }, [safeCurrentPage]);

  return (
    <NewsListingPage
      posts={paginatedPosts}
      currentPage={safeCurrentPage}
      totalPages={totalPages}
      total={total}
      pageSize={PAGE_SIZE}
      title="Latest News"
      eyebrow="From the Journal"
      subtitle="Explore updates, skincare advice, and wellness insights from the RDS Pharma world."
    />
  );
}
