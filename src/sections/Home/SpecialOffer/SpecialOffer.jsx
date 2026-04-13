// components/SpecialOffer/SpecialOffer.jsx

import Link from "next/link";

export default function SpecialOffer() {
  return (
    <section className="w-full bg-[#f4f3f0] py-16 sm:py-20 md:py-24 lg:py-28 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
      <div className="container w-full mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-24">
        {/* ===== LEFT: Text Content ===== */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          {/* Badge */}
          <span
            className="inline-block text-[#68bc52] text-sm sm:text-base font-semibold tracking-[0.2em] uppercase mb-4 sm:mb-6 font-poppins!"
            // style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Limited Time
          </span>

          {/* Heading */}
          <h2
            className="text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-[#2d2d2d] mb-6 sm:mb-8 font-oswald!"
            // style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Special Offer
          </h2>

          {/* Divider */}
          <div className="w-10 h-[2px] bg-[#68bc52] mb-6 sm:mb-8" />

          {/* Description */}
          <p
            className="text-[#93979A] text-sm sm:text-base md:text-lg leading-relaxed w-full font-poppins!"
            // style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Boost Your Beauty Routine with
            {/* <br /> */}
            <span className="text-[#2d2d2d] font-medium">
              {" "}
              Skinage Collagen Prestige{" "}
            </span>
            {/* <br /> */}
            Ampoules
          </p>

          {/* CTA */}
          <Link
            href="/skinage"
            className="group relative mt-8 sm:mt-10 inline-flex items-center gap-2 bg-[#68bc52] text-white rounded-full px-7 py-3 sm:px-9 sm:py-3.5 text-sm sm:text-base font-semibold tracking-wide overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#68bc52]/30 hover:scale-105 font-poppins!"
            // style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              aria-hidden="true"
            />
            <span className="relative z-10">Shop Now</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ===== RIGHT: Promotional Image ===== */}
        <div className="flex-1 w-full max-w-sm sm:max-w-md md:max-w-none">
          <div className="relative">
            <img
              src="https://www.rdspharma.online/cdn/shop/files/e2w.jpg?v=1765268114&width=750"
              srcSet="
                https://www.rdspharma.online/cdn/shop/files/e2w.jpg?v=1765268114&width=165 165w,
                https://www.rdspharma.online/cdn/shop/files/e2w.jpg?v=1765268114&width=360 360w,
                https://www.rdspharma.online/cdn/shop/files/e2w.jpg?v=1765268114&width=535 535w,
                https://www.rdspharma.online/cdn/shop/files/e2w.jpg?v=1765268114&width=750 750w,
                https://www.rdspharma.online/cdn/shop/files/e2w.jpg?v=1765268114&width=1070 1070w,
                https://www.rdspharma.online/cdn/shop/files/e2w.jpg?v=1765268114&width=1500 1500w
              "
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
              alt="Skinage Collagen Prestige Ampoules Special Offer"
              loading="lazy"
              decoding="async"
              draggable={false}
              className="relative z-10 w-full h-auto rounded-2xl sm:rounded-3xl"
              style={{ display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
