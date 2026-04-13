"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const HeroContent = () => {
  const router = useRouter();
  const [searchType, setSearchType] = useState("husband");
  const [ageFrom, setAgeFrom] = useState("18");
  const [ageTo, setAgeTo] = useState("48");

  // State للـ dropdowns
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);

  // Refs للإغلاق عند الضغط خارج الـ dropdown
  const fromRef = useRef(null);
  const toRef = useRef(null);

  // Generate age options
  const ageOptions = Array.from({ length: 63 }, (_, i) => i + 18);

  // إغلاق الـ dropdown عند الضغط خارجه
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setIsFromOpen(false);
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setIsToOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/profile/partner-info?type=${searchType}`);
  };

  // Custom Select Component
  const CustomSelect = ({
    value,
    onChange,
    options,
    isOpen,
    setIsOpen,
    dropdownRef,
  }) => {
    return (
      <div className="relative" ref={dropdownRef}>
        {/* Selected Value Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-[100px] px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-[#DCB56D] rounded-lg
                     text-[#023048] text-base sm:text-lg font-extrabold
                     focus:outline-none focus:border-[#c9a227]
                     cursor-pointer flex items-center justify-between"
        >
          <span>{value}</span>
          <span
            className={`text-[#023048]/50 text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </button>

        {/* Dropdown List */}
        {isOpen && (
          <div
            className="absolute top-full left-0 right-0 mt-1 
                       bg-white border border-[#DCB56D] rounded-lg shadow-lg
                       max-h-[200px] overflow-y-auto z-50
                       scrollbar-thin scrollbar-thumb-[#DCB56D] scrollbar-track-gray-100"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option.toString());
                  setIsOpen(false);
                }}
                className={`px-3 sm:px-4 py-2 cursor-pointer text-right
                           text-[#023048] text-sm sm:text-base font-semibold
                           hover:bg-[#DCB56D]/20 transition-colors
                           ${value === option.toString() ? "bg-[#DCB56D]/30" : ""}`}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="w-full flex flex-col lg:flex-row items-center justify-between 
                 gap-6 sm:gap-8 lg:gap-12 xl:gap-20"
      dir="rtl"
    >
      {/* ===== Right Side: Text Block ===== */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-right order-2 lg:order-1">
        <span className="text-white/90 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal mb-2 sm:mb-3 md:mb-4">
          ست الشام
        </span>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4 md:mb-6">
          نصنع لك بداية حياة لا تنسى
        </h1>

        <p className="text-white/70 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-normal leading-relaxed">
          خدمات زواج وافراح متكاملة في اوروبا
        </p>
      </div>

      {/* ===== Left Side: Search Card ===== */}
      <div className="w-full lg:w-auto order-1 lg:order-2 flex justify-center lg:justify-start">
        <div
          className="bg-[#faf2ea] rounded-xl sm:rounded-2xl 
                     p-4 sm:p-5 md:p-6 lg:p-8 
                     shadow-md w-full 
                     max-w-[350px] sm:max-w-[380px] md:max-w-[400px] lg:max-w-[420px]"
          dir="rtl"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Card Title */}
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-[#023048] text-center mb-4 sm:mb-6 md:mb-8 lg:mb-[50px]">
              ابحث عن شريك العمر
            </h2>

            {/* Search Type Section */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 md:mb-[34px]">
              <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#023048]/80 text-right">
                عن ماذا تبحث؟
              </label>

              <div className="flex items-center gap-4 sm:gap-6">
                {/* Option: اريد زوج */}
                <label className="flex items-center gap-2 sm:gap-3 md:gap-4 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="searchType"
                      value="husband"
                      checked={searchType === "husband"}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`
                        w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-[30px] lg:h-[30px] 
                        rounded-full border-2 
                        flex items-center justify-center
                        transition-all duration-200
                        ${
                          searchType === "husband"
                            ? "border-[#c9a227] bg-white"
                            : "border-gray-300 bg-white"
                        }
                      `}
                    >
                      {searchType === "husband" && (
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 rounded-full bg-[#c9a227]" />
                      )}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-[#000]">
                    اريد زوج
                  </span>
                </label>

                {/* Option: اريد زوجة */}
                <label className="flex items-center gap-2 sm:gap-3 md:gap-4 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="searchType"
                      value="wife"
                      checked={searchType === "wife"}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`
                        w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-[30px] lg:h-[30px] 
                        rounded-full border-2 
                        flex items-center justify-center
                        transition-all duration-200
                        ${
                          searchType === "wife"
                            ? "border-[#c9a227] bg-white"
                            : "border-gray-300 bg-white"
                        }
                      `}
                    >
                      {searchType === "wife" && (
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 rounded-full bg-[#c9a227]" />
                      )}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-[#000]">
                    اريد زوجة
                  </span>
                </label>
              </div>
            </div>

            {/* Age Section */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-sm sm:text-base font-bold text-[#023048]/80 text-right">
                العمر بين
              </label>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Age From Dropdown */}
                <CustomSelect
                  value={ageFrom}
                  onChange={setAgeFrom}
                  options={ageOptions}
                  isOpen={isFromOpen}
                  setIsOpen={(val) => {
                    setIsFromOpen(val);
                    if (val) setIsToOpen(false); // إغلاق الآخر
                  }}
                  dropdownRef={fromRef}
                />

                {/* Separator */}
                <span className="text-[#023048]/60 text-xs sm:text-sm md:text-base font-medium px-1">
                  الى
                </span>

                {/* Age To Dropdown */}
                <CustomSelect
                  value={ageTo}
                  onChange={setAgeTo}
                  options={ageOptions}
                  isOpen={isToOpen}
                  setIsOpen={(val) => {
                    setIsToOpen(val);
                    if (val) setIsFromOpen(false); // إغلاق الآخر
                  }}
                  dropdownRef={toRef}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 
                         bg-[#DCB56D] hover:bg-[#b8920f]
                         text-[#023048] font-semibold text-sm sm:text-base rounded-lg
                         hover:shadow-md transition-all duration-300"
            >
              ابحث الآن
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
