import Link from "next/link";

const Banner = () => {
  return (
    <section
      id="banner"
      className="banner-area"
      style={{ backgroundImage: "url('/landing-assets/img/banner-bg.png')" }}
    >
      <div className="sidebar-links">
        <Link className="btn" href="https://themeforest.net/user/favdevs">
          <i className="fa fa-cart-arrow-down"></i>Add To Cart
        </Link>
        <Link className="btn" href="https://themeforest.net/user/favdevs">
          <i className="fa fa-cog"></i>Demo Link
        </Link>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 align-self-center">
            <div className="banner-inner text-center">
              <h1 className="mt-4">Construz - Construction Next JS Template</h1>
              <div
                className="btn-area mt-4 wow fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay="0.2s"
              >
                <Link className="btn page-scroll" href="#demo">
                  Try Demos
                </Link>
                <Link
                  className="btn style3 me-0"
                  href="https://themeforest.net/user/favdevs"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="hero-thumb-wrap">
          <div className="hero-thumb1">
            <img src="/landing-assets/img/01.png" alt="img" />
          </div>
          <div className="hero-thumb2 jump">
            <img src="/landing-assets/img/06.png" alt="img" />
          </div>
          <div className="hero-thumb3 jump">
            <img src="/landing-assets/img/03.png" alt="img" />
          </div>
          <div className="hero-thumb4 jump-reverse">
            <img src="/landing-assets/img/04.png" alt="img" />
          </div>
          <div className="hero-thumb5 jump-reverse">
            <img src="/landing-assets/img/05.png" alt="img" />
          </div>
          <div className="hero-thumb6 jump-reverse">
            <img src="/landing-assets/img/02.png" alt="img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
