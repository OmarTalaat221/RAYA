// components/Contact/ContactInfoBar.jsx

"use client";
import { FaLinkedinIn, FaInstagram, FaTiktok } from "react-icons/fa";

import { FaThreads, FaXTwitter } from "react-icons/fa6";
import { Call, Envelope, WorldWide } from "../../../utils/icons/icons";

const contactItems = [
  {
    icon: WorldWide,
    text: "www.setalsham.com",
    href: "https://www.setalsham.com",
    label: "الموقع الإلكتروني",
  },
  {
    icon: Envelope,
    text: "info@setalsham.com",
    href: "mailto:info@setalsham.com",
    label: "البريد الإلكتروني",
  },
  {
    icon: Call,
    text: "+358 46 520 2214",
    href: "tel:+358465202214",
    label: "الهاتف",
  },
];

const socialLinks = [
  {
    icon: FaThreads,
    href: "https://www.threads.com/",
    label: "Threads",
  },
  {
    icon: FaTiktok,
    href: "https://tiktok.com",
    label: "TikTok",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: FaXTwitter,
    href: "https://x.com",
    label: "X",
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
];

const ContactInfoBar = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto ">
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-12">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group bg-[#F2F2F2]  rounded-sm p-6 transition-all duration-300 hover:border-[#DCB56D] hover:shadow-xl hover:-translate-y-1"
              >
                {/* Icon Container with Badge */}
                <div className="relative flex items-center justify-center mb-4">
                  {/* Yellow Transparent Badge Circle */}
                  <div
                    className="absolute w-10 h-10 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                    style={{
                      backgroundColor: "#FFCC00",
                    }}
                  />

                  {/* Icon */}
                  <div className="relative z-10 w-20 h-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Icon
                      className="w-[80px] h-[80px] text-[#707070] transition-colors duration-300 group-hover:text-[#023048]"
                      strokeWidth={2}
                    />
                  </div>
                </div>

                {/* Text */}
                <p
                  dir="ltr"
                  className="font-montserrat! text-[#000000] font-normal text-base md:text-lg text-center transition-colors duration-300 group-hover:text-[#DCB56D]"
                >
                  {item.text}
                </p>
              </a>
            );
          })}
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group relative"
              >
                <div className="w-10 h-10 bg-[#DCB56D] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-[#DCB56D]/40">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Tooltip */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#023048] text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                  {social.label}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoBar;
