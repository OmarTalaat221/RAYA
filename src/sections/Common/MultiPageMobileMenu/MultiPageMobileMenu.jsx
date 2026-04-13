"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const MultiPageMobileMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const t = useTranslations("header");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);

  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
  };

  const [menuStyles, setMenuStyles] = useState({
    isPagesMenu: {
      opacity: 0,
      transition: "opacity 0.5s ease",
      display: "none",
    },
    isServicesMenu: {
      opacity: 0,
      transition: "opacity 0.5s ease",
      display: "none",
    },
  });

  // PagesPage
  useEffect(() => {
    if (isPagesMenuOpen) {
      setMenuStyles((prevStyles) => ({
        ...prevStyles,
        isPagesMenu: {
          ...prevStyles.isPagesMenu,
          display: "block",
        },
      }));
      setTimeout(() => {
        setMenuStyles((prevStyles) => ({
          ...prevStyles,
          isPagesMenu: {
            ...prevStyles.isPagesMenu,
            opacity: 1,
          },
        }));
      }, 100);
    } else {
      setMenuStyles((prevStyles) => ({
        ...prevStyles,
        isPagesMenu: {
          ...prevStyles.isPagesMenu,
          opacity: 0,
        },
      }));
      setTimeout(() => {
        setMenuStyles((prevStyles) => ({
          ...prevStyles,
          isPagesMenu: {
            ...prevStyles.isPagesMenu,
            display: "none",
          },
        }));
      }, 300);
    }
  }, [isPagesMenuOpen]);

  // Services
  useEffect(() => {
    if (isServicesMenuOpen) {
      setMenuStyles((prevStyles) => ({
        ...prevStyles,
        isServicesMenu: {
          ...prevStyles.isServicesMenu,
          display: "block",
        },
      }));
      setTimeout(() => {
        setMenuStyles((prevStyles) => ({
          ...prevStyles,
          isServicesMenu: {
            ...prevStyles.isServicesMenu,
            opacity: 1,
          },
        }));
      }, 100);
    } else {
      setMenuStyles((prevStyles) => ({
        ...prevStyles,
        isServicesMenu: {
          ...prevStyles.isServicesMenu,
          opacity: 0,
        },
      }));
      setTimeout(() => {
        setMenuStyles((prevStyles) => ({
          ...prevStyles,
          isServicesMenu: {
            ...prevStyles.isServicesMenu,
            display: "none",
          },
        }));
      }, 300);
    }
  }, [isServicesMenuOpen]);

  return (
    <div
      className={`mobile-menu-wrapper ${isMenuOpen ? "body-visible" : ""}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="mobile-menu-area">
        <div className="mobile-logo">
          <Link href={`/`}>
            <img
              className="max-w-[165px]! object-cover"
              src="https://res.cloudinary.com/dkc5klynm/image/upload/v1770203475/4_keca0z.png"
              alt="Matrix"
            />
          </Link>
          <button onClick={handleMobileMenuClose} className="menu-toggle">
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className="mobile-menu">
          <ul>
            {/* Home */}
            <li>
              <Link href={`/`} onClick={handleMobileMenuClose}>
                {t("nav.home")}
              </Link>
            </li>

            {/* About */}
            <li>
              <Link href={`/about`} onClick={handleMobileMenuClose}>
                {t("nav.about")}
              </Link>
            </li>

            <li>
              <Link href={`/project`} onClick={handleMobileMenuClose}>
                {t("pages.projectPage")}
              </Link>
            </li>

            <li>
              <Link href={`/blog`} onClick={handleMobileMenuClose}>
                {t("nav.blog")}
              </Link>
            </li>

            <li>
              <Link href={`/contact`} onClick={handleMobileMenuClose}>
                {t("nav.contact")}
              </Link>
            </li>
            {/* Services with submenu
            <li
              className={`menu-item-has-children submenu-item-has-children ${isServicesMenuOpen ? "active-class" : ""}`}
            >
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  setIsServicesMenuOpen(!isServicesMenuOpen);
                }}
                href="#"
              >
                {t("nav.services")} <span className="mean-expand-class"></span>
              </Link>
              <ul
                className={`sub-menu submenu-class ${isServicesMenuOpen ? "menu-open" : ""}`}
                style={menuStyles.isServicesMenu}
              >
                <li>
                  <Link href={`/services`} onClick={handleMobileMenuClose}>
                    {t("nav.services")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/services/service-details`}
                    onClick={handleMobileMenuClose}
                  >
                    {locale === "ar" ? "تفاصيل الخدمة" : "Service Details"}
                  </Link>
                </li>
              </ul>
            </li>

            Pages with submenu 
            <li
              className={`menu-item-has-children submenu-item-has-children ${isPagesMenuOpen ? "active-class" : ""}`}
            >
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  setIsPagesMenuOpen(!isPagesMenuOpen);
                }}
                href="#"
              >
                {t("nav.pages")} <span className="mean-expand-class"></span>
              </Link>
              <ul
                className={`sub-menu submenu-class ${isPagesMenuOpen ? "menu-open" : ""}`}
                style={menuStyles.isPagesMenu}
              >
                <li>
                  <Link href={`/project`} onClick={handleMobileMenuClose}>
                    {t("pages.projectPage")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/project/project-details`}
                    onClick={handleMobileMenuClose}
                  >
                    {t("pages.projectDetails")}
                  </Link>
                </li>
                <li>
                  <Link href={`/team`} onClick={handleMobileMenuClose}>
                    {t("pages.teamPage")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/team/team-details`}
                    onClick={handleMobileMenuClose}
                  >
                    {t("pages.teamDetails")}
                  </Link>
                </li>
              </ul>
            </li>

            Blog 
            <li>
              <Link href={`/blog`} onClick={handleMobileMenuClose}>
                {t("nav.blog")}
              </Link>
            </li>

            Contact
            <li>
              <Link href={`/contact`} onClick={handleMobileMenuClose}>
                {t("nav.contact")}
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MultiPageMobileMenu;
