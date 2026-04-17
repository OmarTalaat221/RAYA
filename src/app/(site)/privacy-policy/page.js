"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
  const router = useRouter();

  const handleNext = () => {
    router.back();
  };

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center p-3 md:p-8 font-sans"
      dir="rtl"
    >
      {/* ستايل الـ Scrollbar المخصص */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #FDF8EB;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #D4AF5B;
          border-radius: 10px;
        }
      `}</style>

      {/* الكارت الأبيض الأساسي */}
      <div className="bg-white w-full container h-[92vh] md:h-[90vh] flex flex-col py-8 px-4 md:py-10 md:px-14 rounded-xl">
        {/* العناوين العلوية */}
        <div className="text-right mb-6 md:mb-10 shrink-0 md:pr-12 pr-4">
          <h1 className="text-[#D4AF5B] font-bold mb-2 md:mb-4 text-3xl md:text-5xl lg:text-[50px] leading-tight">
            سياسة الخصوصية وحماية البيانات (+GDPR)
          </h1>
          <p className="text-[#023048] font-bold text-base md:text-2xl lg:text-[32px] leading-snug">
            يرجى قراءة العقد جيدا والتوقيع في حال الموافقة
          </p>
        </div>

        {/* منطقة المحتوى القابلة للتمرير */}
        <div className="flex-1 min-h-0 relative overflow-hidden w-full">
          <div
            style={{ direction: "ltr" }}
            className="absolute inset-0 overflow-y-auto custom-scrollbar pr-3 md:pr-10"
          >
            <div className="flex flex-col gap-8 pb-4 text-right" dir="rtl">
              {/* البند 1 */}
              <div>
                <h2 className="text-[#023048] font-bold text-[15px] mb-3">
                  1. مقدمة
                </h2>
                <p className="text-[#023048] text-[13px] leading-relaxed">
                  نحن ملتزمون بحماية خصوصية بيانات عملائنا وزوار موقعنا. توضح
                  هذه السياسة كيفية جمع واستخدام ومعالجة وحماية البيانات الشخصية
                  وفقًا لأحكام اللائحة العامة لحماية البيانات الأوروبية (GDPR)
                  وأفضل الممارسات الدولية في حماية البيانات.
                </p>
              </div>

              {/* البند 2 */}
              <div>
                <h2 className="text-[#023048] font-bold text-[15px] mb-3">
                  2. البيانات التي نقوم بجمعها
                </h2>
                <p className="text-[#023048] text-[13px] mb-4">
                  قد نقوم بجمع الأنواع التالية من البيانات:
                </p>
                <div className="text-[#023048] text-[13px] flex flex-col gap-2.5">
                  <p>الاسم الكامل</p>
                  <p>البريد الإلكتروني</p>
                  <p>رقم الهاتف</p>
                  <p>عنوان IP</p>
                  <p>معلومات المتصفح والجهاز</p>
                  <p>بيانات النماذج والاستفسارات</p>
                  <p>أي معلومات يزودنا بها المستخدم طوعًا</p>
                </div>
              </div>

              {/* البند 3 */}
              <div>
                <h2 className="text-[#023048] font-bold text-[15px] mb-3">
                  3. كيفية استخدام البيانات
                </h2>
                <p className="text-[#023048] text-[13px] mb-4">
                  نستخدم البيانات للأغراض التالية:
                </p>
                <div className="text-[#023048] text-[13px] flex flex-col gap-2.5">
                  <p>الرد على الاستفسارات وطلبات التواصل</p>
                  <p>تقديم الخدمات المتفق عليها</p>
                  <p>تحسين تجربة المستخدم على الموقع</p>
                  <p>إرسال إشعارات أو عروض (بعد موافقة المستخدم)</p>
                  <p>الامتثال للالتزامات القانونية</p>
                </div>
              </div>

              {/* البند 4 */}
              <div>
                <h2 className="text-[#023048] font-bold text-[15px] mb-3">
                  4. الأساس القانوني للمعالجة
                </h2>
                <p className="text-[#023048] text-[13px] mb-4">
                  نقوم بمعالجة البيانات استنادًا إلى:
                </p>
                <div className="text-[#023048] text-[13px] flex flex-col gap-2.5">
                  <p>موافقة المستخدم</p>
                  <p>تنفيذ عقد أو طلب خدمة</p>
                  <p>الامتثال لالتزام قانوني</p>
                  <p>المصلحة المشروعة للمؤسسة دون الإضرار بحقوق المستخدم</p>
                </div>
              </div>

              {/* البند 5 */}
              <div>
                <h2 className="text-[#023048] font-bold text-[15px] mb-3">
                  5. مشاركة البيانات
                </h2>
                <p className="text-[#023048] text-[13px] mb-2">
                  لا نقوم ببيع أو تأجير بياناتك الشخصية.
                </p>
                <p className="text-[#023048] text-[13px] mb-4">
                  قد نشارك البيانات فقط مع:
                </p>
                <div className="text-[#023048] text-[13px] flex flex-col gap-2.5 mb-4">
                  <p>
                    مزودي الخدمات التقنيين (الاستضافة، البريد الإلكتروني، أنظمة
                    CRM)
                  </p>
                  <p>الجهات القانونية عند الطلب الرسمي</p>
                </div>
                <p className="text-[#023048] text-[13px]">
                  وجميع الأطراف تلتزم بمعايير حماية البيانات.
                </p>
              </div>

              {/* البند 6 */}
              <div>
                <h2 className="text-[#023048] font-bold text-[15px] mb-3">
                  6. نقل البيانات خارج الاتحاد الأوروبي
                </h2>
                <p className="text-[#023048] text-[13px] leading-relaxed">
                  في حال نقل البيانات خارج الاتحاد الأوروبي، نضمن وجود آليات
                  حماية مناسبة مثل البنود التعاقدية القياسية المعتمدة من
                  المفوضية الأوروبية.
                </p>
              </div>

              {/* البند 7 */}
              <div>
                <h2 className="text-[#023048] font-bold text-[15px] mb-3">
                  7. مدة الاحتفاظ بالبيانات
                </h2>
                <p className="text-[#023048] text-[13px] leading-relaxed">
                  نحتفظ بالبيانات فقط للفترة اللازمة لتحقيق الغرض الذي جُمعت من
                  أجله، أو وفقًا لما يتطلبه القانون.
                </p>
              </div>

              {/* البند 8 */}
              <div>
                <h2 className="text-[#023048] font-bold text-[15px] mb-3">
                  8. حقوق المستخدم
                </h2>
                <p className="text-[#023048] text-[13px] mb-4">
                  بموجب GDPR يحق لك:
                </p>
                <div className="text-[#023048] text-[13px] flex flex-col gap-2.5 mb-4">
                  <p>طلب الوصول إلى بياناتك</p>
                  <p>تصحيح البيانات غير الدقيقة</p>
                  <p>طلب حذف البيانات (الحق في النسيان)</p>
                  <p>تقييد المعالجة</p>
                  <p>الاعتراض على المعالجة</p>
                  <p>نقل البيانات إلى مزود آخر</p>
                  <p>سحب الموافقة في أي وقت</p>
                </div>
                <p className="text-[#023048] text-[13px] leading-relaxed">
                  لممارسة أي من هذه الحقوق، يرجى التواصل معنا عبر وسائل الاتصال
                  الموضحة أدناه.
                </p>
              </div>

              {/* البند 9 */}
              <div>
                <h2 className="text-[#023048] font-bold text-[15px] mb-3">
                  9. ملفات تعريف الارتباط (Cookies)
                </h2>
                <p className="text-[#023048] text-[13px] leading-relaxed">
                  نستخدم ملفات تعريف الارتباط لتحسين الأداء وتجربة المستخدم.
                  يمكنك التحكم في إعدادات الكوكيز عبر متصفحك أو من خلال أداة
                  إدارة الموافقات بالموقع.
                </p>
              </div>

              {/* البند 10 */}
              <div>
                <h2 className="text-[#023048] font-bold text-[15px] mb-3">
                  10. أمان البيانات
                </h2>
                <p className="text-[#023048] text-[13px] leading-relaxed">
                  نطبق تدابير تقنية وإدارية مناسبة لحماية البيانات من الوصول غير
                  المصرح به أو الفقدان أو التعديل أو الإفصاح.
                </p>
              </div>

              {/* البند 11 */}
              <div>
                <h2 className="text-[#023048] font-bold text-[15px] mb-3">
                  11. خصوصية الأطفال
                </h2>
                <p className="text-[#023048] text-[13px] leading-relaxed">
                  لا نستهدف جمع بيانات من الأطفال دون سن 16 عامًا. في حال اكتشاف
                  ذلك، سيتم حذف البيانات فورًا.
                </p>
              </div>

              {/* البند 12 */}
              <div>
                <h2 className="text-[#023048] font-bold text-[15px] mb-3">
                  12. التعديلات على السياسة
                </h2>
                <p className="text-[#023048] text-[13px] leading-relaxed">
                  قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم نشر أي تغييرات
                  على هذه الصفحة مع تاريخ التحديث.
                </p>
              </div>

              {/* البند 13 */}
              <div>
                <h2 className="text-[#023048] font-bold text-[15px] mb-3">
                  13. معلومات التواصل
                </h2>
                <p className="text-[#023048] text-[13px] mb-3">
                  لأي استفسارات متعلقة بالخصوصية أو لحماية البيانات، يمكنكم
                  التواصل عبر:
                </p>
                <div className="text-[#023048] text-[13px] flex flex-col gap-2 font-bold">
                  <p>البريد الإلكتروني: [ضع بريدك هنا]</p>
                  <p>العنوان: [ضع عنوان شركتك هنا]</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* زر التالي */}
        <div className="shrink-0 mt-4 md:mt-6 pt-4 border-t border-gray-50 flex justify-center">
          <button
            onClick={handleNext}
            className="bg-[#D4AF5B] hover:bg-[#c49f4b] transition-all duration-300 text-[#023048] font-bold text-base md:text-xl w-full sm:w-[260px] lg:w-[220px] py-3 md:py-3.5 rounded-md shadow-sm"
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}
