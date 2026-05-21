import { getLocale } from "next-intl/server";

export const metadata = {
  title: "Privacy Policy | Al Reaya Al Owla Medicine",
};

const content = {
  en: {
    title: "Privacy policy",
    updated: "Last updated: February 21, 2026",
    sections: [
      {
        title: "Personal information we collect",
        text: "We may collect contact details, payment and transaction information, account information, device data, usage information, and communications you send to us.",
      },
      {
        title: "How we use your information",
        text: "We use your information to provide and improve the services, process payments and orders, manage accounts, arrange shipping, support returns, prevent fraud, communicate with you, and comply with legal obligations.",
      },
      {
        title: "How we disclose information",
        text: "We may share information with Shopify, service providers, payment processors, fulfillment partners, analytics providers, marketing partners, affiliates, and authorities when required by law.",
      },
      {
        title: "Your rights and choices",
        text: "Depending on where you live, you may have rights to access, delete, correct, or receive a copy of your personal information. You may also manage marketing communication preferences.",
      },
      {
        title: "Contact",
        text: "For privacy questions, please contact us at Dloahmad.86@hotmail.com or at AL QULIAHA, shop2, Sharjah, UAE.",
      },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    updated: "آخر تحديث: 21 فبراير 2026",
    sections: [
      {
        title: "المعلومات الشخصية التي نجمعها",
        text: "قد نجمع بيانات التواصل، ومعلومات الدفع والمعاملات، ومعلومات الحساب، وبيانات الجهاز، ومعلومات الاستخدام، وأي مراسلات ترسلها إلينا.",
      },
      {
        title: "كيف نستخدم معلوماتك",
        text: "نستخدم معلوماتك لتقديم الخدمات وتحسينها، ومعالجة المدفوعات والطلبات، وإدارة الحسابات، وترتيب الشحن، ودعم عمليات الاسترجاع، ومنع الاحتيال، والتواصل معك، والامتثال للالتزامات القانونية.",
      },
      {
        title: "كيف نشارك المعلومات",
        text: "قد نشارك المعلومات مع Shopify ومقدمي الخدمات ومعالجي الدفع وشركاء تنفيذ الطلبات ومزودي التحليلات وشركاء التسويق والشركات التابعة والجهات المختصة عند الحاجة القانونية.",
      },
      {
        title: "حقوقك وخياراتك",
        text: "بحسب مكان إقامتك، قد يكون لك حق الوصول إلى معلوماتك الشخصية أو حذفها أو تصحيحها أو الحصول على نسخة منها. يمكنك أيضاً إدارة تفضيلات الرسائل التسويقية.",
      },
      {
        title: "التواصل",
        text: "لأي أسئلة متعلقة بالخصوصية، يمكنك التواصل معنا عبر Dloahmad.86@hotmail.com أو على عنوان AL QULIAHA, shop2, Sharjah, UAE.",
      },
    ],
  },
};

export default async function PrivacyPolicy() {
  const locale = await getLocale();
  const page = locale === "ar" ? content.ar : content.en;
  const isRTL = locale === "ar";

  return (
    <main className="min-h-screen bg-white py-12 font-sans md:py-20" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-4 text-center text-[clamp(2.25rem,5vw,3.25rem)] font-medium leading-tight text-soft-black">
          {page.title}
        </h1>
        <p className="mb-10 text-center text-sm text-soft-black/60">{page.updated}</p>

        <div className="space-y-7 text-base leading-8 text-soft-black/75">
          {page.sections.map((section) => (
            <section key={section.title} className="space-y-2">
              <h2 className="text-xl font-semibold text-soft-black">{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
