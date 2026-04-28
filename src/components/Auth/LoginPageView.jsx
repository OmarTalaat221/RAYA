// components/Auth/LoginPageView.jsx
"use client";

import { useState, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { login } from "../../services/auth.service";
// import { login } from "@/services/auth.service";

function getInputClassName(hasError) {
  return `h-14 w-full rounded-2xl border bg-white px-4 text-sm text-soft-black outline-none transition duration-200 placeholder:text-secondary ${
    hasError
      ? "border-red-300! ring-4! ring-red-50!"
      : "border-black/10! focus:border-main/60! focus:ring-4! focus:ring-main/10!"
  }`;
}

function getPasswordInputClassName(hasError) {
  return `h-14 w-full rounded-2xl border bg-white px-4 pr-[88px] text-sm text-soft-black outline-none transition duration-200 placeholder:text-secondary ${
    hasError
      ? "border-red-300 ring-4! ring-red-50!"
      : "border-black/10! focus:border-main/60! focus:ring-4! focus:ring-main/10!"
  }`;
}

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

const AuthHeader = memo(function AuthHeader() {
  return (
    <div className="mb-8 flex flex-col items-center justify-center gap-3">
      <AuthLogo />

      <div className="space-y-3 text-center">
        <h1
          id="login-heading"
          className="text-3xl leading-none text-soft-black font-oswald! sm:text-[2.2rem]"
        >
          Welcome Back
        </h1>

        <p className="text-sm leading-6 text-secondary">
          Sign in with your approved company credentials to continue to the
          protected portal.
        </p>
      </div>
    </div>
  );
});

AuthHeader.displayName = "AuthHeader";

const AuthFooter = memo(function AuthFooter() {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm leading-6 text-secondary">
        New here?{" "}
        <Link
          href="/register"
          className="font-medium text-soft-black underline underline-offset-4 transition hover:text-main! hover:underline! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/20"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
});

AuthFooter.displayName = "AuthFooter";

const ForgotPasswordLink = memo(function ForgotPasswordLink() {
  return (
    <div className="flex items-center justify-end">
      <Link
        href="/forgot-password"
        className="text-sm text-secondary underline underline-offset-4 transition hover:text-main! hover:underline! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/20"
      >
        Forgot password?
      </Link>
    </div>
  );
});

ForgotPasswordLink.displayName = "ForgotPasswordLink";

export default function LoginPageView() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const emailHasError = Boolean(error && !email.trim());
  const passwordHasError = Boolean(error && !password.trim());

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
    setError("");
  }, []);

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
    setError("");
  }, []);

  const togglePassword = useCallback(() => {
    setShowPassword((current) => !current);
  }, []);

  const handleSubmit = useCallback(
    async function handleSubmit(event) {
      event.preventDefault();

      if (isSubmitting) return;

      setError("");

      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      if (!trimmedEmail || !trimmedPassword) {
        setError("Please enter your email and password.");
        return;
      }

      setIsSubmitting(true);

      try {
        const result = await login({
          email: trimmedEmail,
          password,
        });

        if (!result.success) {
          setError(result.message);
          return;
        }

        // ✅ Fix: push فقط — بدون refresh
        router.push(result.data?.redirectTo || "/");
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, password, isSubmitting, router]
  );

  return (
    <main className="relative flex min-h-screen min-h-dvh items-center justify-center overflow-hidden bg-[#f4f3f0] px-4 py-8 font-poppins! sm:px-6 lg:px-8">
      <BackgroundBlobs />

      <section
        aria-labelledby="login-heading"
        className="relative z-10 w-full max-w-[460px]"
      >
        <div className="rounded-[30px] border border-black/5 bg-white/95 p-6 shadow-[0_24px_80px_rgba(45,45,45,0.10)] backdrop-blur-sm sm:p-8">
          <AuthHeader />

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* email */}
            <div className="space-y-2">
              <label
                htmlFor="company-email"
                className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black"
              >
                Email
              </label>

              <input
                id="company-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                value={email}
                onChange={handleEmailChange}
                placeholder="name@company.com"
                aria-invalid={emailHasError}
                aria-describedby={error ? "login-error" : undefined}
                className={getInputClassName(emailHasError)}
              />
            </div>

            {/* password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  aria-invalid={passwordHasError}
                  aria-describedby={error ? "login-error" : undefined}
                  className={getPasswordInputClassName(passwordHasError)}
                />

                <button
                  type="button"
                  onClick={togglePassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 shrink-0 rounded-md text-xs font-medium uppercase tracking-[0.14em] text-main transition hover:text-soft-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/20"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <ForgotPasswordLink />

            {/* error */}
            <div className="min-h-6" aria-live="polite" aria-atomic="true">
              {error ? (
                <p
                  id="login-error"
                  className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600"
                >
                  {error}
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
                  Signing In...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <AuthFooter />
        </div>
      </section>
    </main>
  );
}
