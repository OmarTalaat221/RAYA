import CatalogPage from "../../../../components/Catalog/CatalogPage";
import { PRODUCTS } from "../../../../components/FeaturedProducts/products";

const getProductsByBrand = (products, brand) =>
  products.filter((product) => product.isOnSale === true);

export default function OffersPage() {
  return (
    <CatalogPage
      products={getProductsByBrand(PRODUCTS, "Offers")}
      title="Offers"
      subtitle="Explore the Offers collection of premium skincare essentials."
      currency="AED"
    />
  );
}
