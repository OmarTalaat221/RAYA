import { cache } from "react";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import CatalogPage from "../../../../components/Catalog/CatalogPage";
import { getAllCategories } from "../../../../services/categories.service";
import { adaptCategoriesToCollections } from "../../../../components/Collections/category.adapter";
import {
  getProducts,
  getProductsByCategorySlug,
} from "../../../../services/products.service";
import { adaptApiProducts } from "../../../../components/Catalog/product.adapter";
import { sortToApiParams } from "../../../../components/Catalog/sort.utils";
import {
  availabilityToApiParam,
  priceRangeToApiParam,
} from "../../../../components/Catalog/filters.utils";

import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
} from "../../../../lib/site-config";

const DEFAULT_LIMIT = 12;

const EMPTY_PRODUCTS_DATA = {
  products: [],
  pagination: {
    page: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
  },
  highestPrice: 0,
  currency: "AED",
};

function absoluteUrl(path = "/") {
  if (!path) return SITE_URL;

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

const fetchCategorySlugs = cache(async (lang = "en") => {
  try {
    const data = await getAllCategories({ page: 1, limit: 100 });
    return adaptCategoriesToCollections(data?.items ?? [], lang);
  } catch (error) {
    console.error("[CollectionSlug] Failed to fetch categories:", error);
    return [];
  }
});

function findCategoryBySlug(categories, slug) {
  return categories.find((category) => category.slug === slug) || null;
}

function getParamValue(searchParams, key) {
  const value = searchParams?.[key];

  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function parsePage(value) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function parseAvailability(value) {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeProductsPayload(response) {
  const payload = response?.data ?? response;
  const productsBlock = payload?.products ?? payload?.data?.products ?? payload;

  if (!productsBlock) {
    return {
      payload,
      productsBlock: null,
      rawItems: [],
    };
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

  return {
    payload,
    productsBlock,
    rawItems,
  };
}

function getPagination(productsBlock, payload, page, itemsCount) {
  const pagination = productsBlock?.pagination ?? payload?.pagination ?? {};

  return {
    page: pagination.page ?? page,
    totalPages: pagination.totalPages ?? 1,
    totalItems: pagination.totalItems ?? itemsCount,
    hasNextPage: Boolean(pagination.hasNextPage),
  };
}

function getHighestPrice(payload) {
  const value = Number(
    payload?.highestPrice ??
      payload?.highest_price ??
      payload?.data?.highestPrice ??
      payload?.data?.highest_price ??
      0
  );

  return Number.isFinite(value) && value > 0 ? value : 0;
}

async function fetchServerProducts(slug, searchParams, lang = "en") {
  const page = parsePage(getParamValue(searchParams, "page"));
  const sort = getParamValue(searchParams, "sort") || "default";
  const availability = parseAvailability(
    getParamValue(searchParams, "availability")
  );

  const priceRange = {
    from: getParamValue(searchParams, "minPrice"),
    to: getParamValue(searchParams, "maxPrice"),
  };

  const { sortBy, sortOrder } = sortToApiParams(sort);
  const in_stock = availabilityToApiParam(availability);
  const apiPriceRange = priceRangeToApiParam(priceRange, 999999);

  const params = {
    page,
    limit: DEFAULT_LIMIT,
    sortBy,
    sortOrder,
    in_stock,
    priceRange: apiPriceRange,
  };

  try {
    const response =
      slug === "all"
        ? await getProducts(params)
        : await getProductsByCategorySlug(slug, params);

    const { payload, productsBlock, rawItems } = normalizeProductsPayload(
      response
    );

    if (!productsBlock) {
      return EMPTY_PRODUCTS_DATA;
    }

    const adapted = adaptApiProducts(rawItems, lang);
    const currency = adapted[0]?.currency || "AED";

    return {
      products: adapted,
      pagination: getPagination(productsBlock, payload, page, adapted.length),
      highestPrice: getHighestPrice(payload),
      currency,
    };
  } catch (error) {
    console.error(
      `[CollectionPage] Failed to fetch products for slug ${slug}:`,
      error
    );

    return EMPTY_PRODUCTS_DATA;
  }
}

export async function generateStaticParams() {
  const categories = await fetchCategorySlugs("en");
  const slugs = categories.map((category) => category.slug);
  const uniqueSlugs = Array.from(new Set(["all", ...slugs]));

  return uniqueSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug } = params;

  if (slug === "all") {
    const title = `All Products | ${SITE_NAME}`;
    const description = "Browse our complete catalogue of premium products.";
    const canonical = absoluteUrl("/collections/all");

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        type: "website",
        title,
        description,
        url: canonical,
        images: [
          {
            url: DEFAULT_OG_IMAGE,
            width: 1200,
            height: 630,
            alt: SITE_NAME,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [DEFAULT_OG_IMAGE],
      },
    };
  }

  const categories = await fetchCategorySlugs("en");
  const category = findCategoryBySlug(categories, slug);

  if (!category) {
    return {
      title: `Collection Not Found | ${SITE_NAME}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${category.meta?.metaTitle || category.title} | ${SITE_NAME}`;
  const description =
    category.meta?.metaDescription || `Explore our ${category.title} range.`;
  const canonical = absoluteUrl(`/collections/${slug}`);
  const image = category.image || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords: category.meta?.metaKeywords || undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: category.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function CollectionPage(props) {
  const locale = await getLocale();
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { slug } = params;

  if (slug === "all") {
    const data = await fetchServerProducts("all", searchParams, locale);

    return (
      <CatalogPage
        products={data.products}
        pagination={data.pagination}
        highestPrice={data.highestPrice}
        title={locale === "ar" ? "كل المنتجات" : "All Products"}
        subtitle={
          locale === "ar"
            ? "تصفح الكتالوج الكامل لمنتجاتنا المميزة."
            : "Browse our complete catalogue of premium products."
        }
        currency={data.currency}
        source="all"
      />
    );
  }

  const [categories, data] = await Promise.all([
    fetchCategorySlugs(locale),
    fetchServerProducts(slug, searchParams, locale),
  ]);

  const category = findCategoryBySlug(categories, slug);

  if (!category) {
    notFound();
  }

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