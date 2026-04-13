"use client";

import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";

const PortfolioThree = () => {
  const settings = {
    dots: true,
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "20%",
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          centerPadding: "0%",
          dots: true,
        },
      },
    ],
  };

  useEffect(() => {
    const dots = document.querySelector(".slick-dots");
    if (dots) {
      dots.setAttribute("role", "tablist");
    }
  }, []);

  return (
    <div className="portfolio-area-1 space">
      <div className="container">
        <div className="title-area text-center">
          <span className="sub-title">
            <img
              src="/main-assets/img/icon/section-subtitle-icon.svg"
              alt="img"
            />
            Recent Work
          </span>
          <h2 className="sec-title">Check our latest projects</h2>
          <p className="sec-text">
            We are the best construction agency in the world
          </p>
        </div>
        <div className="portfolio-slider1 overflow-hidden">
          <Slider {...settings}>
            <div>
              <div className="portfolio-card" style={{ margin: "0px 1rem" }}>
                <div className="portfolio-card-thumb">
                  <img
                    src="/main-assets/img/project/project1_1.png"
                    alt="img"
                  />
                  <Link
                    className="icon-btn popup-image"
                    href="/main-assets/img/project/project1_1.png"
                  >
                    <i className="ri-eye-line"></i>
                  </Link>
                </div>
                <div className="portfolio-card-details">
                  <div className="media-left">
                    <span className="portfolio-card-subtitle">Building</span>
                    <h4 className="portfolio-card-title">
                      <Link href="/project-details">General Construction</Link>
                    </h4>
                    <p className="portofolio-card-text">
                      Building since 09,01,2024
                    </p>
                  </div>
                </div>
                <Link href="/project-details" className="btn">
                  Explore Service <i className="ri-arrow-right-up-line"></i>
                </Link>
              </div>
            </div>
            <div>
              <div className="portfolio-card" style={{ margin: "0px 1rem" }}>
                <div className="portfolio-card-thumb">
                  <img
                    src="/main-assets/img/project/project1_2.png"
                    alt="img"
                  />
                  <Link
                    className="icon-btn popup-image"
                    href="/main-assets/img/project/project1_2.png"
                  >
                    <i className="ri-eye-line"></i>
                  </Link>
                </div>
                <div className="portfolio-card-details">
                  <div className="media-left">
                    <span className="portfolio-card-subtitle">Building</span>
                    <h4 className="portfolio-card-title">
                      <Link href="/project-details">General Construction</Link>
                    </h4>
                    <p className="portofolio-card-text">
                      Building since 09,01,2024
                    </p>
                  </div>
                </div>
                <Link href="/project-details" className="btn">
                  Explore Service <i className="ri-arrow-right-up-line"></i>
                </Link>
              </div>
            </div>
            <div>
              <div className="portfolio-card" style={{ margin: "0px 1rem" }}>
                <div className="portfolio-card-thumb">
                  <img
                    src="/main-assets/img/project/project1_3.png"
                    alt="img"
                  />
                  <Link
                    className="icon-btn popup-image"
                    href="/main-assets/img/project/project1_3.png"
                  >
                    <i className="ri-eye-line"></i>
                  </Link>
                </div>
                <div className="portfolio-card-details">
                  <div className="media-left">
                    <span className="portfolio-card-subtitle">Building</span>
                    <h4 className="portfolio-card-title">
                      <Link href="/project-details">General Construction</Link>
                    </h4>
                    <p className="portofolio-card-text">
                      Building since 09,01,2024
                    </p>
                  </div>
                </div>
                <Link href="/project-details" className="btn">
                  Explore Service <i className="ri-arrow-right-up-line"></i>
                </Link>
              </div>
            </div>
            <div>
              <div className="portfolio-card" style={{ margin: "0px 1rem" }}>
                <div className="portfolio-card-thumb">
                  <img
                    src="/main-assets/img/project/project1_1.png"
                    alt="img"
                  />
                  <Link
                    className="icon-btn popup-image"
                    href="/main-assets/img/project/project1_1.png"
                  >
                    <i className="ri-eye-line"></i>
                  </Link>
                </div>
                <div className="portfolio-card-details">
                  <div className="media-left">
                    <span className="portfolio-card-subtitle">Building</span>
                    <h4 className="portfolio-card-title">
                      <Link href="/project-details">General Construction</Link>
                    </h4>
                    <p className="portofolio-card-text">
                      Building since 09,01,2024
                    </p>
                  </div>
                </div>
                <Link href="/project-details" className="btn">
                  Explore Service <i className="ri-arrow-right-up-line"></i>
                </Link>
              </div>
            </div>
            <div>
              <div className="portfolio-card" style={{ margin: "0px 1rem" }}>
                <div className="portfolio-card-thumb">
                  <img
                    src="/main-assets/img/project/project1_2.png"
                    alt="img"
                  />
                  <Link
                    className="icon-btn popup-image"
                    href="/main-assets/img/project/project1_2.png"
                  >
                    <i className="ri-eye-line"></i>
                  </Link>
                </div>
                <div className="portfolio-card-details">
                  <div className="media-left">
                    <span className="portfolio-card-subtitle">Building</span>
                    <h4 className="portfolio-card-title">
                      <Link href="/project-details">General Construction</Link>
                    </h4>
                    <p className="portofolio-card-text">
                      Building since 09,01,2024
                    </p>
                  </div>
                </div>
                <Link href="/project-details" className="btn">
                  Explore Service <i className="ri-arrow-right-up-line"></i>
                </Link>
              </div>
            </div>
            <div>
              <div className="portfolio-card" style={{ margin: "0px 1rem" }}>
                <div className="portfolio-card-thumb">
                  <img
                    src="/main-assets/img/project/project1_3.png"
                    alt="img"
                  />
                  <Link
                    className="icon-btn popup-image"
                    href="/main-assets/img/project/project1_3.png"
                  >
                    <i className="ri-eye-line"></i>
                  </Link>
                </div>
                <div className="portfolio-card-details">
                  <div className="media-left">
                    <span className="portfolio-card-subtitle">Building</span>
                    <h4 className="portfolio-card-title">
                      <Link href="/project-details">General Construction</Link>
                    </h4>
                    <p className="portofolio-card-text">
                      Building since 09,01,2024
                    </p>
                  </div>
                </div>
                <Link href="/project-details" className="btn">
                  Explore Service <i className="ri-arrow-right-up-line"></i>
                </Link>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PortfolioThree;
