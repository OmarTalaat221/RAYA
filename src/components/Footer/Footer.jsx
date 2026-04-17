"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ConfigProvider, Select } from "antd";
import StyledBackground from "./StyledBackground";

// ─── nav data ─────────────────────────────────────────────
const primaryLinks = [
  { key: "home", href: "/" },
  { key: "catalog", href: "/catalog" },
  { key: "skinage", href: "/skinage" },
  { key: "denefis", href: "/denefis" },
  { key: "offers", href: "/offers" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

const legalLinks = [
  { key: "privacy", href: "/privacy-policy" },
  { key: "terms", href: "/terms-and-conditions" },
  { key: "returns", href: "/return-policy" },
];

// ─── fallback store ───────────────────────────────────────
const fallbackStore = {
  name: "RDS Pharma",
  address: {
    en: "123 Wellness Avenue, Cairo, Egypt",
    ar: "123 شارع ويلنس، القاهرة، مصر",
  },
  phone: "+20 100 000 0000",
  email: "care@rdspharma.com",
};

// ─── helper ───────────────────────────────────────────────
function resolveLocalizedValue(value, locale) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[locale] || value.en || "";
}

// ─── icons ────────────────────────────────────────────────
function ChevronDownIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapPinIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 17C13.5 13.3 15.25 10.5 15.25 8.25A5.25 5.25 0 1 0 4.75 8.25C4.75 10.5 6.5 13.3 10 17Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle
        cx="10"
        cy="8.25"
        r="1.8"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function PhoneIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6.4 3.75H4.9C4.27 3.75 3.75 4.27 3.75 4.9C3.75 11.06 8.74 16.25 14.9 16.25C15.53 16.25 16.05 15.73 16.05 15.1V13.6C16.05 13.1 15.72 12.66 15.24 12.53L12.97 11.92C12.55 11.81 12.1 11.93 11.8 12.23L10.94 13.09C9.42 12.28 7.72 10.58 6.91 9.06L7.77 8.2C8.07 7.9 8.19 7.45 8.08 7.03L7.47 4.76C7.34 4.28 6.9 3.75 6.4 3.75Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.25"
        y="5"
        width="13.5"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M4 6L9.1 10.08C9.63 10.5 10.37 10.5 10.9 10.08L16 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="5.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="12"
        r="4.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 21v-7.35h2.47l.37-2.86H13.5V8.98c0-.83.23-1.39 1.42-1.39h1.52V5.04c-.26-.04-1.18-.11-2.24-.11-2.21 0-3.72 1.35-3.72 3.83v2.03H8v2.86h2.48V21h3.02Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.48 0 .12 5.35.12 11.94c0 2.1.55 4.14 1.59 5.93L0 24l6.31-1.66a11.9 11.9 0 0 0 5.76 1.47h.01c6.58 0 11.94-5.36 11.94-11.95 0-3.19-1.24-6.18-3.5-8.38ZM12.08 21.8h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.22-3.75.98 1-3.65-.24-.38A9.88 9.88 0 0 1 2.14 11.94C2.14 6.46 6.6 2 12.08 2c2.64 0 5.13 1.03 7 2.89a9.84 9.84 0 0 1 2.91 7.05c0 5.48-4.46 9.94-9.91 9.94Zm5.44-7.45c-.3-.15-1.77-.88-2.05-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.23-.65.08-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.53.08-.8.38-.27.3-1.03 1.01-1.03 2.45 0 1.44 1.05 2.84 1.2 3.03.15.2 2.06 3.15 4.99 4.42.7.3 1.25.48 1.67.62.7.22 1.34.19 1.85.12.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.28-.2-.58-.35Z" />
    </svg>
  );
}

// ─── default socials ──────────────────────────────────────
const defaultSocials = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    Icon: InstagramIcon,
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    Icon: FacebookIcon,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/201000000000",
    Icon: WhatsAppIcon,
  },
];

// ─── sub-components ───────────────────────────────────────
function SectionTitle({ children, isRTL }) {
  return (
    <h3
      className={`mb-4 text-[11px] font-semibold text-white/68 font-poppins! sm:text-xs ${
        isRTL ? "" : "uppercase tracking-[0.2em]"
      }`}
    >
      {children}
    </h3>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit text-sm text-white/82! transition-colors duration-300 hover:text-white! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 font-poppins!"
    >
      {children}
    </Link>
  );
}

function ContactRow({ icon, href, children, isRTL }) {
  const content = href ? (
    <a
      href={href}
      className="text-sm leading-6 text-white/88! transition-colors duration-300 hover:text-white! font-poppins!"
    >
      {children}
    </a>
  ) : (
    <span className="text-sm leading-6 text-white/88! font-poppins!">
      {children}
    </span>
  );

  return (
    <li
      className={`flex items-start gap-3 ${
        isRTL ? "flex-row-reverse text-right" : "text-left"
      }`}
    >
      <span className="mt-0.5 shrink-0 text-white/60">{icon}</span>
      <div className="min-w-0">{content}</div>
    </li>
  );
}

function SelectField({ label, value, onChange, options, isRTL, size }) {
  return (
    <label className="block">
      <span
        className={`mb-2 block text-[11px] font-medium text-white/62 font-poppins! ${
          isRTL ? "" : "uppercase tracking-[0.18em]"
        }`}
      >
        {label}
      </span>

      <ConfigProvider
        direction={isRTL ? "rtl" : "ltr"}
        theme={{
          token: {
            colorPrimary: "#68bc52",
            borderRadius: 12,
            fontFamily: "Poppins, sans-serif",
            colorBgElevated: "#f4f3f0",
            colorText: "#2d2d2d",
            boxShadowSecondary: "0 18px 40px rgba(15, 23, 42, 0.16)",
          },
          components: {
            Select: {
              optionSelectedBg: "rgba(104, 188, 82, 0.14)",
              optionActiveBg: "rgba(104, 188, 82, 0.08)",
              optionSelectedColor: "#2d2d2d",
            },
          },
        }}
      >
        <Select
          value={value}
          onChange={onChange}
          options={options}
          size={size}
          showSearch={false}
          suffixIcon={<ChevronDownIcon className="h-4 w-4" />}
          popupClassName="footer-ant-select-dropdown"
          className={`footer-ant-select ${
            isRTL ? "footer-ant-select--rtl" : ""
          }`}
          getPopupContainer={(trigger) => trigger.parentElement}
        />
      </ConfigProvider>
    </label>
  );
}

// ─── main Footer component ────────────────────────────────
export default function Footer({
  store = fallbackStore,
  logoSrc,
  logoAlt = "RDS Pharma",
  socials = defaultSocials,
}) {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const router = useRouter();

  const isRTL = locale === "ar";
  const textAlign = isRTL ? "text-right" : "text-left";

  const [region, setRegion] = useState("eg");

  useEffect(() => {
    try {
      const savedRegion = localStorage.getItem("rds_region");
      if (savedRegion) setRegion(savedRegion);
    } catch (_) {}
  }, []);

  const handleRegionChange = useCallback((nextRegion) => {
    setRegion(nextRegion);

    try {
      localStorage.setItem("rds_region", nextRegion);
    } catch (_) {}
  }, []);

  const handleLanguageChange = useCallback(
    async (nextLocale) => {
      try {
        await fetch("/api/locale", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ locale: nextLocale }),
        });

        router.refresh();
      } catch (error) {
        console.error("Failed to change locale:", error);
      }
    },
    [router]
  );

  const regionOptions = [
    { value: "eg", label: t("regions.eg") },
    { value: "sa", label: t("regions.sa") },
    { value: "ae", label: t("regions.ae") },
  ];

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "ar", label: "العربية" },
  ];

  const year = new Date().getFullYear();

  const storeName =
    resolveLocalizedValue(store.name, locale) || fallbackStore.name;
  const storeAddress =
    resolveLocalizedValue(store.address, locale) ||
    resolveLocalizedValue(fallbackStore.address, locale);
  const storePhone = store.phone || fallbackStore.phone;
  const storeEmail = store.email || fallbackStore.email;

  return (
    <StyledBackground
      wave
      variant="footer"
      className="overflow-hidden"
      motion="soft"
    >
      <footer
        dir={isRTL ? "rtl" : "ltr"}
        className={`relative isolate overflow-hidden text-white ${textAlign}`}
      >
        {/* ── branded surface ─────────────────────────────── */}
        <div className="absolute inset-0 bg-main" />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.03)_42%,rgba(0,0,0,0.10)_100%)]" />
        <div className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#3f8534]/30 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/16" />

        {/* ── content ─────────────────────────────────────── */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 pb-8 pt-14 sm:gap-12 sm:pb-10 sm:pt-16 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
            {/* ── col 1: Brand / Store ────────────────────── */}
            <div className="max-w-sm">
              <SectionTitle isRTL={isRTL}>{t("storeHeading")}</SectionTitle>

              <div className="mb-5">
                {logoSrc ? (
                  <div className="rounded-[14px] w-fit bg-white/80 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                    <img
                      src={logoSrc}
                      alt={logoAlt}
                      className="h-14! w-auto object-contain sm:h-11"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div
                    className={`text-[1.65rem] leading-none text-white ${
                      isRTL ? "font-semibold font-poppins!" : "font-oswald!"
                    }`}
                  >
                    {storeName}
                  </div>
                )}
              </div>

              <ul className="space-y-3">
                <ContactRow
                  icon={<MapPinIcon className="h-4 w-4" />}
                  isRTL={isRTL}
                >
                  {storeAddress}
                </ContactRow>

                <ContactRow
                  icon={<PhoneIcon className="h-4 w-4" />}
                  href={`tel:${storePhone.replace(/\s+/g, "")}`}
                  isRTL={isRTL}
                >
                  {storePhone}
                </ContactRow>

                {storeEmail ? (
                  <ContactRow
                    icon={<MailIcon className="h-4 w-4" />}
                    href={`mailto:${storeEmail}`}
                    isRTL={isRTL}
                  >
                    {storeEmail}
                  </ContactRow>
                ) : null}
              </ul>
            </div>

            {/* ── col 2: Promise ──────────────────────────── */}
            <div>
              <SectionTitle isRTL={isRTL}>{t("promiseHeading")}</SectionTitle>

              <p className="max-w-[34ch] text-sm leading-7 text-white/85 sm:text-[15px] font-poppins!">
                {t("promiseText")}
              </p>
            </div>

            {/* ── col 3: Links ────────────────────────────── */}
            <div>
              <SectionTitle isRTL={isRTL}>{t("quickLinks")}</SectionTitle>

              <nav className="flex flex-col gap-3">
                {primaryLinks.map((item) => (
                  <FooterLink key={item.key} href={item.href}>
                    {t(`nav.${item.key}`)}
                  </FooterLink>
                ))}
              </nav>
            </div>

            {/* ── col 4: Settings / Social ────────────────── */}
            <div>
              <SectionTitle isRTL={isRTL}>{t("settingsHeading")}</SectionTitle>

              <div className="space-y-4">
                <SelectField
                  size="large"
                  label={t("languageLabel")}
                  value={locale}
                  onChange={handleLanguageChange}
                  options={languageOptions}
                  isRTL={isRTL}
                />

                <SelectField
                  size="large"
                  label={t("regionLabel")}
                  value={region}
                  onChange={handleRegionChange}
                  options={regionOptions}
                  isRTL={isRTL}
                />
              </div>

              <p className="mt-4 text-sm leading-6 text-white/72 font-poppins!">
                {t("selectorNote")}
              </p>

              {socials?.length ? (
                <div className="mt-7">
                  <SectionTitle isRTL={isRTL}>{t("followUs")}</SectionTitle>

                  <div className="flex flex-wrap gap-3">
                    {socials.map((social) => {
                      const Icon = social.Icon || social.icon;

                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={social.name}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white/82! transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/16! hover:text-white! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        >
                          <Icon className="h-[18px] w-[18px]" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* ── bottom legal bar ──────────────────────────── */}
          <div className="border-t border-white/14 py-5 backdrop-blur-sm sm:py-6">
            <div
              className={`flex flex-col gap-4 md:items-center md:justify-between ${
                isRTL ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <p className="text-sm text-white/72 font-poppins!">
                {t("copyright", { year })}
              </p>

              <nav
                aria-label={t("legalNavLabel")}
                className="flex flex-wrap gap-x-5 gap-y-2"
              >
                {legalLinks.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="text-sm text-white/76! transition-colors duration-300 hover:text-white! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 font-poppins!"
                  >
                    {t(`legal.${item.key}`)}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </StyledBackground>
  );
}
