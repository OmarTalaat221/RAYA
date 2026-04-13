// components/Contact/ContactInfo.jsx

import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    title: "الهاتف",
    content: "+358 46 520 2214",
    link: "tel:+358465202214",
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    content: "[email protected]",
    link: "mailto:[email protected]",
  },
  {
    icon: MapPin,
    title: "العنوان",
    content: "برلين، ألمانيا",
    link: "https://maps.google.com",
  },
  {
    icon: Clock,
    title: "ساعات العمل",
    content: "السبت - الخميس: 9 ص - 6 م",
  },
];

const ContactInfo = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {contactDetails.map((item, index) => {
        const Icon = item.icon;
        const content = item.link ? (
          <a
            href={item.link}
            target={item.link.startsWith("http") ? "_blank" : undefined}
            rel={
              item.link.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="text-[#DCB56D] hover:underline"
          >
            {item.content}
          </a>
        ) : (
          <span className="text-[#023048]/80">{item.content}</span>
        );

        return (
          <div
            key={index}
            className="bg-[#faf8f5] p-6 rounded-lg flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-[#DCB56D]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-[#DCB56D]" />
            </div>
            <div>
              <h3 className="text-[#023048] font-bold text-lg mb-1">
                {item.title}
              </h3>
              {content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactInfo;
