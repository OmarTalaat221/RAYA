"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  verifyEmailCode,
  resendVerificationCode,
} from "../../services/auth.service";

/* ═══════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════ */

const CODE_LENGTH = 6;

function createEmptyCode() {
  return Array(CODE_LENGTH).fill("");
}

/* ═══════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════ */

function getMaskedEmail(email) {
  if (!email) return "your email";
  const [localPart, domain] = email.split("@");
  if (!domain) return email;
  const visibleStart = localPart.slice(0, 2);
  const visibleEnd = localPart.length > 3 ? localPart.slice(-1) : "";
  return `${visibleStart}***${visibleEnd}@${domain}`;
}

/* ═══════════════════════════════════════════════
   Logo
   ═══════════════════════════════════════════════ */

const VerifyLogo = memo(function VerifyLogo() {
  return (
    <Link href="/" className="relative block h-[100px] w-[100px]">
      <Image
        src="https://res.cloudinary.com/dbvh5i83q/image/upload/v1776082859/rds_logo_xpmbfn.webp"
        alt="RDS Pharma Logo"
        fill
        priority
        sizes="100px"
        className="object-contain"
      />
    </Link>
  );
});

VerifyLogo.displayName = "VerifyLogo";

/* ═══════════════════════════════════════════════
   OTP Input
   ═══════════════════════════════════════════════ */

function getDigitClassName(digit, hasError) {
  if (hasError) {
    return "h-14 w-full min-w-0 rounded-2xl border-2 bg-white text-center text-xl font-semibold text-soft-black outline-none transition duration-200 sm:h-16 sm:text-2xl border-red-300 ring-4! ring-red-50!";
  }
  if (digit) {
    return "h-14 w-full min-w-0 rounded-2xl border-2 bg-white text-center text-xl font-semibold text-soft-black outline-none transition duration-200 sm:h-16 sm:text-2xl border-main/60! ring-4! ring-main/10!";
  }
  return "h-14 w-full min-w-0 rounded-2xl border-2 bg-white text-center text-xl font-semibold text-soft-black outline-none transition duration-200 sm:h-16 sm:text-2xl border-black/20! focus:border-main/60! focus:ring-4! focus:ring-main/10!";
}

/* ═══════════════════════════════════════════════
   Main Export
   ═══════════════════════════════════════════════ */

export default function VerificationStep({ email, onBack }) {
  const router = useRouter();
  const inputsRef = useRef([]);
  const redirectTimeoutRef = useRef(null);

  // ✅ Fix: بدل lastAutoSubmittedCodeRef نستخدم isAutoSubmittingRef
  // عشان نمنع double submit بشكل أوضح
  const isAutoSubmittingRef = useRef(false);
  const lastSubmittedCodeRef = useRef("");

  const [code, setCode] = useState(createEmptyCode);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  /* ── cleanup on unmount ── */
  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  /* ── resend cooldown timer ── */
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(
      () => setResendCooldown((current) => current - 1),
      1000
    );
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  /* ── focus first input on mount ── */
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  /* ═══════════════════════════════════════════════
     Helpers
     ═══════════════════════════════════════════════ */

  const focusInput = useCallback((index) => {
    const input = inputsRef.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  }, []);

  const clearMessages = useCallback(() => {
    setError("");
    setSuccessMessage("");
  }, []);

  /* ═══════════════════════════════════════════════
     Submit
     ✅ Fix: مش بيعتمد على code من state
     بياخد fullCode كـ argument مباشرة
     ═══════════════════════════════════════════════ */

  const submitCode = useCallback(
    async function submitCode(fullCode) {
      if (!fullCode || fullCode.length < CODE_LENGTH) {
        setError("Please enter the full 6-digit verification code.");
        return;
      }

      clearMessages();
      setIsSubmitting(true);

      try {
        const result = await verifyEmailCode({
          email,
          otp: fullCode,
        });

        if (!result.success) {
          setError(result.message);
          // ✅ unlock عشان المستخدم يقدر يحاول تاني
          lastSubmittedCodeRef.current = "";
          return;
        }

        // ✅ Fix: router.push فقط — بدون router.refresh()
        setSuccessMessage(
          result.message || "Email verified successfully! Redirecting..."
        );

        redirectTimeoutRef.current = setTimeout(() => {
          router.push("/login");
        }, 1500);
      } finally {
        setIsSubmitting(false);
        isAutoSubmittingRef.current = false;
      }
    },
    [email, router, clearMessages]
  );

  /* ── manual submit handler (form onSubmit) ── */
  const handleSubmit = useCallback(
    function handleSubmit(event) {
      if (event) event.preventDefault();
      if (isSubmitting) return;

      const fullCode = code.join("");
      lastSubmittedCodeRef.current = fullCode;
      submitCode(fullCode);
    },
    [code, isSubmitting, submitCode]
  );

  /* ── auto-submit when code is complete ── */
  useEffect(() => {
    const fullCode = code.join("");

    // مش مكتمل
    if (fullCode.length < CODE_LENGTH) return;

    // نفس الـ code اللي اتبعت قبل كده
    if (fullCode === lastSubmittedCodeRef.current) return;

    // في الميدل وبيتعمل submit
    if (isSubmitting || isAutoSubmittingRef.current) return;

    // ✅ mark إن احنا بنعمل auto-submit
    isAutoSubmittingRef.current = true;
    lastSubmittedCodeRef.current = fullCode;
    submitCode(fullCode);
  }, [code, isSubmitting, submitCode]);

  /* ═══════════════════════════════════════════════
     Input handlers
     ═══════════════════════════════════════════════ */

  const handleChange = useCallback(
    (index, event) => {
      const digit = event.target.value.replace(/\D/g, "").slice(-1);

      // ✅ reset عشان الـ code الجديد يتعرف عليه
      lastSubmittedCodeRef.current = "";
      isAutoSubmittingRef.current = false;

      setCode((current) => {
        const updated = [...current];
        updated[index] = digit;
        return updated;
      });

      clearMessages();

      if (digit && index < CODE_LENGTH - 1) {
        focusInput(index + 1);
      }
    },
    [focusInput, clearMessages]
  );

  const handleKeyDown = useCallback(
    (index, event) => {
      if (event.key === "Backspace") {
        lastSubmittedCodeRef.current = "";
        isAutoSubmittingRef.current = false;

        if (!code[index] && index > 0) {
          event.preventDefault();
          setCode((current) => {
            const updated = [...current];
            updated[index - 1] = "";
            return updated;
          });
          focusInput(index - 1);
        }
      }

      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        focusInput(index - 1);
      }

      if (event.key === "ArrowRight" && index < CODE_LENGTH - 1) {
        event.preventDefault();
        focusInput(index + 1);
      }
    },
    [code, focusInput]
  );

  const handlePaste = useCallback(
    (event) => {
      event.preventDefault();

      const pasted = event.clipboardData
        .getData("text/plain")
        .replace(/\D/g, "")
        .slice(0, CODE_LENGTH);

      if (!pasted) return;

      lastSubmittedCodeRef.current = "";
      isAutoSubmittingRef.current = false;

      const newCode = createEmptyCode();
      for (let i = 0; i < pasted.length; i++) {
        newCode[i] = pasted[i];
      }

      setCode(newCode);
      clearMessages();
      focusInput(Math.min(pasted.length, CODE_LENGTH - 1));
    },
    [focusInput, clearMessages]
  );

  const handleFocus = useCallback((event) => {
    event.target.select();
  }, []);

  /* ═══════════════════════════════════════════════
     Resend
     ═══════════════════════════════════════════════ */

  const handleResend = useCallback(async () => {
    if (isResending || resendCooldown > 0) return;

    setIsResending(true);
    clearMessages();

    // ✅ reset refs عشان الـ code الجديد يشتغل
    lastSubmittedCodeRef.current = "";
    isAutoSubmittingRef.current = false;

    try {
      const result = await resendVerificationCode({ email });

      if (!result.success) {
        setError(result.message);
        return;
      }

      setSuccessMessage(result.message);
      setCode(createEmptyCode());
      focusInput(0);
      setResendCooldown(60);
    } finally {
      setIsResending(false);
    }
  }, [isResending, resendCooldown, email, focusInput, clearMessages]);

  /* ═══════════════════════════════════════════════
     Render
     ═══════════════════════════════════════════════ */

  const isCodeComplete = code.every((digit) => digit !== "");
  const maskedEmail = getMaskedEmail(email);

  return (
    <>
      {/* ── header ── */}
      <div className="mb-8 flex flex-col items-center justify-center gap-3">
        <VerifyLogo />

        <div className="space-y-3 text-center">
          <h1 className="text-3xl leading-none text-soft-black font-oswald! sm:text-[2.2rem]">
            Verify Your Email
          </h1>

          <p className="text-sm leading-6 text-secondary">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-soft-black">{maskedEmail}</span>
          </p>
        </div>
      </div>

      {/* ── form ── */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP inputs */}
        <div className="mx-auto grid w-full max-w-[304px] grid-cols-6 gap-2 sm:max-w-[396px] sm:gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputsRef.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(event) => handleChange(index, event)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={handlePaste}
              onFocus={handleFocus}
              aria-label={`Digit ${index + 1}`}
              aria-invalid={Boolean(error)}
              className={getDigitClassName(digit, Boolean(error))}
            />
          ))}
        </div>

        {/* messages */}
        <div className="min-h-6" aria-live="polite" aria-atomic="true">
          {error ? (
            <p
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm leading-6 text-red-600"
            >
              {error}
            </p>
          ) : successMessage ? (
            <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm leading-6 text-green-700">
              {successMessage}
            </p>
          ) : null}
        </div>

        {/* submit button */}
        <button
          type="submit"
          disabled={isSubmitting || !isCodeComplete}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-main px-5 text-sm font-medium uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(104,188,82,0.28)] transition duration-200 hover:bg-[#5eae49] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Verifying...
            </>
          ) : (
            "Verify Email"
          )}
        </button>
      </form>

      {/* ── footer ── */}
      <div className="mt-6 space-y-4">
        <div className="text-center">
          <p className="text-sm leading-6 text-secondary">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending || resendCooldown > 0}
              className="font-medium text-soft-black underline underline-offset-4 transition hover:text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:no-underline"
            >
              {isResending
                ? "Sending..."
                : resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : "Resend code"}
            </button>
          </p>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-soft-black underline underline-offset-4 transition hover:text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/20"
          >
            Back to registration
          </button>
        </div>
      </div>
    </>
  );
}
