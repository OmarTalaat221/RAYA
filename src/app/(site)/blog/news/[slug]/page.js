export const runtime = "nodejs";

import { notFound } from "next/navigation";
import BlogDetailsPage from "../../../../../components/Blog/BlogDetailsPage";
import { adaptBlogDetail } from "../../../../../components/Blog/blog.adapter";
import { toAbsoluteUrl } from "../../../../../components/Blog/blog-details.utils";
import {
  getAllBlogs,
  getBlogById,
} from "../../../../../services/blogs.service";

async function getFallbackListItem(id) {
  try {
    const response = await getAllBlogs(1, 100);
    return response?.data?.items?.find((item) => item.id === id) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams?.id;

  if (!id) {
    return {
      title: "Article Not Found | RDS Pharma",
      description: "The requested article could not be found.",
    };
  }

  try {
    const [detailResponse, fallbackListItem] = await Promise.all([
      getBlogById(id),
      getFallbackListItem(id),
    ]);

    const article = adaptBlogDetail(detailResponse, fallbackListItem);

    if (!article) {
      return {
        title: "Article Not Found | RDS Pharma",
      };
    }

    const canonicalPath = `/blog/news/${article.slug || slug}`;
    const canonicalUrl = toAbsoluteUrl(canonicalPath);
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

export default async function BlogDetailsRoute({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams?.id;

  if (!id) notFound();

  let detailResponse;

  try {
    detailResponse = await getBlogById(id);
  } catch {
    notFound();
  }

  const fallbackListItem = await getFallbackListItem(id);
  const article = adaptBlogDetail(detailResponse, fallbackListItem);

  if (!article) notFound();

  if (article.slug && article.slug !== slug) {
    notFound();
  }

  const canonicalUrl = toAbsoluteUrl(`/blog/news/${article.slug || slug}`);

  return (
    <BlogDetailsPage
      article={article}
      canonicalUrl={canonicalUrl}
      relatedPosts={[]}
    />
  );
}
