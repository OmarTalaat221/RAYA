// import CatalogPage from "../../components/Catalog/CatalogPage";
import { PRODUCTS } from "../../../components/FeaturedProducts/products";
import CatalogPage from "../../../components/Catalog/CatalogPage";

const getProductsByBrand = (products, brand) =>
  products.filter(
    (product) => product.brand?.toLowerCase() === brand.toLowerCase()
  );

export default function DenefisPage() {
  return (
    <CatalogPage
      products={getProductsByBrand(PRODUCTS, "Denefis")}
      title="Denefis"
      subtitle="Explore the Denefis collection of premium skincare essentials."
      currency="AED"
    />
  );
}
