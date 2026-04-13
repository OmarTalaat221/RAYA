// components/ServicesSection/ServicesSection.jsx

"use client";

import Link from "next/link";
import { servicesData } from "~/utils/data/servicesData";

const ServicesSection = () => {
  const displayOrder = [3, 2, 1, 6, 5, 4, 9, 8, 7];
  const services = displayOrder.map((id) =>
    servicesData.find((s) => s.id === id)
  );

  return (
    <section className="w-full py-10 md:py-14 lg:py-18" dir="rtl">
      <div className="container-custom mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#023048] text-center mb-12 md:mb-16 lg:mb-20">
          خدماتنا
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <Link
              key={service.id}
              // ✅ هنا بنستخدم Search Params
              href={
                service.login ? "/login" : `/services-details?id=${service.id}`
              }
              className="group flex flex-col items-center cursor-pointer"
            >
              <div
                className="w-full aspect-[377/264] rounded-2xl overflow-hidden
                            border-2 border-[#DCB56D]/60
                            transition-all duration-300
                            group-hover:shadow-lg group-hover:shadow-[#DCB56D]/20
                            group-hover:-translate-y-1
                            group-hover:border-[#DCB56D]"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full! object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-4 text-xl lg:text-[22px] xl:text-3xl font-semibold text-[#023048] text-center">
                {service.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 md:mt-16 lg:mt-20">
          <div className="relative w-full rounded-2xl overflow-hidden bg-[#DCB56D]">
            <img
              src="https://res.cloudinary.com/dp7jfs375/image/upload/v1772625741/Image_14_mt1wig.png"
              alt="تنظيم الحفلات"
              className="w-full h-auto block"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, 
                  rgba(220, 181, 109, 0.598) 0%, 
                  rgba(220, 181, 109, 0.2) 25%, 
                  rgba(220, 181, 109, 0.1) 50%, 
                  rgba(220, 181, 109, 0) 100%)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-start pr-8 md:pr-12 lg:pr-16">
              <h3 className="text-xl md:text-4xl lg:text-5xl font-bold text-[#023048]">
                تنظيم الحفلات
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
