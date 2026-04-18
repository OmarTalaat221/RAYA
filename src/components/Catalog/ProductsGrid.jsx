"use client";

import ProductCard from "../FeaturedProducts/ProductCard";
import ProductSkeleton from "./ProductSkeleton";

export default function ProductsGrid({
  products,
  isLoading = false,
  canHover = false,
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xsm:grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xsm:grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id || index}
          title={product.title}
          href={product.href}
          frontImage={product.frontImage}
          backImage={product.backImage}
          oldPrice={product.oldPrice}
          newPrice={product.newPrice}
          currency={product.currency}
          isOnSale={product.isOnSale}
          priority={index === 0}
          canHover={canHover}
        />
      ))}
    </div>
  );
}
