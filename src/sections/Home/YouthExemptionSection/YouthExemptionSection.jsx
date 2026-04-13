// sections/Home/YouthExemptionSection/YouthExemptionSection.jsx

"use client";

import { motion } from "framer-motion";
import { Gift, Star, CheckCircle, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
const YouthExemptionSection = () => {
  const { token } = useSelector((state) => state.auth);
  return (
    <section
      className="w-full py-10 md:py-14 lg:py-20 bg-white relative overflow-hidden"
      dir="rtl"
    >
      <div className="container-custom mx-auto relative z-10">
        {/* ===== Section Title ===== */}
        <div className="text-center mb-14 md:mb-18 lg:mb-20">
          {/* Main Title */}
          <h2 className="relative text-3xl md:text-5xl lg:text-6xl font-bold text-[#023048] text-center mb-5 w-fit mx-auto">
            إعفاء تام من الرسوم
            <div className="absolute -bottom-[20px] w-[100%] md:w-full h-[1px] bg-[#023048] mx-auto" />
          </h2>

          {/* Subtitle */}
          <p className="mt-10 text-base md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto font-sans">
            تحرصُ ست الشام على الفتيات، لذلك قررنا إعفاء كل فتاة
            <br className="hidden md:block" />
            <span className="font-bold text-[#023048]">
              {" "}
              لم تُتِمّ الثالثة والعشرين من عمرها{" "}
            </span>
            من رسوم جميع المراحل كاملةً.
          </p>
        </div>

        {/* ===== Central Hero Card ===== */}
        <div className="relative mx-auto max-w-3xl mb-14 md:mb-20">
          <div className="relative bg-gradient-to-br from-[#023048] to-[#034a6e] rounded-3xl overflow-hidden">
            <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
              {/* Age Badge */}
              <div className="inline-flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#D4AF5B] shadow-xl shadow-yellow-400/20 mb-8 mx-auto">
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-black text-[#023048] leading-none">
                    23
                  </p>
                  <p className="text-xs md:text-sm font-bold text-[#023048]/80 mt-1">
                    سنة فأقل
                  </p>
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                فتيات ما دون الثالثة والعشرين
              </h3>
              <p className="text-[#D4AF5B] text-lg md:text-xl font-semibold mb-8!">
                معفيات من الرسوم في جميع المراحل بدون استثناء
              </p>

              {/* CTA Button */}
              {/* if he logged transfer them to profile/personal-info not logged transfer them to login */}
              <Link href={`${token ? "/profile/personal-info" : "/login"}`}>
                <button className="inline-flex items-center gap-3 bg-[#D4AF5B] hover:bg-[#c09a3e] text-[#023048] font-bold text-lg md:text-xl px-10 py-4 rounded-2xl shadow-lg shadow-yellow-400/20 transition-all duration-300">
                  {/* <Heart size={22} className="fill-[#023048]" /> */}
                  <span>سجّلي الآن مجاناً</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ===== Bottom Note ===== */}
        <div className="flex items-start gap-3 bg-[#faf2ea] border border-[#D4AF5B]/30 rounded-2xl px-6 py-5 max-w-2xl mx-auto">
          <Sparkles size={22} className="text-[#D4AF5B] flex-shrink-0 mt-0.5" />
          <p className="text-gray-700 text-sm md:text-base leading-relaxed text-right">
            يُطبَّق الإعفاء تلقائياً عند التسجيل، ويستمر طوال فترة استخدامك
            للخدمة ما دمتِ ضمن الفئة العمرية المؤهَّلة. للتحقق أو الاستفسار،
            تواصلي معنا مباشرةً.
          </p>
        </div>
      </div>
    </section>
  );
};

export default YouthExemptionSection;
