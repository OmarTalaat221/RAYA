"use client";

import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const AboutThree = () => {
  const t = useTranslations("about");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const { ref: counterRef, inView: counterInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="about-area-2 space-top overflow-hidden">
      <div className="container">
        <div className="row gx-60 align-items-center flex-row-reverse">
          {/* Image Column */}
          <div className="col-xl-6">
            <div
              className="about-thumb2 mb-60 mb-xl-0"
              data-aos={isRTL ? "fade-left" : "fade-right"}
              data-aos-duration="1000"
              data-aos-delay="100"
            >
              <div className="about-img-1">
                <img
                  src="/main-assets/img/normal/about_2-1.png"
                  alt={t("imageAlt")}
                />
              </div>
              <div
                className="about-counter-wrap style2 jump-reverse"
                ref={counterRef}
                data-aos="zoom-in"
                data-aos-duration="1000"
                data-aos-delay="400"
              >
                <div className="about-counter-wrap-bg">
                  <img
                    src="/main-assets/img/normal/about_shape_2-2.png"
                    alt="shape"
                  />
                </div>
                <div className="about-counter-icon">
                  <img
                    src="/main-assets/img/hero/hero_experience_wrap_icon_1_1.png"
                    alt="icon"
                  />
                </div>
                <h3
                  className="about-counter-number"
                  style={{ direction: "ltr" }}
                >
                  <span className="counter-number">
                    {counterInView && (
                      <CountUp start={0} end={7} duration={2.5} />
                    )}
                  </span>
                  +
                </h3>
                <p className="about-counter-text">{t("counter.label")}</p>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="col-xl-6">
            <div
              className="title-area mb-25"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="100"
            >
              <span className="sub-title">
                <img
                  src="/main-assets/img/icon/section-subtitle-icon.svg"
                  alt="icon"
                />
                {t("subtitle")}
              </span>
              <h2 className="sec-title">{t("title")}</h2>
              <p className="sec-text">{t("description")}</p>
            </div>

            {/* Checklist */}
            <div
              className="checklist mb-35"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <ul>
                <li
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="250"
                >
                  <img
                    src="/main-assets/img/icon/about-checklsit-icon1-1.svg"
                    alt="icon"
                  />
                  {t("features.feature1")}
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="300"
                >
                  <img
                    src="/main-assets/img/icon/about-checklsit-icon1-1.svg"
                    alt="icon"
                  />
                  {t("features.feature2")}
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="350"
                >
                  <img
                    src="/main-assets/img/icon/about-checklsit-icon1-1.svg"
                    alt="icon"
                  />
                  {t("features.feature3")}
                </li>
              </ul>
            </div>

            {/* Mission */}
            <div
              className="about-grid-wrap"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <div className="icon">
                <img
                  src="/main-assets/img/icon/about-grid-icon1-1.svg"
                  alt="icon"
                />
              </div>
              <div className="about-grid-details">
                <h4 className="title">{t("mission.title")}</h4>
                <p className="text">{t("mission.description")}</p>
              </div>
            </div>

            {/* Vision */}
            <div
              className="about-grid-wrap"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <div className="icon">
                <img
                  src="/main-assets/img/icon/about-grid-icon1-2.svg"
                  alt="icon"
                />
              </div>
              <div className="about-grid-details">
                <h4 className="title">{t("vision.title")}</h4>
                <p className="text">{t("vision.description")}</p>
              </div>
            </div>

            {/* Button */}
            <div
              className="btn-group mt-60"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="600"
            >
              <Link href="/contact" className="btn">
                {t("button")}{" "}
                <i
                  className={
                    isRTL ? "ri-arrow-left-up-line" : "ri-arrow-right-up-line"
                  }
                ></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutThree;
