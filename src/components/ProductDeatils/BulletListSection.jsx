export default function BulletListSection({ section }) {
  const items = Array.isArray(section?.items) ? section.items : [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[26px] border border-black/5 bg-white p-5 shadow-[0_18px_50px_rgba(17,24,39,0.04)] sm:rounded-[32px] sm:p-6 lg:p-8">
      {section.title ? (
        <h3 className="text-[clamp(1.35rem,4vw,2.2rem)] font-bold leading-tight text-soft-black font-oswald!">
          {section.title}
        </h3>
      ) : null}

      <ul className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 md:grid-cols-2">
        {items.map((item, idx) => (
          <li
            key={`${item}-${idx}`}
            className="flex items-start gap-3 rounded-2xl border border-black/5 bg-[#f7f7f4] px-4 py-3.5 sm:px-5 sm:py-4"
          >
            <span
              className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-main"
              aria-hidden="true"
            />
            <span className="text-sm leading-6 text-soft-black sm:text-[15px] sm:leading-7">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
