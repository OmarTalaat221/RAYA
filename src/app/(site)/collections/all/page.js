// import CatalogPage from "@/components/Catalog/CatalogPage";

import CatalogPage from "../../../../components/Catalog/CatalogPage";
import { PRODUCTS } from "../../../../components/FeaturedProducts/products";

export default function CatalogPageRoute() {
  return <CatalogPage products={PRODUCTS} currency="AED" />;
}
