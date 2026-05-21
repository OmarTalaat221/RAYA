"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getAllBlogs } from "../../services/blogs.service";
import { adaptBlogListResponse } from "./blog.adapter";
import NewsListingPage from "./NewsListingPage";
import NewsPageFallback from "./NewsPageFallback";

const PAGE_SIZE = 6;

export default function NewsPageClient() {
  const t = useTranslations("blog");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawPage = Number(searchParams.get("page") || "1");
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const [posts, setPosts] = useState([]);
  const [metadata, setMetadata] = useState({
    total: 0,
    totalPages: 1,
    currentPage: 1,
    limit: PAGE_SIZE,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ── Fetch blogs from API ── */
  const fetchBlogs = useCallback(
    async (page) => {
      setLoading(true);
      setError("");

      try {
        const response = await getAllBlogs(page, PAGE_SIZE);
        const { posts: adaptedPosts, metadata: apiMeta } =
          adaptBlogListResponse(response);

        setPosts(adaptedPosts);
        setMetadata(apiMeta);

        /* If requested page exceeds totalPages, redirect to last valid page */
        if (page > apiMeta.totalPages && apiMeta.totalPages > 0) {
          const params = new URLSearchParams();
          if (apiMeta.totalPages > 1) {
            params.set("page", String(apiMeta.totalPages));
          }
          const query = params.toString();
          router.replace(query ? `${pathname}?${query}` : pathname, {
            scroll: false,
          });
        }
      } catch (err) {
        console.error("[Blog] Failed to fetch blogs:", err);
        setError("Failed to load articles. Please try again.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    },
    [pathname, router]
  );

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage, fetchBlogs]);

  /* ── Loading ── */
  if (loading) {
    return <NewsPageFallback />;
  }

  /* ── Error ── */
  if (error) {
    return (
      <section className="w-full bg-[#f4f3f0] py-10 sm:py-12 md:py-14 lg:py-20">
        <div className="container mx-auto min-h-[50vh] px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {/* Error icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <svg
                className="h-7 w-7 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>

            <h2 className="mb-2 text-xl font-oswald! text-soft-black">
              Something went wrong
            </h2>

            <p className="mb-6 max-w-md text-sm leading-6 text-secondary font-poppins!">
              {error}
            </p>

            <button
              type="button"
              onClick={() => fetchBlogs(currentPage)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-main bg-main px-6 text-sm font-medium text-white transition duration-200 hover:bg-[#5eae49] font-poppins!"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
                />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* ── Content ── */
  return (
    <NewsListingPage
      posts={posts}
      currentPage={metadata.currentPage}
      totalPages={metadata.totalPages}
      total={metadata.total}
      pageSize={PAGE_SIZE}
      title={t("latestNews")}
      eyebrow={t("eyebrow")}
      subtitle={t("subtitle")}
    />
  );
}
