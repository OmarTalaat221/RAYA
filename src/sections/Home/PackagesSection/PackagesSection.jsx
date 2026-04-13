// components/PackagesSection/PackagesSection.jsx

"use client";

const PackagesSection = () => {
  const packages = [
    {
      id: 1,
      name: "الباقة الملكية",
      services: [
        "البحث عن شريك",
        "فرقة زفة ودقة ستي للسيدات",
        "فرقة العراضة الشامية رجال",
        "تأجير بدلات",
      ],
    },
    {
      id: 2,
      name: "الباقة المميزة",
      services: [
        "البحث عن شريك",
        "فرقة زفة ودقة ستي للسيدات",
        "فرقة العراضة الشامية رجال",
        "تأجير بدلات",
      ],
    },
    {
      id: 3,
      name: "الباقة الاقتصادية",
      services: [
        "البحث عن شريك",
        "فرقة زفة ودقة ستي للسيدات",
        "فرقة العراضة الشامية رجال",
        "تأجير بدلات",
      ],
    },
  ];

  return (
    <section className="w-full bg-white py-10 md:py-14 lg:py-18" dir="rtl">
      <div className="container-custom mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="relative text-3xl md:text-5xl lg:text-6xl font-bold text-[#023048] text-center mb-5 w-fit mx-auto">
            باقات الأفراح
            <div className="absolute -bottom-[20px] w-[100%] md:w-full h-[1px] bg-[#023048] mx-auto" />
          </h2>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 pb-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="relative group transition-transform duration-300 hover:-translate-y-3 h-full"
            >
              <div className="flex flex-col rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl transition-shadow duration-300 h-full bg-[#faf2ea]">
                {/* Card Header */}
                <div className="bg-[#023048] py-4 md:py-5 lg:py-6 px-4 rounded-2xl">
                  <h3 className="text-2xl md:text-[28px] lg:text-3xl font-bold text-white text-center">
                    {pkg.name}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="flex-1 bg-[#faf2ea] flex flex-col items-center px-4 md:px-6 py-8 pb-16 lg:pb-20">
                  {/* Services List */}
                  <ul className="space-y-4 mb-8 w-full">
                    {pkg.services.map((service, index) => (
                      <li
                        key={index}
                        className="text-[#023048] text-base md:text-lg lg:text-[20px] text-center leading-relaxed font-semibold"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>

                  <div className="flex-1" />

                  {/* Ask for Price - بدلاً من السعر */}
                  <div className="mt-4 flex items-center justify-center">
                    <span className="text-xl md:text-2xl lg:text-3xl font-bold text-[#023048]">
                      اسأل عن السعر
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button - الزرار الطائر */}
              <button
                onClick={() =>
                  window.open("https://wa.me/358465202214", "_blank")
                }
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 
                           w-[80%] md:w-[70%] max-w-[220px] py-3 md:py-4 px-6 z-10
                           bg-[#E1C572] hover:bg-[#c9a227]
                           text-[#023048] font-bold text-lg md:text-2xl
                           rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                احجز الآن
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
