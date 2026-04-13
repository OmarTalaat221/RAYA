"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const pathname = usePathname();

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
    { label: "البحث عن شريك", href: "/services-details?id=3" },
    { label: "حجز صالة الأفراح", href: "/services-details?id=2" },
    { label: "بوفيه طعام", href: "/services-details?id=1" },
    { label: "تأجير بدلات", href: "/services-details?id=9" },
  ];

  const servicesLeft = [
    { label: "فرقة العراضة الشامية رجال", href: "/services-details?id=4" },
    { label: "فرقة زفة ودقة ستي للسيدات", href: "/services-details?id=6" },
    { label: "تصوير المناسبات", href: "/services-details?id=7" },
    { label: "زغاريد", href: "/services-details?id=5" },
  ];

  const services = [...servicesRight, ...servicesLeft];

  const importantLinksRight = [
    { label: "الرئيسية", href: "/" },
    { label: "من نحن", href: "/about" },
    { label: "خدماتنا", href: "/services" },
  ];

  const importantLinksLeft = [
    { label: "الاخبار", href: "/news" },
    { label: "المعرض", href: "/gallery" },
    { label: "اتصل بنا", href: "/contact" },
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <footer className="w-full bg-[#FCF8F4] pt-8 font-[Cairo]" dir="rtl">
      <div className="container mx-auto px-6">
        {/* Top Social Media Section */}
        <div className="flex flex-col gap-3 text-center pb-6 border-b border-[#E8DCCB]">
          <h3 className="text-[18px]! font-bold !text-[#023048]">
            تابعنا على مواقع التواصل
          </h3>
          <div className="flex justify-center gap-3">
            {socialIcons.map((social, index) => (
              <div
                key={social.name}
                className={`w-[32px] h-[32px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-sm hover:-translate-y-1 ${social.gradient}`}
                onMouseEnter={() => setHoveredIcon(index)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className={social.iconColor || "fill-white"}
                >
                  <path d={social.path} />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout - يظهر فقط في الشاشات الكبيرة لتجنب التداخل */}
        <div className="hidden lg:block">
          {/* Row 1: Services, App Download, Logo */}
          <div className="grid grid-cols-3 gap-4 border-b border-[#E8DCCB] py-6 items-start">
            {/* Column 1 - Services (Right) */}
            <div className="flex flex-col items-start">
              <h4 className="text-[20px]! font-bold !text-[#023048] mb-3">
                خدماتنا
              </h4>
              <div className="flex gap-x-[40px]">
                <div className="flex flex-col gap-[8px]">
                  {servicesRight.map((service) => (
                    <Link
                      key={service.label}
                      href={service.href}
                      className="text-[18px]! !text-[#023048] transition-colors hover:text-[#C9A24A]!"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-[8px]">
                  {servicesLeft.map((service) => (
                    <Link
                      key={service.label}
                      href={service.href}
                      className="text-[18px]! !text-[#023048] transition-colors hover:text-[#C9A24A]!"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2 - App Download (Center) */}
            <div className="flex flex-col items-center">
              <h4 className="text-[18px]! font-bold !text-[#023048] mb-[35px]">
                حمل تطبيقنا
              </h4>
              <div className="flex flex-col gap-[8px]">
                <a
                  href="#"
                  className="block transition-transform hover:scale-105"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    className="w-[148.87px]! h-[44.11px]! object-contain"
                  />
                </a>
                <a
                  href="#"
                  className="block transition-transform hover:scale-105"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="App Store"
                    className="w-[148.87px]! h-[44.11px]! object-contain"
                  />
                </a>
              </div>
            </div>

            {/* Column 3 - Brand Logo (Left) */}
            <div className="flex justify-end items-start">
              <img
                src="https://res.cloudinary.com/dp7jfs375/image/upload/v1772974555/animated-logo_lfa7sj.svg"
                alt="ست الشام"
                className="w-[344.59px]! h-[168.75px]! object-contain -mt-4"
              />
            </div>
          </div>

          {/* Row 2: Important Links, Head Office, Help & Support */}
          <div className="grid grid-cols-3 gap-4 border-b border-[#E8DCCB] py-6 items-start">
            {/* Important Links (Right) */}
            <div className="flex flex-col items-start">
              <h4 className="text-[20px]! font-bold !text-[#023048] mb-3">
                روابط مهمة
              </h4>
              <div className="flex gap-x-[94px]">
                <div className="flex flex-col gap-[8px]">
                  {importantLinksRight.map((link, index) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`text-[18px]! transition-colors ${
                        link.href === pathname
                          ? "text-[#C9A24A]! font-bold"
                          : "!text-[#023048] hover:text-[#C9A24A]!"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-[8px]">
                  {importantLinksLeft.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`text-[18px]! transition-colors ${
                        link.href === pathname
                          ? "text-[#C9A24A]! font-bold"
                          : "!text-[#023048] hover:text-[#C9A24A]!"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Head Office (Center) */}
            {/* تم تعديل هذا القسم ليصبح w-fit mx-auto للحفاظ عليه في المنتصف ولكن محتوياته تبدأ من اليمين */}
            <div className="flex flex-col items-start w-fit mx-auto">
              <h4 className="text-[20px]! font-bold !text-[#023048] mb-3 text-start">
                المكتب الرئيسي
              </h4>
              <div className="flex flex-col items-start gap-[8px]">
                <span className="text-[18px]! !text-[#000]">
                  الجمعة - الأحد
                </span>
                <span
                  dir="ltr"
                  className="text-[18px]! !text-[#000] text-right"
                >
                  8:00 AM - 4:00 PM
                </span>
                <Link
                  href="#"
                  className="text-[18px]! !text-[#000] hover:text-[#C9A24A]! transition-colors"
                >
                  ابحث عنا في الخريطة
                </Link>
              </div>
            </div>

            {/* Help & Support (Left) */}
            <div className="flex justify-end">
              <div className="flex flex-col items-end text-start pr-[60px]">
                <h4 className="text-[20px]! font-bold !text-[#023048] mb-3 text-start w-full">
                  المساعدة والدعم
                </h4>
                <div className="flex flex-col gap-[8px]">
                  <a
                    dir="ltr"
                    href="tel:6005xxxx"
                    className="text-[18px]! text-right !text-[#000] hover:text-[#C9A24A]! transition-colors"
                  >
                    600 5 xxxx
                  </a>
                  <a
                    dir="ltr"
                    href="mailto:custservice@setalsham.com"
                    className="text-[18px]! !text-[#000] hover:text-[#C9A24A]! transition-colors"
                  >
                    custservice@setalsham.com
                  </a>
                  <a
                    href="#"
                    className="text-[18px]! !text-[#000] hover:text-[#C9A24A]! transition-colors"
                  >
                    أرسل رسالة واتساب
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Layout (Accordion View) */}
        <div className="lg:hidden py-6 space-y-4 items-start">
          <div className="flex justify-center mb-4">
            <img
              src="https://res.cloudinary.com/dp7jfs375/image/upload/v1772974555/animated-logo_lfa7sj.svg"
              alt="ست الشام"
              className="w-[344.59px]! h-[168.75px]! object-contain"
            />
          </div>

          {[
            { id: "services", title: "خدماتنا", content: services },
            {
              id: "important",
              title: "روابط مهمة",
              content: [...importantLinksRight, ...importantLinksLeft],
            },
            {
              id: "office",
              title: "المكتب الرئيسي",
              content: [
                "الجمعة - الأحد",
                "8:00 AM - 4:00 PM",
                "ابحث عنا في الخريطة",
              ],
              isText: true,
            },
            {
              id: "support",
              title: "المساعدة والدعم",
              content: [
                "600 5 xxxx",
                "custservice@setalsham.com",
                "أرسل رسالة واتساب",
              ],
              isText: true,
            },
          ].map((section) => (
            <div key={section.id} className="border-b border-[#E8DCCB]">
              <button
                className="flex justify-between items-center w-full py-3"
                onClick={() => toggleSection(section.id)}
              >
                <h4 className="text-[18px]! font-bold !text-[#023048]">
                  {section.title}
                </h4>
                <svg
                  className={`w-4 h-4 !text-[#023048] transition-transform duration-300 ${
                    expandedSection === section.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedSection === section.id
                    ? "max-h-[500px] pb-4"
                    : "max-h-0"
                }`}
              >
                <div className="flex flex-col gap-2 px-2">
                  {section.content.map((item, index) =>
                    section.isText ? (
                      <p key={index} className="text-[18px]! !text-[#000]">
                        {item}
                      </p>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`text-[18px]! transition-colors ${
                          section.id === "important" && index === 0
                            ? "text-[#C9A24A] font-bold"
                            : "!text-[#023048] hover:text-[#C9A24A]!"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="py-4 text-center border-b border-[#E8DCCB]">
            <h4 className="text-[18px]! font-bold !text-[#023048] mb-4">
              حمل تطبيقنا
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="w-[148.87px]! h-[44.11px]! object-contain"
                />
              </a>
              <a href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="App Store"
                  className="w-[148.87px]! h-[44.11px]! object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Beige Background */}
      <div className="bg-[#EEDFC8] py-3">
        <div className="container mx-auto px-6">
          {/* Desktop Bottom Bar */}
          <div className="hidden lg:grid grid-cols-3 items-center" dir="ltr">
            <p className="text-[14px] text-[#5A6B7A]">
              © 2026 Set Al Sham. All Rights Reserved.
            </p>
            <div className="flex flex-col items-center justify-center -mt-1">
              <span className="text-[11px] text-[#5A6B7A] mb-1">
                Powered By
              </span>
              {/* تم تعديل اللوجو ليكون object-cover مع تعديل طفيف للارتفاع ليظهر بشكل ممتاز */}
              <img
                src="https://its.ae/wp-content/uploads/2020/05/bigbang-logo.svg"
                alt="BigBang"
                className="w-fit h-[20px]! object-cover"
              />
            </div>
            <div className="flex items-start justify-end gap-3 text-[14px] text-[#5A6B7A]">
              <a href="#" className="hover:!text-[#023048] transition-colors">
                Terms & Conditions
              </a>
              <span>|</span>
              <Link
                href="/privacy-policy"
                className="hover:!text-[#023048] transition-colors"
              >
                Privacy Policy
              </Link>
              <span>|</span>
              <a href="#" className="hover:!text-[#023048] transition-colors">
                Usage Terms
              </a>
            </div>
          </div>

          {/* Mobile Bottom Bar */}
          <div
            className="lg:hidden flex flex-col items-center gap-3 text-center"
            dir="ltr"
          >
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-[#5A6B7A] mb-1">
                Powered By
              </span>
              {/* تم تعديله هنا أيضاً لنسخة الموبايل */}
              <img
                src="https://its.ae/wp-content/uploads/2020/05/bigbang-logo.svg"
                alt="BigBang"
                className="w-full h-[22px]! object-cover"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-x-2 text-[13px] text-[#5A6B7A]">
              <a href="#">Terms & Conditions</a>
              <span>|</span>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <span>|</span>
              <a href="#">Usage Terms</a>
            </div>
            <p className="text-[13px] text-[#5A6B7A]">
              © 2026 Set Al Sham. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
