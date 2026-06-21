"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
    Building2,
    Hash,
    MapPin,
    Globe2,
    BadgeCheck,
} from "lucide-react";
import BottomBg from "~/sections/Common/BottomBg/BottomBg";
// import BottomBg from "../BottomBg"; // عدل المسار حسب مكان الملف

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

function AboutCompany({ t }) {
    const rows = [
        {
            icon: Building2,
            label: t("company.legalName"),
            value: t("company.legalNameVal"),
            mono: false,
        },
        {
            icon: Hash,
            label: t("company.regNumber"),
            value: t("company.regNumberVal"),
            mono: true,
        },
        {
            icon: MapPin,
            label: t("company.address"),
            value: t("company.addressVal"),
            mono: false,
        },
        {
            icon: Globe2,
            label: t("company.country"),
            value: t("company.countryVal"),
            mono: false,
        },
    ];

    return (
        <section
            className="relative w-full overflow-hidden bg-white py-20 md:py-28"
            aria-labelledby="about-company-heading"
        >
            {/* فاصل علوي ناعم داخل السيكشن */}
            <BottomBg position="top" flip />

            {/* ── Pattern background ── */}
            <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.235]"
                style={{
                    backgroundImage: "url(/assets/image/pattern-1.webp)",
                    backgroundRepeat: "repeat",
                    backgroundSize: "100%",
                }}
            />

            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="mx-auto max-w-2xl text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={fadeUp}
                >
                    <span className="font-garamond! text-[11px] font-semibold uppercase tracking-[0.28em] text-main">
                        {t("company.eyebrow")}
                    </span>
                    <h2
                        id="about-company-heading"
                        className="font-oswald! mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] text-soft-black"
                    >
                        {t("company.title")}
                    </h2>
                    <p className="font-poppins! mt-3 text-[14.5px] leading-7 text-secondary">
                        {t("company.subtitle")}
                    </p>
                </motion.div>

                <motion.div
                    className="mx-auto mt-12 max-w-5xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={fadeUp}
                >
                    <div className="overflow-hidden rounded-[32px] border border-black/5 bg-[#f7f7f4] shadow-[0_24px_60px_rgba(0,0,0,0.05)]">
                        <div className="h-1.5 w-full bg-gradient-to-r from-main via-main/70 to-main" />

                        <div className="grid grid-cols-1 gap-0 p-6 sm:p-8 md:p-10 lg:grid-cols-[160px_minmax(0,1fr)] lg:gap-12">
                            {/* ── Seal ── */}
                            <div className="mb-8 flex items-center justify-center lg:mb-0 lg:items-start">
                                <div className="relative flex h-32 w-32 items-center justify-center">
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 rounded-full border-2 border-dashed border-main/40 animate-[spin_30s_linear_infinite]"
                                    />
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-main text-white shadow-[0_15px_35px_rgba(104,188,82,0.35)]">
                                        <BadgeCheck size={36} strokeWidth={1.8} />
                                    </div>
                                </div>
                            </div>

                            {/* ── Rows ── */}
                            <dl className="divide-y divide-black/5">
                                {rows.map(({ icon: Icon, label, value, mono }) => (
                                    <div
                                        key={label}
                                        className="grid grid-cols-1 gap-2 py-5 first:pt-0 last:pb-0 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8"
                                    >
                                        <dt className="font-poppins! flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-secondary">
                                            <Icon size={14} strokeWidth={2} className="text-main" />
                                            {label}
                                        </dt>
                                        <dd
                                            className={`text-[14.5px] font-medium leading-7 text-soft-black sm:text-[15px] ${mono ? "font-mono" : "font-poppins!"
                                                }`}
                                        >
                                            {value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default memo(AboutCompany);