import ProductGallery from "./ProductGallery";
import ProductSummary from "./ProductSummary";
import ProductContentSections from "./ProductContentSections";

export default function ProductDetailsPage({ product }) {
  return (
    <article className="min-h-screen bg-[#f4f3f0]">
      {/* ── top section: gallery + summary ── */}
      <div className="mx-auto container px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:items-start lg:gap-10">
          <ProductGallery media={product.media} productTitle={product.title} />

          <div className="lg:sticky lg:top-28">
            <ProductSummary product={product} />
          </div>
        </div>
      </div>

      {/* ── content sections below ── */}
      <ProductContentSections
        shortDescription={product.shortDescription}
        contentSections={product.contentSections}
      />
    </article>
  );
}
