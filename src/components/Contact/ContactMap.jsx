"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

const mapVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const GOOGLE_MAPS_QUERY =
  "Al+Reaya+Al+Owla+Medicine,+Salim+Al+Owis+Building,+Sharjah,+UAE";
const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${GOOGLE_MAPS_QUERY}`;
const EMBED_URL = `https://www.google.com/maps?q=${GOOGLE_MAPS_QUERY}&output=embed`;

export default function ContactMap() {
  return (
    <section className="w-full bg-[#f4f3f0] py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="overflow-hidden rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.05),0_4px_20px_rgba(0,0,0,0.06)]"
          variants={mapVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Map */}
          <div className="relative aspect-[16/7] w-full bg-[#f4f3f0] sm:aspect-[16/6] lg:aspect-[16/5]">
            <iframe
              src={EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Al Reaya Al Owla Medicine - Location Map"
              className="absolute inset-0 h-full w-full"
            />
          </div>

          {/* Info bar */}
          <div className="flex flex-col gap-4 border-t border-gray-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-main/10 text-main">
                <MapPin size={18} strokeWidth={2} />
              </span>

              <div>
                <p className="font-oswald! text-sm font-semibold uppercase tracking-wide text-soft-black">
                  Al Reaya Al Owla Medicine
                </p>

                <p className="font-poppins! text-xs text-secondary">
                  Shop 2, Salim Al Owis Building, Sharjah, UAE
                </p>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-soft-black/20 bg-white px-6 py-2.5 font-poppins! text-sm font-semibold tracking-wide text-soft-black transition-all duration-300 hover:border-main hover:text-main hover:shadow-md"
            >
              <span
                className="absolute inset-0 origin-left scale-x-0 rounded-full bg-main/5 transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />

              <Navigation
                size={14}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"
              />

              <span className="relative z-10">Get Directions</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
