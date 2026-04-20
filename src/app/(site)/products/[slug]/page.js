import { notFound } from "next/navigation";
import ProductDetailsPage from "../../../../components/ProductDeatils/ProductDetailsPage";
import { PRODUCTS } from "../../../../components/FeaturedProducts/products";

export const dynamicParams = false;

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const product = PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.title,
    description: product.shortDescription || product.title,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsPage product={product} />;
}
