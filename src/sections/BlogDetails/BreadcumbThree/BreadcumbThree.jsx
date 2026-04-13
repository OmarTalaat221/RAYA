import Link from "next/link";

const BreadcumbThree = () => {
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
      {/* bg animated image */}
      <div className="container">
        <div className="breadcumb-content">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h1 className="breadcumb-title">
                Construction process streamlines
              </h1>
            </div>
            <div className="col-12">
              <ul className="breadcumb-menu">
                <li>
                  <Link href="/pages/homepage/home-1">
                    <i className="ri-home-4-fill"></i> HOME
                  </Link>
                </li>
                <li>
                  <Link href="/blog">OUR BLOG</Link>
                </li>
                <li className="active">Construction Process Streamlines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadcumbThree;
