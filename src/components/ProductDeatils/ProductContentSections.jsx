import RichTextSection from "./RichTextSection";
import BulletListSection from "./BulletListSection";
import TableSection from "./TableSection";

function renderSection(section, index) {
  if (!section?.type) {
    return null;
  }

  switch (section.type) {
    case "rich_text":
      return (
        <RichTextSection
          key={`${section.title || "rich"}-${index}`}
          section={section}
        />
      );

    case "bullet_list":
      return (
        <BulletListSection
          key={`${section.title || "list"}-${index}`}
          section={section}
        />
      );

    case "table":
      return (
        <TableSection
          key={`${section.title || "table"}-${index}`}
          section={section}
        />
      );

    default:
      return null;
  }
}

export default function ProductContentSections({
  shortDescription,
  contentSections,
}) {
  const hasSections =
    Array.isArray(contentSections) && contentSections.length > 0;
  const hasDesc = Boolean(shortDescription);

  if (!hasDesc && !hasSections) {
    return null;
  }

  return (
    <section className="border-t border-black/5 bg-[#f4f3f0] py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 max-w-3xl sm:mb-10 lg:mb-12">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-main sm:text-sm font-poppins!">
            Product details
          </span>

          <h2 className="text-[clamp(1.9rem,7vw,3.5rem)] font-bold leading-tight text-soft-black font-oswald!">
            Everything you need to know
          </h2>

          {hasDesc ? (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-secondary sm:text-base">
              {shortDescription}
            </p>
          ) : null}
        </div>

        {hasSections ? (
          <div className="space-y-5 sm:space-y-6">
            {contentSections.map((section, index) =>
              renderSection(section, index)
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
