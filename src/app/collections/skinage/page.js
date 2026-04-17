import CatalogPage from "../../../components/Catalog/CatalogPage";
import { PRODUCTS } from "../../../components/FeaturedProducts/products";

const getProductsByBrand = (products, brand) =>
  products.filter(
    (product) => product.brand?.toLowerCase() === brand.toLowerCase()
  );

export default function SkinagePage() {
  return (
    <CatalogPage
      products={getProductsByBrand(PRODUCTS, "Skinage")}
      title="Skinage"
      subtitle="Explore the Skinage collection of premium skincare essentials."
      currency="AED"
    />
  );
}
