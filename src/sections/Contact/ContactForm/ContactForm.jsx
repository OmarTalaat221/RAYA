// components/Contact/ContactForm.jsx

"use client";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    fullName: "",
    email: "",
    message: "",
    subscribe: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [captchaValue, setCaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("الرجاء التحقق من أنك لست روبوتًا");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", { ...formData, captcha: captchaValue });
      setSubmitStatus("success");

      // Reset form
      setFormData({
        phone: "",
        fullName: "",
        email: "",
        message: "",
        subscribe: false,
      });

      // Reset reCAPTCHA
      setCaptchaValue(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Phone Number */}
        <div>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            dir="ltr"
            placeholder="رقم الهاتف"
            className="w-full px-5 py-4 bg-[#FAF2EA] border border-[#023048]/10 rounded-md focus:border-[#DCB56D] focus:outline-none transition-colors text-right placeholder:text-[#023048]/40"
          />
        </div>

        {/* Full Name */}
        <div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="اسمك الكامل"
            className="w-full px-5 py-4 bg-[#FAF2EA] border border-[#023048]/10 rounded-md focus:border-[#DCB56D] focus:outline-none transition-colors placeholder:text-[#023048]/40"
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            dir="ltr"
            placeholder="البريد الإلكتروني"
            className="w-full px-5 py-4 bg-[#FAF2EA] border border-[#023048]/10 rounded-md focus:border-[#DCB56D] focus:outline-none transition-colors text-right placeholder:text-[#023048]/40"
          />
        </div>

        {/* Message */}
        <div>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="الرسالة"
            className="w-full px-5 py-4 bg-[#FAF2EA] border border-[#023048]/10 rounded-md focus:border-[#DCB56D] focus:outline-none transition-colors resize-none placeholder:text-[#023048]/40"
          />
        </div>

        {/* Subscribe Checkbox */}
        <div className="flex items-center gap-3 py-2">
          <div className="relative">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
              className="peer sr-only"
            />
            <div
              onClick={() =>
                setFormData((prev) => ({ ...prev, subscribe: !prev.subscribe }))
              }
              className={`
                w-6 h-6 rounded border-2 cursor-pointer transition-all duration-200
                flex items-center justify-center
                ${
                  formData.subscribe
                    ? "bg-[#DCB56D] border-[#DCB56D]"
                    : "bg-white border-[#023048]/30 hover:border-[#DCB56D]"
                }
              `}
            >
              {formData.subscribe && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>
          <label
            htmlFor="subscribe"
            className="text-[#023048]/80 text-base cursor-pointer select-none"
          >
            ارسل لي آخر الأخبار والعروض
          </label>
        </div>

        {/* Google reCAPTCHA */}
        <div className="flex justify-start py-2 ">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={"6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
            onChange={handleCaptchaChange}
            onExpired={() => setCaptchaValue(null)}
            hl="ar"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !captchaValue}
          className={`
            w-full py-4 px-6 rounded-md font-bold text-lg text-white
            transition-all duration-300
            ${
              isSubmitting || !captchaValue
                ? "bg-[#DCB56D]/50 cursor-not-allowed"
                : "bg-[#DCB56D] hover:bg-[#c9a227] hover:shadow-lg hover:scale-[1.02]"
            }
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              جاري الإرسال...
            </span>
          ) : (
            "تأكيد الرسالة"
          )}
        </button>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div className="bg-green-50 border-r-4 border-green-500 text-green-700 px-5 py-4 rounded">
            <p className="font-bold">✅ تم إرسال رسالتك بنجاح!</p>
            <p className="text-sm mt-1">سنتواصل معك في أقرب وقت ممكن.</p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div className="bg-red-50 border-r-4 border-red-500 text-red-700 px-5 py-4 rounded">
            <p className="font-bold">❌ حدث خطأ!</p>
            <p className="text-sm mt-1">الرجاء المحاولة مرة أخرى.</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
