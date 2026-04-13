"use client";

import React from "react";

export default function FreshOrganicSection() {
  return (
    <section
      dir="rtl"
      className="w-full from-[#023048] to-[#24323C] bg-gradient-to-r 
                 py-12 sm:py-14 md:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-8 lg:gap-12">
          {/* Left Column: Text Content */}
          <div className="w-full md:w-[55%] flex flex-col text-center md:text-right">
            <h2
              className="text-[24px] sm:text-[28px] lg:text-[30px] xl:text-[34px] 
                           font-normal text-white mb-4 md:mb-5 tracking-wide leading-tight font-montserrat!"
            >
              أفراح بلمسة <span className="text-[#D4AF5B]">شامية</span> أصيلة
            </h2>

            <p
              className="text-[11px] sm:text-[12px] md:text-[13px] 
                          text-gray-300 leading-[1.8] 
                          max-w-[90%] sm:max-w-md md:max-w-lg 
                          mx-auto md:mx-0 md:mr-0 lg:mr-15! 
                          font-montserrat!"
            >
              نجمع بين الأصالة الشامية والاحتراف الأوروبي لنصنع تجربة زفاف راقية
              تحفظ العادات وتواكب المعايير الحديثة. مكتبنا حاضر في كل خطوة من
              رحلتك.
            </p>
          </div>

          {/* Right Column: Logo */}
          <div className="w-full md:w-[45%] flex justify-center md:justify-end">
            <img
              src="https://res.cloudinary.com/dhgp9dzdt/image/upload/v1772620899/logo_udnowq.png"
              alt="شعار ست الشام"
              className="w-[65%] sm:w-[55%] md:w-[85%] 
                         max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[380px] 
                         object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
