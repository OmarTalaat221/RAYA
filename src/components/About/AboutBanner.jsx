"use client";

import { memo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Parallax } from "swiper/modules";
import { ChevronDown } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import BottomBg from "~/sections/Common/BottomBg/BottomBg";

const DEFAULT_SLIDES = ["/assets/image/raya-place.webp"];

function AboutBanner({
    slides = DEFAULT_SLIDES,
    title = "",
    subtitle = "",
}) {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (typeof window === "undefined") return;
        const target = document.getElementById("about-story");
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            window.scrollTo({
                top: window.innerHeight * 0.85,
                behavior: "smooth",
            });
        }
    };

    return (
        <section
            className="relative h-[540px] w-full overflow-hidden bg-soft-black sm:h-[620px] md:h-[700px]"
            aria-labelledby="about-banner-heading"
        >
            {/* ── Swiper background (z-0) ── */}
            <div className="absolute inset-0 z-0">
                <Swiper
                    modules={[Autoplay, EffectFade, Parallax]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    parallax
                    slidesPerView={1}
                    loop={slides.length > 1}
                    autoplay={
                        slides.length > 1
                            ? {
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }
                            : false
                    }
                    speed={1200}
                    onSwiper={(s) => (swiperRef.current = s)}
                    onSlideChange={(s) => setActiveIndex(s.realIndex)}
                    className="h-full w-full"
                >
                    {slides.map((src, idx) => (
                        <SwiperSlide key={`${src}-${idx}`}>
                            <div className="relative h-full w-full">
                                <Image
                                    src={src}
                                    alt={`Al Reaya Al Owla ${idx + 1}`}
                                    fill
                                    priority={idx === 0}
                                    fetchPriority={idx === 0 ? "high" : "auto"}
                                    sizes="100vw"
                                    className="scale-[1.02] object-cover object-center"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* ── Single smart overlay (gradient + dark) ── */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.75) 100%)",
                }}
            />

            {/* ── Pattern overlay ── */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[2] opacity-[0.08] mix-blend-overlay"
                style={{
                    backgroundImage: "url(/assets/image/pattern-1.png)",
                    backgroundRepeat: "repeat",
                    backgroundSize: "320px 320px",
                }}
            />

            {/* ── Subtle main color glow ── */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-32 top-1/3 z-[3] h-96 w-96 rounded-full bg-main/20 blur-[120px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 bottom-1/4 z-[3] h-96 w-96 rounded-full bg-main/10 blur-[120px]"
            />

            {/* ── Content (z-10) ── */}
            <div className="relative z-10 flex h-full items-center justify-center px-4 text-center sm:px-6 lg:px-8">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-6xl rounded-[28px] px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12"
                >
                    <motion.h1
                        id="about-banner-heading"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="font-oswald! text-[clamp(2.25rem,5.6vw,4.6rem)] font-bold leading-[1.08] tracking-tight text-white"
                        style={{
                            textShadow:
                                "0 4px 24px rgba(0,0,0,0.85), 0 2px 8px rgba(0,0,0,0.6)",
                        }}
                    >
                        {title || "Trusted Care in the Heart of Sharjah"}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="font-poppins! mx-auto mt-5 max-w-3xl text-[15px] leading-[1.95] text-white sm:text-[16px] md:text-lg"
                        style={{
                            textShadow: "0 2px 14px rgba(0,0,0,0.85)",
                        }}
                    >
                        {subtitle ||
                            "From Al Quliah, Al Reaya Al Owla offers a trusted destination for pharmaceutical supplies, medical essentials, and everyday wellness products."}
                    </motion.p>

                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 86, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="mx-auto mt-7 h-[2px] rounded-full bg-main"
                    />

                    <motion.button
                        type="button"
                        onClick={handleScroll}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        aria-label="Scroll to content"
                        className="group mx-auto mt-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:border-main hover:bg-main/90"
                    >
                        <ChevronDown
                            size={20}
                            strokeWidth={2}
                            className="animate-bounce group-hover:animate-none"
                        />
                    </motion.button>
                </motion.div>
            </div>

            {/* ── Slide indicators ── */}
            {slides.length > 1 && (
                <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => swiperRef.current?.slideToLoop(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx
                                ? "w-8 bg-main"
                                : "w-1.5 bg-white/45 hover:bg-white/70"
                                }`}
                        />
                    ))}
                </div>
            )}

            {/* ── Decorative bottom separator ── */}
            <BottomBg />
        </section>
    );
}

export default memo(AboutBanner);