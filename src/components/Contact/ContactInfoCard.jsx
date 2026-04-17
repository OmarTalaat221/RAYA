"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const contactDetails = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Shop 2, Salim Al Owis Building, Sharjah, UAE",
    href: "https://maps.google.com/?q=Al+Reaya+Al+Owla+Medicine+Sharjah",
    external: true,
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+971 6 535 3772",
    href: "tel:+97165353772",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "care@rdspharma.com",
    href: "mailto:care@rdspharma.com",
  },
];

const businessHours = [
  { day: "Monday – Friday", time: "9:00 AM – 9:00 PM" },
  { day: "Saturday", time: "10:00 AM – 8:00 PM" },
  { day: "Sunday", time: "10:00 AM – 6:00 PM" },
];

export default function ContactInfoCard() {
  return (
    <motion.div
      className="h-full rounded-2xl bg-soft-black p-6 text-white sm:p-8"
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Store name */}
      <h2 className="mb-1 font-oswald! text-xl font-bold uppercase tracking-wide">
        Al Reaya Al Owla Medicine
      </h2>

      <p className="mb-8 font-poppins! text-sm text-white/60">
        Your trusted pharmacy & wellness partner
      </p>

      {/* Contact details */}
      <div className="space-y-6">
        {contactDetails.map((item) => {
          const Icon = item.icon;

          const content = (
            <div className="group flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-main/15 text-main transition-colors duration-300 group-hover:bg-main/25">
                <Icon size={18} strokeWidth={2} />
              </span>

              <div className="min-w-0">
                <p className="mb-0.5 font-poppins! text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">
                  {item.label}
                </p>

                <p className="font-poppins! text-sm leading-relaxed text-white/90 transition-colors duration-300 group-hover:text-white">
                  {item.value}
                </p>
              </div>

              {item.external && (
                <ExternalLink
                  size={14}
                  className="mt-1 shrink-0 text-white/30 transition-colors duration-300 group-hover:text-main"
                />
              )}
            </div>
          );

          return item.href ? (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="block"
            >
              {content}
            </a>
          ) : (
            <div key={item.label}>{content}</div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="my-8 h-px bg-white/10" />

      {/* Business hours */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Clock size={16} className="text-main" />
          <h3 className="font-poppins! text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Business Hours
          </h3>
        </div>

        <div className="space-y-2.5">
          {businessHours.map((item) => (
            <div
              key={item.day}
              className="flex items-center justify-between gap-4"
            >
              <span className="font-poppins! text-sm text-white/70">
                {item.day}
              </span>

              <span className="font-poppins! text-sm font-medium text-white/90">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 h-px bg-white/10" />

      {/* Social hint */}
      <p className="font-poppins! text-xs leading-relaxed text-white/45">
        You can also reach us through our social media channels for quick
        responses and product updates.
      </p>
    </motion.div>
  );
}
