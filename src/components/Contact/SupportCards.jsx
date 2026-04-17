"use client";

import { motion } from "framer-motion";
import { Package, HelpCircle, Truck, MessageCircle } from "lucide-react";

const containerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const supportItems = [
  {
    icon: Package,
    title: "Order Support",
    description:
      "Track your order, request changes, or report any delivery issues.",
  },
  {
    icon: HelpCircle,
    title: "Product Guidance",
    description:
      "Need help choosing the right product? Our experts can assist.",
  },
  {
    icon: Truck,
    title: "Shipping Info",
    description:
      "Learn about our delivery options, shipping times, and policies.",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team for quick answers via WhatsApp.",
    href: "https://wa.me/97165353772",
  },
];

export default function SupportCards() {
  return (
    <section className="w-full bg-[#f4f3f0] py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="mb-8 text-start md:text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-main sm:text-sm font-poppins!">
            How Can We Help?
          </span>

          <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-bold leading-tight text-soft-black font-oswald!">
            Quick Support
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {supportItems.map((item) => {
            const Icon = item.icon;

            const inner = (
              <motion.div
                variants={cardVariant}
                className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04),0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)]"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-main/10 text-main transition-colors duration-300 group-hover:bg-main group-hover:text-white">
                  <Icon size={20} strokeWidth={2} />
                </span>

                <h3 className="mb-1.5 font-oswald! text-[14px] font-semibold uppercase tracking-[0.06em] text-soft-black">
                  {item.title}
                </h3>

                <p className="font-poppins! text-[12px] leading-relaxed text-secondary">
                  {item.description}
                </p>
              </motion.div>
            );

            return item.href ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                {inner}
              </a>
            ) : (
              <div key={item.title}>{inner}</div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
