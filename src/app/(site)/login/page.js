// app/login/page.jsx

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthError } from "../../../features/auth/authSlice";

import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import InnerPageWrapper from "../../../sections/Common/InnerPageWrapper";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// ─── PhoneField component matching login page design ────────────────────────
function PhoneField({ value, onChange, hasError }) {
  return (
    <div className="phone-input-login-wrapper" dir="ltr">
      <PhoneInput
        country={"fi"}
        value={value || ""}
        onChange={(phone) => onChange(phone)}
        placeholder="123 456 789"
        enableSearch={true}
        searchPlaceholder="Search country..."
        inputProps={{ autoComplete: "tel" }}
        containerStyle={{ width: "100%", direction: "ltr" }}
        inputStyle={{
          width: "100%",
          height: "48px",
          border: "none",
          backgroundColor: "transparent",
          boxShadow: "none",
          fontSize: "14px",
          fontWeight: "500",
          color: "#023048",
          paddingLeft: "70px",
          paddingRight: "12px",
          outline: "none",
          fontFamily: "inherit",
        }}
        buttonStyle={{
          border: "none",
          borderRight: "1px solid #DADADA",
          backgroundColor: "transparent",
          borderRadius: "0",
          paddingLeft: "12px",
          paddingRight: "8px",
          height: "48px",
          display: "flex",
          alignItems: "center",
        }}
        dropdownStyle={{
          borderRadius: "8px",
          border: "1px solid #DCB56D",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          backgroundColor: "#ffffff",
          zIndex: 99999,
          textAlign: "left",
          direction: "ltr",
        }}
        searchStyle={{
          width: "calc(100% - 16px)",
          margin: "8px",
          padding: "8px 12px",
          border: "1px solid #DCB56D",
          borderRadius: "6px",
          fontSize: "13px",
          outline: "none",
        }}
      />

      <style jsx global>{`
        .phone-input-login-wrapper .react-tel-input .form-control:focus {
          border: none !important;
          box-shadow: none !important;
          outline: none !important;
        }
        .phone-input-login-wrapper .react-tel-input .flag-dropdown {
          border: none !important;
          border-right: 1px solid #dadada !important;
          background-color: transparent !important;
          border-radius: 0 !important;
        }
        .phone-input-login-wrapper .react-tel-input .selected-flag {
          background-color: transparent !important;
          padding-left: 12px;
        }
        .phone-input-login-wrapper .react-tel-input .selected-flag:hover,
        .phone-input-login-wrapper .react-tel-input .selected-flag:focus {
          background-color: #fdf6ec !important;
        }
        .phone-input-login-wrapper
          .react-tel-input
          .flag-dropdown.open
          .selected-flag {
          background-color: #fdf6ec !important;
        }
        .phone-input-login-wrapper
          .react-tel-input
          .country-list
          .country:hover {
          background-color: #faf2ea !important;
        }
        .phone-input-login-wrapper
          .react-tel-input
          .country-list
          .country.highlight {
          background-color: #fdf6ec !important;
          color: #1c455c !important;
          font-weight: 600;
        }
        .phone-input-login-wrapper .react-tel-input .country-list {
          border-radius: 8px !important;
          border: 1px solid #dcb56d !important;
          max-height: 200px;
          scrollbar-width: thin;
          scrollbar-color: #d2a657 #faf2ea;
        }
        .phone-input-login-wrapper
          .react-tel-input
          .country-list::-webkit-scrollbar {
          width: 6px;
        }
        .phone-input-login-wrapper
          .react-tel-input
          .country-list::-webkit-scrollbar-track {
          background: #faf2ea;
          border-radius: 4px;
        }
        .phone-input-login-wrapper
          .react-tel-input
          .country-list::-webkit-scrollbar-thumb {
          background-color: #d2a657;
          border-radius: 4px;
        }
        .phone-input-login-wrapper .react-tel-input .country-list .dial-code {
          color: #dcb56d;
          font-weight: 600;
        }
        .phone-input-login-wrapper
          .react-tel-input
          .country-list
          .country-name {
          color: #023048;
          font-size: 13px;
        }
        .phone-input-login-wrapper .react-tel-input .search-box:focus {
          border-color: #dcb56d !important;
          outline: none !important;
        }
      `}</style>
    </div>
  );
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error, isAuthenticated, validationErrors } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      Swal.fire({
        title: "تم تسجيل الدخول!",
        text: "جاري تحويلك للصفحة الرئيسية...",
        icon: "success",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: "اذهب الآن",
        confirmButtonColor: "#DCB56D",
      }).then(() => {
        router.push("/");
      });
    }
    return () => {
      dispatch(clearAuthError());
    };
  }, [isAuthenticated, router, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // ✅ Only check if empty, no format validation
    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    }

    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(
      loginUser({
        email: formData.email,
        password: formData.password,
      })
    );
  };

  const handleFacebookLogin = () => console.log("Facebook login clicked");
  const handleGoogleLogin = () => console.log("Google login clicked");
  const handleXLogin = () => console.log("X login clicked");

  return (
    <InnerPageWrapper>
      <div className="min-h-screen bg-white flex items-start justify-center pb-4">
        <div className="container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
            {/* ===== Right Side: Login Form ===== */}
            <div className="w-full order-2 lg:order-1">
              <div className="bg-[#FAF2EA] rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-6 md:p-8 lg:p-10">
                {/* Mobile Logo */}
                <div className="flex lg:hidden justify-center mb-6">
                  <img
                    src="https://res.cloudinary.com/dhgp9dzdt/image/upload/v1772620899/logo_udnowq.png"
                    alt="Set Al Sham Logo"
                    className="h-16 sm:h-20 object-contain"
                  />
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-start text-[#DCB56D] mb-6 sm:mb-8">
                  تسجيل الدخول
                </h2>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
                    {error}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Email */}
                  <div>
                    <label className="block text-[#023048] font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">
                      البريد الإلكتروني
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <div
                      className={`flex items-center bg-white border rounded-lg focus-within:border-[#DCB56D] transition-colors ${
                        errors.email ? "border-red-500" : "border-[#023048]/10"
                      }`}
                    >
                      <span className="px-3 sm:px-4">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#DADADA]" />
                      </span>
                      <div className="w-px h-12 sm:h-14 bg-[#DADADA]" />
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        dir="ltr"
                        placeholder="example@email.com"
                        className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent focus:outline-none text-left text-sm sm:text-base placeholder:text-[#023048]/40"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-[#023048] font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">
                      كلمة المرور
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <div
                      className={`flex items-center bg-white border rounded-lg overflow-hidden focus-within:border-[#DCB56D] transition-colors ${
                        errors.password
                          ? "border-red-500"
                          : "border-[#023048]/10"
                      }`}
                    >
                      <span className="px-3 sm:px-4">
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#DADADA]" />
                      </span>
                      <div className="w-px h-12 sm:h-14 bg-[#DADADA]" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent focus:outline-none text-sm sm:text-base placeholder:text-[#023048]/40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="px-3 sm:px-4 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-[#DADADA]" />
                        ) : (
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-[#DADADA]" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <div
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              rememberMe: !prev.rememberMe,
                            }))
                          }
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                            formData.rememberMe
                              ? "bg-[#DCB56D] border-[#DCB56D]"
                              : "bg-white border-[#023048]/30 hover:border-[#DCB56D]"
                          }`}
                        >
                          {formData.rememberMe && (
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 text-white"
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
                        htmlFor="rememberMe"
                        className="text-[#023048]/80 text-xs sm:text-sm cursor-pointer select-none"
                      >
                        تذكرني
                      </label>
                    </div>
                  </div>

                  {/* Don't have account */}
                  <div className="flex justify-end items-center">
                    <p className="text-center text-[#023048]/70 text-xs sm:text-sm">
                      ليس لديك حساب؟{" "}
                      <Link
                        href="/signup"
                        className="text-[#0064E6]! hover:underline! font-bold"
                      >
                        إنشاء حساب جديد
                      </Link>
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 sm:py-4 px-6 rounded-lg font-bold text-base sm:text-lg text-[#023048] transition-all duration-300 ${
                      isLoading
                        ? "bg-[#DCB56D]/50 cursor-not-allowed"
                        : "bg-[#DCB56D] hover:bg-[#c9a227] hover:shadow-lg hover:scale-[1.02]"
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
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
                        جاري تسجيل الدخول...
                      </span>
                    ) : (
                      "تسجيل الدخول"
                    )}
                  </button>

                  {/* Social Login Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-2 sm:gap-2 mt-4 sm:mt-6">
                    <button
                      type="button"
                      onClick={handleXLogin}
                      className="flex items-center justify-center gap-2 sm:gap-1.5 md:gap-2 py-2.5 sm:py-3 px-3 sm:px-2 md:px-3 bg-black text-white font-medium rounded-lg transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-lg"
                    >
                      <svg
                        className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span className="font-montserrat! text-sm sm:text-[10px] whitespace-nowrap">
                        Sign in with X
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="flex items-center justify-center gap-2 sm:gap-1.5 md:gap-2 py-2.5 sm:py-3 px-3 sm:px-2 md:px-3 bg-white border border-[#023048]/20 rounded-lg transition-all duration-300 hover:border-[#4285F4] hover:shadow-lg"
                    >
                      <svg
                        className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span className="text-[#023048]/70 text-sm sm:text-[10px] font-montserrat! whitespace-nowrap">
                        Sign in with Google
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleFacebookLogin}
                      className="flex items-center justify-center gap-2 sm:gap-1.5 md:gap-2 py-2.5 sm:py-3 px-3 sm:px-2 md:px-3 bg-[#1877F2] text-white font-medium rounded-lg transition-all duration-300 hover:bg-[#166FE5] hover:shadow-lg"
                    >
                      <svg
                        className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span className="font-montserrat! text-sm sm:text-[10px] whitespace-nowrap">
                        Sign in with Facebook
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* ===== Left Side: Welcome & Logo (Desktop Only) ===== */}
            <div className="hidden lg:flex flex-col items-center justify-center text-center space-y-8 order-1 lg:order-2">
              <div className="relative mb-8">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="https://res.cloudinary.com/dhgp9dzdt/image/upload/v1772620899/logo_udnowq.png"
                    alt="Set Al Sham Logo"
                    className="object-contain w-[350px] xl:w-[450px] h-[120px] xl:h-[150px]"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h1
                  dir="ltr"
                  className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[#DCB56D] font-montserrat! mb-8 xl:mb-10"
                >
                  مرحبا بك
                </h1>
                <p className="text-gray-500 text-[20px] xl:text-[27px] font-montserrat!">
                  لأول مرة، تحتاج إلى تسجيل الدخول
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InnerPageWrapper>
  );
};

export default LoginPage;
