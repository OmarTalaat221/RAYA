// components/FAQSection/FAQSection.jsx

"use client";
import { useState } from "react";

// FAQ Data
const faqData = [
  {
    id: 1,
    question: "كيف تتم عملية المطابقة؟",
    answer:
      "نقوم بدراسة ملفك الشخصي بعناية فائقة، ثم نستخدم نظاماً متقدماً لمطابقة المعايير الشخصية والثقافية والدينية. بعد ذلك نرشح لك أنسب الخيارات المتوافقة مع تطلعاتك، ونرتب لقاءات آمنة ومريحة لضمان أفضل تجربة.",
  },
  {
    id: 2,
    question: "هل تقدمون باقات شاملة؟",
    answer:
      "نعم، نقدم باقات متنوعة تشمل تنظيم حفلات الزفاف الكاملة من الألف إلى الياء، بما في ذلك التصوير، الديكور، الإضاءة، الموسيقى، وتنسيق كافة تفاصيل اليوم المميز. يمكنك اختيار الباقة التي تناسب ميزانيتك وتطلعاتك.",
  },
  {
    id: 3,
    question: "هل التصوير يشمل داخلي وخارجي؟",
    answer:
      "بالتأكيد! باقاتنا للتصوير تشمل جلسات داخلية في قاعات الأفراح وجلسات خارجية في أجمل المواقع الطبيعية أو التاريخية. نوفر فريق محترف من المصورين والمصممين لضمان الحصول على صور وفيديوهات استثنائية.",
  },
  {
    id: 4,
    question: "هل يمكن الدفع بالتقسيط؟",
    answer:
      "نعم، نوفر خيارات دفع مرنة تشمل الدفع بالتقسيط على عدة أشهر، حسب الباقة المختارة. نهدف لتسهيل عملية التخطيط المالي لضمان راحتكم وعدم التأثير على ميزانيتكم.",
  },
  {
    id: 5,
    question: "ماذا يحدث في حال إلغاء الحجز؟",
    answer:
      "سياسة الإلغاء تختلف حسب وقت الإلغاء ونوع الباقة. في حال الإلغاء قبل موعد الفعالية بفترة كافية (عادة شهر أو أكثر)، يمكن استرداد جزء من المبلغ أو تأجيل الحجز. ننصح بمراجعة شروط العقد قبل التوقيع.",
  },
  {
    id: 6,
    question: "هل الفرق الاستعراضية خاصة بكم؟",
    answer:
      "نتعاون مع أفضل الفرق الاستعراضية والفنية في المنطقة، ونضمن لك تجربة ترفيهية احترافية ومميزة. يمكنك اختيار نوع العروض التي تناسب ذوقك وثقافة الحفل، سواء كانت عروض تقليدية أو عصرية.",
  },
];

// Accordion Item Component
const AccordionItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      {/* Question Row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between 
                   px-5 sm:px-6 md:px-8 lg:px-10
                   py-5 sm:py-6 md:py-7 lg:py-8
                   bg-[#faf8f5] hover:bg-[#f5f0e8]
                   transition-colors duration-200
                   text-right group"
      >
        {/* Question Text */}
        <span
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[26px]
                     font-bold text-[#363636] pr-4 sm:pr-6"
        >
          {question}
        </span>

        {/* Arrow Icon */}
        <svg
          className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9
                      text-[#363636] group-hover:text-[#DCB56D]
                      transition-all duration-300 flex-shrink-0
                      ${isOpen ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Answer Content */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out
                    ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div
          className="px-5 sm:px-6 md:px-8 lg:px-10
                     pb-5 sm:pb-6 md:pb-7 lg:pb-8 
                     pt-2 sm:pt-3
                     bg-[#faf8f5]"
        >
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl
                       text-gray-600 leading-relaxed md:leading-loose"
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Component
const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-white py-10 md:py-14 lg:py-18">
      <div className="container-custom mx-auto">
        {/* ===== Header ===== */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          {/* Arabic Title */}
          <h2
            className="relative w-fit mx-auto text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                       font-bold text-[#023048] mb-3 sm:mb-4"
          >
            أهم الأسئلة
            <div className="absolute -bottom-[20px] w-[100%] md:w-full h-[1px] bg-[#023048] mx-auto" />
          </h2>

          {/* Underline */}
        </div>

        {/* ===== Accordion List (Full Width) ===== */}
        <div className="w-full">
          <div
            className="bg-[#faf8f5] rounded-xl sm:rounded-2xl md:rounded-3xl 
                       overflow-hidden"
          >
            {faqData.map((faq) => (
              <AccordionItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openId === faq.id}
                onToggle={() => handleToggle(faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
