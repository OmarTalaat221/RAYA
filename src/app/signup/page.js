"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  resetRegisterStatus,
  setRegistrationData,
} from "../../features/auth/authSlice";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

import InnerPageWrapper from "../../sections/Common/InnerPageWrapper";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// ─── PhoneField ───────────────────────────────────────────────────────────────
function PhoneField({ value, countryIso2, onChange }) {
  return (
    <div className="phone-input-signup-wrapper" dir="ltr">
      <PhoneInput
        country={countryIso2 || "fi"}
        value={value || ""}
        onChange={(phone, countryData) => {
          console.log("PhoneInput onChange =>", { phone, countryData });

          const rawDialCode = countryData?.dialCode || "";
          const dialCodeWithPlus = rawDialCode ? `+${rawDialCode}` : null;
          const iso2 = countryData?.countryCode || countryData?.iso2 || null;

          // شيل كود الدولة من أول الرقم
          let localPhone = phone || "";

          if (rawDialCode && localPhone.startsWith(rawDialCode)) {
            localPhone = localPhone.slice(rawDialCode.length);
          }

          onChange(localPhone, dialCodeWithPlus, iso2, phone);
        }}
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
        .phone-input-signup-wrapper .react-tel-input .form-control:focus {
          border: none !important;
          box-shadow: none !important;
          outline: none !important;
        }
        .phone-input-signup-wrapper .react-tel-input .flag-dropdown {
          border: none !important;
          border-right: 1px solid #dadada !important;
          background-color: transparent !important;
          border-radius: 0 !important;
        }
        .phone-input-signup-wrapper .react-tel-input .selected-flag {
          background-color: transparent !important;
          padding-left: 12px;
        }
        .phone-input-signup-wrapper .react-tel-input .selected-flag:hover,
        .phone-input-signup-wrapper .react-tel-input .selected-flag:focus {
          background-color: #fdf6ec !important;
        }
        .phone-input-signup-wrapper
          .react-tel-input
          .flag-dropdown.open
          .selected-flag {
          background-color: #fdf6ec !important;
        }
        .phone-input-signup-wrapper
          .react-tel-input
          .country-list
          .country:hover {
          background-color: #faf2ea !important;
        }
        .phone-input-signup-wrapper
          .react-tel-input
          .country-list
          .country.highlight {
          background-color: #fdf6ec !important;
          color: #1c455c !important;
          font-weight: 600;
        }
        .phone-input-signup-wrapper .react-tel-input .country-list {
          border-radius: 8px !important;
          border: 1px solid #dcb56d !important;
          max-height: 200px;
          scrollbar-width: thin;
          scrollbar-color: #d2a657 #faf2ea;
        }
        .phone-input-signup-wrapper
          .react-tel-input
          .country-list::-webkit-scrollbar {
          width: 6px;
        }
        .phone-input-signup-wrapper
          .react-tel-input
          .country-list::-webkit-scrollbar-track {
          background: #faf2ea;
          border-radius: 4px;
        }
        .phone-input-signup-wrapper
          .react-tel-input
          .country-list::-webkit-scrollbar-thumb {
          background-color: #d2a657;
          border-radius: 4px;
        }
        .phone-input-signup-wrapper .react-tel-input .country-list .dial-code {
          color: #dcb56d;
          font-weight: 600;
        }
        .phone-input-signup-wrapper
          .react-tel-input
          .country-list
          .country-name {
          color: #023048;
          font-size: 13px;
        }
        .phone-input-signup-wrapper .react-tel-input .search-box:focus {
          border-color: #dcb56d !important;
          outline: none !important;
        }

        .phone-input-signup-wrapper .react-tel-input .form-control {
          width: 100% !important;
          height: 48px !important;
          border: none !important;
          background-color: transparent !important;
          box-shadow: none !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          color: #023048 !important;
          padding-left: 70px !important;
          padding-right: 12px !important;
          font-family: inherit !important;
        }

        .phone-input-signup-wrapper .react-tel-input {
          width: 100%;
        }
      `}</style>
    </div>
  );
}

// ─── SignUpPage ───────────────────────────────────────────────────────────────
const SignUpPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading, error, isRegistered, registrationData } = useSelector(
    (state) => state.auth
  );

  const phoneRef = useRef({
    phone: registrationData?.phone || "",
    country_code: registrationData?.country_code || "+358",
    country_iso2: registrationData?.country_iso2 || "fi",
    full_phone: registrationData?.full_phone || "",
  });

  const [formData, setFormData] = useState({
    fullName: registrationData?.fullName || "",
    email: registrationData?.email || "",
    phone: registrationData?.phone || "", // الرقم المحلي فقط
    country_code: registrationData?.country_code || "+358",
    country_iso2: registrationData?.country_iso2 || "fi",
    full_phone: registrationData?.full_phone || "", // الرقم كامل مع كود الدولة
    password: registrationData?.password || "",
    confirmPassword: registrationData?.confirmPassword || "",
    agreeToPrivacy: registrationData?.agreeToPrivacy || false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isRegistered) {
      Swal.fire({
        title: "تم التسجيل بنجاح!",
        text: "يمكنك الآن تسجيل الدخول لحسابك.",
        icon: "success",
        confirmButtonText: "حسناً",
        confirmButtonColor: "#DCB56D",
      }).then(() => {
        dispatch(resetRegisterStatus());
        router.push("/login");
      });
    }
  }, [isRegistered, router, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToSet = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: valueToSet,
    }));

    dispatch(setRegistrationData({ [name]: valueToSet }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePhoneChange = (localPhone, dialCode, iso2, fullPhone) => {
    const safeLocalPhone = localPhone ?? phoneRef.current.phone ?? "";
    const safeCountryCode = dialCode ?? phoneRef.current.country_code ?? "+358";
    const safeIso2 = iso2 ?? phoneRef.current.country_iso2 ?? "fi";
    const safeFullPhone = fullPhone ?? phoneRef.current.full_phone ?? "";

    phoneRef.current = {
      phone: safeLocalPhone,
      country_code: safeCountryCode,
      country_iso2: safeIso2,
      full_phone: safeFullPhone,
    };

    setFormData((prev) => ({
      ...prev,
      phone: safeLocalPhone,
      country_code: safeCountryCode,
      country_iso2: safeIso2,
      full_phone: safeFullPhone,
    }));

    dispatch(
      setRegistrationData({
        phone: safeLocalPhone,
        country_code: safeCountryCode,
        country_iso2: safeIso2,
        full_phone: safeFullPhone,
      })
    );

    if (errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));
    }

    console.log("Updated phoneRef =>", phoneRef.current);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "الاسم الكامل مطلوب";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    }

    const currentPhone = phoneRef.current.phone;
    if (!currentPhone || currentPhone.trim() === "") {
      newErrors.phone = "رقم الهاتف مطلوب";
    }

    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 8) {
      newErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور غير متطابقة";
    }

    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = "يجب الموافقة على سياسة الخصوصية";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const localPhone = phoneRef.current.phone; // بدون كود الدولة
    const currentCountryCode = phoneRef.current.country_code;

    const data = new FormData();
    data.append("full_name", formData.fullName);
    data.append("email", formData.email);
    data.append("phone_number", localPhone); // ✅ الرقم بدون كود الدولة
    data.append("country_code", currentCountryCode); // ✅ كود الدولة لوحده
    data.append("password", formData.password);
    data.append("privacy_policy_accepted", formData.agreeToPrivacy ? "1" : "0");
    data.append(
      "contract_accepted",
      registrationData?.contractAccepted ? "1" : "0"
    );

    if (registrationData?.signature) {
      try {
        const response = await fetch(registrationData.signature);
        const blob = await response.blob();
        const signatureFile = new File([blob], "signature.png", {
          type: "image/png",
        });
        data.append("signature_path", signatureFile);
      } catch (err) {
        console.error("Error processing signature", err);
      }
    }

    console.log("=== Submitting ===");
    console.log("phone_number (local only):", localPhone);
    console.log("country_code:", currentCountryCode);
    console.log("full_phone:", phoneRef.current.full_phone);

    dispatch(registerUser(data));
  };

  return (
    <InnerPageWrapper>
      <div className="min-h-screen bg-white flex items-start justify-center px-4 sm:px-6 lg:px-8 pb-4">
        <div className="container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
            <div className="w-full order-2 lg:order-1">
              <div className="bg-[#FAF2EA] rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-6 md:p-8 lg:p-10">
                <div className="flex lg:hidden justify-center mb-6">
                  <img
                    src="https://res.cloudinary.com/dhgp9dzdt/image/upload/v1772620899/logo_udnowq.png"
                    alt="Set Al Sham Logo"
                    className="h-16 sm:h-20 object-contain"
                  />
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-start text-[#DCB56D] mb-6 sm:mb-8">
                  تسجيل حساب جديد
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
                  <div>
                    <label className="block text-[#023048] font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">
                      الاسم الكامل
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <div
                      className={`flex items-center bg-white border rounded-lg overflow-hidden focus-within:border-[#DCB56D] transition-colors ${
                        errors.fullName
                          ? "border-red-500"
                          : "border-[#023048]/10"
                      }`}
                    >
                      <span className="px-3 sm:px-4">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#DADADA]" />
                      </span>
                      <div className="w-px h-12 sm:h-14 bg-[#DADADA]" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="أدخل اسمك الكامل"
                        className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent focus:outline-none text-sm sm:text-base placeholder:text-[#023048]/40"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#023048] font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">
                      البريد الإلكتروني
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <div
                      className={`flex items-center bg-white border rounded-lg overflow-hidden focus-within:border-[#DCB56D] transition-colors ${
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

                  <div>
                    <label className="block text-[#023048] font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">
                      رقم الهاتف
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <div
                      className={`flex items-center bg-white border rounded-lg focus-within:border-[#DCB56D] transition-colors ${
                        errors.phone ? "border-red-500" : "border-[#023048]/10"
                      }`}
                    >
                      <div className="flex-1 h-full">
                        <PhoneField
                          value={formData.full_phone}
                          countryIso2={formData.country_iso2}
                          onChange={handlePhoneChange}
                        />
                      </div>
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

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

                  <div>
                    <label className="block text-[#023048] font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">
                      تأكيد كلمة المرور
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <div
                      className={`flex items-center bg-white border rounded-lg overflow-hidden focus-within:border-[#DCB56D] transition-colors ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-[#023048]/10"
                      }`}
                    >
                      <span className="px-3 sm:px-4">
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#DADADA]" />
                      </span>
                      <div className="w-px h-12 sm:h-14 bg-[#DADADA]" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent focus:outline-none text-sm sm:text-base placeholder:text-[#023048]/40"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="px-3 sm:px-4 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-[#DADADA]" />
                        ) : (
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-[#DADADA]" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <div className="relative mt-0.5 sm:mt-0">
                        <input
                          type="checkbox"
                          id="agreeToPrivacy"
                          name="agreeToPrivacy"
                          checked={formData.agreeToPrivacy}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <div
                          onClick={() => {
                            const newValue = !formData.agreeToPrivacy;
                            setFormData((prev) => ({
                              ...prev,
                              agreeToPrivacy: newValue,
                            }));
                            dispatch(
                              setRegistrationData({ agreeToPrivacy: newValue })
                            );
                          }}
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 cursor-pointer transition-all duration-200 flex items-center justify-center flex-shrink-0 ${
                            formData.agreeToPrivacy
                              ? "bg-[#DCB56D] border-[#DCB56D]"
                              : errors.agreeToPrivacy
                                ? "bg-white border-red-500"
                                : "bg-white border-[#023048]/30 hover:border-[#DCB56D]"
                          }`}
                        >
                          {formData.agreeToPrivacy && (
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
                        htmlFor="agreeToPrivacy"
                        className="text-[#023048]/80 text-xs sm:text-sm cursor-pointer select-none leading-relaxed"
                      >
                        <Link
                          href="/privacy-policy"
                          className="hover:underline font-semibold"
                        >
                          سياسة الخصوصية وحماية البيانات (GDPR)
                        </Link>
                        <Link
                          href="/privacy-policy"
                          className="text-[#0073D8] hover:underline mx-1 sm:mx-2 font-semibold"
                        >
                          معرفة المزيد
                        </Link>
                      </label>
                    </div>
                    {errors.agreeToPrivacy && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.agreeToPrivacy}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 sm:py-4 px-6 rounded-lg font-bold text-base sm:text-lg text-[#023048] transition-all duration-300 mt-4 sm:mt-6 ${
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
                        جاري التسجيل...
                      </span>
                    ) : (
                      "أكمل الطلب"
                    )}
                  </button>
                </form>
              </div>
            </div>

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
                  className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[#DCB56D] font-montserrat mb-8 xl:mb-10"
                >
                  مرحبا بك
                </h1>
                <p className="text-gray-500 text-base xl:text-lg font-montserrat">
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

export default SignUpPage;
