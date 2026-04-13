
const DemoTwo = () => {
    return (
        <section id="header" className="responsive-section pd-top-120 pd-bottom-120" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 text-center">
                        <div className="section-title wow fadeInUp" data-wow-duration="1.5s" data-wow-delay="0.2s">
                            <h2 className="title">Fully responsive for all devices</h2>
                            <p className="mt-4">100% responsive for all devices. Our designs are optimized for modern desktops, laptops, iPads, Android devices, and iPhones, offering an exceptional user experience with stunning interfaces</p>
                        </div>
                    </div>
                </div>
                <div style={{ visibility: 'visible', animationDuration: 1.5, animationDelay: '0.2s', animationName: 'fadeInUp' }} className="translo-responsive-layout wow fadeInUp" data-wow-duration="1.5s" data-wow-delay="0.2s">
                    <img className="demo-two-possition-img" src="landing-assets/img/responsive.png" alt="img" />
                </div>
            </div>
        </section >
    );
};

export default DemoTwo;