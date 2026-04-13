"use client";

import { useState } from "react";

const FaqSharedSection = () => {
  const [activeItem, setActiveItem] = useState(1);

  const toggleAccordion = (index) => {
    setActiveItem(activeItem === index ? -1 : index);
  };

  return (
    <div className="faq-area-1 space overflow-hidden">
      <div className="container">
        <div className="title-area text-center">
          <h2 className="sec-title">Your frequently asked question</h2>
        </div>
        <div className="row gy-50 gx-50 justify-content-center">
          <div className="col-xl-8">
            <div className="accordion-area accordion" id="faqAccordion">
              <div
                className={`accordion-card ${activeItem === 1 ? "active" : ""}`}
              >
                <div className="accordion-header" id="collapse-item-1">
                  <button
                    className={`accordion-button ${
                      activeItem === 1 ? "" : "collapsed"
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-1"
                    aria-expanded={activeItem === 1}
                    aria-controls="collapse-1"
                    onClick={() => toggleAccordion(1)}
                  >
                    Prepare a construction project schedule?
                  </button>
                </div>
                <div
                  id="collapse-1"
                  className={`accordion-collapse collapse ${
                    activeItem === 1 ? "show" : ""
                  }`}
                  aria-labelledby="collapse-item-1"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    <p className="faq-text">
                      The point of using lorem ipsum is that has more-or-less
                      packages normal commercial management in construction
                      ensures the planning, execution and coordination of a
                      construction project finish these specific projects.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`accordion-card ${activeItem === 2 ? "active" : ""}`}
              >
                <div className="accordion-header" id="collapse-item-2">
                  <button
                    className={`accordion-button ${
                      activeItem === 2 ? "" : "collapsed"
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-2"
                    aria-expanded={activeItem === 2}
                    aria-controls="collapse-2"
                    onClick={() => toggleAccordion(2)}
                  >
                    Product Design and Planning!
                  </button>
                </div>
                <div
                  id="collapse-2"
                  className={`accordion-collapse collapse ${
                    activeItem === 2 ? "show" : ""
                  }`}
                  aria-labelledby="collapse-item-2"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    <p className="faq-text">
                      The point of using lorem ipsum is that has more-or-less
                      packages normal commercial management in construction
                      ensures the planning, execution and coordination of a
                      construction project finish these specific projects.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`accordion-card ${activeItem === 3 ? "active" : ""}`}
              >
                <div className="accordion-header" id="collapse-item-3">
                  <button
                    className={`accordion-button ${
                      activeItem === 3 ? "" : "collapsed"
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-3"
                    aria-expanded={activeItem === 3}
                    aria-controls="collapse-3"
                    onClick={() => toggleAccordion(3)}
                  >
                    What is commercial in construction?
                  </button>
                </div>
                <div
                  id="collapse-3"
                  className={`accordion-collapse collapse ${
                    activeItem === 3 ? "show" : ""
                  }`}
                  aria-labelledby="collapse-item-3"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    <p className="faq-text">
                      The point of using lorem ipsum is that has more-or-less
                      packages normal commercial management in construction
                      ensures the planning, execution and coordination of a
                      construction project finish these specific projects.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`accordion-card ${activeItem === 4 ? "active" : ""}`}
              >
                <div className="accordion-header" id="collapse-item-4">
                  <button
                    className={`accordion-button ${
                      activeItem === 4 ? "" : "collapsed"
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-4"
                    aria-expanded={activeItem === 4}
                    aria-controls="collapse-4"
                    onClick={() => toggleAccordion(4)}
                  >
                    Start a construction management?
                  </button>
                </div>
                <div
                  id="collapse-4"
                  className={`accordion-collapse collapse ${
                    activeItem === 4 ? "show" : ""
                  }`}
                  aria-labelledby="collapse-item-4"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    <p className="faq-text">
                      The point of using lorem ipsum is that has more-or-less
                      packages normal commercial management in construction
                      ensures the planning, execution and coordination of a
                      construction project finish these specific projects.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`accordion-card ${activeItem === 5 ? "active" : ""}`}
              >
                <div className="accordion-header" id="collapse-item-5">
                  <button
                    className={`accordion-button ${
                      activeItem === 5 ? "" : "collapsed"
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-5"
                    aria-expanded={activeItem === 5}
                    aria-controls="collapse-5"
                    onClick={() => toggleAccordion(5)}
                  >
                    How are payments handled and dealt with?
                  </button>
                </div>
                <div
                  id="collapse-5"
                  className={`accordion-collapse collapse ${
                    activeItem === 5 ? "show" : ""
                  }`}
                  aria-labelledby="collapse-item-5"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    <p className="faq-text">
                      The point of using lorem ipsum is that has more-or-less
                      packages normal commercial management in construction
                      ensures the planning, execution and coordination of a
                      construction project finish these specific projects.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`accordion-card ${activeItem === 6 ? "active" : ""}`}
              >
                <div className="accordion-header" id="collapse-item-6">
                  <button
                    className={`accordion-button ${
                      activeItem === 6 ? "" : "collapsed"
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-6"
                    aria-expanded={activeItem === 6}
                    aria-controls="collapse-6"
                    onClick={() => toggleAccordion(6)}
                  >
                    Measure quality in construction projects?
                  </button>
                </div>
                <div
                  id="collapse-6"
                  className={`accordion-collapse collapse ${
                    activeItem === 6 ? "show" : ""
                  }`}
                  aria-labelledby="collapse-item-6"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    <p className="faq-text">
                      The point of using lorem ipsum is that has more-or-less
                      packages normal commercial management in construction
                      ensures the planning, execution and coordination of a
                      construction project finish these specific projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSharedSection;
