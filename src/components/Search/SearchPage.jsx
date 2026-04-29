import SearchPageClient from "./SearchPageClient";

export default function SearchPage({
  products = [],
  initialQuery = "",
  currency = "AED",
}) {
  return (
    <section className="w-full bg-[#f9f9f8] pb-12 pt-8 sm:pb-16 sm:pt-10 md:pb-20 md:pt-12">
      <div className="container mx-auto px-4 sm:px-6">
        <SearchPageClient
          products={products}
          initialQuery={initialQuery}
          currency={currency}
        />
      </div>
    </section>
  );
}
