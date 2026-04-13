// components/AboutSection/AboutSection.jsx

"use client";

const AboutSection = () => {
  return (
    <section className="w-full py-10 md:py-14 lg:py-18" dir="rtl">
      <div className="container-custom mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#023048] text-center mb-12 md:mb-16 lg:mb-20">
          من نحن
        </h2>

        {/* Two Columns Layout */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16 xl:gap-24">
          {/* Right Column: Text Content */}
          <div className="flex-1 flex flex-col items-start text-right space-y-6 md:space-y-8">
            {/* Paragraph 1 */}
            <p className="text-[#023048] text-base md:text-xl lg:text-2xl leading-relaxed md:leading-loose">
              ست الشام هي منصة متكاملة متخصصة في خدمات الزواج وتنظيم الأفراح
              والفعاليات للجالية العربية في اوروبا
            </p>

            <br />
            {/* Paragraph 2 */}
            <p className="text-[#023048] text-base md:text-xl lg:text-2xl leading-relaxed md:leading-loose">
              منصه الشام هي افضل مكان للعثور علي شريك الحياه بنيه زواج حقيقي
            </p>
            <br />

            {/* Paragraph 3 */}
            <p className="text-[#023048] text-base md:text-xl lg:text-2xl leading-relaxed md:leading-loose">
              نؤمن أن الزواج ليس مجرد مناسبة، بل بداية قصة حياة ولهذا نحرص على
              تقديم خدماتنا بأعلى درجات الخصوصية، التنظيم، والاهتمام بالتفاصيل
            </p>
            <br />

            {/* Paragraph 4 */}

            <p className="text-[#023048] text-base md:text-xl lg:text-2xl leading-relaxed md:leading-loose">
              نمزج بين الأصالة الشامية والاحتراف الأوروبي لنصنع تجربة راقية تحفظ
              العادات وتواكب المعايير الحديثة
            </p>
          </div>

          {/* Left Column: Logo Circle */}
          <div className="flex-shrink-0">
            <div
              className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[464px] lg:h-[464px]
                          rounded-full bg-white/80 shadow-lg shadow-black/5
                          flex items-center justify-center"
            >
              {/* Logo - Aspect Ratio: 380:185 ≈ 2.05:1 */}
              <img
                src="https://res.cloudinary.com/dhgp9dzdt/image/upload/v1772620899/logo_udnowq.png"
                alt="Set Al Sham Logo"
                className="w-[200px] h-[98px] md:w-[280px] md:h-[137px] lg:w-[380px] lg:h-[185px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
