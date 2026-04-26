import { notFound } from "next/navigation";
import { blogData } from "../../../../../components/Blog/blog";
import BlogDetailsPage from "../../../../../components/Blog/BlogDetailsPage";
import {
  adaptBlogPost,
  getRelatedPosts,
  toAbsoluteUrl,
} from "../../../../../components/Blog/blog-details.utils";

// ─── Data helpers ─────────────────────────────────────────────────────────────

function getRawPostBySlug(slug) {
  return blogData.find((post) => post.slug === slug) ?? null;
}

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return blogData.map((post) => ({ slug: post.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const raw = getRawPostBySlug(slug);

  if (!raw) {
    return { title: "Article Not Found | RDS Pharma" };
  }

  const post = adaptBlogPost(raw);
  const pageTitle = `${post.title} | RDS Pharma`;
  const description = post.excerpt || post.title;
  const canonicalUrl = toAbsoluteUrl(post.shareUrl);
  const imageUrl = post.image;

  return {
    title: pageTitle,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: pageTitle,
      description,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.publishedAt,
      images: imageUrl ? [{ url: toAbsoluteUrl(imageUrl) }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: imageUrl ? [toAbsoluteUrl(imageUrl)] : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogDetailsRoute({ params }) {
  const { slug } = await params;
  const raw = getRawPostBySlug(slug);

  if (!raw) notFound();

  const post = adaptBlogPost(raw);
  const canonicalUrl = toAbsoluteUrl(post.shareUrl);

  // Resolve related posts from raw blogData so BlogCard gets the original shape
  const relatedPosts = getRelatedPosts(blogData, raw.relatedPosts, raw.id);

  return (
    <BlogDetailsPage
      article={post}
      canonicalUrl={canonicalUrl}
      relatedPosts={relatedPosts}
    />
  );
}
