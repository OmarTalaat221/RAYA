"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, ShoppingBag, Menu, X, Globe, User } from "lucide-react";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  memo,
} from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart, fetchCart, setShippingCost, setCurrency, setFreeShippingThreshold, reapplyCouponSilently } from "../../../store/cartSlice";
import { fetchSiteInfo, selectLocalizedSiteInfo, selectShippingPrice, selectTopBarMessage, selectFreeShippingThreshold } from "../../../store/siteSlice";
import { fetchGeoInfo } from "../../../store/geoSlice";
import { useLocale, useTranslations } from "next-intl";

const SearchOverlay = dynamic(
  () => import("../../../components/Search/SearchOverlay"),
  { ssr: false },
);

const CartDrawer = dynamic(
  () => import("../../../components/Cart/CartDrawer"),
  { ssr: false },
);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "products", href: "/collections/all" },
  { key: "brand", href: "/collections" },
  { key: "blog", href: "/blog/news" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

const INDICATOR_TRANSITION =
  "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1), width 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease";

/* ─── Logo ─── */
const Logo = memo(function Logo({ size = "default" }) {
  const sizes = {
    default: {
      className: "w-24 h-16! sm:w-26 sm:h-20! md:w-28 md:h-[100px]!",
    },
    small: { className: "w-20 h-14! sm:w-24 sm:h-18!" },
  };

  const locale = useLocale();
  const { siteName } = useSelector((s) => selectLocalizedSiteInfo(s, locale));

  return (
    <img
      src="https://res.cloudinary.com/dbvh5i83q/image/upload/v1776082859/rds_logo_xpmbfn.webp"
      alt={siteName}
      className={`${sizes[size].className} object-contain`}
      loading="eager"
      fetchPriority="high"
      decoding="async"
    />
  );
});

/* ─── Desktop Nav ─── */
const NavMenu = memo(function NavMenu({ pathname, ariaLabel }) {
  const t = useTranslations("header");
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [hoveredHref, setHoveredHref] = useState(null);
  const [indicator, setIndicator] = useState({ opacity: 0, x: 0, width: 0 });

  const updateIndicator = useCallback((href) => {
    if (!href) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const linkEl = linkRefs.current[href];
    const navEl = navRef.current;
    if (!linkEl || !navEl) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const linkRect = linkEl.getBoundingClientRect();
    const navRect = navEl.getBoundingClientRect();
    setIndicator({
      opacity: 1,
      x: linkRect.left - navRect.left,
      width: linkRect.width,
    });
  }, []);

  useIsoLayoutEffect(() => {
    const target = hoveredHref || pathname;
    const exists = NAV_ITEMS.some((i) => i.href === target);
    updateIndicator(exists ? target : null);
  }, [hoveredHref, pathname, updateIndicator]);

  useEffect(() => {
    const handleRecalc = () => {
      const target = hoveredHref || pathname;
      const exists = NAV_ITEMS.some((i) => i.href === target);
      updateIndicator(exists ? target : null);
    };

    window.addEventListener("resize", handleRecalc, { passive: true });
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(handleRecalc);
    }

    const t1 = setTimeout(handleRecalc, 150);
    const t2 = setTimeout(handleRecalc, 500);
    const t3 = setTimeout(handleRecalc, 1000);

    return () => {
      window.removeEventListener("resize", handleRecalc);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [hoveredHref, pathname, updateIndicator]);

  const setLinkRef = useCallback(
    (href) => (el) => {
      if (el) linkRefs.current[href] = el;
      else delete linkRefs.current[href];
    },
    [],
  );

  return (
    <nav aria-label={ariaLabel} className="hidden lg:flex flex-1">
      <ul
        ref={navRef}
        onMouseLeave={() => setHoveredHref(null)}
        className="relative flex items-center justify-center gap-0.5 xl:gap-1 w-full"
      >
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-0 h-9 rounded-full bg-main/50 pointer-events-none"
          style={{
            opacity: indicator.opacity,
            transform: `translate3d(${indicator.x}px, -50%, 0)`,
            width: indicator.width,
            transition: INDICATOR_TRANSITION,
            willChange: "transform, width, opacity",
          }}
        />

        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const isHovered = hoveredHref === item.href;
          return (
            <li key={item.key}>
              <Link
                ref={setLinkRef(item.href)}
                href={item.href}
                onMouseEnter={() => setHoveredHref(item.href)}
                aria-current={isActive ? "page" : undefined}
                className={`
                  relative z-10 inline-flex items-center
                  px-4 py-2 text-sm font-medium tracking-wide
                  whitespace-nowrap transition-colors duration-200
                  ${isActive || isHovered
                    ? "text-main"
                    : "text-secondary hover:text-soft-black"
                  }
                `}
              >
                {t(`nav.${item.key}`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

/* ─── Mobile Nav Link ─── */
const MobileNavLink = memo(function MobileNavLink({ item, pathname, onClick }) {
  const t = useTranslations("header");
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`
        flex items-center justify-between px-6 py-3.5
        text-sm font-medium tracking-wide
        border-b border-gray-100 last:border-none
        transition-colors duration-200
        ${isActive
          ? "text-main bg-white"
          : "text-soft-black hover:text-main hover:bg-white"
        }
      `}
    >
      {t(`nav.${item.key}`)}
      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-main" />}
    </Link>
  );
});

/* ─── Header Icons ─── */
const HeaderIcons = memo(function HeaderIcons({
  onSearchClick,
  onCartClick,
  cartCount,
}) {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    try {
      setHasToken(Boolean(localStorage.getItem("raya-token")));
    } catch {
      setHasToken(false);
    }

    /* ── Listen to token changes (other tabs / login / logout) ── */
    const handleStorage = (e) => {
      if (e.key === "raya-token") {
        setHasToken(Boolean(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const accountHref = hasToken ? "/profile" : "/login";
  const accountLabel = hasToken ? "My Account" : "Login";

  return (
    <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
      <button
        type="button"
        aria-label="Open search"
        onClick={onSearchClick}
        className="text-soft-black hover:text-main transition-colors duration-200"
      >
        <Search size={22} strokeWidth={1.5} />
      </button>

      <Link
        aria-label={accountLabel}
        href={accountHref}
        className="text-soft-black hover:text-main! transition-colors duration-200"
      >
        <User size={22} strokeWidth={1.5} />
      </Link>

      <button
        type="button"
        onClick={onCartClick}
        aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
        className="relative text-soft-black hover:text-main transition-colors duration-200"
      >
        <ShoppingBag size={22} strokeWidth={1.5} />
        {cartCount > 0 && (
          <span
            className="absolute -top-2 ltr:-right-2 rtl:-left-2 flex h-[18px] min-w-[18px]
                       items-center justify-center rounded-full bg-main px-1
                       shadow-sm"
          >
            <span className="text-white text-[9px] font-bold leading-none">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          </span>
        )}
      </button>

      <LanguageDropdown />
    </div>
  );
});

/* ─── Top Bar ─── */
const TopBar = memo(function TopBar({ compact = false }) {
  const locale = useLocale();
  const geoCountry = useSelector((s) => s.geo.country);
  const isUae = /^(ae|are|united arab emirates)$/i.test((geoCountry || "").trim());
  const shippingType = isUae ? "inside" : "outside";

  const dynamicMessage = useSelector((s) => selectTopBarMessage(s, locale, shippingType));

  return (
    <div className={`w-full bg-main ${compact ? "py-1.5" : "py-2"} px-4`}>
      <p
        className={`text-center text-white font-semibold tracking-wide leading-snug
                    ${compact ? "text-[10px] sm:text-[11px]" : "text-[11px] sm:text-xs md:text-sm"}`}
      >
        <span className="">{dynamicMessage}</span>
      </p>
    </div>
  );
});

/* ─── Mobile Menu ─── */
const MobileMenu = memo(function MobileMenu({ visible, pathname, closeMenu }) {
  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-label="Mobile navigation"
      className={`
        lg:hidden overflow-hidden
        transition-all duration-300 ease-in-out
        ${visible
          ? "max-h-screen opacity-100"
          : "max-h-0 opacity-0 pointer-events-none"
        }
      `}
    >
      <nav className="border-t border-gray-100 bg-[#f7f7f7]">
        <ul className="flex flex-col py-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <MobileNavLink
                item={item}
                pathname={pathname}
                onClick={closeMenu}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});

const LanguageDropdown = memo(function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const ref = useRef(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((p) => !p), []);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) close();
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, close]);

  const handleSelect = useCallback(
    async (code) => {
      setOpen(false);
      if (code === locale) return;

      try {
        await fetch("/api/locale", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale: code }),
        });
        try {
          localStorage.setItem("rds_locale", code);
        } catch (_) { }
        window.location.reload();
      } catch (error) {
        console.error("Failed to change locale:", error);
      }
    },
    [locale],
  );

  const LANGUAGES = [
    { code: "en", label: "English", short: "EN" },
    { code: "ar", label: "العربية", short: "عربي" },
  ];

  const currentLang =
    LANGUAGES.find((language) => language.code === locale) || LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-label="Change language"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 text-soft-black hover:text-main transition-colors duration-200"
      >
        <Globe size={20} strokeWidth={1.5} />
        <span className="text-[11px] font-semibold tracking-wider hidden sm:inline">
          {currentLang.short}
        </span>
      </button>

      <div
        role="listbox"
        className={`
          absolute ltr:right-0 rtl:left-0 top-full mt-3 min-w-[150px]
          bg-white rounded-xl border border-gray-100
          shadow-[0_12px_32px_rgba(0,0,0,0.08)]
          overflow-hidden ltr:origin-top-right! rtl:origin-top-left! z-50
          transition-all duration-200 ease-out
          ${open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }
        `}
      >
        {LANGUAGES.map((lang) => {
          const isActive = lang.code === locale;
          return (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={isActive}
              onClick={() => handleSelect(lang.code)}
              className={`
                w-full flex items-center justify-between gap-3
                px-4 py-2.5 text-sm transition-colors duration-150
                ${isActive
                  ? "text-main bg-main/5 font-semibold"
                  : "text-soft-black hover:bg-[#f7f7f7]"
                }
              `}
            >
              <span>{lang.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-main" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});

/* ─── Hamburger ─── */
const HamburgerBtn = memo(function HamburgerBtn({ menuOpen, toggleMenu }) {
  return (
    <button
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
      aria-controls="mobile-menu"
      onClick={toggleMenu}
      className="lg:hidden text-soft-black hover:text-main transition-colors duration-200 ml-1"
    >
      {menuOpen ? (
        <X size={22} strokeWidth={1.5} />
      ) : (
        <Menu size={22} strokeWidth={1.5} />
      )}
    </button>
  );
});

/* ─── Main Header ─── */
export default function Header() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const cartCount = useSelector((s) => s.cart.itemCount);
  const cartInitialized = useSelector((s) => s.cart.initialized);
  const siteInitialized = useSelector((s) => s.site.initialized);
  const geoInitialized = useSelector((s) => s.geo.initialized);
  const geoCountry = useSelector((s) => s.geo.country);

  const isUae = /^(ae|are|united arab emirates)$/i.test((geoCountry || "").trim());
  const shippingType = isUae ? "inside" : "outside";

  const siteShippingPrice = useSelector((s) => selectShippingPrice(s, shippingType));
  const siteCurrency = useSelector((s) => s.site.data.targetCurrency);
  const siteThreshold = useSelector((s) => selectFreeShippingThreshold(s, shippingType));
  useEffect(() => {
    if (!cartInitialized) {
      dispatch(fetchCart()).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          dispatch(reapplyCouponSilently());
        }
      });
    }
    if (!siteInitialized) {
      dispatch(fetchSiteInfo());
    }
    if (!geoInitialized) {
      dispatch(fetchGeoInfo());
    }

    if (siteInitialized && geoInitialized) {
      // Sync cart config once both are ready
      dispatch(setShippingCost(siteShippingPrice));
      dispatch(setCurrency(siteCurrency));
      dispatch(setFreeShippingThreshold(siteThreshold.price));
    }
  }, [
    cartInitialized,
    siteInitialized,
    geoInitialized,
    siteShippingPrice,
    siteCurrency,
    siteThreshold,
    dispatch,
  ]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showFixed, setShowFixed] = useState(false);

  useEffect(() => {
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setShowFixed(window.scrollY > 120);
        rafId = null;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const shouldLock = menuOpen || searchOpen;
    document.body.style.overflow = shouldLock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const openSearch = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(true);
  }, []);

  const openCart = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    dispatch(toggleCart());
  }, [dispatch]);

  const toggleMenu = useCallback(() => {
    setSearchOpen(false);
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* ── Static header (TopBar + Main Nav) ── */}
      <header className="relative z-[40]">
        <TopBar />

        <div className="w-full bg-white border-b border-gray-100">
          <div className="container mx-auto">
            <div className="flex items-center justify-between py-3 gap-4">
              <Link
                href="/"
                className="flex-shrink-0"
                aria-label="RDS Pharma Home"
              >
                <Logo size="default" />
              </Link>

              <NavMenu pathname={pathname} ariaLabel="Main navigation" />

              <div className="flex items-center gap-2 sm:px-0 px-2">
                <HeaderIcons
                  cartCount={cartCount}
                  onSearchClick={openSearch}
                  onCartClick={openCart}
                />
                <HamburgerBtn menuOpen={menuOpen} toggleMenu={toggleMenu} />
              </div>
            </div>
          </div>

          {!showFixed && (
            <MobileMenu
              visible={menuOpen}
              pathname={pathname}
              closeMenu={closeMenu}
            />
          )}
        </div>
      </header>

      {/* ── Fixed header (TopBar + Nav) — appears on scroll ── */}
      <div
        aria-hidden={!showFixed}
        className={`
          fixed top-0 left-0 right-0 z-[1000]
          transition-transform duration-300 ease-in-out
          ${showFixed ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        {/* TopBar first (on top) */}
        <TopBar compact />

        {/* Then the nav */}
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="container mx-auto">
            <div className="flex items-center justify-between py-2 gap-4">
              <Link
                href="/"
                className="flex-shrink-0"
                aria-label="RDS Pharma Home"
                tabIndex={showFixed ? 0 : -1}
              >
                <Logo size="small" />
              </Link>

              <NavMenu pathname={pathname} ariaLabel="Fixed main navigation" />

              <div className="flex items-center gap-2 sm:px-0 px-2">
                <HeaderIcons
                  cartCount={cartCount}
                  onSearchClick={openSearch}
                  onCartClick={openCart}
                />
                <HamburgerBtn menuOpen={menuOpen} toggleMenu={toggleMenu} />
              </div>
            </div>
          </div>

          {showFixed && (
            <MobileMenu
              visible={menuOpen}
              pathname={pathname}
              closeMenu={closeMenu}
            />
          )}
        </header>
      </div>

      {/* ── Mobile menu backdrop ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[30] lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <SearchOverlay open={searchOpen} onClose={closeSearch} />
      <CartDrawer />
    </>
  );
}
