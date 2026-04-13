"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
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

  return (
    <header className="navbar-area">
      <nav
        className={`navbar navbar-expand-lg navbar-default navbar-fixed-top ${isSticky ? "top-nav-collapse" : ""}`}
      >
        <div className="container nav-container">
          <div className="logo">
            <Link className="main-logo" href="/">
              <img src="/landing-assets/img/logo.svg" alt="img" />
            </Link>
          </div>
          <div className="nav-right-part nav-right-part-mobile ms-auto">
            <ul className="text-end">
              <li>
                <Link className="page-scroll" href="#demo">
                  Demos
                </Link>
              </li>
              <li>
                <Link className="page-scroll" href="#inner">
                  Inners
                </Link>
              </li>
              <li>
                <Link className="cart" href="log-in">
                  <img src="/landing-assets/img/add-to-cart.svg" alt="img" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="al_main_menu">
            <ul className="navbar-nav menu-open text-center m-auto">
              <li>
                <Link className="page-scroll" href="#demo">
                  Demos
                </Link>
              </li>
              <li>
                <Link className="page-scroll" href="#inner">
                  Inner Pages
                </Link>
              </li>
              <li>
                <Link className="page-scroll" href="#header">
                  Responsive
                </Link>
              </li>
              <li>
                <Link className="page-scroll" href="#featured">
                  Features
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-right-part nav-right-part-desktop">
            <ul>
              <li>
                <Link
                  href="https://themeforest.net/user/favdevs"
                  className="btn "
                >
                  Purchase Now
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
