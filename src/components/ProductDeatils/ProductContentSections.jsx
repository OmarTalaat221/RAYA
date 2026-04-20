import RichTextSection from "./RichTextSection";
import BulletListSection from "./BulletListSection";
import TableSection from "./TableSection";

function renderSection(section, index) {
  if (!section?.type) return null;

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

  if (!hasDesc && !hasSections) return null;

  return (
    <section className="border-t border-black/5 bg-[#f4f3f0] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="mb-8 max-w-3xl lg:mb-10">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-main sm:text-sm font-poppins!">
            Product details
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-soft-black font-oswald!">
            Everything you need to know
          </h2>
          {!hasSections && hasDesc ? (
            <p className="mt-4 text-base leading-7 text-secondary sm:text-lg">
              {shortDescription}
            </p>
          ) : null}
        </div>

        {/* sections */}
        {hasSections ? (
          <div className="grid gap-6">
            {contentSections.map((section, index) =>
              renderSection(section, index)
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
