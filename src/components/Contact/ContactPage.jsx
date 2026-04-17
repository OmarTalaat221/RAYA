"use client";

import ContactHero from "./ContactHero";
import ContactInfoCard from "./ContactInfoCard";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";
import SupportCards from "./SupportCards";
import NewsletterSection from "./NewsletterSection";

export default function ContactPage() {
  return (
    <>
      {/* 1. Hero */}
      <ContactHero />

      {/* 2. Info + Form — side by side on desktop */}
      <section className="w-full bg-[#f4f3f0] py-10 sm:py-12 md:py-14 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
            {/* Left — Contact Info (2/5 width on lg) */}

            {/* Right — Form (3/5 width on lg) */}
            <div className="lg:col-span-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Support Cards */}
      {/* <SupportCards /> */}

      {/* 4. Map */}
      <ContactMap />

      {/* 5. Newsletter */}
      <NewsletterSection />
    </>
  );
}
