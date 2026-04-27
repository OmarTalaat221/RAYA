import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ArticleShareButton from "./ArticleShareButton";
import RelatedPosts from "./RelatedPosts";
import styles from "./BlogDetailsPage.module.css";
import {
  formatBlogDate,
  resolveMediaSrc,
  sanitizeRichText,
} from "./blog-details.utils";

export default function BlogDetailsPage({
  article,
  canonicalUrl,
  relatedPosts = [],
}) {
  const imageSrc = resolveMediaSrc(article.image);
  const articleHtml = sanitizeRichText(article.content || "");
  const ctaHref = article.ctaHref || "/";
  const ctaLabel = article.ctaLabel || "Order it now from RDS";

  return (
    <div className="bg-[#f4f3f0]">
      <article>
        <div className="mx-auto flex container flex-col px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8 lg:pt-16">
          {/* ── Featured image ── */}
          <div className="overflow-hidden rounded-[28px] border border-black/5 bg-white p-2 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[32px] sm:p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#ebe7df] sm:aspect-[16/10] sm:rounded-[28px] lg:aspect-[16/9]">
              {imageSrc ? (
                <>
                  <Image
                    src={imageSrc}
                    alt={article.title}
                    fill
                    priority
                    sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 92vw, 100vw"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#eef7ea_0%,#f6f3ec_45%,#ebe7df_100%)]" />
              )}
            </div>
          </div>

          {/* ── Header ── */}
          <header className="mx-auto mt-8 w-full sm:mt-10 lg:mt-12">
            {article.category ? (
              <p className="font-oswald! text-[11px] uppercase tracking-[0.28em] text-main">
                {article.category}
              </p>
            ) : null}

            <h1 className="mt-4 font-garamond! text-[2.35rem] leading-[1.02] tracking-[-0.03em] text-soft-black sm:text-[3.15rem] lg:text-[4.15rem]">
              {article.title}
            </h1>

            {article.excerpt ? (
              <p className="mt-5 max-w-[60ch] font-poppins! text-base leading-8 text-[#5b5b5b] sm:text-[1.06rem]">
                {article.excerpt}
              </p>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-black/10 py-4">
              {article.publishedAt ? (
                <time
                  dateTime={article.publishedAt}
                  className="font-poppins! text-sm text-secondary"
                >
                  {formatBlogDate(article.publishedAt)}
                </time>
              ) : null}

              {article.category && article.publishedAt ? (
                <span className="h-1 w-1 rounded-full bg-black/20" />
              ) : null}

              {article.category ? (
                <span className="font-poppins! text-sm text-secondary">
                  {article.category}
                </span>
              ) : null}

              <span className="hidden h-1 w-1 rounded-full bg-black/20 sm:inline-block" />

              <ArticleShareButton title={article.title} url={canonicalUrl} />
            </div>
          </header>

          {/* ── Article body ── */}
          <div className="mx-auto mt-8 w-full rounded-[28px] border border-black/5 bg-white px-5 py-7 shadow-[0_14px_40px_rgba(15,23,42,0.04)] sm:mt-10 sm:px-8 sm:py-10 lg:mt-12 lg:px-12 lg:py-12">
            <div
              className={`${styles.article} font-poppins!`}
              dangerouslySetInnerHTML={{ __html: articleHtml }}
            />

            {/* ── CTA block ── */}
            <div className="mt-10 rounded-[22px] border border-main/15 bg-[#f8fbf5] px-5 py-5 sm:px-6 sm:py-6">
              <p className="font-oswald! text-[11px] uppercase tracking-[0.28em] text-main">
                Discover the product
              </p>

              <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[48ch] font-poppins! text-sm leading-7 text-[#5c5c5c] sm:text-[0.98rem]">
                  Ready to bring this into your daily care ritual? Explore the
                  featured product in a calm, seamless shopping flow.
                </p>

                <Link
                  href={ctaHref}
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-main px-5 font-poppins! text-sm font-medium text-white transition-colors duration-200 hover:bg-[#5aa746]"
                >
                  {ctaLabel}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Back to blog ── */}
          <footer className="mx-auto mt-8 w-full sm:mt-10">
            <Link
              href="/blog/news"
              className="inline-flex items-center gap-2 font-poppins! text-sm font-medium text-soft-black transition-colors duration-200 hover:text-main! hover:underline!"
            >
              <ArrowLeft size={16} />
              Back to blog
            </Link>
          </footer>
        </div>
      </article>

      {/* ── Related posts ── */}
      {relatedPosts.length > 0 ? (
        <div className="border-t border-black/6 bg-[#f4f3f0] pb-20 sm:pb-24 lg:pb-28">
          <RelatedPosts posts={relatedPosts} />
        </div>
      ) : null}
    </div>
  );
}
