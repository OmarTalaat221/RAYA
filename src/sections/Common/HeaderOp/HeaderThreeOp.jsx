"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MultiPageMobileMenu from "../MultiPageMobileMenu/MultiPageMobileMenu";

const HeaderThreeOp = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sidebarRef = useRef(null);

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
    <div>
      <div className={`popup-search-box ${isPopupOpen ? "show" : ""}`}>
        <button onClick={handleSearchPopupClose} className="searchClose">
          <i className="ri-close-line"></i>
        </button>
        <form action="#">
          <input type="text" placeholder="Search Here.." />
          <button type="submit">
            <i className="ri-search-line"></i>
          </button>
        </form>
      </div>
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
              <Link href="/pages/homepage/home-1">
                <img
                  src="/main-assets/img/logo.svg"
                  alt="logo"
                  width={100}
                  height={50}
                />
              </Link>
            </div>
            <p className="about-text mb-4">
              A small business can be better than a big business because of
              agility and adaptability due to their size and scale.
            </p>

            <p className="footer-text">
              <Link href="tel:851555961658">
                <i className="ri-phone-line me-2"></i>+85 155 596 1658
              </Link>
            </p>
            <p className="contact-text">
              <i className="ri-map-pin-line me-2"></i> Losangle, Street Road 24,
              New York, USA - 67452
            </p>
            <p className="footer-text">
              <Link href="mailto:info@mtrix.sa">
                <i className="ri-mail-line me-2"></i>info@mtrix.sa
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
              <div className="recent-post">
                <div className="media-img">
                  <Link href="/blog-details">
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
                    <Link className="text-inherit" href="/blog-details">
                      Best features of Building construction work
                    </Link>
                  </h4>
                  <div className="recent-post-meta">
                    <Link href="/blog">By Nicholes</Link>
                    <Link href="/blog">30 min ago</Link>
                  </div>
                </div>
              </div>
              <div className="recent-post">
                <div className="media-img">
                  <Link href="/blog-details">
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
                    <Link className="text-inherit" href="/blog-details">
                      The beast team is a around and how we make it
                    </Link>
                  </h4>
                  <div className="recent-post-meta">
                    <Link href="/blog">By Nicholes</Link>
                    <Link href="/blog">2 days ago</Link>
                  </div>
                </div>
              </div>
              <div className="recent-post">
                <div className="media-img">
                  <Link href="/blog-details">
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
                    <Link className="text-inherit" href="/blog-details">
                      A well designed construction website is user accessible
                    </Link>
                  </h4>
                  <div className="recent-post-meta">
                    <Link href="/blog">By Nicholes</Link>
                    <Link href="/blog">3 week ago</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MultiPageMobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      ></MultiPageMobileMenu>
      <header className="nav-header header-layout4">
        <div className={`sticky-wrapper ${isSticky ? "sticky" : ""}`}>
          {/* Main Menu Area */}
          <div className="menu-area">
            <div className="logo-bg"></div>
            <div className="container">
              <div className="row align-items-center justify-content-lg-start justify-content-between">
                <div className="col-auto">
                  <div className="header-logo">
                    <Link href="/pages/homepage/home-1">
                      <img src="/main-assets/img/logo-white.svg" alt="logo" />
                    </Link>
                  </div>
                </div>
                <div className="col-auto m-lg-auto">
                  <nav className="main-menu d-none d-lg-inline-block">
                    <ul>
                      <li className="menu-item-has-children">
                        <Link href="#">HOME</Link>
                        <ul className="sub-menu">
                          <li className="menu-item-has-children">
                            <Link href="#">Multipage</Link>
                            <ul className="sub-menu">
                              <li>
                                <Link href="/pages/homepage/home-1">
                                  Home 01
                                </Link>
                              </li>
                              <li>
                                <Link href="/pages/homepage/home-2">
                                  Home 02
                                </Link>
                              </li>
                              <li>
                                <Link href="/pages/homepage/home-3">
                                  Home 03
                                </Link>
                              </li>
                              <li>
                                <Link href="/pages/homepage/home-4">
                                  Home 04
                                </Link>
                              </li>
                              <li>
                                <Link href="/pages/homepage/home-5">
                                  Home 05
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li className="menu-item-has-children">
                            <Link href="#">Onepage</Link>
                            <ul className="sub-menu">
                              <li>
                                <Link href="/pages/homepage/home-1-op">
                                  Home 01 Onepage
                                </Link>
                              </li>
                              <li>
                                <Link href="/pages/homepage/home-2-op">
                                  Home 02 Onepage
                                </Link>
                              </li>
                              <li>
                                <Link href="/pages/homepage/home-3-op">
                                  Home 03 Onepage
                                </Link>
                              </li>
                              <li>
                                <Link href="/pages/homepage/home-4-op">
                                  Home 04 Onepage
                                </Link>
                              </li>
                              <li>
                                <Link href="/pages/homepage/home-5-op">
                                  Home 05 Onepage
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="#about-sec">ABOUT</Link>
                      </li>
                      <li>
                        <Link href="#service-sec">SERVICES</Link>
                      </li>
                      <li>
                        <Link href="#project-sec">PORTFOLIO</Link>
                      </li>
                      <li>
                        <Link href="#blog-sec">NEWS</Link>
                      </li>
                      <li>
                        <Link href="#contact-sec">CONTACT</Link>
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
                <div className="col-auto d-xl-block d-none">
                  <div className="header-button">
                    <div className="navbar-right-desc">
                      <div className="icon-btn">
                        <i className="ri-phone-fill"></i>
                      </div>
                      <div className="navbar-right-desc-details">
                        <h6 className="title">Call us any time</h6>
                        <Link className="link" href="tel:+966580669091">
                          +966 58 066 9091
                        </Link>
                      </div>
                    </div>
                    <Link
                      href="/about"
                      className="btn style2 d-xxl-flex d-none"
                    >
                      GET IN TOUCH <i className="ri-arrow-right-up-line"></i>
                    </Link>
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

export default HeaderThreeOp;
