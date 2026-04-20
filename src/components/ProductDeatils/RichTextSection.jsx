export default function RichTextSection({ section }) {
  if (!section?.content) {
    return null;
  }

  return (
    <section className="rounded-[26px] border border-black/5 bg-white p-5 shadow-[0_18px_50px_rgba(17,24,39,0.04)] sm:rounded-[32px] sm:p-6 lg:p-8">
      {section.title ? (
        <h3 className="text-[clamp(1.35rem,4vw,2.2rem)] font-bold leading-tight text-soft-black font-oswald!">
          {section.title}
        </h3>
      ) : null}

      <div
        className="mt-4 text-sm leading-7 text-secondary [overflow-wrap:anywhere]
        sm:mt-5 sm:text-[15px]
        [&_p]:mb-4
        [&_p:last-child]:mb-0
        [&_strong]:font-semibold
        [&_strong]:text-soft-black
        [&_em]:italic
        [&_ul]:my-4
        [&_ul]:list-disc
        [&_ul]:pl-5
        [&_ol]:my-4
        [&_ol]:list-decimal
        [&_ol]:pl-5
        [&_li]:mb-2
        [&_a]:text-main
        [&_a]:underline
        [&_a]:break-words
        [&_h4]:mt-6
        [&_h4]:text-base
        [&_h4]:font-semibold
        [&_h4]:text-soft-black
        sm:[&_h4]:text-lg
        [&_img]:h-auto
        [&_img]:max-w-full
        [&_img]:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    </section>
  );
}
