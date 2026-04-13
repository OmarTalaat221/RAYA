// components/ReviewsSection/ReviewsSection.jsx

"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";

// Google Logo SVG Component
const GoogleLogo = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 272 92"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
      fill="#EA4335"
    />
    <path
      d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
      fill="#FBBC05"
    />
    <path
      d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
      fill="#4285F4"
    />
    <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
    <path
      d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
      fill="#EA4335"
    />
    <path
      d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
      fill="#4285F4"
    />
  </svg>
);

// Star Rating Component
const StarRating = ({ rating = 5, size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`${sizeClasses[size]} ${
            index < rating ? "text-[#FBBC05]" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Review Card Component
const ReviewCard = ({ name, date, rating, review, avatarColor, initial }) => {
  return (
    <div
      dir="ltr"
      className="bg-[#f5f5f5] rounded-xl p-5 md:p-6 
                  flex flex-col gap-4 h-full"
    >
      {/* Header: Avatar + Name + Date */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full 
                      flex items-center justify-center
                      text-white font-bold text-lg md:text-xl
                      flex-shrink-0"
          style={{ backgroundColor: avatarColor }}
        >
          {initial}
        </div>

        {/* Name & Date */}
        <div className="flex flex-col">
          <span className="font-bold text-black text-sm md:text-base font-montserrat!">
            {name}
          </span>
          <span className="text-gray-400 text-xs md:text-sm font-montserrat!">
            {date}
          </span>
        </div>
      </div>

      {/* Stars */}
      <StarRating rating={rating} size="sm" />

      {/* Review Text */}
      <p
        style={{ direction: "ltr" }}
        className="text-gray-600 text-sm leading-relaxed line-clamp-4 flex-1 font-montserrat!"
      >
        {review}
      </p>

      {/* Read More */}
      <button
        dir="ltr"
        className="text-black font-bold text-sm hover:underline! self-start 
                   mt-auto font-montserrat!"
      >
        Read more
      </button>
    </div>
  );
};

// Reviews Data
const reviewsData = [
  {
    id: 1,
    name: "Kenan Al Hawasly",
    date: "2025-05-11",
    rating: 5,
    review:
      "I loved the experience with Set Al Sham! The team was incredibly professional and helped us plan our wedding perfectly. Every detail was taken care of, and the event was absolutely stunning. Highly recommend their services to anyone looking for a memorable celebration.",
    avatarColor: "#4CAF50",
    initial: "K",
  },
  {
    id: 2,
    name: "Ahmad Al Masri",
    date: "2025-04-22",
    rating: 5,
    review:
      "Amazing service from start to finish! Set Al Sham made our engagement party unforgettable. The attention to detail and professionalism exceeded all our expectations. Thank you for making our special day perfect!",
    avatarColor: "#2196F3",
    initial: "A",
  },
  {
    id: 3,
    name: "Sara Hassan",
    date: "2025-03-15",
    rating: 5,
    review:
      "We couldn't have asked for a better experience. The team at Set Al Sham understood exactly what we wanted and delivered beyond our dreams. Our wedding was magical thanks to their incredible work!",
    avatarColor: "#E91E63",
    initial: "S",
  },
  {
    id: 4,
    name: "Mohammed Ali",
    date: "2025-02-28",
    rating: 5,
    review:
      "Professional, reliable, and creative! Set Al Sham transformed our venue into something straight out of a fairy tale. Highly recommend them for any event planning needs.",
    avatarColor: "#9C27B0",
    initial: "M",
  },
  {
    id: 5,
    name: "Fatima Khalil",
    date: "2025-01-10",
    rating: 5,
    review:
      "From the first meeting to the last dance, everything was perfect. The team's dedication and passion really showed in every aspect of our celebration. Five stars aren't enough!",
    avatarColor: "#FF5722",
    initial: "F",
  },
];

// Main Component
const ReviewsSection = ({
  title = "اراء العملاء",
  description = "Customer satisfaction is at the core of everything we do. Hear from homeowners across the UAE who've transformed their living spaces with our smart solutions.",
  showGoogleRating = true,
  showUnderline = true,
}) => {
  const swiperRef = useRef(null);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section className="w-full bg-white py-10 md:py-14 lg:py-18" dir="rtl">
      <div className="container-custom mx-auto">
        {/* ===== Header ===== */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 max-w-4xl mx-auto">
          {/* Title */}
          <h2 className="relative text-3xl md:text-5xl lg:text-6xl font-bold text-[#023048] text-center mb-10 w-fit mx-auto">
            {title}
            {/* Underline */}
            {showUnderline && (
              <div className="absolute -bottom-[20px] w-[100%] md:w-full h-[1px] bg-[#023048] mx-auto" />
            )}
          </h2>

          {/* Description */}
          {description && (
            <p className="text-[#707070] text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* ===== Main Content Row ===== */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* ===== 1. Swiper Cards (Order 1 - Right in RTL) ===== */}
          <div className="flex-1 w-full overflow-hidden order-2">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 28,
                },
              }}
              className="!overflow-visible"
            >
              {reviewsData.map((review) => (
                <SwiperSlide key={review.id} className="!h-auto">
                  <ReviewCard
                    name={review.name}
                    date={review.date}
                    rating={review.rating}
                    review={review.review}
                    avatarColor={review.avatarColor}
                    initial={review.initial}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ===== 2. Arrow (Order 2 - After Swiper) ===== */}
          <button
            onClick={handleNext}
            className="flex-shrink-0 lg:block hidden transition-all duration-300 
                       hover:scale-125 active:scale-95 order-1"
          >
            <svg
              className="w-6 h-6 text-[#DCB56D]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* ===== 3. Google Rating Summary (Order 3 - Left in RTL) ===== */}
          {showGoogleRating && (
            <div className="flex-shrink-0 text-center lg:text-left order-3">
              {/* EXCELLENT */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-black mb-3 tracking-wide font-montserrat!">
                EXCELLENT
              </h3>

              {/* Stars */}
              <div className="flex justify-center lg:justify-end mb-3">
                <StarRating rating={5} size="lg" />
              </div>

              {/* Based on reviews */}
              <p className="text-black text-xs md:text-sm mb-4 tracking-wide uppercase font-montserrat!">
                Based on <span className="font-bold">587 Reviews</span>
              </p>

              {/* Google Logo */}
              <div className="flex justify-center lg:justify-end">
                <GoogleLogo className="w-24 md:w-28 lg:w-full h-auto" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
