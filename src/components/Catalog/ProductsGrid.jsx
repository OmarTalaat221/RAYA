"use client";

import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "../FeaturedProducts/ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export default function ProductsGrid({ products, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <motion.div
            key={product.id || index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            layoutId={product.id}
          >
            <ProductCard
              title={product.title}
              href={product.href}
              frontImage={product.frontImage}
              backImage={product.backImage}
              oldPrice={product.oldPrice}
              newPrice={product.newPrice}
              currency={product.currency}
              isOnSale={product.isOnSale}
              priority={index < 4}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
