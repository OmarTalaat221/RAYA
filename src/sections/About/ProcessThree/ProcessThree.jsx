"use client";

import React, { useState } from "react";
import PopupVideo from "../../Common/PopupVideo/PopupVideo";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const ProcessThree = () => {
  const t = useTranslations("about.processSection");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [popup, setPopup] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const openPopup = () => {
    setPopup(true);
    const iframe = document.getElementById("youtube-video");
    if (iframe) {
      iframe.src =
        "https://www.youtube.com/embed/cnVuVtbbZgs?si=UQVMsmBriHPfD6Vf";
    }
    setIsActive(true);
    document.body.style.overflow = "hidden";
  };

  const processSteps = [
    { number: "01", key: "step1" },
    { number: "02", key: "step2" },
    { number: "03", key: "step3" },
    { number: "04", key: "step4" },
  ];

  return (
    <>
      <section
        className="process-area-1 space-top bg-attachment process-bg-half"
        data-overlay="title"
        data-opacity="8"
        style={{
          backgroundImage: "url('/main-assets/img/bg/process-bg1-1.png')",
        }}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="process_shape_1-1 movingX shape-mockup d-lg-block d-none"></div>
        <div className="process_shape_1-2 moving shape-mockup d-lg-block d-none"></div>
        <div
          className="process_shape_1-3 shape-mockup jump-reverse d-xl-block d-none"
          style={{
            bottom: "-50%",
            [isRTL ? "left" : "right"]: "0px",
          }}
        >
          <img src="/main-assets/img/shape/sec-bg-shape1.png" alt="shape" />
        </div>

        <div className="container">
          {/* Header */}
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-4 col-md-6">
              <div
                className={`title-area ${isRTL ? "text-start" : "text-left content-text-extra-style"}`}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <span className="sub-title text-white">
                  <img
                    src="/main-assets/img/icon/section-subtitle-icon.svg"
                    alt="icon"
                  />
                  {t("subtitle")}
                </span>
                <h2 className="sec-title text-white">{t("title")}</h2>
              </div>
            </div>
            <div className="col-md-auto">
              <div
                className="sec-btn text-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <a onClick={openPopup} className="play-btn-wrap cursor-pointer">
                  {t("playVideo")}
                  <span className="play-btn style2">
                    <i className="ri-play-fill"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Process Cards - Tailwind Equal Height */}
          <div className="process-card-wrap">
            <div className="row gy-30 gx-30 flex flex-wrap">
              {processSteps.map((step, index) => (
                <div
                  className="col-xl-3 col-md-6 flex"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={100 + index * 100}
                >
                  {/* 👇 Tailwind: h-full + flex flex-col */}
                  <div className="process-card h-full w-full flex flex-col">
                    {/* Number - Original Style + Tailwind RTL */}
                    <div className={`process-card-number shrink-0 `}>
                      <span>{step.number}</span>
                      {t("stepLabel")}
                    </div>

                    {/* Title - Original Style + Min Height */}
                    <h4 className="process-card-title shrink-0 min-h-[60px] lg:min-h-[70px] xl:min-h-[60px]">
                      {t(`steps.${step.key}.title`)}
                    </h4>

                    {/* Description - Flex Grow + Line Clamp */}
                    <p className="process-card-text flex-1 line-clamp-3">
                      {t(`steps.${step.key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PopupVideo
        popup={popup}
        setPopup={setPopup}
        isActive={isActive}
        setIsActive={setIsActive}
      />
    </>
  );
};

export default ProcessThree;
