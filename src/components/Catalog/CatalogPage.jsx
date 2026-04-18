import CatalogClient from "./CatalogClient";

export default function CatalogPage({
  products = [],
  title = "All Products",
  subtitle = "Explore our carefully curated collection of premium skincare, wellness, and pharmacy essentials.",
  currency = "AED",
}) {
  return (
    <section className="w-full bg-[#f9f9f8] pb-12 pt-8 sm:pb-16 sm:pt-10 md:pb-20 md:pt-12">
      <div className="container mx-auto px-4 sm:px-6">
        <CatalogClient
          products={products}
          title={title}
          subtitle={subtitle}
          currency={currency}
        />
      </div>
    </section>
  );
}
