"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, ChevronDown } from "lucide-react";
import { ConfigProvider, Select } from "antd";

const formVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1,
    },
  },
};

const inquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "product", label: "Product Question" },
  { value: "order", label: "Order Support" },
  { value: "partnership", label: "Partnership" },
  { value: "feedback", label: "Complaint / Feedback" },
];

const selectTheme = {
  token: {
    colorPrimary: "#68bc52",
    borderRadius: 12,
    fontFamily: "Poppins, sans-serif",
    colorBgElevated: "#f4f3f0",
    colorText: "#2d2d2d",
    boxShadowSecondary: "0 18px 40px rgba(15, 23, 42, 0.16)",
  },
  components: {
    Select: {
      optionSelectedBg: "rgba(104, 188, 82, 0.14)",
      optionActiveBg: "rgba(104, 188, 82, 0.08)",
      optionSelectedColor: "#2d2d2d",
    },
  },
};

const selectGlobalStyles = `
  .contact-inquiry-select {
    width: 100% !important;
    height: 48px !important;
  }

  .contact-inquiry-select .ant-select-selector {
    width: 100% !important;
    height: 48px !important;
    min-height: 48px !important;
    border-radius: 12px !important;
    border: 1px solid #e5e7eb !important;
    background: #ffffff !important;
    box-shadow: none !important;
    padding: 0 14px !important;
    display: flex !important;
    align-items: center !important;
  }

  .contact-inquiry-select .ant-select-selection-wrap {
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
  }

  .contact-inquiry-select .ant-select-selection-search {
    inset-inline-start: 14px !important;
    inset-inline-end: 40px !important;
    display: flex !important;
    align-items: center !important;
  }

  .contact-inquiry-select .ant-select-selection-search-input {
    height: 46px !important;
  }

  .contact-inquiry-select .ant-select-selection-item,
  .contact-inquiry-select .ant-select-selection-placeholder {
    height: 46px !important;
    line-height: 46px !important;
    display: block !important;
    font-family: Poppins, sans-serif !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .contact-inquiry-select .ant-select-selection-item {
    color: #2d2d2d !important;
  }

  .contact-inquiry-select .ant-select-selection-placeholder {
    color: #9ca3af !important;
  }

  .contact-inquiry-select:hover .ant-select-selector {
    border-color: #d1d5db !important;
  }

  .contact-inquiry-select.ant-select-focused .ant-select-selector,
  .contact-inquiry-select.ant-select-open .ant-select-selector {
    border-color: rgba(104, 188, 82, 0.4) !important;
    box-shadow: 0 0 0 2px rgba(104, 188, 82, 0.1) !important;
  }

  .contact-inquiry-select .ant-select-arrow {
    width: 16px !important;
    height: 16px !important;
    inset-inline-end: 14px !important;
    margin-top: -8px !important;
    color: #93979a !important;
  }

  .contact-inquiry-dropdown {
    border-radius: 14px !important;
    overflow: hidden !important;
  }

  .contact-inquiry-dropdown .ant-select-item {
    font-family: Poppins, sans-serif !important;
    font-size: 14px !important;
    color: #2d2d2d !important;
    background: #ffffff !important;
  }

  .contact-inquiry-dropdown .ant-select-item-option-selected {
    background: rgba(104, 188, 82, 0.14) !important;
  }

  .contact-inquiry-dropdown .ant-select-item-option-active {
    background: rgba(104, 188, 82, 0.08) !important;
  }
`;

const InputField = memo(function InputField({
  label,
  id,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
  ...rest
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-poppins! text-[11px] font-medium uppercase tracking-[0.14em] text-secondary"
      >
        {label}
        {required && <span className="ml-0.5 text-main">*</span>}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 font-poppins! text-[14px] font-medium text-soft-black outline-none transition-all duration-200 placeholder:text-gray-300 focus:border-main/40 focus:ring-2 focus:ring-main/10"
        {...rest}
      />
    </div>
  );
});

const TextareaField = memo(function TextareaField({
  label,
  id,
  required = false,
  placeholder,
  rows = 5,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-poppins! text-[11px] font-medium uppercase tracking-[0.14em] text-secondary"
      >
        {label}
        {required && <span className="ml-0.5 text-main">*</span>}
      </label>

      <textarea
        id={id}
        name={id}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 font-poppins! text-[14px] font-medium text-soft-black outline-none transition-all duration-200 placeholder:text-gray-300 focus:border-main/40 focus:ring-2 focus:ring-main/10"
      />
    </div>
  );
});

const SelectField = memo(function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block font-poppins! text-[11px] font-medium uppercase tracking-[0.14em] text-secondary">
        {label}
      </label>

      {/* hidden input so FormData can read inquiryType */}
      <input type="hidden" name="inquiryType" value={value || ""} readOnly />

      <Select
        size="large"
        value={value}
        onChange={onChange}
        options={options}
        placeholder="Select inquiry type"
        showSearch={false}
        suffixIcon={<ChevronDown size={16} />}
        className="contact-inquiry-select"
        popupClassName="contact-inquiry-dropdown"
        getPopupContainer={(trigger) => trigger.parentElement}
      />
    </div>
  );
});

export default function ContactForm() {
  const formRef = useRef(null);
  const timeoutRef = useRef(null);

  const [status, setStatus] = useState("idle");
  const [inquiryType, setInquiryType] = useState(undefined);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleInquiryChange = useCallback((value) => {
    setInquiryType(value);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (status === "sending") return;

      const form = formRef.current;
      if (!form) return;

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      if (
        !payload.name ||
        !payload.email ||
        !payload.subject ||
        !payload.message
      ) {
        return;
      }

      setStatus("sending");

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus("sent");
        form.reset();
        setInquiryType(undefined);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setStatus("idle");
        }, 4000);
      } catch {
        setStatus("error");

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setStatus("idle");
        }, 3000);
      }
    },
    [status]
  );

  return (
    <ConfigProvider theme={selectTheme}>
      <style jsx global>
        {selectGlobalStyles}
      </style>

      <motion.div
        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.05),0_4px_20px_rgba(0,0,0,0.06)] sm:p-8"
        variants={formVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <h2 className="mb-1 font-oswald! text-xl font-bold uppercase tracking-wide text-soft-black">
          Send Us a Message
        </h2>

        <p className="mb-8 font-poppins! text-sm text-secondary">
          Fill in the form below and we&apos;ll get back to you within 24 hours.
        </p>

        {status === "sent" ? (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-main/10 text-main">
              <CheckCircle size={28} />
            </span>

            <h3 className="font-oswald! text-lg font-bold uppercase text-soft-black">
              Message Sent!
            </h3>

            <p className="max-w-sm font-poppins! text-sm text-secondary">
              Thank you for reaching out. Our team will review your message and
              respond as soon as possible.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InputField
                label="Full Name"
                id="name"
                required
                placeholder="John Doe"
                autoComplete="name"
              />

              <InputField
                label="Email Address"
                id="email"
                type="email"
                required
                placeholder="john@example.com"
                autoComplete="email"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InputField
                label="Phone Number"
                id="phone"
                type="tel"
                placeholder="+971 50 000 0000"
                autoComplete="tel"
                inputMode="tel"
              />

              <SelectField
                label="Inquiry Type"
                options={inquiryTypes}
                value={inquiryType}
                onChange={handleInquiryChange}
              />
            </div>

            <InputField
              label="Subject"
              id="subject"
              required
              placeholder="How can we help?"
              autoComplete="off"
            />

            <TextareaField
              label="Message"
              id="message"
              required
              placeholder="Tell us more about your inquiry..."
              rows={5}
            />

            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative inline-flex h-12 w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-main px-8 font-poppins! text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#5bb147] hover:shadow-[0_10px_24px_rgba(104,188,82,0.28)] disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
              >
                <span
                  className="absolute inset-0 origin-left scale-x-0 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <span className="relative z-10">
                  {status === "sending" ? "Sending..." : "Send Message"}
                </span>

                <Send
                  size={15}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>

            {status === "error" && (
              <p className="font-poppins! text-sm text-red-500">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </motion.div>
    </ConfigProvider>
  );
}
