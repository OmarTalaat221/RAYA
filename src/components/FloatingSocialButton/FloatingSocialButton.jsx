// components/FloatingSocialButton/FloatingSocialButton.jsx

"use client";

import React, { useState } from "react";
import { Tooltip } from "antd";

// --- الأيقونات ---
const TikTokIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const FloatingSocialButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // الروابط الخاصة بك
  const socialLinks = [
    {
      id: "phone",
      name: "اتصل بنا",
      url: "tel:+358465202214",
      icon: <PhoneIcon />,
      bgClass: "bg-[#34B7F1]",
      tooltipColor: "#34B7F1",
    },
    {
      id: "email",
      name: "راسلنا عبر البريد الإلكتروني",
      url: "mailto:info@setalsham.com",
      icon: <EmailIcon />,
      bgClass: "bg-[#EA4335]",
      tooltipColor: "#EA4335",
    },
    {
      id: "whatsapp",
      name: "تواصل معنا عبر الواتساب",
      url: "https://wa.me/+358465202214",
      icon: <WhatsAppIcon />,
      bgClass: "bg-[#25D366]",
      tooltipColor: "#25D366",
    },
    {
      id: "facebook",
      name: "تابعنا على فيسبوك",
      url: "https://www.facebook.com/share/18bQz81ASY/",
      icon: <FacebookIcon />,
      bgClass: "bg-[#1877F2]",
      tooltipColor: "#1877F2",
    },
    {
      id: "tiktok-setalsham",
      name: "تيك توك - ست الشام",
      url: "https://www.tiktok.com/@officialnisreenalhalabi?_r=1&_t=ZN-95I76qBacxa",
      icon: <TikTokIcon />,
      bgClass: "bg-black",
      tooltipColor: "#000000",
    },
    {
      id: "tiktok-aradah",
      name: "تيك توك - العراضة الشامية",
      url: "https://www.tiktok.com/@officialsetalsham?_r=1&_t=ZN-95I5m6hV8IY",
      icon: <TikTokIcon />,
      bgClass: "bg-black",
      tooltipColor: "#ff0050",
    },
  ];

  return (
    <div className="fixed bottom-10 left-6 z-[9999] flex flex-col items-center gap-3">
      {/* قائمة أيقونات السوشيال ميديا المنبثقة */}
      <div
        className={`flex flex-col gap-3 transition-all duration-500 origin-bottom ease-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-50 translate-y-12 pointer-events-none"
        }`}
      >
        {socialLinks.map((link, index) => (
          <Tooltip
            key={link.id}
            title={link.name}
            placement="right"
            color={link.tooltipColor}
            styles={{
              container: {
                fontWeight: "bold",
                fontFamily: "Cairo, sans-serif",
              },
            }}
          >
            <a
              href={link.url}
              target={
                link.id === "phone" || link.id === "email" ? "_self" : "_blank"
              }
              rel="noopener noreferrer"
              className={`w-[48px] h-[48px] rounded-full flex items-center justify-center text-white shadow-[0_8px_15px_rgba(0,0,0,0.2)] transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 ${link.bgClass}`}
              style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
            >
              {link.icon}
            </a>
          </Tooltip>
        ))}
      </div>

      {/* الزر الرئيسي */}
      <Tooltip
        title={isOpen ? "إغلاق" : "تواصل معنا"}
        placement="right"
        color="#023048"
        styles={{
          container: {
            fontWeight: "bold",
            fontFamily: "Cairo, sans-serif",
          },
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-[56px] h-[56px] bg-[#023048] hover:bg-[#C9A24A] text-white rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-colors duration-300 focus:outline-none"
        >
          <svg
            className={`w-6 h-6 transition-transform duration-500 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </Tooltip>
    </div>
  );
};

export default FloatingSocialButton;
