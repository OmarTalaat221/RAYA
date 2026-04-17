// import CatalogPage from "@/components/Catalog/CatalogPage";

import CatalogPage from "../../components/Catalog/CatalogPage";

// sample products array
const products = [
  {
    id: "1",
    title: "SKINAGE Beauty Hydra Booster Cream",
    href: "/catalog/skinage-hydra-booster",
    frontImage: "https://cdn.shopify.com/...",
    backImage: "https://cdn.shopify.com/...",
    oldPrice: "199.00",
    newPrice: "149.00",
    currency: "AED",
    isOnSale: true,
    inStock: true,
  },
  // ... more products
];

export default function CatalogPageRoute() {
  return <CatalogPage products={products} currency="AED" />;
}
