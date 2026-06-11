import { getLocale } from "next-intl/server";

import {
  SITE_NAME,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "../../../lib/site-config";

export const metadata = {
  title: `Terms and Conditions | ${SITE_NAME}`,
  description:
    "Read RDS Pharma Terms and Conditions covering online store use, products, prices, billing, third-party links, and liability.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    type: "website",
    title: `Terms and Conditions | ${SITE_NAME}`,
    description:
      "Read RDS Pharma Terms and Conditions covering online store use, products, prices, billing, third-party links, and liability.",
    url: "/terms-and-conditions",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms and Conditions | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

const content = {
  en: {
    title: "Terms of service",
    sections: [
      {
        title: "Overview",
        text: "By visiting our site or purchasing from us, you agree to be bound by these Terms of Service and all related policies. Please read them carefully before using the website.",
      },
      {
        title: "Online store terms",
        text: "You may not use our products or services for any illegal or unauthorized purpose, and you must not transmit destructive code or violate applicable laws.",
      },
      {
        title: "General conditions",
        text: "We reserve the right to refuse service to anyone for any reason at any time. You agree not to copy, resell, or exploit any part of the service without written permission.",
      },
      {
        title: "Products and prices",
        text: "Product descriptions, availability, and prices may change without notice. Some products may be available exclusively online and may have limited quantities.",
      },
      {
        title: "Billing and account information",
        text: "You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.",
      },
      {
        title: "Third-party links and tools",
        text: "We may provide access to third-party tools or links. Your use of these tools or websites is at your own risk and subject to their terms.",
      },
      {
        title: "Limitation of liability",
        text: "The service and products are provided as available. We are not liable for indirect, incidental, special, or consequential damages to the maximum extent permitted by law.",
      },
      {
        title: "Governing law and contact",
        text: "These terms are governed by the laws of the United Arab Emirates. Questions about the terms should be sent to Rdspharma.online@gmail.com.",
      },
    ],
  },
  ar: {
    title: "الشروط والأحكام",
    sections: [
      {
        title: "نظرة عامة",
        text: "باستخدامك لموقعنا أو الشراء من متجرنا، فإنك توافق على الالتزام بهذه الشروط والأحكام وجميع السياسات المرتبطة بها. يرجى قراءتها بعناية قبل استخدام الموقع.",
      },
      {
        title: "شروط المتجر الإلكتروني",
        text: "لا يجوز استخدام منتجاتنا أو خدماتنا لأي غرض غير قانوني أو غير مصرح به، كما يجب عدم إرسال أي أكواد ضارة أو مخالفة القوانين المعمول بها.",
      },
      {
        title: "الشروط العامة",
        text: "نحتفظ بحق رفض الخدمة لأي شخص ولأي سبب وفي أي وقت. كما توافق على عدم نسخ أو إعادة بيع أو استغلال أي جزء من الخدمة دون إذن كتابي.",
      },
      {
        title: "المنتجات والأسعار",
        text: "قد تتغير أوصاف المنتجات وتوفرها وأسعارها دون إشعار مسبق. بعض المنتجات قد تكون متاحة حصرياً عبر الإنترنت وبكميات محدودة.",
      },
      {
        title: "معلومات الفواتير والحساب",
        text: "توافق على تقديم معلومات شراء وحساب صحيحة وكاملة ومحدثة لجميع عمليات الشراء التي تتم من خلال متجرنا.",
      },
      {
        title: "روابط وأدوات الطرف الثالث",
        text: "قد نوفر روابط أو أدوات تابعة لأطراف ثالثة. استخدامك لهذه الأدوات أو المواقع يكون على مسؤوليتك ووفقاً لشروطها الخاصة.",
      },
      {
        title: "حدود المسؤولية",
        text: "تتوفر الخدمة والمنتجات كما هي وحسب التوفر. لا نتحمل مسؤولية الأضرار غير المباشرة أو العرضية أو الخاصة أو التبعية إلى الحد الذي يسمح به القانون.",
      },
      {
        title: "القانون المعمول به والتواصل",
        text: "تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة. يمكن إرسال أي أسئلة حول الشروط إلى Rdspharma.online@gmail.com.",
      },
    ],
  },
};

export default async function TermsOfService() {
  const locale = await getLocale();
  const page = locale === "ar" ? content.ar : content.en;
  const isRTL = locale === "ar";

  return (
    <main
      className="min-h-screen bg-white py-12 font-sans md:py-20"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-10 text-center text-[clamp(2.25rem,5vw,3.25rem)] font-medium leading-tight text-soft-black">
          {page.title}
        </h1>

        <div className="space-y-7 text-base leading-8 text-soft-black/75">
          {page.sections.map((section) => (
            <section key={section.title} className="space-y-2">
              <h2 className="text-xl font-semibold text-soft-black">
                {section.title}
              </h2>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}