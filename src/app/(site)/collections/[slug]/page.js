// app/(site)/collections/[slug]/page.jsx

import { notFound } from "next/navigation";
import CatalogPage from "../../../../components/Catalog/CatalogPage";
import { PRODUCTS } from "../../../../components/FeaturedProducts/products";
import {
  getCollectionBySlug,
  getCollectionSlugs,
} from "../../../../components/Collections/collections";

// ─── Static Params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getCollectionSlugs().map((slug) => ({ slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return {
      title: "Collection Not Found | RDS Pharma",
    };
  }

  return {
    title: `${collection.title} | RDS Pharma`,
    description: collection.subtitle,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const products = PRODUCTS.filter(collection.filter);

  return (
    <CatalogPage
      products={products}
      title={collection.title}
      subtitle={collection.subtitle}
      currency="AED"
    />
  );
}
