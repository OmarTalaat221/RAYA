export const runtime = "nodejs";

import { notFound } from "next/navigation";
import BlogDetailsPage from "../../../../../components/Blog/BlogDetailsPage";
import {
  adaptBlogDetail,
  adaptRelatedBlog,
} from "../../../../../components/Blog/blog.adapter";
import { toAbsoluteUrl } from "../../../../../components/Blog/blog-details.utils";
import { getBlogBySlug } from "../../../../../services/blogs.service";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const response = await getBlogBySlug(slug);
    const article = adaptBlogDetail(response);

    if (!article) {
      return {
        title: "Article Not Found | RDS Pharma",
        description: "The requested article could not be found.",
      };
    }

    const canonicalUrl = toAbsoluteUrl(`/blog/news/${article.slug || slug}`);
    const pageTitle = `${article.meta_title || article.title} | RDS Pharma`;
    const description =
      article.meta_description || article.excerpt || article.title;
    const imageUrl = article.image;

    return {
      title: pageTitle,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: pageTitle,
        description,
        type: "article",
        url: canonicalUrl,
        publishedTime: article.publishedAt,
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch {
    return {
      title: "Article Not Found | RDS Pharma",
    };
  }
}

export default async function BlogDetailsRoute({ params }) {
  const { slug } = await params;

  let response;

  try {
    response = await getBlogBySlug(slug);
  } catch (error) {
    notFound();
  }

  const article = adaptBlogDetail(response);

  if (!article) notFound();

  if (article.slug && article.slug !== slug) notFound();

  const relatedPosts = Array.isArray(response?.data?.relatedBlogs)
    ? response.data.relatedBlogs
        .filter((item) => item?.slug && item.slug !== slug)
        .map(adaptRelatedBlog)
        .filter(Boolean)
    : [];

  const canonicalUrl = toAbsoluteUrl(`/blog/news/${article.slug || slug}`);

  return (
    <BlogDetailsPage
      article={article}
      canonicalUrl={canonicalUrl}
      relatedPosts={relatedPosts}
    />
  );
}