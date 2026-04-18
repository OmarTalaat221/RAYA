// import CollectionCard from "@/components/Collections/CollectionCard";
// import CollectionsPageHeading from "@/components/Collections/CollectionsPageHeading";
// import { collectionsData } from "@/components/Collections/collections";

import CollectionCard from "../../../components/Collections/CollectionCard";
import { collectionsData } from "../../../components/Collections/collections";
import CollectionsPageHeading from "../../../components/Collections/CollectionsPageHeading";

export const metadata = {
  title: "Collections | RDS Pharma",
  description: "Browse our collections.",
};

const collectionOrder = [
  "collection",
  "denefis",
  "offers",
  "ramadan-offers",
  "skinage",
  "up-sells",
  "yasenka",
];

function getOrderedCollections() {
  const collectionsMap = new Map(
    collectionsData.map((item) => [item.slug, item])
  );

  return collectionOrder
    .map((slug) => collectionsMap.get(slug))
    .filter(Boolean);
}

export default function CollectionsPage() {
  const orderedCollections = getOrderedCollections();
  const primaryRows = orderedCollections.slice(0, 6);
  const lastRowItem = orderedCollections[6];

  return (
    <section
      aria-labelledby="collections-heading"
      className="w-full bg-[#f4f3f0] py-10 sm:py-12 md:py-14 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="">
          <CollectionsPageHeading />

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

            {lastRowItem ? (
              <div className="sm:col-span-2 sm:justify-self-center sm:w-full sm:max-w-md lg:col-span-1 lg:col-start-2 lg:max-w-none lg:justify-self-stretch">
                <CollectionCard
                  title={lastRowItem.title}
                  image={lastRowItem.image}
                  srcSet={lastRowItem.srcSet}
                  href={lastRowItem.href}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
