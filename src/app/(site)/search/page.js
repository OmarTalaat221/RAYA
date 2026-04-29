import SearchPage from "../../../components/Search/SearchPage";
import { PRODUCTS } from "../../../components/FeaturedProducts/products";
import { decodeSearchQuery } from "../../../components/Search/search.utils";

export default async function SearchPageRoute({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const rawQuery =
    typeof resolvedSearchParams?.q === "string"
      ? resolvedSearchParams.q.trim()
      : "";

  const initialQuery = decodeSearchQuery(rawQuery);

  return (
    <SearchPage
      products={PRODUCTS}
      initialQuery={initialQuery}
      currency="AED"
    />
  );
}
