/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer
        className="footer-area pd-top-100"
        style={{ backgroundImage: "url('landing-assets/img/footer-bg.png')" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="footer-widget widget text-center pd-bottom-100">
                <Link className="logo" href="/pages/homepage/home-1">
                  <img src="landing-assets/img/logo-white.svg" alt="#" />
                </Link>
                <h5 className="text-white mb-5 mt-5 lh-base">
                  It is a modern & beautiful construction & building company
                  HTML Template. It's Specially Construction & real estate
                  company website.
                </h5>
                <Link
                  className="btn style2"
                  href="https://themeforest.net/user/favdevs"
                >
                  Purchase Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center align-self-center">
                <p>
                  ©Copyright{" "}
                  <Link href="https://themeforest.net/user/favdevs">
                    favdevs
                  </Link>{" "}
                  | All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Link id="back-to-top" className="show" href="#"></Link>
    </div>
  );
};

export default Footer;
