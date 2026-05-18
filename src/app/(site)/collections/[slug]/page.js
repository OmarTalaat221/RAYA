import { notFound } from "next/navigation";
import CatalogPage from "../../../../components/Catalog/CatalogPage";
import { getAllCategories } from "../../../../services/categories.service";
import { adaptCategoriesToCollections } from "../../../../components/Collections/category.adapter";
import { getProducts, getProductsByCategorySlug } from "../../../../services/products.service";
import { adaptApiProducts } from "../../../../components/Catalog/product.adapter";
import { sortToApiParams } from "../../../../components/Catalog/sort.utils";
import { availabilityToApiParam, priceRangeToApiParam } from "../../../../components/Catalog/filters.utils";

async function fetchCategorySlugs() {
  try {
    const data = await getAllCategories({ page: 1, limit: 100 });
    return adaptCategoriesToCollections(data?.items ?? [], "en");
  } catch (error) {
    console.error("[CollectionSlug] Failed to fetch categories:", error);
    return [];
  }
}

function findCategoryBySlug(categories, slug) {
  return categories.find((c) => c.slug === slug) || null;
}

function slugToTitle(slug) {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  const categories = await fetchCategorySlugs();
  const slugs = categories.map((c) => c.slug);
  const all = new Set(["all", ...slugs]);
  return Array.from(all).map((slug) => ({ slug }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug } = params;

  if (slug === "all") {
    return {
      title: "All Products | RDS Pharma",
      description: "Browse our complete catalogue of premium products.",
    };
  }

  const categories = await fetchCategorySlugs();
  const category = findCategoryBySlug(categories, slug);

  if (category) {
    return {
      title: `${category.meta?.metaTitle || category.title} | RDS Pharma`,
      description:
        category.meta?.metaDescription ||
        `Explore our ${category.title} range.`,
      keywords: category.meta?.metaKeywords || undefined,
    };
  }

  return { title: "Collection Not Found | RDS Pharma" };
}

async function fetchServerProducts(slug, searchParams) {
  const page = parseInt(searchParams.page) || 1;
  const sort = searchParams.sort || "default";
  
  let availability = [];
  if (searchParams.availability) {
    availability = searchParams.availability.split(",");
  }
  
  const priceRange = {
    from: searchParams.minPrice || "",
    to: searchParams.maxPrice || ""
  };

  const { sortBy, sortOrder } = sortToApiParams(sort);
  const in_stock = availabilityToApiParam(availability);
  const apiPriceRange = priceRangeToApiParam(priceRange, 999999);

  const params = {
    page,
    limit: 12,
    sortBy,
    sortOrder,
    in_stock,
    priceRange: apiPriceRange,
  };

  let response;
  try {
    if (slug === "all") {
      response = await getProducts(params);
    } else {
      response = await getProductsByCategorySlug(slug, params);
    }
  } catch (error) {
    console.error(`[CollectionPage] Failed to fetch products for slug ${slug}:`, error);
  }

  const payload = response?.data ?? response;
  const productsBlock = payload?.products ?? payload?.data?.products ?? payload;

  if (!productsBlock) {
    return { products: [], pagination: { page: 1, totalPages: 1, totalItems: 0, hasNextPage: false }, highestPrice: 0, currency: "AED" };
  }

  let rawItems = [];
  if (Array.isArray(productsBlock.items)) {
    rawItems = productsBlock.items;
  } else if (Array.isArray(payload?.items)) {
    rawItems = payload.items;
  } else if (Array.isArray(productsBlock)) {
    rawItems = productsBlock;
  }

  if (rawItems.length > 0 && Array.isArray(rawItems[0]?.products)) {
    rawItems = rawItems.flatMap((item) => item.products || []);
  }

  const adapted = adaptApiProducts(rawItems, "en");
  
  const pagination = productsBlock.pagination ?? payload?.pagination ?? {};
  
  const apiHighest = Number(
    payload?.highestPrice ??
      payload?.highest_price ??
      payload?.data?.highestPrice ??
      payload?.data?.highest_price ??
      0
  );

  const currency = adapted[0]?.currency || "AED";

  return {
    products: adapted,
    pagination: {
      page: pagination.page ?? page,
      totalPages: pagination.totalPages ?? 1,
      totalItems: pagination.totalItems ?? adapted.length,
      hasNextPage: Boolean(pagination.hasNextPage),
    },
    highestPrice: Number.isFinite(apiHighest) && apiHighest > 0 ? apiHighest : 0,
    currency
  };
}

export default async function CollectionPage(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { slug } = params;

  if (slug === "all") {
    const data = await fetchServerProducts("all", searchParams);
    return (
      <CatalogPage
        products={data.products}
        pagination={data.pagination}
        highestPrice={data.highestPrice}
        title="All Products"
        subtitle="Browse our complete catalogue of premium products."
        currency={data.currency}
        source="all"
      />
    );
  }

  const categories = await fetchCategorySlugs();
  const category = findCategoryBySlug(categories, slug);

  if (category) {
    const data = await fetchServerProducts(slug, searchParams);
    return (
      <CatalogPage
        products={data.products}
        pagination={data.pagination}
        highestPrice={data.highestPrice}
        title={category.title}
        subtitle={
          category.meta?.metaDescription ||
          `Explore our ${category.title.toLowerCase()} range.`
        }
        currency={data.currency}
        source={`category:${slug}`}
      />
    );
  }

  notFound();
}
