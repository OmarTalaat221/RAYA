export default function TableSection({ section }) {
  const columns = Array.isArray(section?.columns) ? section.columns : [];
  const rows = Array.isArray(section?.rows) ? section.rows : [];

  if (columns.length === 0 || rows.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[26px] border border-black/5 bg-white p-5 shadow-[0_18px_50px_rgba(17,24,39,0.04)] sm:rounded-[32px] sm:p-6 lg:p-8">
      {section.title ? (
        <h3 className="text-[clamp(1.35rem,4vw,2.2rem)] font-bold leading-tight text-soft-black font-oswald!">
          {section.title}
        </h3>
      ) : null}

      {/* Mobile cards */}
      <div className="mt-4 grid gap-3 block md:hidden">
        {rows.map((row, rowIndex) => (
          <div
            key={`mobile-row-${rowIndex}`}
            className="rounded-2xl border border-black/5 bg-[#f8f8f5] p-4"
          >
            <dl className="grid gap-3">
              {columns.map((column, columnIndex) => (
                <div
                  key={`mobile-cell-${rowIndex}-${columnIndex}`}
                  className={
                    columnIndex === 0 ? "" : "border-t border-black/5 pt-3"
                  }
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary">
                    {column}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-soft-black">
                    {row[columnIndex] ?? "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Tablet / Desktop table */}
      <div className="mt-5 hidden md:block overflow-x-auto rounded-2xl border border-black/5">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="bg-[#f7f7f4]">
              {columns.map((col, i) => (
                <th
                  key={`col-${i}`}
                  scope="col"
                  className="border-b border-black/5 px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-secondary"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, ri) => (
              <tr key={`row-${ri}`} className="odd:bg-white even:bg-[#fcfcfa]">
                {columns.map((_, ci) => (
                  <td
                    key={`cell-${ri}-${ci}`}
                    className="border-b border-black/5 px-5 py-4 text-sm leading-6 text-soft-black"
                  >
                    {row[ci] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
