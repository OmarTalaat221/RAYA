function SkeletonCard() {
  return (
    <article className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_16px_40px_rgba(17,24,39,0.04)]">
      <div className="aspect-[5/3] bg-[#e9e7e1] animate-pulse" />

      <div className="p-5">
        <div className="h-3 w-24 rounded-full bg-[#ece9e3] animate-pulse" />

        <div className="mt-4 space-y-3">
          <div className="h-6 w-4/5 rounded-full bg-[#ece9e3] animate-pulse" />
          <div className="h-6 w-3/5 rounded-full bg-[#ece9e3] animate-pulse" />
        </div>

        <div className="mt-5 space-y-2">
          <div className="h-4 w-full rounded-full bg-[#f0eee9] animate-pulse" />
          <div className="h-4 w-11/12 rounded-full bg-[#f0eee9] animate-pulse" />
          <div className="h-4 w-8/12 rounded-full bg-[#f0eee9] animate-pulse" />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="h-4 w-24 rounded-full bg-[#ece9e3] animate-pulse" />
          <div className="h-9 w-9 rounded-full bg-[#ece9e3] animate-pulse" />
        </div>
      </div>
    </article>
  );
}

export default function NewsPageFallback() {
  return (
    <section className="w-full bg-[#f4f3f0] py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="container mx-auto min-h-[70vh] px-4 sm:px-6">
        <div className="mb-10 text-start md:mb-14 md:text-center">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-main sm:text-sm font-poppins!">
            Journal
          </span>

          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-soft-black font-oswald!">
            Latest News
          </h1>

          <div className="mt-4 max-w-2xl md:mx-auto">
            <div className="h-4 w-full rounded-full bg-[#e9e7e1] animate-pulse" />
            <div className="mt-2 h-4 w-3/4 rounded-full bg-[#ece9e3] animate-pulse md:mx-auto" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-white/90 animate-pulse" />
          <div className="h-10 w-10 rounded-xl bg-white/90 animate-pulse" />
          <div className="h-10 w-10 rounded-xl bg-white/90 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
