"use client";

import { ShieldCheck, ExternalLink, ArrowLeft, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LegalitySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  return (
    <section className="w-full py-10 md:py-16 bg-[#FDF8EB]/50 relative overflow-hidden" dir="rtl">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF5B] opacity-5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#023048] opacity-5 rounded-full -ml-48 -mb-48"></div>

      <div className="container-custom mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Right Column: Text Content */}
          <div className="flex-1 text-right order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF5B]/10 rounded-full text-[#D4AF5B] font-bold text-sm mb-2">
                <ShieldCheck size={18} />
                <span>ضمان المصداقية والقانونية</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-[#023048] leading-tight font-sans">
                نعمل في النور.. <br />
                <span className="text-[#D4AF5B]">مكتبنا مرخص وقانوني</span> في فنلندا
              </h2>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-lg md:text-xl leading-relaxed font-sans">
                  في مكتب <span className="font-bold text-[#023048]">"ست الشام"</span>، نضع الثقة والمصداقية كحجر أساس لعملنا. نحن نؤمن أن الشفافية هي أقصر طريق لبناء علاقة ناجحة مع عملائنا.
                </p>
                <p className="text-lg md:text-xl leading-relaxed font-sans">
                  مكتبنا مسجل رسمياً في نظام معلومات الشركات الفنلندي (<span className="font-bold text-[#023048] dir-ltr">YTJ</span>) تحت رقم السجل الضريبي: <span className="font-bold text-[#023048] dir-ltr">3604935-9</span>. هذا الالتزام القانوني هو ضمانك الأول للحصول على خدمة احترافية، آمنة، وموثقة تماماً وفقاً للقوانين الفنلندية والأوروبية.
                </p>
              </div>

              <div className="pt-6">
                <motion.a
                  href="https://tietopalvelu.ytj.fi/yritys/3604935-9"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-[#023048] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/20 hover:bg-[#034061] transition-all group"
                >
                  <span>التحقق من بيانات المكتب الرسمية</span>
                  <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Left Column: Image/Card */}
          <div className="flex-1 order-1 lg:order-2 w-full max-w-[520px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Image Container with Premium Border */}
              <div 
                onClick={() => setIsModalOpen(true)}
                className="relative z-10 rounded-3xl overflow-hidden border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] group max-h-[450px] cursor-zoom-in"
              >
                <img 
                  src="/assets/image/Tietopalvelu.png" 
                  alt="Official Registration Tietopalvelu" 
                  className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#023048]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="text-white w-8 h-8" />
                  </div>
                </div>
              </div>

              {/* Decorative Elements around Image */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#D4AF5B] rounded-2xl -z-10 rotate-12 opacity-20"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-[#D4AF5B] rounded-full -z-10 opacity-20"></div>
              
              {/* Badge */}
              <div className="absolute -bottom-4 left-10 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-gray-100">
                <div className="bg-green-500 p-2 rounded-full">
                  <ShieldCheck className="text-white w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">الحالة الضريبية</p>
                  <p className="text-sm font-bold text-[#023048]">مسجل ومعتمد نشط</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Image Modal (Full Screen Overlay) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[9999] bg-[#023048]/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-6 right-6 lg:top-10 lg:right-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors z-[10000]"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
            >
              <X size={32} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full h-[90vh] overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-white"
            >
              <div className="h-full overflow-y-auto overflow-x-hidden custom-scrollbar bg-white">
                <img 
                  src="/assets/image/Tietopalvelu.png" 
                  alt="Full Registration Details" 
                  className="w-full h-auto block"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LegalitySection;

