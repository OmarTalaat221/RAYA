"use client";

import { memo } from "react";
import ProductCard from "../FeaturedProducts/ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const SKELETON_ITEMS = Array.from({ length: 8 });

function ProductsGrid({ products = [], isLoading = false, canHover = false }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
        {SKELETON_ITEMS.map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id || product.href || index}
          id={product.id}
          title={product.title}
          href={product.href}
          frontImage={product.frontImage}
          backImage={product.backImage}
          oldPrice={product.oldPrice}
          newPrice={product.newPrice}
          currency={product.currency}
          isOnSale={product.isOnSale}
          discountPercentage={product.discountPercentage}
          priority={index === 0}
          canHover={canHover}
          inCart={product.inCart}
        />
      ))}
    </div>
  );
}

export default memo(ProductsGrid);
