"use client";

import React, { useState } from "react";

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const socialIcons = [
    {
      name: "Instagram",
      gradient: "bg-gradient-to-tr from-yellow-500 via-red-500 to-pink-500",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
    {
      name: "YouTube",
      gradient: "bg-red-600",
      path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
    {
      name: "Snapchat",
      gradient: "bg-yellow-400",
      path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z",
      iconColor: "fill-black",
    },
    {
      name: "Twitter",
      gradient: "bg-sky-500",
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
      name: "Facebook",
      gradient: "bg-blue-600",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
      name: "LinkedIn",
      gradient: "bg-blue-700",
      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
  ];

  const servicesRight = [
    "البحث عن شركاء",
    "راحجز صالة الالف",
    "بوفيه طعام",
    "تأجير بدلات",
  ];

  const servicesLeft = [
    "الشامية رجال فرقة العراضة",
    "سني السيدات فرقة زفة ودقة",
    "تصوير المناسبات",
    "زغاريد",
  ];

  const services = [...servicesRight, ...servicesLeft];
  const importantLinksRight = ["الرئيسية", "من نحن", "خدماتنا"];
  const importantLinksLeft = ["الاخبار", "المعرض", "اتصل بنا"];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <footer className="w-full bg-[#F7F5F1] pt-12 font-[Cairo]" dir="rtl">
      {/* Social Section */}
      <div className="text-center !my-10 px-5">
        <h3 className="text-xl font-semibold !text-[#023048] mb-5">
          تابعنا على مواقع التواصل
        </h3>
        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
          {socialIcons.map((social, index) => (
            <div
              key={social.name}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-1 ${social.gradient}`}
              onMouseEnter={() => setHoveredIcon(index)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className={social.iconColor || "fill-white"}
              >
                <path d={social.path} />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Grid - Desktop */}
      <div className="hidden lg:block max-w-[1200px] mx-auto px-6 pb-12">
        {/* Top Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Column 1 - Services (Far Right in RTL) */}
          <div className="col-span-1">
            <h4 className="text-base font-bold !text-[#023048] pb-2 inline-block">
              خدماتنا
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="space-y-2">
                {servicesRight.map((service) => (
                  <a
                    key={service}
                    href="#"
                    className="block text-sm !text-[#023048] transition-all duration-200 hover:text-[#C9A24A]! hover:translate-x-1"
                  >
                    {service}
                  </a>
                ))}
              </div>
              <div className="space-y-2">
                {servicesLeft.map((service) => (
                  <a
                    key={service}
                    href="#"
                    className="block text-sm !text-[#023048] transition-all duration-200 hover:text-[#C9A24A]! hover:translate-x-1"
                  >
                    {service}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 - Important Links */}
          <div className="col-span-1">
            <h4 className="text-base font-bold !text-[#023048] pb-2 inline-block">
              روابط مهمة
            </h4>
            <div className="space-y-2">
              {importantLinksRight.map((link, index) => (
                <a
                  key={link}
                  href="#"
                  className={`block text-sm transition-all duration-200 hover:translate-x-1 ${
                    index === 0
                      ? "text-[#C9A24A] font-semibold hover:text-[#a8863d]"
                      : "!text-[#023048] hover:text-[#C9A24A]!"
                  }`}
                >
                  {link}
                </a>
              ))}
              {importantLinksLeft.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-sm !text-[#023048] transition-all duration-200 hover:text-[#C9A24A]! hover:translate-x-1"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3 - App Download */}
          <div className="col-span-1">
            <h4 className="text-base font-bold !text-[#023048] pb-2 inline-block">
              حمل تطبيقنا
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="block transition-transform hover:scale-105"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="w-32 h-auto"
                />
              </a>
              <a
                href="#"
                className="block transition-transform hover:scale-105"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="App Store"
                  className="w-32 h-auto"
                />
              </a>
            </div>
          </div>

          {/* Column 4 - Brand Logo (Far Left in RTL) */}
          <div className="col-span-1">
            <div className="flex justify-center w-fit">
              <img
                src="/main-assets/img/logo.png"
                alt="ست الشام"
                className="!h-[150px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-6">
          {/* Column 1 - Support and Help */}
          <div className="col-span-1">
            <h4 className="text-base font-bold !text-[#023048] pb-2 inline-block">
              المساعدة والدعم
            </h4>
            <div className="flex flex-col gap-3">
              <a href="tel:6005xxxx" className="flex items-center gap-3 group">
                <svg className="w-4 h-4 fill-[#C9A24A]" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span className="text-sm !text-[#023048] group-hover:text-[#C9A24A]! transition-colors">
                  600 5 xxxxx
                </span>
              </a>
              <a
                href="mailto:custservice@setalsham.com"
                className="flex items-center gap-3 group"
              >
                <svg className="w-4 h-4 fill-[#C9A24A]" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span className="text-xs !text-[#023048] group-hover:text-[#C9A24A]! transition-colors break-all">
                  custservice@setalsham.com
                </span>
              </a>
              <a href="#" className="flex items-center gap-3 group">
                <svg className="w-4 h-4 fill-green-600" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="text-sm text-green-600 font-medium group-hover:text-green-700 transition-colors">
                  راسلنا واتساب
                </span>
              </a>
            </div>
          </div>

          {/* Column 2 - Main Office */}
          <div className="col-span-1">
            <h4 className="text-base font-bold !text-[#023048] pb-2 inline-block">
              المكتب الرئيسي
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 fill-[#C9A24A]" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="text-sm !text-[#023048]">
                  الجمعة - الأحساء
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 fill-[#C9A24A]" viewBox="0 0 24 24">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
                </svg>
                <span className="text-sm !text-[#023048]">
                  8:00 AM - 4:00 PM
                </span>
              </div>
              <a href="#" className="flex items-center gap-2 group">
                <svg className="w-4 h-4 fill-[#C9A24A]" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="text-sm !text-[#023048] group-hover:text-[#C9A24A]! transition-colors">
                  اعثر علينا على الخريطة
                </span>
              </a>
            </div>
          </div>

          {/* Column 3 - Office Hours */}
          <div className="col-span-1">
            <h4 className="text-base font-bold !text-[#023048] pb-2 inline-block">
              ساعات العمل
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 fill-[#C9A24A]" viewBox="0 0 24 24">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
                </svg>
                <span className="text-sm !text-[#023048]">الأحد - الخميس</span>
              </div>
              <p className="text-sm !text-[#023048] font-medium mr-6">
                8:00 AM - 4:00 PM
              </p>
              <p className="text-xs text-[#6B7C8D] mr-6">
                متاحين على مدار العام
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#EEDFC8] py-5">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Desktop Bottom Bar */}
          <div
            className="hidden md:flex justify-between items-center"
            dir="ltr"
          >
            <p className="text-xs text-[#5A6B7A]">
              © 2026 Set Al Sham. All Rights Reserved.
            </p>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#6B7C8D]">Powered By</span>
              <span className="text-sm font-bold text-blue-600 tracking-wider">
                BIGBANG
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#5A6B7A]">
              <a
                href="#"
                className="hover:!text-[#023048] hover:underline transition-colors"
              >
                Terms & Conditions
              </a>
              <span>|</span>
              <a
                href="#"
                className="hover:!text-[#023048] hover:underline transition-colors"
              >
                Privacy Policy
              </a>
              <span>|</span>
              <a
                href="#"
                className="hover:!text-[#023048] hover:underline transition-colors"
              >
                Usage Terms
              </a>
            </div>
          </div>

          {/* Mobile Bottom Bar */}
          <div className="md:hidden flex flex-col items-center gap-4 text-center">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#6B7C8D]">Powered By</span>
              <span className="text-sm font-bold text-blue-600 tracking-wider">
                BIGBANG
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-[#5A6B7A]">
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
              <span>|</span>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="#" className="hover:underline">
                Usage Terms
              </a>
            </div>
            <p className="text-xs text-[#5A6B7A]">
              © 2026 Set Al Sham. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
