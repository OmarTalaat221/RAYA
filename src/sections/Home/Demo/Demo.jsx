import Link from "next/link";

const Demo = () => {
    return (
        <section id="demo" className="demo-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-9 text-center">
                        <div className="section-title wow animated fadeInUp" data-wow-duration="1.5s" data-wow-delay="0.2s">
                            <h2 className="title">Unique & perfect homepages</h2>
                            <p className="mt-4">We offer a diverse range of pre-built demos and over 100+ UI blocks. Create your ideal website with the flexibility to mix and match elements and layouts from various demos to suit your needs</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="inner-item style-large wow animated fadeInUp" data-wow-duration="1.5s"
                            data-wow-delay="0.2s">
                            <Link href="/pages/homepage/home-1">
                                <span className="thumb">
                                    <img src="landing-assets/img/1.png" alt="img" />
                                </span>
                                Home V.1
                                <div className="item-title">Home Construction</div>
                            </Link>
                            <div className="btn-group">
                                <Link className="btn" href="/pages/homepage/home-1">Multipage Demo</Link>
                                <Link className="btn" href="/pages/homepage/home-1-op">Onepage Demo</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="inner-item style-large wow animated fadeInUp" data-wow-duration="1.5s"
                            data-wow-delay="0.3s">
                            <Link href="/pages/homepage/home-2">
                                <span className="thumb">
                                    <img src="landing-assets/img/2.png" alt="img" />
                                </span>
                                Home V.2
                                <div className="item-title">Home Renovation</div>
                            </Link>
                            <div className="btn-group">
                                <Link className="btn btn-base" href="/pages/homepage/home-2">Multipage Demo</Link>
                                <Link className="btn btn-base" href="/pages/homepage/home-2-op">Onepage Demo</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="inner-item style-large wow animated fadeInUp" data-wow-duration="1.5s"
                            data-wow-delay="0.4s">
                            <Link href="/pages/homepage/home-3">
                                <span className="thumb">
                                    <img src="landing-assets/img/3.png" alt="img" />
                                </span>
                                Home V.3
                                <div className="item-title">Home Building Company</div>
                            </Link>
                            <div className="btn-group">
                                <Link className="btn btn-base" href="/pages/homepage/home-3">Multipage Demo</Link>
                                <Link className="btn btn-base" href="/pages/homepage/home-3-op">Onepage Demo</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="inner-item style-large wow animated fadeInUp" data-wow-duration="1.5s"
                            data-wow-delay="0.4s">
                            <Link href="/pages/homepage/home-4">
                                <span className="thumb">
                                    <img src="landing-assets/img/4.png" alt="img" />
                                </span>
                                Home V.4
                                <div className="item-title">Home Architecture</div>
                            </Link>
                            <div className="btn-group">
                                <Link className="btn btn-base" href="/pages/homepage/home-4">Multipage Demo</Link>
                                <Link className="btn btn-base" href="/pages/homepage/home-4-op">Onepage Demo</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="inner-item style-large wow animated fadeInUp" data-wow-duration="1.5s"
                            data-wow-delay="0.4s">
                            <Link href="/pages/homepage/home-5">
                                <span className="thumb">
                                    <img src="landing-assets/img/5.png" alt="img" />
                                </span>
                                Home V.5
                                <div className="item-title">Home Roof Service</div>
                            </Link>
                            <div className="btn-group">
                                <Link className="btn btn-base" href="/pages/homepage/home-5">Multipage Demo</Link>
                                <Link className="btn btn-base" href="/pages/homepage/home-5-op">Onepage Demo</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Demo;