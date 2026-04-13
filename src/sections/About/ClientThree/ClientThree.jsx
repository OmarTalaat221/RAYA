"use client";
import Link from "next/link";
import Slider from "react-slick";
import { useTranslations, useLocale } from "next-intl";

const ClientThree = () => {
  const t = useTranslations("about.clients");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 5000,
    arrows: false,
    centerMode: true,
    dots: false,
    rtl: isRTL,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div
      className="client-area-1 text-center space overflow-hidden shape-mockup-wrap background-image"
      style={{ backgroundImage: "url('/main-assets/img/bg/client-bg1-1.png')" }}
      data-overlay="title"
      data-opacity="9"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className="client_shape_1-1 shape-mockup jump-reverse"
        style={{ bottom: "0%", [isRTL ? "left" : "right"]: "-6%" }}
      >
        <img src="/main-assets/img/shape/client-bg-shape1.png" alt="img" />
      </div>
      <div className="container">
        <div className="title-area text-center" data-aos="fade-up">
          <span className="sub-title text-white">
            <img
              src="/main-assets/img/icon/section-subtitle-icon.svg"
              alt="img"
            />
            {t("subtitle")}
          </span>
          <h2 className="sec-title text-white">{t("title")}</h2>
        </div>
        <Slider
          {...settings}
          className="row global-carousel client-slider1"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="col-lg-auto">
            <div className="client-logo">
              <Link href="/pages/homepage/home-1">
                <img
                  src="/main-assets/img/client/client-1-1.svg"
                  alt={t("logoAlt")}
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-auto">
            <div className="client-logo">
              <Link href="/pages/homepage/home-1">
                <img
                  src="/main-assets/img/client/client-1-2.svg"
                  alt={t("logoAlt")}
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-auto">
            <div className="client-logo">
              <Link href="/pages/homepage/home-1">
                <img
                  src="/main-assets/img/client/client-1-3.svg"
                  alt={t("logoAlt")}
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-auto">
            <div className="client-logo">
              <Link href="/pages/homepage/home-1">
                <img
                  src="/main-assets/img/client/client-1-4.svg"
                  alt={t("logoAlt")}
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-auto">
            <div className="client-logo">
              <Link href="/pages/homepage/home-1">
                <img
                  src="/main-assets/img/client/client-1-5.svg"
                  alt={t("logoAlt")}
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-auto">
            <div className="client-logo">
              <Link href="/pages/homepage/home-1">
                <img
                  src="/main-assets/img/client/client-1-1.svg"
                  alt={t("logoAlt")}
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-auto">
            <div className="client-logo">
              <Link href="/pages/homepage/home-1">
                <img
                  src="/main-assets/img/client/client-1-2.svg"
                  alt={t("logoAlt")}
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-auto">
            <div className="client-logo">
              <Link href="/pages/homepage/home-1">
                <img
                  src="/main-assets/img/client/client-1-3.svg"
                  alt={t("logoAlt")}
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-auto">
            <div className="client-logo">
              <Link href="/pages/homepage/home-1">
                <img
                  src="/main-assets/img/client/client-1-4.svg"
                  alt={t("logoAlt")}
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-auto">
            <div className="client-logo">
              <Link href="/pages/homepage/home-1">
                <img
                  src="/main-assets/img/client/client-1-5.svg"
                  alt={t("logoAlt")}
                />
              </Link>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default ClientThree;
