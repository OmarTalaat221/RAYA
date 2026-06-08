"use client";

import { useState, useCallback } from "react";
import Footer, {
  InstagramIcon,
  FacebookIcon,
  WhatsAppIcon,
  LinkedInIcon,
  XIcon,
} from "./Footer";

// ── translation files ──────────────────────────────────────
import enMessages from "@/src/locales/en.json";
import arMessages from "@/src/locales/ar.json";

const messagesByLocale = { en: enMessages, ar: arMessages };

const fallbackStore = {
  name: "RDS Pharma",
  address: {
    en: "Dubai, United Arab Emirates",
    ar: "دبي، الإمارات العربية المتحدة",
  },
  phone: "+971501234567",
  email: "Rdspharma.online@gmail.com",
};

// ── default socials ────────────────────────────────────────
const defaultSocials = [
  {
    name: "Instagram",
    href: "https://instagram.com/rdspharma",
    Icon: InstagramIcon,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/rdspharma",
    Icon: FacebookIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/rdspharma",
    Icon: LinkedInIcon,
  },
  {
    name: "X",
    href: "https://x.com/rdspharma",
    Icon: XIcon,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/971501234567",
    Icon: WhatsAppIcon,
  },
];

// ── component ──────────────────────────────────────────────
export default function FooterClient({
  initialLocale = "en",
  initialRegion = "eg",
  logoSrc,
  logoAlt = "RDS Pharma",
  socials = defaultSocials,
  store = fallbackStore,
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
    } catch (_) { }
  }, []);

  const handleRegionChange = useCallback((e) => {
    setRegion(e.target.value);
    try {
      localStorage.setItem("rds_region", e.target.value);
    } catch (_) { }
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
