// components/About/AboutStory.jsx

"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

function AboutStory({ t }) {
    return (
        <section
            id="about-story"
            className="relative w-full overflow-hidden bg-[#f4f3f0] py-20 md:py-28 lg:py-32"
            aria-labelledby="about-story-heading"
        >
            {/* ── Pattern background ── */}
            <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.24]"
                style={{
                    backgroundImage: "url(/assets/image/pattern-4.webp)",
                    backgroundRepeat: "repeat",
                    backgroundSize: "100%",
                }}
            />

            {/* ── Decorative blobs ── */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-40 top-32 h-80 w-80 rounded-full bg-main/8 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-main/10 blur-3xl"
            />

            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* ── Image side ── */}
                    <motion.div
                        className="lg:col-span-5"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative">
                            {/* main image */}
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_40px_80px_rgba(45,45,45,0.18)]">
                                <Image
                                    src="/assets/image/raya-place.webp"
                                    alt={t("imageAlt")}
                                    fill
                                    sizes="(min-width: 1024px) 480px, (min-width: 640px) 70vw, 100vw"
                                    className="object-cover"
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"
                                />
                            </div>




                        </div>
                    </motion.div>

                    {/* ── Text side ── */}
                    <motion.div
                        className="lg:col-span-7"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <motion.span
                            variants={fadeUp}
                            className="font-garamond! text-[11px] font-semibold uppercase tracking-[0.28em] text-main"
                        >
                            {t("story.eyebrow")}
                        </motion.span>

                        <motion.h2
                            id="about-story-heading"
                            variants={fadeUp}
                            className="font-oswald! mt-3 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-soft-black"
                        >
                            {t("story.title")}
                        </motion.h2>

                        <motion.div
                            variants={fadeUp}
                            className="mt-5 h-[3px] w-16 rounded-full bg-main"
                        />

                        <motion.div variants={fadeUp} className="mt-8 space-y-5">
                            <p className="font-poppins! text-[15px] leading-[1.85] text-secondary md:text-[16px]">
                                {t("story.p1")}
                            </p>
                            <p className="font-poppins! text-[15px] leading-[1.85] text-secondary md:text-[16px]">
                                {t("story.p2")}
                            </p>
                            <p className="font-poppins! text-[15px] leading-[1.85] text-secondary md:text-[16px]">
                                {t("story.p3")}
                            </p>
                        </motion.div>


                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default memo(AboutStory);