import ProductsGrid from "../../../../components/Catalog/ProductsGrid";

export default function Loading() {
  return (
    <section className="w-full bg-[#f9f9f8] pb-12 pt-8 sm:pb-16 sm:pt-10 md:pb-20 md:pt-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Filter bar placeholder — matches CatalogClient spacing */}
        <div className="mb-5 h-[72px] rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:h-[80px]" />

        {/* Grid skeleton */}
        <div className="min-h-[400px]">
          <ProductsGrid products={[]} isLoading />
        </div>
      </div>
    </section>
  );
}
