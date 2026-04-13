'use client';
import CountUp from "react-countup";

const Counter = () => {
    return (
        <div className="counter-area pd-top-115 pd-bottom-90">
            <div className="container">
                <div className="counter-area-inner wow fadeInUp animated" data-wow-duration="1.5s" data-wow-delay="0.2s">
                    <div className="row">
                        <div className="col-md-4 col-sm-6">
                            <div className="single-counter-inner text-center">
                                <div className="details">
                                    <h2><span className="counter"><CountUp start={0} end={20} /></span>+</h2>
                                    <p>Total Pages</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="single-counter-inner text-center">
                                <div className="details">
                                    <h2><span className="counter">0<CountUp start={0} end={5} /></span></h2>
                                    <p>Total Homes</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="single-counter-inner text-center">
                                <div className="details">
                                    <h2><span className="counter"><CountUp start={0} end={15} /></span>+</h2>
                                    <p>Inner Pages</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Counter;