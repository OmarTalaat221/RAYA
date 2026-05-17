import SearchPage from "../../../components/Search/SearchPage";
import { decodeSearchQuery } from "../../../components/Search/search.utils";
import { getSearchSuggests } from "../../../services/search.service";
import {
  adaptSearchResponse,
  EMPTY_SEARCH_RESULTS,
} from "../../../components/Search/search.adapter";

export default async function SearchPageRoute({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const rawQuery =
    typeof resolvedSearchParams?.q === "string"
      ? resolvedSearchParams.q.trim()
      : "";

  const initialQuery = decodeSearchQuery(rawQuery);

  let initialResults = EMPTY_SEARCH_RESULTS;
  let errorMessage = "";

  if (initialQuery) {
    try {
      const response = await getSearchSuggests(initialQuery);
      initialResults = adaptSearchResponse(response, "en");
    } catch (error) {
      console.error("[SearchPageRoute] search fetch failed:", error);
      errorMessage =
        error?.response?.data?.message ||
        "Something went wrong while fetching search results.";
    }
  }

  return (
    <SearchPage
      initialQuery={initialQuery}
      initialResults={initialResults}
      errorMessage={errorMessage}
    />
  );
}
