"use client";

import Link from "next/link";

const navLinks = [
  { key: "shop", href: "/shop" },
  { key: "offers", href: "/offers" },
  { key: "brands", href: "/brands" },
  { key: "articles", href: "/blog" },
];

const careLinks = [
  { key: "faq", href: "/faq" },
  { key: "shipping", href: "/shipping-returns" },
  { key: "track", href: "/track-order" },
  { key: "contact", href: "/contact" },
];

const legalLinks = [
  { key: "privacy", href: "/privacy-policy" },
  { key: "terms", href: "/terms-and-conditions" },
  { key: "returns", href: "/return-policy" },
];

const defaultSocials = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: InstagramIcon,
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FacebookIcon,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/201000000000",
    icon: WhatsAppIcon,
  },
];

export default function Footer({
  locale = "en",
  messages,
  logoSrc,
  logoAlt = "RDS Pharma",
  language = locale,
  region = "eg",
  onLanguageChange,
  onRegionChange,
  socials = defaultSocials,
  contact = {
    phone: "+20 100 000 0000",
    email: "hello@rdspharma.com",
  },
}) {
  const t = messages?.footer;
  const isRTL = locale === "ar";

  if (!t) return null;

  const dir = isRTL ? "rtl" : "ltr";
  const textAlign = isRTL ? "text-right" : "text-left";
  const selectPadding = isRTL ? "pl-10 pr-4" : "pr-10 pl-4";
  const iconSide = isRTL ? "left-3" : "right-3";
  const year = new Date().getFullYear();

  const sectionTitleClass = `mb-4 text-xs font-semibold text-white/68 ${
    isRTL ? "" : "uppercase tracking-[0.2em]"
  }`;

  return (
    <footer
      dir={dir}
      className={`relative isolate overflow-hidden bg-main text-white ${textAlign} font-poppins!`}
    >
      {/* Soft top wave accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 text-white/12">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,64C120,42,240,32,360,37.3C480,43,600,64,720,69.3C840,75,960,64,1080,48C1200,32,1320,11,1440,16L1440,0L0,0Z"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_22%)]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 pb-8 pt-14 sm:gap-12 sm:pb-10 sm:pt-16 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="mb-5">
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt={logoAlt}
                  className="h-11 w-auto object-contain"
                  loading="lazy"
                />
              ) : (
                <div
                  className={`text-[1.65rem] leading-none ${
                    isRTL ? "font-semibold" : "font-oswald!"
                  }`}
                >
                  RDS Pharma
                </div>
              )}
            </div>

            <div className="mb-4 inline-flex rounded-full border border-white/14 bg-white/10 px-3 py-1 text-[11px] text-white/78">
              {t.brandTag}
            </div>

            <p className="max-w-[32ch] text-sm leading-6 text-white/82 sm:text-[15px]">
              {t.intro}
            </p>
          </div>

          {/* Store info */}
          <div>
            <h3 className={sectionTitleClass}>{t.storeInfo}</h3>

            <dl className="space-y-5">
              <div>
                <dt className="mb-1 text-[11px] font-medium text-white/60">
                  {t.address}
                </dt>
                <dd className="text-sm leading-6 text-white/90">
                  {t.addressValue}
                </dd>
              </div>

              <div>
                <dt className="mb-1 text-[11px] font-medium text-white/60">
                  {t.phone}
                </dt>
                <dd>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="text-sm text-white/90 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="mb-1 text-[11px] font-medium text-white/60">
                  {t.email}
                </dt>
                <dd>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-white/90 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Links */}
          <div>
            <div className="space-y-8">
              <div>
                <h3 className={sectionTitleClass}>{t.quickLinks}</h3>
                <nav className="flex flex-col gap-3">
                  {navLinks.map((item) => (
                    <FooterLink key={item.key} href={item.href}>
                      {t.nav[item.key]}
                    </FooterLink>
                  ))}
                </nav>
              </div>

              <div>
                <h3 className={sectionTitleClass}>{t.customerCare}</h3>
                <nav className="flex flex-col gap-3">
                  {careLinks.map((item) => (
                    <FooterLink key={item.key} href={item.href}>
                      {t.care[item.key]}
                    </FooterLink>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Language / Region / Social */}
          <div>
            <h3 className={sectionTitleClass}>{t.languageRegion}</h3>

            <div className="space-y-4">
              <SelectField
                label={t.language}
                value={language}
                onChange={onLanguageChange}
                options={Object.entries(t.languages).map(([value, label]) => ({
                  value,
                  label,
                }))}
                paddingClass={selectPadding}
                iconSideClass={iconSide}
              />

              <SelectField
                label={t.region}
                value={region}
                onChange={onRegionChange}
                options={Object.entries(t.regions).map(([value, label]) => ({
                  value,
                  label,
                }))}
                paddingClass={selectPadding}
                iconSideClass={iconSide}
              />
            </div>

            <p className="mt-4 text-sm leading-6 text-white/72">
              {t.selectorNote}
            </p>

            <div className="mt-7">
              <h4 className={sectionTitleClass}>{t.followUs}</h4>

              <div className="flex flex-wrap gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white/82 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/16 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom legal bar */}
        <div className="border-t border-white/14 py-5 sm:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/72">
              {t.copyright.replace("{year}", year)}
            </p>

            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-sm text-white/76 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  {t.legal[item.key]}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit text-sm text-white/82 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      {children}
    </Link>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  paddingClass,
  iconSideClass,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium text-white/62">
        {label}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`h-11 w-full appearance-none rounded-xl border border-white/14 bg-white/10 ${paddingClass} text-sm text-white outline-none transition-all duration-300 hover:bg-white/14 focus:border-white/30 focus:bg-white/14 focus:ring-2 focus:ring-white/40`}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-soft-black"
            >
              {option.label}
            </option>
          ))}
        </select>

        <div
          className={`pointer-events-none absolute inset-y-0 ${iconSideClass} flex items-center text-white/64`}
        >
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
    </label>
  );
}

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

function InstagramIcon({ className = "" }) {
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

function FacebookIcon({ className = "" }) {
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

function WhatsAppIcon({ className = "" }) {
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
