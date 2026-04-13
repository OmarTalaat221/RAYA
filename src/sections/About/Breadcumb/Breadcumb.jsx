"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const Breadcumb = ({ pageKey = "aboutUs" }) => {
  const t = useTranslations("about.breadcrumb");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div
      className="breadcumb-wrapper"
      style={{
        backgroundImage: "url('/main-assets/img/bg/breadcrumb-bg.png')",
      }}
    >
      <div
        className="section-animation-shape1-1 shape-mockup animation-infinite"
        data-top="0"
        style={{
          backgroundImage:
            "url('/main-assets/img/shape/global-line-shape1.png')",
        }}
      ></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcumb-content">
              <h1 className="breadcumb-title">{t(`pages.${pageKey}.title`)}</h1>
              <ul className="breadcumb-menu">
                <li>
                  <Link href="/">
                    <i className="ri-home-4-fill"></i> {t("home")}
                  </Link>
                </li>
                <li className="active">{t(`pages.${pageKey}.name`)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcumb;
