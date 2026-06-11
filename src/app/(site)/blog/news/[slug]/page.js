export const runtime = "nodejs";

import { notFound } from "next/navigation";
import BlogDetailsPage from "../../../../../components/Blog/BlogDetailsPage";
import {
  adaptBlogDetail,
  adaptRelatedBlog,
} from "../../../../../components/Blog/blog.adapter";
import { getBlogBySlug } from "../../../../../services/blogs.service";

import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
} from "../../../../../lib/site-config";

function absoluteUrl(path = "/") {
  if (!path) return SITE_URL;

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const response = await getBlogBySlug(slug);
    const article = adaptBlogDetail(response);

    if (!article) {
      return {
        title: `Article Not Found | ${SITE_NAME}`,
        description: "The requested article could not be found.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const canonicalUrl = absoluteUrl(`/blog/news/${article.slug || slug}`);
    const pageTitle = `${article.meta_title || article.title} | ${SITE_NAME}`;
    const description =
      article.meta_description || article.excerpt || article.title;
    const imageUrl = article.image || DEFAULT_OG_IMAGE;

    return {
      title: pageTitle,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: pageTitle,
        description,
        type: "article",
        url: canonicalUrl,
        publishedTime: article.publishedAt,
        images: imageUrl
          ? [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: article.title,
              },
            ]
          : [],
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
      title: `Article Not Found | ${SITE_NAME}`,
      robots: {
        index: false,
        follow: false,
      },
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

  const canonicalUrl = absoluteUrl(`/blog/news/${article.slug || slug}`);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description || article.excerpt || article.title,
    image: [article.image || absoluteUrl(DEFAULT_OG_IMAGE)],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <BlogDetailsPage
        article={article}
        canonicalUrl={canonicalUrl}
        relatedPosts={relatedPosts}
      />
    </>
  );
}