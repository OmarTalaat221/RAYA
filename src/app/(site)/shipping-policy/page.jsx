import { getLocale } from "next-intl/server";

export const metadata = {
  title: "Shipping Policy | Al Reaya Al Owla Medicine",
};

const content = {
  en: {
    title: "Shipping policy",
    lines: ["Free Delivery over 150AED", "Delivery within two working Days"],
  },
  ar: {
    title: "سياسة الشحن",
    lines: ["توصيل مجاني للطلبات التي تزيد عن 150 درهم", "التوصيل خلال يومي عمل"],
  },
};

export default async function ShippingPolicy() {
  const locale = await getLocale();
  const page = locale === "ar" ? content.ar : content.en;
  const isRTL = locale === "ar";

  return (
    <main className="bg-white py-12 font-sans md:py-20" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-10 text-center text-[clamp(2.25rem,5vw,3.25rem)] font-medium leading-tight text-soft-black">
          {page.title}
        </h1>

        <div className="space-y-4 text-base leading-8 text-soft-black/75">
          {page.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
