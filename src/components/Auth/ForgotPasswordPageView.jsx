"use client";

import { useState, useCallback, useRef, useEffect, memo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  forgetPassword,
  resetPassword,
  resendForgetPasswordOtp,
} from "../../services/auth.service";

/* ═══════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════ */

const CODE_LENGTH = 6;

function createEmptyCode() {
  return Array(CODE_LENGTH).fill("");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getMaskedEmail(email) {
  if (!email) return "your email";
  const [localPart, domain] = email.split("@");
  if (!domain) return email;
  const visibleStart = localPart.slice(0, 2);
  const visibleEnd = localPart.length > 3 ? localPart.slice(-1) : "";
  return `${visibleStart}***${visibleEnd}@${domain}`;
}

/* ═══════════════════════════════════════════════
   className helpers
   ═══════════════════════════════════════════════ */

function getInputClassName(hasError) {
  return `h-14 w-full rounded-2xl border bg-white px-4 text-sm text-soft-black outline-none transition duration-200 placeholder:text-secondary ${
    hasError
      ? "border-red-300! ring-4! ring-red-50!"
      : "border-black/10! focus:border-main/60! focus:ring-4! focus:ring-main/10!"
  }`;
}

function getPasswordShellClassName(hasError) {
  return `flex h-14 w-full items-center gap-3 rounded-2xl border bg-white px-4 transition duration-200 ${
    hasError
      ? "border-red-300 ring-4! ring-red-50!"
      : "border-black/10 focus-within:border-main/60! focus-within:ring-4! focus-within:ring-main/10!"
  }`;
}

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
   Shared UI — memoized
   ═══════════════════════════════════════════════ */

const BackgroundBlobs = memo(function BackgroundBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-[-100px] top-[-120px] h-[260px] w-[260px] rounded-full bg-main/10 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-80px] h-[300px] w-[300px] rounded-full bg-[#2d2d2d]/7 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.45),transparent_35%,rgba(255,255,255,0.16))]" />
    </div>
  );
});

BackgroundBlobs.displayName = "BackgroundBlobs";

const AuthLogo = memo(function AuthLogo() {
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

AuthLogo.displayName = "AuthLogo";

const FieldError = memo(function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm leading-6 text-red-600">
      {message}
    </p>
  );
});

FieldError.displayName = "FieldError";

/* ═══════════════════════════════════════════════
   Step 1 — Email Step
   ═══════════════════════════════════════════════ */

function EmailStep({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRef = useRef(email);
  emailRef.current = email;

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
    setError("");
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (isSubmitting) return;

      const trimmed = emailRef.current.trim();

      if (!trimmed) {
        setError("Please enter your email address.");
        return;
      }

      if (!isValidEmail(trimmed)) {
        setError("Please enter a valid email address.");
        return;
      }

      setError("");
      setIsSubmitting(true);

      try {
        const result = await forgetPassword({ email: trimmed });

        if (!result.success) {
          setError(result.message);
          return;
        }

        onSuccess(trimmed);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, onSuccess]
  );

  const emailHasError = Boolean(error);

  return (
    <>
      {/* header */}
      <div className="mb-8 flex flex-col items-center justify-center gap-3">
        <AuthLogo />

        <div className="space-y-3 text-center">
          <h1
            id="forgot-heading"
            className="text-3xl leading-none text-soft-black font-oswald! sm:text-[2.2rem]"
          >
            Forgot Password
          </h1>

          <p className="mx-auto max-w-[44ch] text-sm leading-6 text-secondary">
            Enter the email address associated with your account and we&apos;ll
            send you a verification code to reset your password.
          </p>
        </div>
      </div>

      {/* form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="forgot-email"
            className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black"
          >
            Email
          </label>

          <input
            id="forgot-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            autoFocus
            value={email}
            onChange={handleEmailChange}
            placeholder="name@company.com"
            aria-invalid={emailHasError}
            aria-describedby={emailHasError ? "forgot-email-error" : undefined}
            className={getInputClassName(emailHasError)}
          />

          <FieldError id="forgot-email-error" message={error} />
        </div>

        {/* submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-main px-5 text-sm font-medium uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(104,188,82,0.28)] transition duration-200 hover:bg-[#5eae49] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/20 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Sending...
            </>
          ) : (
            "Send Verification Code"
          )}
        </button>
      </form>

      {/* footer */}
      <div className="mt-6 text-center">
        <p className="text-sm leading-6 text-secondary">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-soft-black underline underline-offset-4! transition hover:text-main! hover:underline! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/20"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   Step 2 — Reset Step (OTP + New Password)
   ═══════════════════════════════════════════════ */

function ResetStep({ email, onBack }) {
  const router = useRouter();
  const inputsRef = useRef([]);
  const redirectTimeoutRef = useRef(null);
  const isAutoSubmittingRef = useRef(false);
  const lastSubmittedCodeRef = useRef("");

  const [code, setCode] = useState(createEmptyCode);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // refs for submit callback stability
  const passwordRef = useRef(password);
  const confirmRef = useRef(confirmPassword);
  passwordRef.current = password;
  confirmRef.current = confirmPassword;

  /* ── cleanup ── */
  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  /* ── cooldown timer ── */
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  /* ── focus first OTP input ── */
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
    setFieldErrors({});
  }, []);

  /* ═══════════════════════════════════════════════
     Submit
     ═══════════════════════════════════════════════ */

  const submitReset = useCallback(
    async (fullCode) => {
      const currentPassword = passwordRef.current;
      const currentConfirm = confirmRef.current;

      // validate
      const errors = {};

      if (!fullCode || fullCode.length < CODE_LENGTH) {
        errors.otp = "Please enter the full 6-digit verification code.";
      }

      if (!currentPassword.trim()) {
        errors.password = "New password is required.";
      }

      if (!currentConfirm.trim()) {
        errors.confirm = "Please confirm your new password.";
      } else if (
        currentPassword.trim() &&
        currentPassword.trim() !== currentConfirm.trim()
      ) {
        errors.confirm = "Passwords do not match.";
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        if (errors.otp) setError(errors.otp);
        return;
      }

      clearMessages();
      setIsSubmitting(true);

      try {
        const result = await resetPassword({
          email,
          otp: fullCode,
          password: currentPassword,
          confirm: currentConfirm,
        });

        if (!result.success) {
          setError(result.message);
          lastSubmittedCodeRef.current = "";
          return;
        }

        setSuccessMessage(
          result.message ||
            "Password reset successfully! Redirecting to login..."
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

  /* ── manual submit ── */
  const handleSubmit = useCallback(
    (event) => {
      if (event) event.preventDefault();
      if (isSubmitting) return;

      const fullCode = code.join("");
      lastSubmittedCodeRef.current = fullCode;
      submitReset(fullCode);
    },
    [code, isSubmitting, submitReset]
  );

  /* ── NO auto-submit for reset step ──
     لأن فيه password fields لازم تتملي الأول
     الـ auto-submit كان منطقي في verification بس
     هنا المستخدم لازم يضغط submit يدوي */

  /* ═══════════════════════════════════════════════
     OTP handlers
     ═══════════════════════════════════════════════ */

  const handleChange = useCallback(
    (index, event) => {
      const digit = event.target.value.replace(/\D/g, "").slice(-1);

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
     Password handlers
     ═══════════════════════════════════════════════ */

  const handlePasswordChange = useCallback(
    (event) => {
      setPassword(event.target.value);
      clearMessages();
    },
    [clearMessages]
  );

  const handleConfirmChange = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
      clearMessages();
    },
    [clearMessages]
  );

  const togglePassword = useCallback(() => {
    setShowPassword((c) => !c);
  }, []);

  const toggleConfirm = useCallback(() => {
    setShowConfirm((c) => !c);
  }, []);

  /* ═══════════════════════════════════════════════
     Resend
     ═══════════════════════════════════════════════ */

  const handleResend = useCallback(async () => {
    if (isResending || resendCooldown > 0) return;

    setIsResending(true);
    clearMessages();

    lastSubmittedCodeRef.current = "";
    isAutoSubmittingRef.current = false;

    try {
      const result = await resendForgetPasswordOtp({ email });

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

  const maskedEmail = getMaskedEmail(email);
  const otpHasError = Boolean(error || fieldErrors.otp);

  return (
    <>
      {/* header */}
      <div className="mb-8 flex flex-col items-center justify-center gap-3">
        <AuthLogo />

        <div className="space-y-3 text-center">
          <h1
            id="forgot-heading"
            className="text-3xl leading-none text-soft-black font-oswald! sm:text-[2.2rem]"
          >
            Reset Password
          </h1>

          <p className="text-sm leading-6 text-secondary">
            Enter the code sent to{" "}
            <span className="font-medium text-soft-black">{maskedEmail}</span>{" "}
            and choose your new password.
          </p>
        </div>
      </div>

      {/* form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* OTP label */}
        <div className="space-y-3">
          <label className="block text-center text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black">
            Verification Code
          </label>

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
                aria-invalid={otpHasError}
                className={getDigitClassName(digit, otpHasError)}
              />
            ))}
          </div>
        </div>

        {/* resend row */}
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

        {/* divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-black/8" />
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-secondary">
            New Password
          </span>
          <div className="h-px flex-1 bg-black/8" />
        </div>

        {/* new password */}
        <div className="space-y-2">
          <label
            htmlFor="new-password"
            className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black"
          >
            New Password
          </label>

          <div
            className={getPasswordShellClassName(Boolean(fieldErrors.password))}
          >
            <input
              id="new-password"
              name="new-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Create a new password"
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={
                fieldErrors.password ? "new-password-error" : undefined
              }
              className="w-full bg-transparent text-sm text-soft-black outline-none placeholder:text-secondary"
            />

            <button
              type="button"
              onClick={togglePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="shrink-0 rounded-md text-xs font-medium uppercase tracking-[0.14em] text-main transition hover:text-soft-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/20"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <FieldError id="new-password-error" message={fieldErrors.password} />
        </div>

        {/* confirm password */}
        <div className="space-y-2">
          <label
            htmlFor="confirm-new-password"
            className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black"
          >
            Confirm New Password
          </label>

          <div
            className={getPasswordShellClassName(Boolean(fieldErrors.confirm))}
          >
            <input
              id="confirm-new-password"
              name="confirm-new-password"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleConfirmChange}
              placeholder="Confirm your new password"
              aria-invalid={Boolean(fieldErrors.confirm)}
              aria-describedby={
                fieldErrors.confirm ? "confirm-new-password-error" : undefined
              }
              className="w-full bg-transparent text-sm text-soft-black outline-none placeholder:text-secondary"
            />

            <button
              type="button"
              onClick={toggleConfirm}
              aria-label={
                showConfirm ? "Hide confirm password" : "Show confirm password"
              }
              className="shrink-0 rounded-md text-xs font-medium uppercase tracking-[0.14em] text-main transition hover:text-soft-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/20"
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>

          <FieldError
            id="confirm-new-password-error"
            message={fieldErrors.confirm}
          />
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

        {/* submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-main px-5 text-sm font-medium uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(104,188,82,0.28)] transition duration-200 hover:bg-[#5eae49] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/20 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>

      {/* footer */}
      <div className="mt-6 space-y-4">
        <div className="text-center">
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-soft-black underline underline-offset-4 transition hover:text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/20"
          >
            Use a different email
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm leading-6 text-secondary">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-soft-black underline underline-offset-4! transition hover:text-main! hover:underline! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/20"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   Main Export
   ═══════════════════════════════════════════════ */

export default function ForgotPasswordView() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");

  const handleEmailSuccess = useCallback((submittedEmail) => {
    setEmail(submittedEmail);
    setStep("reset");
  }, []);

  const handleBackToEmail = useCallback(() => {
    setStep("email");
  }, []);

  return (
    <main className="relative flex min-h-screen min-h-dvh items-center justify-center overflow-hidden bg-[#f4f3f0] px-4 py-8 font-poppins! sm:px-6 lg:px-8">
      <BackgroundBlobs />

      <section
        aria-labelledby="forgot-heading"
        className="relative z-10 w-full"
      >
        <div
          className={`mx-auto transition-[max-width] duration-300 ease-in-out ${
            step === "reset" ? "max-w-[520px]" : "max-w-[460px]"
          }`}
        >
          <div className="rounded-[30px] border border-black/5 bg-white/95 p-6 shadow-[0_24px_80px_rgba(45,45,45,0.10)] backdrop-blur-sm sm:p-8">
            {step === "reset" ? (
              <ResetStep email={email} onBack={handleBackToEmail} />
            ) : (
              <EmailStep onSuccess={handleEmailSuccess} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
