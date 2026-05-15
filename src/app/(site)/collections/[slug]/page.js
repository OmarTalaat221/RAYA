import { notFound } from "next/navigation";
import CatalogPage from "../../../../components/Catalog/CatalogPage";
import { getAllCategories } from "../../../../services/categories.service";
import { adaptCategoriesToCollections } from "../../../../components/Collections/category.adapter";

async function fetchCategorySlugs() {
  try {
    const data = await getAllCategories({ page: 1, limit: 100 });
    return adaptCategoriesToCollections(data?.items ?? [], "en");
  } catch (error) {
    console.error("[CollectionSlug] Failed to fetch categories:", error);
    return [];
  }
}

function findCategoryBySlug(categories, slug) {
  return categories.find((c) => c.slug === slug) || null;
}

function slugToTitle(slug) {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  const categories = await fetchCategorySlugs();
  const slugs = categories.map((c) => c.slug);
  const all = new Set(["all", ...slugs]);
  return Array.from(all).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (slug === "all") {
    return {
      title: "All Products | RDS Pharma",
      description: "Browse our complete catalogue of premium products.",
    };
  }

  const categories = await fetchCategorySlugs();
  const category = findCategoryBySlug(categories, slug);

  if (category) {
    return {
      title: `${category.meta?.metaTitle || category.title} | RDS Pharma`,
      description:
        category.meta?.metaDescription ||
        `Explore our ${category.title} range.`,
      keywords: category.meta?.metaKeywords || undefined,
    };
  }

  return { title: "Collection Not Found | RDS Pharma" };
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;

  if (slug === "all") {
    return (
      <CatalogPage
        products={[]}
        title="All Products"
        subtitle="Browse our complete catalogue of premium products."
        currency="AED"
        source="all"
      />
    );
  }

  const categories = await fetchCategorySlugs();
  const category = findCategoryBySlug(categories, slug);

  if (category) {
    return (
      <CatalogPage
        products={[]}
        title={category.title}
        subtitle={
          category.meta?.metaDescription ||
          `Explore our ${category.title.toLowerCase()} range.`
        }
        currency="AED"
        source={`category:${slug}`}
      />
    );
  }

  notFound();
}
