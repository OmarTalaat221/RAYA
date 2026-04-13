// components/NewsSection/NewsSection.jsx

"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";

// News Data
const newsData = [
  {
    id: 1,
    title: "Praesent dictum quis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
  },
  {
    id: 2,
    title: "Vestibulum ante ipsum",
    description:
      "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui posuere blandit. Vivamus magna justo.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
  },
  {
    id: 3,
    title: "Curabitur non nulla",
    description:
      "Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus. Donec sollicitudin molestie malesuada. Curabitur arcu erat.",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
  },
  {
    id: 4,
    title: "Pellentesque in ipsum",
    description:
      "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit.",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800",
  },
  {
    id: 5,
    title: "Mauris blandit aliquet",
    description:
      "Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ante ipsum primis in faucibus orci luctus.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
  },
];

// News Card Component
const NewsCard = ({ title, description, image, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  const showOverlay = isHovered || isActive;

  return (
    <div
      className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] 
                 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full! object-cover
                   transition-transform duration-500 lg:group-hover:scale-105"
        // ضفنا lg: عشان الصورة متعملش زووم مع التاتش
      />

      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/20" />

      {/* ===== Default State: Bottom Title Bar ===== */}
      <div
        dir="ltr"
        className={`absolute bottom-0 left-0 right-0
                    bg-[rgba(0,32,119,0.67)]
                    px-4 sm:px-5 md:px-6 py-3 sm:py-4
                    transition-all duration-300
                    opacity-100 translate-y-0
                    ${showOverlay ? "lg:opacity-0 lg:translate-y-full" : ""}`}
        // في الموبايل هيفضل ثابت دايما، وفي الديسكتوب بس هيختفي مع الهوفر
      >
        <h3 className="text-white text-sm sm:text-base md:text-lg font-bold font-montserrat! truncate">
          {title}
        </h3>
      </div>

      {/* ===== Hover/Active State: Full Overlay (Slide Up from Bottom) ===== */}
      <div
        className={`absolute inset-0 bg-[#DCB56D]/90
                    flex flex-col justify-center items-start
                    px-4 sm:px-6 md:px-8 py-6 sm:py-8
                    transition-all duration-400 ease-out
                    opacity-0 translate-y-full pointer-events-none
                    ${
                      showOverlay
                        ? "lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto"
                        : ""
                    }`}
        // في الموبايل هيفضل مخفي دايما، وفي الديسكتوب بس هيظهر مع الهوفر
        dir="ltr"
      >
        {/* Title */}
        <h3
          className="text-[#023048] text-base sm:text-lg md:text-xl lg:text-2xl 
                       font-bold font-montserrat! mb-3 sm:mb-4 text-center"
        >
          {title}
        </h3>

        {/* Description */}
        <div
          className="text-gray-600 text-xs sm:text-sm md:text-base 
                      font-montserrat! leading-relaxed text-start
                      line-clamp-3 sm:line-clamp-4 mb-4 sm:mb-6"
        >
          {description}
        </div>

        {/* Read More Link */}
        <button
          className="text-[#023048] text-sm sm:text-base font-bold font-montserrat!
                       transition-colors duration-200
                          flex items-center gap-2"
        >
          Read more
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Navigation Arrow Component
const NavArrow = ({ direction = "right", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-[#d7e2f8]"
    >
      <svg
        className={`w-6 h-6 sm:w-10 sm:h-10 ${direction === "left" ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

// Main Component
const NewsSection = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section className="w-full bg-white py-10 md:py-14 lg:py-18">
      <div className="container-custom mx-auto">
        {/* ===== Header ===== */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2
            className=" relative w-fit mx-auto text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                         font-bold text-[#023048] mb-3 sm:mb-4"
          >
            الاخبار
            <div className="absolute -bottom-[20px] w-[100%] md:w-full h-[1px] bg-[#023048] mx-auto" />
          </h2>
        </div>

        {/* ===== Slider Container ===== */}
        <div className="relative">
          <div
            className="hidden md:flex absolute -left-4 lg:-left-8 xl:-left-12 
                          top-1/2 -translate-y-1/2 z-10"
          >
            <NavArrow direction="left" onClick={handlePrev} />
          </div>

          <div
            className="hidden md:flex absolute -right-4 lg:-right-8 xl:-right-12 
                          top-1/2 -translate-y-1/2 z-10"
          >
            <NavArrow direction="right" onClick={handleNext} />
          </div>

          <div className="px-0 md:px-8 lg:px-12">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                480: {
                  slidesPerView: 1.3,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 2.5,
                  spaceBetween: 28,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 32,
                },
              }}
            >
              {newsData.map((news, index) => (
                <SwiperSlide key={news.id}>
                  {({ isActive }) => (
                    <NewsCard
                      title={news.title}
                      description={news.description}
                      image={news.image}
                      // isActive={isActive}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex md:hidden justify-center gap-4 mt-6 sm:mt-8">
            <NavArrow direction="right" onClick={handlePrev} />
            <NavArrow direction="left" onClick={handleNext} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
