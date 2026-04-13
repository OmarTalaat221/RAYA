"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import AOS from "aos";
import "aos/dist/aos.css";

const BlogFour = () => {
  const t = useTranslations("blogPage");
  const locale = useLocale();
  const isRTL = locale === "ar";

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  const blogs = [
    {
      id: "blog1",
      image:
        "https://res.cloudinary.com/dkc5klynm/image/upload/v1769957558/jennifer-salavarrieta-FN1XoGL68-I-unsplash_nyu4jy.jpg",
      day: "17",
      month: t("months.jun"),
      year: "2024",
    },
    {
      id: "blog2",
      image:
        "https://res.cloudinary.com/dkc5klynm/image/upload/v1769957506/jeriden-villegas-VLPUm5wP5Z0-unsplash_hrmeus.jpg",
      day: "06",
      month: t("months.jul"),
      year: "2024",
    },
    {
      id: "blog3",
      image:
        "https://res.cloudinary.com/dkc5klynm/image/upload/v1769957531/samuel-cruz-cVB7mVf5_KA-unsplash_bckukl.jpg",
      day: "12",
      month: t("months.aug"),
      year: "2024",
    },
    {
      id: "blog4",
      image:
        "https://res.cloudinary.com/dkc5klynm/image/upload/v1769957916/javad-esmaeili-lIrl53eeWmE-unsplash_e1q6dm.jpg",
      day: "05",
      month: t("months.sep"),
      year: "2024",
    },
    {
      id: "blog5",
      image:
        "https://res.cloudinary.com/dkc5klynm/image/upload/v1770294374/pexels-cottonbro-7492877_zwuyua.jpg",
      day: "15",
      month: t("months.oct"),
      year: "2024",
    },
    {
      id: "blog6",
      image:
        "https://res.cloudinary.com/dkc5klynm/image/upload/v1770294439/pexels-mikael-blomkvist-8961334_qjzeic.jpg",
      day: "24",
      month: t("months.nov"),
      year: "2024",
    },
  ];

  // Styles for equal height cards
  const cardStyles = {
    card: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    title: {
      fontWeight: 600,
      fontSize: "25px",
      color: "var(--title-color)",
      marginBottom: "15px",
      marginTop: "12px",
      minHeight: "60px",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      lineHeight: 1.2,
    },
    text: {
      marginBottom: "22px",
      minHeight: "78px",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      lineHeight: 1.6,
      flexGrow: 1,
    },
    btn: {
      marginTop: "auto",
    },
    col: {
      display: "flex",
    },
  };

  return (
    <section
      className="blog-area space-top space-extra-bottom"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container">
        {/* Title Area */}
        <div
          className="title-area text-center mb-5"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <span
            className="sub-title"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
          >
            <div className="flex items-center justify-center">
              <img
                src="/main-assets/img/icon/section-subtitle-icon.svg"
                alt="icon"
                className="me-2"
              />
            </div>
            {t("subtitle")}
          </span>
          <h2
            className="sec-title"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="600"
          >
            {t("title")}
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="row gy-40 justify-content-center">
          {blogs.map((blog, index) => (
            <div
              className="col-md-6 col-lg-4"
              key={blog.id}
              style={cardStyles.col}
              data-aos="fade-up"
              data-aos-delay={100 + (index % 3) * 150}
              data-aos-duration="800"
            >
              <div
                className="blog-card"
                style={cardStyles.card}
                data-aos="zoom-in"
                data-aos-delay={150 + (index % 3) * 150}
                data-aos-duration="600"
              >
                {/* Blog Image */}
                <div
                  className="blog-img"
                  data-aos="fade-up"
                  data-aos-delay={200 + (index % 3) * 100}
                  data-aos-duration="600"
                >
                  <img src={blog.image} alt={t(`blogs.${blog.id}.title`)} />
                  <div
                    className="blog-date"
                    data-aos="fade-left"
                    data-aos-delay={300 + (index % 3) * 100}
                    data-aos-duration="500"
                  >
                    <Link href="/blog-details">
                      <span>{blog.day}</span>
                      {blog.month}
                    </Link>
                    <div className="year">{blog.year}</div>
                  </div>
                </div>

                {/* Blog Content */}
                <div
                  className="blog-content"
                  style={cardStyles.content}
                  data-aos="fade-up"
                  data-aos-delay={250 + (index % 3) * 100}
                  data-aos-duration="600"
                >
                  {/* Meta */}
                  <div
                    className="blog-meta"
                    data-aos="fade-up"
                    data-aos-delay={300 + (index % 3) * 100}
                    data-aos-duration="500"
                  >
                    <Link href="/blog">{t(`blogs.${blog.id}.author`)}</Link>
                    <Link href="/blog">{t(`blogs.${blog.id}.category`)}</Link>
                  </div>

                  {/* Title */}
                  <h3
                    className="blog-title"
                    style={cardStyles.title}
                    data-aos="fade-up"
                    data-aos-delay={350 + (index % 3) * 100}
                    data-aos-duration="500"
                  >
                    <Link href="/blog-details">
                      {t(`blogs.${blog.id}.title`)}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p
                    className="blog-text"
                    style={cardStyles.text}
                    data-aos="fade-up"
                    data-aos-delay={400 + (index % 3) * 100}
                    data-aos-duration="500"
                  >
                    {t(`blogs.${blog.id}.excerpt`)}
                  </p>

                  {/* Button */}
                  <Link
                    href="/blog-details"
                    className="btn"
                    style={cardStyles.btn}
                    data-aos="fade-up"
                    data-aos-delay={450 + (index % 3) * 100}
                    data-aos-duration="500"
                  >
                    {t("readMore")}
                    <i
                      className={`ri-arrow-${isRTL ? "left" : "right"}-up-line`}
                    ></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div
          className="pagination justify-content-center"
          data-aos="fade-up"
          data-aos-delay="500"
          data-aos-duration="800"
        >
          <ul>
            <li data-aos="zoom-in" data-aos-delay="550" data-aos-duration="400">
              <Link className="active" href="/blog">
                01
              </Link>
            </li>
            <li data-aos="zoom-in" data-aos-delay="600" data-aos-duration="400">
              <Link href="/blog">02</Link>
            </li>
            <li data-aos="zoom-in" data-aos-delay="650" data-aos-duration="400">
              <Link href="/blog">03</Link>
            </li>
            <li data-aos="zoom-in" data-aos-delay="700" data-aos-duration="400">
              <Link href="/blog">
                <i className={`ri-arrow-${isRTL ? "left" : "right"}-line`}></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BlogFour;
