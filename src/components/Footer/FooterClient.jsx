"use client";

import { useState, useCallback } from "react";
import Footer, { InstagramIcon, FacebookIcon, WhatsAppIcon } from "./Footer";

// ── translation files ──────────────────────────────────────
import enMessages from "@/src/locales/en.json";
import arMessages from "@/src/locales/ar.json";

const messagesByLocale = { en: enMessages, ar: arMessages };

// ── default store data ─────────────────────────────────────
const defaultStore = {
  name: "RDS Pharma",
  address: {
    en: "123 Wellness Avenue, Cairo, Egypt",
    ar: "123 شارع ويلنس، القاهرة، مصر",
  },
  phone: "+20 100 000 0000",
  email: "care@rdspharma.com",
};

// ── default socials ────────────────────────────────────────
const defaultSocials = [
  { name: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { name: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
  { name: "WhatsApp", href: "https://wa.me/201000000000", Icon: WhatsAppIcon },
];

// ── component ──────────────────────────────────────────────
export default function FooterClient({
  initialLocale = "en",
  initialRegion = "eg",
  logoSrc,
  logoAlt = "RDS Pharma",
  socials = defaultSocials,
  store = defaultStore,
}) {
  const [locale, setLocale] = useState(initialLocale);
  const [region, setRegion] = useState(initialRegion);

  // pull the right translation namespace
  const t = messagesByLocale[locale]?.Footer ?? {};

  const handleLocaleChange = useCallback((e) => {
    setLocale(e.target.value);
    // also persist in localStorage so it survives page refresh
    try {
      localStorage.setItem("rds_locale", e.target.value);
    } catch (_) {}
  }, []);

  const handleRegionChange = useCallback((e) => {
    setRegion(e.target.value);
    try {
      localStorage.setItem("rds_region", e.target.value);
    } catch (_) {}
  }, []);

  return (
    <Footer
      locale={locale}
      t={t}
      region={region}
      onLocaleChange={handleLocaleChange}
      onRegionChange={handleRegionChange}
      logoSrc={logoSrc}
      logoAlt={logoAlt}
      socials={socials}
      store={store}
    />
  );
}
