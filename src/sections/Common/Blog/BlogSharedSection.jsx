"use client";
import Link from "next/link";
import Slider from "react-slick";

const BlogSharedSection = () => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 5000,
    dots: false,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="blog-area-1 space shape-mockup-wrap">
      <div
        className="section-animation-shape1-1 shape-mockup animation-infinite background-image"
        style={{
          backgroundImage:
            "url('/main-assets/img/shape/global-line-shape1.png')",
          top: "0px",
        }}
      ></div>
      <div className="container">
        <div className="row justify-content-lg-between justify-content-center align-items-center">
          <div className="col-lg-6">
            <div className="title-area text-lg-start text-center text-left">
              <span className="sub-title">
                <img
                  src="/main-assets/img/icon/section-subtitle-icon.svg"
                  alt="img"
                />
                Latest News
              </span>
              <h2 className="sec-title">Recent news and events</h2>
            </div>
          </div>
          <div className="col-md-auto">
            <div className="sec-btn">
              <Link href="/blog" className="btn style-border">
                View All News <i className="ri-arrow-right-up-line"></i>
              </Link>
            </div>
          </div>
        </div>
        <Slider
          {...settings}
          className="row global-carousel blog-slider slider-shadow slick-initialized slick-slider"
        >
          <div className="col-md-6 col-lg-4">
            <div className="blog-card slider-padding">
              <div className="blog-img">
                <img
                  src="/main-assets/img/blog/blog_1_1.png"
                  alt="blog image"
                />
                <div className="blog-date">
                  <Link href="/blog">
                    <span>17</span>JUN
                  </Link>
                  <div className="year">2024</div>
                </div>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <Link href="/blog">By Rebecca</Link>
                  <Link href="/blog">Construction</Link>
                </div>
                <h3 className="blog-title">
                  <Link href="/blog-details">
                    How to hire a contractor home renovation service
                  </Link>
                </h3>
                <p className="blog-text">
                  Tortor posuere ac ut consequat. Tellusi elem isis etum sag
                  ittis vitae et leo duis ut diam. Odio ut sem nulla phar.
                </p>
                <Link href="/blog-details" className="btn">
                  More Details <i className="ri-arrow-right-up-line"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="blog-card slider-padding">
              <div className="blog-img">
                <img
                  src="/main-assets/img/blog/blog_1_2.png"
                  alt="blog image"
                />
                <div className="blog-date">
                  <Link href="/blog">
                    <span>17</span>JUN
                  </Link>
                  <div className="year">2024</div>
                </div>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <Link href="/blog">By Rebecca</Link>
                  <Link href="/blog">Construction</Link>
                </div>
                <h3 className="blog-title">
                  <Link href="/blog-details">
                    Started to develop a specific testing programs
                  </Link>
                </h3>
                <p className="blog-text">
                  Tortor posuere ac ut consequat. Tellusi elem isis etum sag
                  ittis vitae et leo duis ut diam. Odio ut sem nulla phar.
                </p>
                <Link href="/blog-details" className="btn">
                  More Details <i className="ri-arrow-right-up-line"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="blog-card slider-padding">
              <div className="blog-img">
                <img
                  src="/main-assets/img/blog/blog_1_3.png"
                  alt="blog image"
                />
                <div className="blog-date">
                  <Link href="/blog">
                    <span>17</span>JUN
                  </Link>
                  <div className="year">2024</div>
                </div>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <Link href="/blog">By Rebecca</Link>
                  <Link href="/blog">Construction</Link>
                </div>
                <h3 className="blog-title">
                  <Link href="/blog-details">
                    How to stay motivated until a project is finished
                  </Link>
                </h3>
                <p className="blog-text">
                  Tortor posuere ac ut consequat. Tellusi elem isis etum sag
                  ittis vitae et leo duis ut diam. Odio ut sem nulla phar.
                </p>
                <Link href="/blog-details" className="btn">
                  More Details <i className="ri-arrow-right-up-line"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="blog-card slider-padding">
              <div className="blog-img">
                <img
                  src="/main-assets/img/blog/blog_1_1.png"
                  alt="blog image"
                />
                <div className="blog-date">
                  <Link href="/blog">
                    <span>17</span>JUN
                  </Link>
                  <div className="year">2024</div>
                </div>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <Link href="/blog">By Rebecca</Link>
                  <Link href="/blog">Construction</Link>
                </div>
                <h3 className="blog-title">
                  <Link href="/blog-details">
                    How to hire a contractor home renovation service
                  </Link>
                </h3>
                <p className="blog-text">
                  Tortor posuere ac ut consequat. Tellusi elem isis etum sag
                  ittis vitae et leo duis ut diam. Odio ut sem nulla phar.
                </p>
                <Link href="/blog-details" className="btn">
                  More Details <i className="ri-arrow-right-up-line"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="blog-card slider-padding">
              <div className="blog-img">
                <img
                  src="/main-assets/img/blog/blog_1_2.png"
                  alt="blog image"
                />
                <div className="blog-date">
                  <Link href="/blog">
                    <span>17</span>JUN
                  </Link>
                  <div className="year">2024</div>
                </div>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <Link href="/blog">By Rebecca</Link>
                  <Link href="/blog">Construction</Link>
                </div>
                <h3 className="blog-title">
                  <Link href="/blog-details">
                    Started to develop a specific testing programs
                  </Link>
                </h3>
                <p className="blog-text">
                  Tortor posuere ac ut consequat. Tellusi elem isis etum sag
                  ittis vitae et leo duis ut diam. Odio ut sem nulla phar.
                </p>
                <Link href="/blog-details" className="btn">
                  More Details <i className="ri-arrow-right-up-line"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="blog-card slider-padding">
              <div className="blog-img">
                <img
                  src="/main-assets/img/blog/blog_1_3.png"
                  alt="blog image"
                />
                <div className="blog-date">
                  <Link href="/blog">
                    <span>17</span>JUN
                  </Link>
                  <div className="year">2024</div>
                </div>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <Link href="/blog">By Rebecca</Link>
                  <Link href="/blog">Construction</Link>
                </div>
                <h3 className="blog-title">
                  <Link href="/blog-details">
                    How to stay motivated until a project is finished
                  </Link>
                </h3>
                <p className="blog-text">
                  Tortor posuere ac ut consequat. Tellusi elem isis etum sag
                  ittis vitae et leo duis ut diam. Odio ut sem nulla phar.
                </p>
                <Link href="/blog-details" className="btn">
                  More Details <i className="ri-arrow-right-up-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default BlogSharedSection;
