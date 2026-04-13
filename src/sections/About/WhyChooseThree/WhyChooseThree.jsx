"use client";

import { useState, useRef } from "react";

const services = [
  { id: 0, name: "تنظيم الحفلات", role: "تنظيم متكامل" },
  { id: 1, name: "تصوير احترافي", role: "توثيق اللحظات" },
  { id: 2, name: "تنسيق الديكور", role: "تصميم أنيق" },
];

export default function WhyChooseThree() {
  const [active, setActive] = useState(1);

  const getPrevId = () => (active === 0 ? services.length - 1 : active - 1);
  const getNextId = () => (active === services.length - 1 ? 0 : active + 1);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className="bg-[#ffffff] text-gray-700 min-h-screen font-serif overflow-hidden"
      style={{ direction: "ltr" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* ========================================= */}
        {/* ROW 1: Hero Text (Left) & Large Image (Right) */}
        {/* ========================================= */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-10 items-center lg:items-start">
          {/* Left: Text Area */}
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center pt-4 lg:pt-16 px-2 lg:px-4"
            dir="rtl"
          >
            <h1 className="text-[28px] lg:text-[34px] text-center font-normal font-sans text-gray-800 mb-6 lg:mb-8 leading-[1.2]">
              نصنع لك لحظات
              <br />
              لا تُنسى أبداً!
            </h1>

            <p className="text-[12px] lg:text-[13px] text-center leading-[1.9] text-[#8a8a8a] mb-5 font-sans">
              في مكتب ست الشام، نهتم بكل تفاصيل حفل زفافك ليكون يوماً
              استثنائياً. خدمات متكاملة لتنظيم وتنسيق الأفراح بأعلى مستوى من
              الاحترافية.
            </p>

            <br className="hidden lg:block" />

            <p className="text-[12px] lg:text-[13px] text-center leading-[1.9] text-[#8a8a8a] mb-5 font-sans">
              نحن نؤمن بأن كل حفل زفاف يجب أن يكون فريداً ويعكس شخصية العروسين.
              لذلك، نقدم باقة متكاملة من الخدمات التي تشمل التصوير الاحترافي،
              تنسيق الديكورات الجذابة، وإدارة الحفل بالكامل لضمان راحة بالك.
            </p>

            <br className="hidden lg:block" />

            <p className="text-[12px] lg:text-[13px] text-center leading-[1.9] text-[#8a8a8a] mb-8 font-sans">
              نعمل مع فريق من الخبراء والمتخصصين لتقديم أفكار مبتكرة وحلول
              إبداعية تناسب جميع الأذواق والميزانيات. هدفنا هو تحويل حلمك إلى
              حقيقة واقعة تفوق توقعاتك.
            </p>

            <button
              onClick={() =>
                window.open("https://wa.me/358465202214", "_blank")
              }
              className="bg-[#DCB56D] hover:bg-[#cba45d] text-[#023048] text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-2.5 transition-colors duration-200 font-sans cursor-pointer mt-2 lg:mt-6 xl:mt-9"
            >
              تواصل معنا
            </button>
          </div>

          {/* Right: Large Main Image + Overlapping Image */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-12 lg:mt-0 mb-20 lg:mb-0">
            <div className="relative w-[85%] sm:w-[75%] md:w-[60%] lg:w-full max-w-[470px] lg:mr-4">
              {/* Large Main Image */}
              <div className="aspect-[470/660] w-full bg-[#dfdfdf]">
                <img
                  src="https://res.cloudinary.com/dbvh5i83q/image/upload/v1775753751/WhatsApp_Image_2026-04-09_at_1.35.17_PM_dvgdbb.jpg"
                  alt="فرحة العروسين"
                  className="w-full h-full! object-cover"
                />
              </div>

              {/* الصورة المتداخلة */}
              <div
                className="absolute z-30 p-0.5 bg-[#F4EEDE] shadow-[0_1px_5px_rgb(246,235,215)]
                           w-[85%] sm:w-[75%] md:w-[70%] lg:w-[80%] xl:w-[370px]
                           aspect-[370/240]
                           -bottom-[60px] sm:-bottom-[70px] md:-bottom-[80px] lg:-bottom-[100px] xl:-bottom-[120px]
                           left-[-5%] sm:left-[-8%] md:left-[-10%] lg:left-[-15%] xl:-left-[50px]"
              >
                <div className="w-full h-full! bg-[#dfdfdf]">
                  <img
                    src="https://res.cloudinary.com/dbvh5i83q/image/upload/v1775753750/WhatsApp_Image_2026-04-09_at_1.35.17_PM_1_biul4r.jpg"
                    alt="أجواء الزفاف"
                    className="w-full h-full! object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* ROW 2: Portrait Image/Video (Left) & Farmers (Right) */}
        {/* ========================================= */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-10 items-center lg:items-end mt-20 lg:mt-8">
          {/* Left: Portrait Video & Signature */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            {/* Offset Image Container */}
            <div
              className="relative w-[85%] sm:w-[70%] md:w-[55%] lg:w-full max-w-[370px] cursor-pointer"
              onClick={toggleVideo}
            >
              {/* المربع البيج */}
              <div
                className="absolute w-full h-full! bg-[#f6ebd7]
                            -top-3 -right-3 
                            sm:-top-4 sm:-right-4 
                            md:-top-6 md:-right-6 
                            lg:-top-8 lg:-right-8 
                            xl:-top-10 xl:-right-10"
              />
              {/* Video replaced image */}
              <div className="relative z-10 aspect-[370/530] w-full bg-[#dfdfdf] group">
                <video
                  ref={videoRef}
                  src="https://res.cloudinary.com/dbvh5i83q/video/upload/v1775753690/WhatsApp_Video_2026-04-09_at_1.35.16_PM_mesnre.mp4"
                  className="w-full h-full! object-cover"
                  loop
                  playsInline
                  muted
                  autoPlay
                />
                {/* Play Button Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-[#DCB56D] ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Signature Block */}
            <div className="flex items-center justify-center lg:justify-start gap-4 lg:gap-5 mt-8 w-full max-w-[370px]">
              <div className="w-[100px] h-[70px] lg:w-[120px] lg:h-[80px] text-[#DCB56D]">
                <img
                  src="https://res.cloudinary.com/dhgp9dzdt/image/upload/v1772620899/logo_udnowq.png"
                  alt="شعار ست الشام"
                  className="w-full h-full! object-contain"
                />
              </div>
              <div className="flex flex-col gap-0.5 text-right">
                <p className="text-[11px] font-bold tracking-[0.15em] text-[#023048] font-sans uppercase">
                  ست الشام
                </p>
                <p className="text-[12px] text-[#8a8a8a] font-serif italic">
                  أفراح مستوحاة من الخيال
                </p>
              </div>
            </div>
          </div>

          {/* Right: Text & Carousel */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8 items-center lg:items-start pt-10 lg:pt-[100px] xl:pt-[120px] lg:pl-4">
            {/* Text Area */}
            <div
              className="text-center lg:text-right px-4 lg:px-0 lg:pr-4"
              dir="rtl"
            >
              <h2 className="text-[28px] lg:text-[32px] font-normal text-gray-800 mb-6 font-sans">
                خدماتنا
              </h2>
              <p className="text-[12px] lg:text-[13px] leading-[1.9] text-[#8a8a8a] mb-5 font-sans">
                نقدم لك باقة متنوعة من الخدمات التي تغطي كافة متطلبات حفل
                الزفاف، من التصوير إلى التنسيق والتنظيم.
              </p>

              <p className="text-[12px] lg:text-[13px] leading-[1.9] text-[#8a8a8a] mb-5 font-sans">
                فريقنا المتميز يسعى دائماً لتقديم الأفضل لعملائنا. نحن نفخر
                بتوثيق اجمل اللحظات وصناعة ذكريات تدوم طويلاً، مع الحرص التام
                على تلبية جميع رغباتك وتطلعاتك لتكتمل فرحتك.
              </p>
              <p className="text-[12px] lg:text-[13px] leading-[1.9] text-[#8a8a8a] font-sans">
                دعنا نحمل عنك عناء التخطيط والتنفيذ، بينما تستمتع أنت بكل لحظة
                في يومك المميز. تواصل معنا اليوم لاستكشاف كيف يمكننا جعل حفل
                زفافك اكثر روعة وإبهاراً.
              </p>
            </div>

            {/* Custom UI Carousel */}
            <div className="flex flex-col items-center gap-5 mt-4 w-full max-w-[380px]">
              {/* Circles and Arrows */}
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 w-full justify-center">
                <button
                  onClick={() => setActive(getPrevId())}
                  className="text-gray-400 hover:text-[#DCB56D] text-xl sm:text-2xl pb-1 px-1 sm:px-2 transition-colors cursor-pointer shrink-0"
                >
                  ‹
                </button>

                <div className="flex items-center gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
                  {/* Prev Circle (Small) */}
                  <div className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] lg:w-[60px] lg:h-[60px] rounded-full bg-[#e8e8e8] flex items-center justify-center text-[7px] sm:text-[8px] text-[#a0a0a0] font-sans shrink-0 transition-all duration-300 text-center px-1">
                    {services[getPrevId()].name}
                  </div>

                  {/* Active Circle (Large) */}
                  <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] lg:w-[90px] lg:h-[90px] xl:w-[100px] xl:h-[100px] rounded-full bg-[#f6ebd7] flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-[#023048] shadow-inner font-sans shrink-0 transition-all duration-300 text-center px-2">
                    {services[active].name}
                  </div>

                  {/* Next Circle (Small) */}
                  <div className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] lg:w-[60px] lg:h-[60px] rounded-full bg-[#e8e8e8] flex items-center justify-center text-[7px] sm:text-[8px] text-[#a0a0a0] font-sans shrink-0 transition-all duration-300 text-center px-1">
                    {services[getNextId()].name}
                  </div>
                </div>

                <button
                  onClick={() => setActive(getNextId())}
                  className="text-gray-400 hover:text-[#DCB56D] text-xl sm:text-2xl pb-1 px-1 sm:px-2 transition-colors cursor-pointer shrink-0"
                >
                  ›
                </button>
              </div>

              {/* Active Name & Dots */}
              <div className="flex flex-col items-center gap-3 mt-2">
                <p className="text-[11px] font-bold tracking-[0.15em] text-[#023048] font-sans uppercase">
                  {services[active].role}
                </p>
                <div className="flex items-center gap-2">
                  {services.map((f) => (
                    <div
                      key={f.id}
                      className={`w-1.5 h-1.5 transition-all duration-300 rounded-full ${
                        active === f.id ? "bg-[#DCB56D]" : "bg-[#dcdcdc]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
