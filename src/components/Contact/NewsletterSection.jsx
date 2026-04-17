"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const sectionVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function NewsletterSection() {
  const formRef = useRef(null);
  const timeoutRef = useRef(null);

  const [status, setStatus] = useState("idle");

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (status === "sending") return;

      const form = formRef.current;
      if (!form) return;

      const formData = new FormData(form);
      const email = String(formData.get("email") || "").trim();

      if (!email) return;

      setStatus("sending");

      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));

        setStatus("sent");
        form.reset();

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setStatus("idle");
        }, 4000);
      } catch {
        setStatus("error");

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setStatus("idle");
        }, 3000);
      }
    },
    [status]
  );

  return (
    <section className="w-full bg-[#f4f3f0] py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="relative mx-auto max-w-3xl overflow-hidden rounded-[28px] border-2 border-white/50 bg-[#5fa94ab3] px-5 py-8 text-center sm:px-8 sm:py-10 lg:px-10 lg:py-12"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            WebkitBackdropFilter: "blur(10px)",
            backdropFilter: "blur(10px)",
            boxShadow:
              "0 8px 32px rgba(95,169,74,0.22), inset 0 1px 0 rgba(255,255,255,0.30)",
          }}
        >
          {/* subtle glossy layers */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/18 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/40" />

          <div className="relative z-10">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/85 sm:text-sm font-poppins!">
              Stay Updated
            </span>

            <h2 className="font-oswald! text-[1.65rem] font-bold uppercase leading-tight text-white sm:text-3xl">
              Subscribe to Our Newsletter
            </h2>

            <p className="mx-auto mt-3 max-w-md font-poppins! text-sm leading-relaxed text-white/80 sm:text-[15px]">
              Get the latest product launches, skincare tips, and exclusive
              offers delivered straight to your inbox.
            </p>

            {status === "sent" ? (
              <div className="mt-8 flex items-center justify-center gap-2 text-white">
                <CheckCircle size={20} />
                <span className="font-poppins! text-sm font-semibold">
                  You're subscribed!
                </span>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
              >
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Enter your email"
                  className="h-12 w-full min-w-0 rounded-full border border-white/35 bg-white/10 px-5 font-poppins! text-sm text-white outline-none transition-all duration-300 placeholder:text-white/90 focus:border-white focus:bg-white focus:text-soft-black focus:placeholder:text-soft-black/55 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.16)]"
                  style={{
                    WebkitBackdropFilter: "blur(8px)",
                    backdropFilter: "blur(8px)",
                  }}
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/45 bg-white px-6 font-poppins! text-sm font-semibold tracking-wide text-main transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_24px_rgba(255,255,255,0.18)] disabled:pointer-events-none disabled:opacity-60 sm:w-auto sm:min-w-[154px]"
                >
                  <span className="relative z-10">
                    {status === "sending" ? "Subscribing..." : "Subscribe"}
                  </span>

                  <ArrowRight
                    size={15}
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-3 font-poppins! text-sm text-white/95">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
