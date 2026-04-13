"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MultiPageMobileMenu from "../MultiPageMobileMenu/MultiPageMobileMenu";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const HeaderTwo = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const t = useTranslations("header");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchPopupOpen = () => {
    setIsPopupOpen(true);
  };
  const handleSearchPopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleMobileMenuOpen = () => {
    setIsMenuOpen(true);
  };
  const handleSideBarClose = () => {
    setIsSideBarOpen(false);
  };
  const handleSideBarOpen = () => {
    setIsSideBarOpen(true);
  };

  // Language Switcher
  const switchLanguage = (newLocale) => {
    const currentPath = pathname.replace(`/${locale}`, "");
    router.push(`/${newLocale}${currentPath}`);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSideBarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {/* Search Popup */}
      <div className={`popup-search-box ${isPopupOpen ? "show" : ""}`}>
        <button onClick={handleSearchPopupClose} className="searchClose">
          <i className="ri-close-line"></i>
        </button>
        <form action="#">
          <input type="text" placeholder={t("search.placeholder")} />
          <button type="submit">
            <i className="ri-search-line"></i>
          </button>
        </form>
      </div>

      {/* Sidebar */}
      <div className={`sidemenu-wrapper ${isSideBarOpen ? "show" : ""}`}>
        <div ref={sidebarRef} className="sidemenu-content">
          <button
            onClick={handleSideBarClose}
            className="closeButton sideMenuCls"
          >
            <i className="ri-close-line"></i>
          </button>
          <div className="widget widget-about footer-widget">
            <div className="footer-logo footer-img">
              <Link href={`/`}>
                <img
                  // src="/public/assets/image/WhatsApp Image 2026-02-03 at 1.33.20 PM.jpeg"
                  src="https://res.cloudinary.com/dkc5klynm/image/upload/v1770025937/WhatsApp_Image_2026-01-29_at_3.01.26_PM_br2bgm.jpg"
                  alt="logo"
                  width={100}
                  height={50}
                />
              </Link>
            </div>
            <p className="about-text mb-4">{t("sidebar.about")}</p>

            <p className="footer-text" style={{ direction: "ltr" }}>
              <Link href="tel:851555961658">
                <i className="ri-phone-line space-right-sidebar-icon"></i>
                {t("contact.phone")}
              </Link>
            </p>
            <p className="contact-text">
              <i className="ri-map-pin-line space-right-sidebar-icon"></i>{" "}
              {t("sidebar.address")}
            </p>
            <p className="footer-text">
              <Link href="mailto:info@mtrix.sa">
                <i className="ri-mail-line space-right-sidebar-icon"></i>
                {t("sidebar.email")}
              </Link>
            </p>
            <div className="social-btn style3 mt-30">
              <Link href="https://www.twitter.com/">
                <i className="ri-twitter-x-line"></i>
              </Link>
              <Link href="https://instagram.com/">
                <i className="ri-instagram-line"></i>
              </Link>
              <Link href="https://facebook.com/">
                <i className="ri-facebook-fill"></i>
              </Link>
              <Link href="https://linkedin.com/">
                <i className="ri-linkedin-fill"></i>
              </Link>
            </div>
            <div className="recent-post-wrap mt-40">
              {/* Post 1 */}
              <div className="recent-post">
                <div className="media-img">
                  <Link href={`/blog-details`}>
                    <img
                      src="/main-assets/img/blog/recent-post1.png"
                      alt="Blog Image"
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
                <div className="media-body">
                  <h4 className="post-title">
                    <Link className="text-inherit" href={`/blog-details`}>
                      {t("sidebar.recentPosts.post1.title")}
                    </Link>
                  </h4>
                  <div className="recent-post-meta">
                    <Link href={`/blog`}>
                      {t("sidebar.recentPosts.post1.author")}
                    </Link>
                    <Link href={`/blog`}>
                      {t("sidebar.recentPosts.post1.time")}
                    </Link>
                  </div>
                </div>
              </div>
              {/* Post 2 */}
              <div className="recent-post">
                <div className="media-img">
                  <Link href={`/blog-details`}>
                    <img
                      src="/main-assets/img/blog/recent-post2.png"
                      alt="Blog Image"
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
                <div className="media-body">
                  <h4 className="post-title">
                    <Link className="text-inherit" href={`/blog-details`}>
                      {t("sidebar.recentPosts.post2.title")}
                    </Link>
                  </h4>
                  <div className="recent-post-meta">
                    <Link href={`/blog`}>
                      {t("sidebar.recentPosts.post2.author")}
                    </Link>
                    <Link href={`/blog`}>
                      {t("sidebar.recentPosts.post2.time")}
                    </Link>
                  </div>
                </div>
              </div>
              {/* Post 3 */}
              <div className="recent-post">
                <div className="media-img">
                  <Link href={`/blog-details`}>
                    <img
                      src="/main-assets/img/blog/recent-post4.png"
                      alt="Blog Image"
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
                <div className="media-body">
                  <h4 className="post-title">
                    <Link className="text-inherit" href={`/blog-details`}>
                      {t("sidebar.recentPosts.post3.title")}
                    </Link>
                  </h4>
                  <div className="recent-post-meta">
                    <Link href={`/blog`}>
                      {t("sidebar.recentPosts.post3.author")}
                    </Link>
                    <Link href={`/blog`}>
                      {t("sidebar.recentPosts.post3.time")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MultiPageMobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Header */}
      <header className="nav-header px-6 header-layout3">
        <div className={`sticky-wrapper ${isSticky ? "sticky" : ""}`}>
          <div className="menu-area">
            <div className="container px-10">
              <div className="row align-items-center justify-content-lg-start justify-content-between">
                <div className="col-auto">
                  <div className="header-logo">
                    <Link href={`/`}>
                      <img
                        src="/assets/image/WhatsApp_Image_2026-02-03_at_1.33.20_PM-removebg-preview.png"
                        className="w-20 h-16"
                        alt="logo"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-auto menu-bar ms-xxl-0">
                  <nav className="main-menu  d-none d-lg-inline-block">
                    <ul>
                      <li>
                        <Link className="text-lg!" href={`/`}>
                          {t("nav.home")}
                        </Link>
                      </li>
                      <li>
                        <Link className="text-lg!" href={`/about`}>
                          {t("nav.about")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-lg!"
                          href={`/pages/innerpage/service`}
                        >
                          {t("nav.services")}
                        </Link>
                      </li>
                      <li className="menu-item-has-children">
                        <Link className="text-lg!" href="#">
                          {t("nav.pages")}
                        </Link>
                        <ul
                          className={`sub-menu flex flex-col gap-3  ${isRTL ? "text-right!" : "text-left!"}`}
                        >
                          <li>
                            <Link className="text-lg!" href={`/project`}>
                              {t("pages.projectPage")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="text-lg!"
                              href={`/project-details`}
                            >
                              {t("pages.projectDetails")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="text-lg!"
                              href={`/pages/innerpage/team`}
                            >
                              {t("pages.teamPage")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="text-lg!"
                              href={`/pages/innerpage/team-details`}
                            >
                              {t("pages.teamDetails")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="text-lg!"
                              href={`/pages/innerpage/shop`}
                            >
                              {t("pages.shopPage")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="text-lg!"
                              href={`/pages/innerpage/shop-details`}
                            >
                              {t("pages.shopDetails")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="text-lg!"
                              href={`/pages/innerpage/cart`}
                            >
                              {t("pages.cart")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="text-lg!"
                              href={`/pages/innerpage/checkout`}
                            >
                              {t("pages.checkout")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="text-lg!"
                              href={`/pages/innerpage/wishlist`}
                            >
                              {t("pages.wishlist")}
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link className="text-lg!" href={`/blog`}>
                          {t("nav.blog")}
                        </Link>
                      </li>
                      <li>
                        <Link className="text-lg!" href={`/contact`}>
                          {t("nav.contact")}
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <div className="navbar-right d-inline-flex d-lg-none">
                    <button
                      onClick={handleMobileMenuOpen}
                      type="button"
                      className="menu-toggle icon-btn"
                    >
                      <i className="ri-menu-line"></i>
                    </button>
                  </div>
                </div>
                <div
                  className={`col-auto d-xl-block d-none ${
                    isRTL ? "space-right" : "space-left"
                  }`}
                >
                  <div className="header-button">
                    <div className="navbar-right-desc">
                      <div className="icon-btn">
                        <i className="ri-phone-fill"></i>
                      </div>
                      <div
                        style={{ direction: "ltr" }}
                        className="navbar-right-desc-details"
                      >
                        <h6
                          className={`title ${isRTL ? "text-right!" : "text-left!"}`}
                        >
                          {t("contact.callUs")}
                        </h6>
                        <Link className="link" href="tel:+2590256215">
                          {t("contact.phone")}
                        </Link>
                      </div>
                    </div>
                    <Link href={`/about`} className="btn d-xxl-flex d-none">
                      {t("buttons.getInTouch")}{" "}
                      <i
                        className={
                          isRTL
                            ? "ri-arrow-left-up-line"
                            : "ri-arrow-right-up-line"
                        }
                      ></i>
                    </Link>

                    {/* Language Switcher */}
                    {/* <button
                      onClick={() => switchLanguage(isRTL ? "en" : "ar")}
                      type="button"
                      className="language-btn simple-icon"
                      title={isRTL ? "English" : "العربية"}
                    >
                      <i className="ri-global-line"></i>
                      <span className="lang-text">{isRTL ? "EN" : "AR"}</span>
                    </button> */}

                    <button
                      onClick={handleSearchPopupOpen}
                      type="button"
                      className="search-btn searchBoxToggler simple-icon"
                    >
                      <i className="ri-search-line"></i>
                    </button>
                    <button
                      onClick={handleSideBarOpen}
                      type="button"
                      className="sidebar-btn sideMenuToggler simple-icon"
                    >
                      <i className="ri-grid-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderTwo;
