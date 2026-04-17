import Link from "next/link";
import { Home, ArrowUpRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="relative overflow-hidden bg-[#f4f3f0]">
      {/* <div className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full bg-main/10" />
      <div className="pointer-events-none absolute -right-20 bottom-16 h-56 w-56 rounded-full bg-white/50" /> */}

      <section className="relative flex min-h-screen items-center py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/75 px-6 py-10 shadow-[0_18px_60px_rgba(45,45,45,0.08)] backdrop-blur-sm sm:px-8 sm:py-12 md:px-12 md:py-14 lg:px-16 lg:py-16">
              {/* <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" /> */}

              <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
                <div className="text-center lg:text-start">
                  <span className="mb-4 inline-flex rounded-full border border-main/20 bg-main/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-main font-poppins! sm:text-xs">
                    Page not found
                  </span>

                  <h1 className="text-[clamp(2rem,6vw,4rem)] font-bold leading-[1.05] text-soft-black font-oswald!">
                    Oops, you seem lost
                  </h1>

                  <p className="mt-4 text-sm leading-7 text-secondary sm:text-base font-poppins!">
                    The page you&apos;re trying to reach doesn&apos;t exist, or
                    may have been moved somewhere else. Head back to the
                    homepage and continue from there with ease.
                  </p>

                  <div className="mt-8">
                    <Link
                      href="/"
                      className="group inline-flex items-center gap-3 rounded-full bg-main px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(104,188,82,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5cab47] font-poppins!"
                    >
                      <Home size={18} strokeWidth={1.8} />
                      <span>Go to Home</span>
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.8}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="relative flex aspect-square w-full max-w-[360px] items-center justify-center rounded-[28px] border border-main/10 bg-[#f8f7f4] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
                    {/* <div className="absolute inset-4 rounded-[24px] border border-dashed border-main/20" />
                    <div className="absolute -top-3 right-8 h-8 w-8 rounded-full bg-main/10" />
                    <div className="absolute bottom-8 left-6 h-5 w-5 rounded-full bg-soft-black/5" /> */}

                    <div className="relative text-center">
                      <div className="text-[clamp(5rem,16vw,9rem)] leading-none tracking-[0.08em] text-soft-black font-oswald!">
                        404
                      </div>

                      <div className="mx-auto mt-3 h-[3px] w-20 rounded-full bg-main" />

                      <p className="mt-4 text-xs uppercase tracking-[0.28em] text-secondary font-poppins! sm:text-sm">
                        Lost, but not for long
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-secondary font-poppins! sm:text-sm">
              If you landed here by mistake, the homepage will get you back on
              track.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
