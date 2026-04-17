// components/Header.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

// ===== NAV ITEMS =====
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/collections/all" },
  { label: "Skinage", href: "/collections/skinage" },
  { label: "Denefis", href: "/collections/denefis" },
  { label: "Offers", href: "/offers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// ===== LOGO =====
const Logo = ({ size = "default" }) => {
  const sizes = {
    default: { className: "w-24 h-12 sm:w-26 sm:h-14 md:w-28 md:h-[60px]" },
    small: { className: "w-20 h-10 sm:w-24 sm:h-12" },
  };

  return (
    <img
      src="https://res.cloudinary.com/dbvh5i83q/image/upload/v1776082859/rds_logo_xpmbfn.webp"
      alt="RDS Pharma"
      className={`${sizes[size].className} object-contain`}
      loading="eager"
      fetchPriority="high"
      decoding="async"
    />
  );
};

// ===== NAV LINK =====
const NavLink = ({ item, pathname, onClick }) => {
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`
        group relative text-sm font-medium tracking-wide pb-1
        transition-colors duration-200 whitespace-nowrap
        ${isActive ? "text-soft-black" : "text-secondary hover:text-soft-black"}
      `}
    >
      {item.label}
      <span
        className={`
          absolute bottom-0 left-0 h-[1.5px] bg-main rounded-full
          transition-all duration-300
          ${isActive ? "w-full" : "w-0 group-hover:w-full"}
        `}
      />
    </Link>
  );
};

// ===== MOBILE NAV LINK =====
const MobileNavLink = ({ item, pathname, onClick }) => {
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
        ${
          isActive
            ? "text-main bg-white"
            : "text-soft-black hover:text-main hover:bg-white"
        }
      `}
    >
      {item.label}
      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-main" />}
    </Link>
  );
};

// ===== HEADER ICONS =====
const HeaderIcons = ({ cartCount = 1 }) => (
  <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
    <button
      aria-label="Search"
      className="text-soft-black hover:text-main transition-colors duration-200"
    >
      <Search size={19} strokeWidth={1.5} />
    </button>

    <button
      aria-label="My Account"
      className="text-soft-black hover:text-main transition-colors duration-200"
    >
      <User size={19} strokeWidth={1.5} />
    </button>

    <button
      aria-label={`Shopping Bag - ${cartCount} item`}
      className="relative text-soft-black hover:text-main transition-colors duration-200"
    >
      <ShoppingBag size={19} strokeWidth={1.5} />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-main rounded-full flex items-center justify-center">
          <span className="text-white text-[9px] font-bold leading-none">
            {cartCount}
          </span>
        </span>
      )}
    </button>
  </div>
);

// ===== TOP BAR =====
const TopBar = () => (
  <div className="w-full bg-main py-2 px-4">
    <p className="text-center text-white font-semibold tracking-wide text-[11px] sm:text-xs md:text-sm leading-snug">
      <span className="hidden sm:inline">
        UAE Delivery Free Over 150AED Within 2Days &nbsp;|&nbsp; GCC Free over
        600AED Within 4Days
      </span>
      <span className="sm:hidden">
        🚚 UAE Free &gt;150AED &nbsp;|&nbsp; GCC Free &gt;600AED
      </span>
    </p>
  </div>
);

// ===== MOBILE MENU =====
const MobileMenu = ({ visible, pathname, closeMenu }) => (
  <div
    id="mobile-menu"
    role="dialog"
    aria-label="Mobile navigation"
    className={`
      lg:hidden overflow-hidden
      transition-all duration-300 ease-in-out
      ${
        visible
          ? "max-h-screen opacity-100"
          : "max-h-0 opacity-0 pointer-events-none"
      }
    `}
  >
    <nav className="border-t border-gray-100 bg-[#f7f7f7]">
      <ul className="flex flex-col py-2">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
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

// ===== HAMBURGER BUTTON =====
const HamburgerBtn = ({ menuOpen, toggleMenu }) => (
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

// ===== MAIN HEADER =====
export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFixed, setShowFixed] = useState(false);

  // ===== RAF Scroll Handler =====
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

  // ===== Body Scroll Lock =====
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ===== Close on Route Change =====
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  return (
    <>
      {/* ==================== STATIC HEADER ==================== */}
      <header className="relative z-[1000]">
        <TopBar />

        <div className="w-full bg-white border-b border-gray-100">
          <div className="container mx-auto">
            <div className="flex items-center justify-between py-3 gap-4">
              {/* Logo */}
              <Link
                href="/"
                className="flex-shrink-0"
                aria-label="RDS Pharma Home"
              >
                <Logo size="default" />
              </Link>

              {/* Desktop Nav */}
              <nav
                aria-label="Main navigation"
                className="hidden lg:flex flex-1"
              >
                <ul className="flex items-center justify-center gap-5 xl:gap-7 w-full">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.label}>
                      <NavLink item={item} pathname={pathname} />
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Icons + Hamburger */}
              <div className="flex items-center gap-3">
                <HeaderIcons cartCount={1} />
                <HamburgerBtn menuOpen={menuOpen} toggleMenu={toggleMenu} />
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <MobileMenu
            visible={menuOpen}
            pathname={pathname}
            closeMenu={closeMenu}
          />
        </div>
      </header>

      {/* ==================== FIXED HEADER ==================== */}
      <header
        aria-hidden={!showFixed}
        className={`
          fixed top-0 left-0 right-0 z-50
          bg-white border-b border-gray-100 shadow-sm
          transition-all duration-300 ease-in-out
          ${
            showFixed
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }
        `}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-2 gap-4">
            {/* Logo smaller */}
            <Link
              href="/"
              className="flex-shrink-0"
              aria-label="RDS Pharma Home"
              tabIndex={showFixed ? 0 : -1}
            >
              <Logo size="small" />
            </Link>

            {/* Desktop Nav */}
            <nav
              aria-label="Fixed main navigation"
              className="hidden lg:flex flex-1"
            >
              <ul className="flex items-center justify-center gap-5 xl:gap-7 w-full">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <NavLink item={item} pathname={pathname} />
                  </li>
                ))}
              </ul>
            </nav>

            {/* Icons + Hamburger */}
            <div className="flex items-center gap-3">
              <HeaderIcons cartCount={1} />
              <HamburgerBtn menuOpen={menuOpen} toggleMenu={toggleMenu} />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          visible={menuOpen}
          pathname={pathname}
          closeMenu={closeMenu}
        />
      </header>

      {/* ===== OVERLAY ===== */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
