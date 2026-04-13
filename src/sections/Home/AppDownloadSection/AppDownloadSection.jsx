// components/AppDownloadSection/AppDownloadSection.jsx

"use client";

const AppDownloadSection = () => {
  return (
    // بادينج ضخم للسكشن الخارجي عشان يستوعب خروج الموبايل من فوق وتحت
    <section
      className="w-full bg-white pb-30 pt-32 md:pt-48 lg:pt-56 overflow-hidden"
      dir="rtl"
    >
      <div className="container-custom mx-auto">
        {/* ===== Main Beige Container ===== */}
        {/* البوكس البيج حجمه الطبيعي و overflow-visible عشان الأشكال تخرج منه براحتها */}
        <div
          className="relative bg-[#FAF4ED] rounded-3xl md:rounded-[40px]
                     px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20
                     py-8
                     w-full mx-auto max-w-7xl
                     overflow-visible"
        >
          {/* ===== Content Grid ===== */}
          <div
            className="flex flex-col lg:flex-row items-center justify-between 
                       gap-16 lg:gap-4 xl:gap-8"
          >
            {/* ===== Right Side: Text + Store Buttons ===== */}
            {/* أدينا مساحة أكبر للكلام في الشاشات المتوسطة عشان الموبايل ميغطيش عليه */}
            <div className="flex-1 order-2 lg:order-1 text-right z-20 lg:w-[55%] xl:w-1/2">
              <h2
                className="text-2xl sm:text-4xl md:text-5xl lg:text-[45px] xl:text-[50px] 
                           font-bold text-[#1a3a4b] leading-[1.3] md:leading-[1.2] 
                           mb-3 sm:mb-4 lg:mb-5 xl:mb-7"
              >
                حمل التطبيق على متجر{" "}
                <br className="hidden sm:block lg:hidden xl:block" />
                جوجل بلاي و ابل ستور{" "}
              </h2>

              <p
                className="text-sm sm:text-lg md:text-xl lg:text-[24px] xl:text-[28px] 
                           font-semibold text-[#1a3a4b] leading-[1.6] 
                           mb-8! md:mb-12! 
                           max-w-md lg:max-w-xl"
              >
                يتيح لك تطبيقنا متابعة طلباتك{" "}
                <br className="hidden sm:block lg:hidden xl:block" />
                والعديد من مزايا ست الشام
              </p>

              <div
                className="flex flex-row flex-wrap justify-center lg:justify-start items-center gap-4"
                // dir="ltr"
              >
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-xl"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-10! sm:h-14! lg:h-[55px]! max-w-none! w-auto!"
                  />
                </a>
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-xl"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on App Store"
                    className="h-10! sm:h-14! lg:h-[55px]! max-w-none! w-auto!"
                  />
                </a>
              </div>
            </div>

            {/* ===== Left Side: Visuals (Circle, Phones, Spheres) ===== */}
            {/* في الشاشات الكبيرة بنديله مساحة أقل في الـ flex عشان نزقه شمال بعيد عن الكلام */}
            <div className="flex-1 order-1 lg:order-2 relative flex items-center justify-center w-full lg:w-[45%] xl:w-1/2 min-h-[300px] sm:min-h-[400px] lg:min-h-0">
              {/* نقطة المركز: زقيناها شمال شوية في الـ lg عشان الموبايل ميكسرش النص */}
              <div className="absolute top-1/2 left-1/2 lg:left-[45%] xl:left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 flex items-center justify-center">
                {/* 1. الكورة الطايرة (يمين فوق) */}
                <div
                  className="absolute sm:block hidden
                             bottom-[140px] left-[140px] 
                             sm:bottom-[200px] sm:left-[200px] 
                             lg:bottom-[180px] lg:left-[180px] 
                             xl:bottom-[230px] xl:left-[230px] 
                             w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 xl:w-24 xl:h-24 
                             rounded-full z-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #ffffff 0%, #ecd1a4 40%, #c49a5b 100%)",
                    // boxShadow: "0 10px 25px rgba(196, 154, 91, 0.3)",
                  }}
                />

                {/* 2. الكورة الصغيرة (شمال تحت) */}
                <div
                  className="absolute sm:block hidden
                             top-[140px] right-[140px] 
                             sm:top-[200px] sm:right-[200px] 
                             lg:top-[180px] lg:right-[180px] 
                             xl:top-[174px] xl:right-[230px] 
                             w-8 h-8 sm:w-10 sm:h-10 lg:w-10 lg:h-10 xl:w-12 xl:h-12
                             rounded-full z-20"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #ffffff 0%, #ecd1a4 40%, #c49a5b 100%)",
                    // boxShadow: "0 5px 15px rgba(196, 154, 91, 0.3)",
                  }}
                />

                {/* 3. الدايرة الكبيرة الأساسية (مقاسات ضخمة عشان تخرج برا الكونتينر) */}
                <div
                  className="absolute 
                             w-[320px] h-[320px] 
                             sm:w-[450px] sm:h-[450px] 
                             lg:w-[420px] lg:h-[420px] 
                             xl:w-[550px] xl:h-[550px] 
                             rounded-full z-0 transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #FCF8F2 0%, #E6CFA6 100%)",
                  }}
                />

                {/* 4. صورة الموبايلات */}
                <img
                  src="https://res.cloudinary.com/dp7jfs375/image/upload/v1772631289/Rectangle_20068_2x_ddsyju.png"
                  alt="Set Al Sham Mobile App"
                  className="absolute z-10 
                             w-[380px]! sm:w-[550px]! lg:w-[500px]! xl:w-[680px]! 
                             max-w-none! 
                             pointer-events-none transition-all duration-300"
                  style={{
                    transform: "translate(14%)",
                    // filter: "drop-shadow(-15px 25px 35px rgba(0,0,0,0.15))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
