"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import CollectionCard from "../../../components/Collections/CollectionCard";
import CollectionsPageHeading from "../../../components/Collections/CollectionsPageHeading";
import { getAllCategories } from "../../../services/categories.service";
import { adaptCategoriesToCollections } from "../../../components/Collections/category.adapter";
import {
  DesktopSkeleton,
  MobileSkeleton,
} from "../../../components/Collections/CollectionsSkeleton";

const ALL_COLLECTION_CARD = {
  id: "__all__",
  title: "Collection",
  slug: "all",
  href: "/collections/all",
  image:
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=750",
  srcSet: [
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=165 165w",
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=330 330w",
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=535 535w",
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=750 750w",
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=1000 1000w",
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=1500 1500w",
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787&width=3000 3000w",
    "https://www.rdspharma.online/cdn/shop/collections/RDS_LOGO-01.png?v=1739260787 5000w",
  ].join(", "),
};

export default function CollectionsPage() {
  const locale = useLocale();
  const t = useTranslations("common");
  const [apiItems, setApiItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollections = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllCategories({ page: 1, limit: 100 });
      const adapted = adaptCategoriesToCollections(data?.items ?? [], locale);
      setApiItems(adapted);
    } catch (err) {
      console.error("[CollectionsPage] Failed to fetch categories:", err);
      setError(
        err.response?.data?.message ||
          t("failedToLoadCollections")
      );
      setApiItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [locale, t]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const items = [ALL_COLLECTION_CARD, ...apiItems];

  const primaryRows = items.slice(0, 6);
  const lastRowItem = items.length === 7 ? items[6] : null;
  const overflowItems = items.length > 7 ? items.slice(6) : [];

  return (
    <section
      aria-labelledby="collections-heading"
      className="w-full bg-[#f4f3f0] py-10 sm:py-12 md:py-14 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <CollectionsPageHeading />

        {isLoading ? (
          <>
            <div className="hidden md:block">
              <DesktopSkeleton />
            </div>
            <div className="block md:hidden">
              <MobileSkeleton />
            </div>
          </>
        ) : error ? (
          <div className="flex flex-col items-center py-20">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="font-poppins! mb-2 text-base font-medium text-soft-black">
              {t("error")}
            </p>
            <p className="font-poppins! mb-6 max-w-sm text-center text-sm text-secondary">
              {error}
            </p>
            <button
              onClick={fetchCollections}
              className="font-poppins! inline-flex items-center gap-2 rounded-xl
                         bg-main px-6 py-2.5 text-[13px] font-semibold text-white
                         transition-all duration-200 hover:bg-[#5aaa44]
                         active:scale-[0.97] focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-main/40"
            >
              <RefreshCw size={14} strokeWidth={2} />
              {t("tryAgain")}
            </button>
          </div>
        ) : items.length <= 1 && apiItems.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-poppins! text-base text-secondary">
              {t("noCollections")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {primaryRows.map((item) => (
              <CollectionCard
                key={item.id}
                title={item.title}
                image={item.image}
                srcSet={item.srcSet}
                href={item.href}
              />
            ))}

            {lastRowItem && (
              <div className="sm:col-span-2 sm:w-full sm:max-w-md sm:justify-self-center lg:col-span-1 lg:col-start-2 lg:max-w-none lg:justify-self-stretch">
                <CollectionCard
                  title={lastRowItem.title}
                  image={lastRowItem.image}
                  srcSet={lastRowItem.srcSet}
                  href={lastRowItem.href}
                />
              </div>
            )}

            {overflowItems.map((item) => (
              <CollectionCard
                key={item.id}
                title={item.title}
                image={item.image}
                srcSet={item.srcSet}
                href={item.href}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
