// sections/Common/Header/Header.jsx
"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, User, ShoppingBag, Menu, X, Globe } from "lucide-react";
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
import { toggleCart, fetchCart } from "../../../store/cartSlice";

const SearchOverlay = dynamic(
  () => import("../../../components/Search/SearchOverlay"),
  { ssr: false }
);

const CartDrawer = dynamic(
  () => import("../../../components/Cart/CartDrawer"),
  { ssr: false }
);

/* ─── isomorphic layout effect (avoid SSR warnings) ─── */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ─── Constants ─── */
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/collections/all" },
  // { label: "Skinage", href: "/collections/skinage" },
  // { label: "Denefis", href: "/collections/denefis" },
  // { label: "Offers", href: "/collections/offers" },

  { label: "Brands", href: "/collections" },
  { label: "Blog", href: "/blog/news" },
  { label: "Contact", href: "/contact" },
];

const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "ar", label: "العربية", short: "AR" },
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
});

/* ─── Desktop Nav with Sliding Pill ─── */
const NavMenu = memo(function NavMenu({ pathname, ariaLabel }) {
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [hoveredHref, setHoveredHref] = useState(null);
  const [indicator, setIndicator] = useState({
    opacity: 0,
    x: 0,
    width: 0,
  });

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

  /* recalc on hover / pathname change */
  useIsoLayoutEffect(() => {
    const target = hoveredHref || pathname;
    const exists = NAV_ITEMS.some((i) => i.href === target);
    updateIndicator(exists ? target : null);
  }, [hoveredHref, pathname, updateIndicator]);

  /* recalc on resize */
  useEffect(() => {
    const handleResize = () => {
      const target = hoveredHref || pathname;
      const exists = NAV_ITEMS.some((i) => i.href === target);
      updateIndicator(exists ? target : null);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [hoveredHref, pathname, updateIndicator]);

  const setLinkRef = useCallback(
    (href) => (el) => {
      if (el) linkRefs.current[href] = el;
      else delete linkRefs.current[href];
    },
    []
  );

  const handleMouseLeave = useCallback(() => setHoveredHref(null), []);

  return (
    <nav aria-label={ariaLabel} className="hidden lg:flex flex-1">
      <ul
        ref={navRef}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center justify-center gap-0.5 xl:gap-1 w-full"
      >
        {/* sliding pill */}
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
            <li key={item.label}>
              <Link
                ref={setLinkRef(item.href)}
                href={item.href}
                onMouseEnter={() => setHoveredHref(item.href)}
                aria-current={isActive ? "page" : undefined}
                className={`
                  relative z-10 inline-flex items-center
                  px-4 py-2 text-sm font-medium tracking-wide
                  whitespace-nowrap transition-colors duration-200
                  ${
                    isActive || isHovered
                      ? "text-main"
                      : "text-secondary hover:text-soft-black"
                  }
                `}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

/* ─── Language Dropdown ─── */
// const LanguageDropdown = memo(function LanguageDropdown() {
//   const [open, setOpen] = useState(false);
//   const [current, setCurrent] = useState("en");
//   const ref = useRef(null);

//   const close = useCallback(() => setOpen(false), []);
//   const toggle = useCallback(() => setOpen((p) => !p), []);

//   useEffect(() => {
//     if (!open) return;

//     const handleClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) close();
//     };
//     const handleEscape = (e) => {
//       if (e.key === "Escape") close();
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEscape);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [open, close]);

//   const handleSelect = useCallback((code) => {
//     setCurrent(code);
//     setOpen(false);
//     // TODO: integrate with next-intl locale switching
//   }, []);

//   const currentLang = LANGUAGES.find((l) => l.code === current);

//   return (
//     <div ref={ref} className="relative">
//       <button
//         type="button"
//         onClick={toggle}
//         aria-label="Change language"
//         aria-expanded={open}
//         aria-haspopup="listbox"
//         className="flex items-center gap-1.5 text-soft-black hover:text-main transition-colors duration-200"
//       >
//         <Globe size={20} strokeWidth={1.5} />
//         <span className="text-[11px] font-semibold tracking-wider hidden sm:inline">
//           {currentLang.short}
//         </span>
//       </button>

//       <div
//         role="listbox"
//         className={`
//           absolute right-0 top-full mt-3 min-w-[150px]
//           bg-white rounded-xl border border-gray-100
//           shadow-[0_12px_32px_rgba(0,0,0,0.08)]
//           overflow-hidden origin-top-right z-50
//           transition-all duration-200 ease-out
//           ${
//             open
//               ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
//               : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
//           }
//         `}
//       >
//         {LANGUAGES.map((lang) => {
//           const isActive = lang.code === current;
//           return (
//             <button
//               key={lang.code}
//               type="button"
//               role="option"
//               aria-selected={isActive}
//               onClick={() => handleSelect(lang.code)}
//               className={`
//                 w-full flex items-center justify-between gap-3
//                 px-4 py-2.5 text-sm transition-colors duration-150
//                 ${
//                   isActive
//                     ? "text-main bg-main/5 font-semibold"
//                     : "text-soft-black hover:bg-[#f7f7f7]"
//                 }
//               `}
//             >
//               <span>{lang.label}</span>
//               {isActive && (
//                 <span className="w-1.5 h-1.5 rounded-full bg-main" />
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// });

/* ─── Mobile Nav Link ─── */
const MobileNavLink = memo(function MobileNavLink({ item, pathname, onClick }) {
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
});

/* ─── Header Icons ─── */
const HeaderIcons = memo(function HeaderIcons({
  onSearchClick,
  onCartClick,
  cartCount,
}) {
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
      {/* 
      <Link
        aria-label="My Account"
        href="/login"
        className="text-soft-black hover:text-main transition-colors duration-200"
      >
        <User size={22} strokeWidth={1.5} />
      </Link> */}

      <button
        type="button"
        onClick={onCartClick}
        aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
        className="relative text-soft-black hover:text-main transition-colors duration-200"
      >
        <ShoppingBag size={22} strokeWidth={1.5} />
        {cartCount > 0 && (
          <span
            className="absolute -top-2 -right-2 flex h-[18px] min-w-[18px]
                       items-center justify-center rounded-full bg-main px-1
                       shadow-sm"
          >
            <span className="text-white text-[9px] font-bold leading-none">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          </span>
        )}
      </button>

      {/* <LanguageDropdown /> */}
    </div>
  );
});

/* ─── Top Bar ─── */
const TopBar = memo(function TopBar() {
  return (
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

  useEffect(() => {
    if (!cartInitialized) {
      dispatch(fetchCart());
    }
  }, [cartInitialized, dispatch]);

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
      {/* ── static header ── */}
      <header className="relative z-[1000]">
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

      {/* ── fixed header ── */}
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

      {/* ── overlays ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <SearchOverlay open={searchOpen} onClose={closeSearch} />
      <CartDrawer />
    </>
  );
}
