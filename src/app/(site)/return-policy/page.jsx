import { getLocale } from "next-intl/server";

export const metadata = {
  title: "Refund Policy | RDS Pharma",
};

const content = {
  en: {
    title: "Refund policy",
    paragraphs: [
      "We have a 7-day return policy, which means you have 7 days after receiving your item to request a return.",
      "To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.",
      "To start a return, you can contact us at Rdspharma.online@gmail.com. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.",
      "You can always contact us for any return question at Rdspharma.online@gmail.com.",
    ],
    sections: [
      {
        title: "Damages and issues",
        text: "Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.",
      },
      {
        title: "Exceptions / non-returnable items",
        text: "Certain types of items cannot be returned, like perishable goods, custom products, and personal care goods. We also do not accept returns for hazardous materials, flammable liquids, or gases. Unfortunately, we cannot accept returns on sale items or gift cards.",
      },
      {
        title: "Exchanges",
        text: "The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.",
      },
      {
        title: "Refunds",
        text: "We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method.",
      },
    ],
  },
  ar: {
    title: "سياسة الاسترجاع",
    paragraphs: [
      "لدينا سياسة استرجاع لمدة 7 أيام، مما يعني أن لديك 7 أيام بعد استلام طلبك لتقديم طلب الاسترجاع.",
      "حتى يكون المنتج مؤهلاً للاسترجاع، يجب أن يكون بنفس الحالة التي استلمته بها، غير مستخدم أو غير مرتدى، مع الملصقات وفي عبوته الأصلية. ستحتاج أيضاً إلى إيصال الشراء أو إثبات الشراء.",
      "لبدء طلب الاسترجاع، يمكنك التواصل معنا عبر Rdspharma.online@gmail.com. إذا تم قبول طلبك، سنرسل لك تعليمات الشحن وكيفية ومكان إرسال المنتج. لن يتم قبول المنتجات المرسلة إلينا دون تقديم طلب استرجاع مسبق.",
      "يمكنك دائماً التواصل معنا لأي سؤال متعلق بالاسترجاع عبر Rdspharma.online@gmail.com.",
    ],
    sections: [
      {
        title: "الأضرار والمشكلات",
        text: "يرجى فحص الطلب عند الاستلام والتواصل معنا فوراً إذا كان المنتج تالفاً أو معيباً أو إذا استلمت منتجاً خاطئاً، حتى نتمكن من تقييم المشكلة وحلها.",
      },
      {
        title: "الاستثناءات / المنتجات غير القابلة للاسترجاع",
        text: "بعض أنواع المنتجات لا يمكن استرجاعها، مثل المنتجات القابلة للتلف، والطلبات الخاصة أو المخصصة، ومنتجات العناية الشخصية. كما لا نقبل استرجاع المواد الخطرة أو السوائل أو الغازات القابلة للاشتعال. للأسف لا يمكننا قبول استرجاع المنتجات المخفضة أو بطاقات الهدايا.",
      },
      {
        title: "الاستبدال",
        text: "أسرع طريقة للحصول على المنتج المطلوب هي إرجاع المنتج الحالي، وبعد قبول الإرجاع يمكنك إجراء طلب شراء جديد للمنتج البديل.",
      },
      {
        title: "المبالغ المستردة",
        text: "سنخطرك بعد استلام وفحص المنتج المرتجع لإبلاغك بما إذا تمت الموافقة على رد المبلغ أم لا. عند الموافقة، سيتم رد المبلغ تلقائياً إلى وسيلة الدفع الأصلية.",
      },
    ],
  },
};

export default async function RefundPolicy() {
  const locale = await getLocale();
  const page = locale === "ar" ? content.ar : content.en;
  const isRTL = locale === "ar";

  return (
    <main className="min-h-screen bg-white py-12 font-sans md:py-20" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-10 text-center text-[clamp(2.25rem,5vw,3.25rem)] font-medium leading-tight text-soft-black">
          {page.title}
        </h1>

        <div className="space-y-6 text-base leading-8 text-soft-black/75">
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

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
