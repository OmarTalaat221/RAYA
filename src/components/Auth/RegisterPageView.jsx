"use client";

import { useState, useCallback, useReducer, memo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import "react-phone-input-2/lib/style.css";
import "./style.css";
import { register } from "../../services/auth.service";

/* ═══════════════════════════════════════════════
   Dynamic imports
   ═══════════════════════════════════════════════ */

const AntSelect = dynamic(
  () => import("antd").then((mod) => ({ default: mod.Select })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[46px] w-full items-center rounded-2xl border border-black/10 bg-white px-4">
        <span className="text-sm text-secondary">Loading...</span>
      </div>
    ),
  }
);

const PhoneInput = dynamic(() => import("react-phone-input-2"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[46px] w-full items-center rounded-2xl border border-black/10 bg-white px-4">
      <span className="text-sm text-secondary">Loading...</span>
    </div>
  ),
});

const VerificationStep = dynamic(() => import("./VerificationStep"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-main/30 border-t-main" />
    </div>
  ),
});

/* ═══════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════ */

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  codeCountry: "",
  gender: "",
  country: "",
  address: "",
  phone: "",
};

const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const COUNTRY_OPTIONS = [
  { label: "Egypt", value: "Egypt" },
  { label: "Saudi Arabia", value: "Saudi Arabia" },
  { label: "United Arab Emirates", value: "United Arab Emirates" },
  { label: "Kuwait", value: "Kuwait" },
  { label: "Qatar", value: "Qatar" },
];

/* ═══════════════════════════════════════════════
   Reducer
   ═══════════════════════════════════════════════ */

const FORM_ACTIONS = {
  SET_FIELD: "SET_FIELD",
  SET_PHONE: "SET_PHONE",
  SET_FIELD_ERRORS: "SET_FIELD_ERRORS",
  SET_SUBMIT_ERROR: "SET_SUBMIT_ERROR",
  TOGGLE_SHOW_PASSWORD: "TOGGLE_SHOW_PASSWORD",
  TOGGLE_SHOW_CONFIRM_PASSWORD: "TOGGLE_SHOW_CONFIRM_PASSWORD",
  SET_SUBMITTING: "SET_SUBMITTING",
  RESET_ERRORS: "RESET_ERRORS",
};

const INITIAL_FORM_STATE = {
  formData: INITIAL_FORM_DATA,
  fieldErrors: {},
  submitError: "",
  showPassword: false,
  showConfirmPassword: false,
  isSubmitting: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case FORM_ACTIONS.SET_FIELD: {
      const { name, value } = action.payload;
      return {
        ...state,
        formData: { ...state.formData, [name]: value },
        fieldErrors: state.fieldErrors[name]
          ? { ...state.fieldErrors, [name]: "" }
          : state.fieldErrors,
        submitError: state.submitError ? "" : state.submitError,
      };
    }

    case FORM_ACTIONS.SET_PHONE: {
      const { phone, codeCountry } = action.payload;
      const nextErrors = { ...state.fieldErrors };
      if (nextErrors.phone) nextErrors.phone = "";
      if (nextErrors.codeCountry) nextErrors.codeCountry = "";
      return {
        ...state,
        formData: { ...state.formData, phone, codeCountry },
        fieldErrors: nextErrors,
        submitError: state.submitError ? "" : state.submitError,
      };
    }

    case FORM_ACTIONS.SET_FIELD_ERRORS:
      return { ...state, fieldErrors: action.payload };

    case FORM_ACTIONS.SET_SUBMIT_ERROR:
      return { ...state, submitError: action.payload };

    case FORM_ACTIONS.TOGGLE_SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword };

    case FORM_ACTIONS.TOGGLE_SHOW_CONFIRM_PASSWORD:
      return { ...state, showConfirmPassword: !state.showConfirmPassword };

    case FORM_ACTIONS.SET_SUBMITTING:
      return { ...state, isSubmitting: action.payload };

    case FORM_ACTIONS.RESET_ERRORS:
      return { ...state, fieldErrors: {}, submitError: "" };

    default:
      return state;
  }
}

/* ═══════════════════════════════════════════════
   Validators
   ═══════════════════════════════════════════════ */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidEgyptPhone(phone) {
  return /^(?:\+20|0020|0)?1[0125][0-9]{8}$/.test(phone.trim());
}

function isValidSaudiPhone(phone) {
  return /^(?:\+966|0)?5[0-9]{8}$/.test(phone.trim());
}

function validateForm(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password.trim()) {
    errors.password = "Password is required.";
  }

  if (!values.confirm_password.trim()) {
    errors.confirm_password = "Please confirm your password.";
  } else if (
    values.password.trim() &&
    values.password.trim() !== values.confirm_password.trim()
  ) {
    errors.confirm_password = "Passwords do not match.";
  }

  const trimmedCode = values.codeCountry.trim();
  const trimmedPhone = values.phone.trim();

  if (!trimmedCode) {
    errors.phone = "Please select a country and enter your phone number.";
  } else if (!trimmedPhone) {
    errors.phone = "Phone number is required.";
  } else if (
    trimmedCode === "+20" &&
    !isValidEgyptPhone(`+20${trimmedPhone}`)
  ) {
    errors.phone = "Please enter a valid Egyptian phone number.";
  } else if (
    trimmedCode === "+966" &&
    !isValidSaudiPhone(`+966${trimmedPhone}`)
  ) {
    errors.phone = "Please enter a valid Saudi phone number.";
  }

  if (!values.gender.trim()) {
    errors.gender = "Gender is required.";
  }

  if (!values.country.trim()) {
    errors.country = "Country is required.";
  }

  if (!values.address.trim()) {
    errors.address = "Address is required.";
  }

  return errors;
}

/* ═══════════════════════════════════════════════
   className helpers
   ═══════════════════════════════════════════════ */

function getInputClassName(hasError) {
  return `w-full rounded-2xl border bg-white px-4 py-3 text-sm text-soft-black outline-none transition duration-200 placeholder:text-secondary ${
    hasError
      ? "border-red-300 ring-4! ring-red-50!"
      : "border-black/10 focus:border-main/60! focus:ring-4! focus:ring-main/10!"
  }`;
}

function getPasswordShellClassName(hasError) {
  return `flex w-full items-center gap-3 rounded-2xl border bg-white px-4 py-3 transition duration-200 ${
    hasError
      ? "border-red-300 ring-4! ring-red-50!"
      : "border-black/10 focus-within:border-main/60! focus-within:ring-4! focus-within:ring-main/10!"
  }`;
}

function getTextareaClassName(hasError) {
  return `w-full resize-none rounded-2xl border bg-white px-4 py-3 text-sm text-soft-black outline-none transition duration-200 placeholder:text-secondary ${
    hasError
      ? "border-red-300 ring-4! ring-red-50!"
      : "border-black/10 focus:border-main/60! focus:ring-4! focus:ring-main/10!"
  }`;
}

/* ═══════════════════════════════════════════════
   Error helpers
   ═══════════════════════════════════════════════ */

function buildSubmitError(result) {
  if (result.errors && result.errors.length > 0) {
    return result.errors.join("\n");
  }
  return result.message;
}

function SubmitErrorDisplay({ error }) {
  if (!error) return null;

  const lines = error.split("\n").filter(Boolean);

  if (lines.length <= 1) {
    return (
      <p
        role="alert"
        className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600"
      >
        {error}
      </p>
    );
  }

  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3"
    >
      <ul className="space-y-1">
        {lines.map((line, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm leading-6 text-red-600"
          >
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Shared UI
   ═══════════════════════════════════════════════ */

const FieldError = memo(function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm leading-6 text-red-600">
      {message}
    </p>
  );
});

FieldError.displayName = "FieldError";

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

const PasswordField = memo(function PasswordField({
  id,
  label,
  value,
  onChange,
  show,
  onToggle,
  placeholder,
  autoComplete,
  hasError,
  errorId,
  errorMessage,
  ariaLabel,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black"
      >
        {label}
      </label>

      <div className={getPasswordShellClassName(hasError)}>
        <input
          id={id}
          name={id}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className="w-full bg-transparent text-sm text-soft-black outline-none placeholder:text-secondary"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={ariaLabel}
          className="shrink-0 rounded-md text-xs font-medium uppercase tracking-[0.14em] text-main transition hover:text-soft-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/20"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      <FieldError id={errorId} message={errorMessage} />
    </div>
  );
});

PasswordField.displayName = "PasswordField";

const SelectField = memo(function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  hasError,
  errorId,
  errorMessage,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black"
      >
        {label}
      </label>

      <div
        className={
          hasError
            ? "register-select-shell register-select-error"
            : "register-select-shell register-select-normal"
        }
      >
        <AntSelect
          id={id}
          size="large"
          value={value || undefined}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          showSearch={false}
          suffixIcon={<ChevronDown size={16} className="text-secondary" />}
          className="register-ant-select w-full!"
          popupClassName="register-ant-dropdown"
          getPopupContainer={(trigger) => trigger.parentElement}
        />
      </div>

      <FieldError id={errorId} message={errorMessage} />
    </div>
  );
});

SelectField.displayName = "SelectField";

/* ═══════════════════════════════════════════════
   RegisterForm
   ═══════════════════════════════════════════════ */

const RegisterForm = memo(function RegisterForm({ state, dispatch, onSubmit }) {
  const {
    formData,
    fieldErrors,
    submitError,
    showPassword,
    showConfirmPassword,
    isSubmitting,
  } = state;

  const phoneHasError = Boolean(fieldErrors.phone || fieldErrors.codeCountry);

  const handleNameChange = useCallback(
    (e) =>
      dispatch({
        type: FORM_ACTIONS.SET_FIELD,
        payload: { name: "name", value: e.target.value },
      }),
    [dispatch]
  );

  const handleEmailChange = useCallback(
    (e) =>
      dispatch({
        type: FORM_ACTIONS.SET_FIELD,
        payload: { name: "email", value: e.target.value },
      }),
    [dispatch]
  );

  const handlePasswordChange = useCallback(
    (e) =>
      dispatch({
        type: FORM_ACTIONS.SET_FIELD,
        payload: { name: "password", value: e.target.value },
      }),
    [dispatch]
  );

  const handleConfirmPasswordChange = useCallback(
    (e) =>
      dispatch({
        type: FORM_ACTIONS.SET_FIELD,
        payload: { name: "confirm_password", value: e.target.value },
      }),
    [dispatch]
  );

  const handleAddressChange = useCallback(
    (e) =>
      dispatch({
        type: FORM_ACTIONS.SET_FIELD,
        payload: { name: "address", value: e.target.value },
      }),
    [dispatch]
  );

  const handleGenderChange = useCallback(
    (value) =>
      dispatch({
        type: FORM_ACTIONS.SET_FIELD,
        payload: { name: "gender", value },
      }),
    [dispatch]
  );

  const handleCountryChange = useCallback(
    (value) =>
      dispatch({
        type: FORM_ACTIONS.SET_FIELD,
        payload: { name: "country", value },
      }),
    [dispatch]
  );

  const handlePhoneChange = useCallback(
    (value, countryData) => {
      const dialCode = countryData?.dialCode ? `+${countryData.dialCode}` : "";
      const phoneWithoutCode = dialCode
        ? value.slice(countryData.dialCode.length)
        : value;
      dispatch({
        type: FORM_ACTIONS.SET_PHONE,
        payload: { phone: phoneWithoutCode, codeCountry: dialCode },
      });
    },
    [dispatch]
  );

  const togglePassword = useCallback(
    () => dispatch({ type: FORM_ACTIONS.TOGGLE_SHOW_PASSWORD }),
    [dispatch]
  );

  const toggleConfirmPassword = useCallback(
    () => dispatch({ type: FORM_ACTIONS.TOGGLE_SHOW_CONFIRM_PASSWORD }),
    [dispatch]
  );

  const phoneValue = formData.codeCountry
    ? `${formData.codeCountry.replace("+", "")}${formData.phone}`
    : formData.phone;

  return (
    <>
      {/* ── header ── */}
      <div className="mb-8 flex flex-col items-center justify-center gap-3">
        <AuthLogo />

        <div className="space-y-3 text-center">
          <h1
            id="register-heading"
            className="text-3xl leading-none text-soft-black font-oswald! sm:text-[2.2rem]"
          >
            Create Account
          </h1>

          <p className="mx-auto max-w-[52ch] text-sm leading-6 text-secondary">
            Complete your registration details to create your RDS Pharma account
            and continue with authorized access.
          </p>
        </div>
      </div>

      {/* ── form ── */}
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="Your full name"
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              className={getInputClassName(Boolean(fieldErrors.name))}
            />

            <FieldError id="name-error" message={fieldErrors.name} />
          </div>

          {/* email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              value={formData.email}
              onChange={handleEmailChange}
              placeholder="name@company.com"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={getInputClassName(Boolean(fieldErrors.email))}
            />

            <FieldError id="email-error" message={fieldErrors.email} />
          </div>

          {/* password */}
          <PasswordField
            id="password"
            label="Password"
            value={formData.password}
            onChange={handlePasswordChange}
            show={showPassword}
            onToggle={togglePassword}
            placeholder="Create a password"
            autoComplete="new-password"
            hasError={Boolean(fieldErrors.password)}
            errorId="password-error"
            errorMessage={fieldErrors.password}
            ariaLabel={showPassword ? "Hide password" : "Show password"}
          />

          {/* confirm password */}
          <PasswordField
            id="confirm_password"
            label="Confirm Password"
            value={formData.confirm_password}
            onChange={handleConfirmPasswordChange}
            show={showConfirmPassword}
            onToggle={toggleConfirmPassword}
            placeholder="Confirm your password"
            autoComplete="new-password"
            hasError={Boolean(fieldErrors.confirm_password)}
            errorId="confirm-password-error"
            errorMessage={fieldErrors.confirm_password}
            ariaLabel={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          />

          {/* phone */}
          <div className="space-y-2 sm:col-span-2">
            <label
              htmlFor="phone"
              className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black"
            >
              Phone Number
            </label>

            <div
              className={
                phoneHasError
                  ? "register-phone-shell register-phone-error"
                  : "register-phone-shell register-phone-normal"
              }
            >
              <PhoneInput
                country="eg"
                disableCountryGuess
                countryCodeEditable={false}
                enableSearch={false}
                disableSearchIcon
                placeholder="Enter your phone number"
                value={phoneValue}
                onChange={handlePhoneChange}
                inputProps={{
                  id: "phone",
                  name: "phone",
                  autoComplete: "tel",
                }}
                containerClass="register-phone-container"
                inputClass="register-phone-input"
                buttonClass="register-phone-button"
                dropdownClass="register-phone-dropdown"
              />
            </div>

            <FieldError
              id="phone-error"
              message={fieldErrors.phone || fieldErrors.codeCountry}
            />
          </div>

          {/* gender */}
          <SelectField
            id="gender"
            label="Gender"
            value={formData.gender}
            onChange={handleGenderChange}
            options={GENDER_OPTIONS}
            placeholder="Select gender"
            hasError={Boolean(fieldErrors.gender)}
            errorId="gender-error"
            errorMessage={fieldErrors.gender}
          />

          {/* country */}
          <SelectField
            id="country"
            label="Country"
            value={formData.country}
            onChange={handleCountryChange}
            options={COUNTRY_OPTIONS}
            placeholder="Select country"
            hasError={Boolean(fieldErrors.country)}
            errorId="country-error"
            errorMessage={fieldErrors.country}
          />

          {/* address */}
          <div className="space-y-2 sm:col-span-2">
            <label
              htmlFor="address"
              className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black"
            >
              Address
            </label>

            <textarea
              id="address"
              name="address"
              rows={3}
              autoComplete="street-address"
              value={formData.address}
              onChange={handleAddressChange}
              placeholder="Enter your full address"
              aria-invalid={Boolean(fieldErrors.address)}
              aria-describedby={
                fieldErrors.address ? "address-error" : undefined
              }
              className={getTextareaClassName(Boolean(fieldErrors.address))}
            />

            <FieldError id="address-error" message={fieldErrors.address} />
          </div>
        </div>

        {/* submit error */}
        <div className="min-h-6" aria-live="polite" aria-atomic="true">
          <SubmitErrorDisplay error={submitError} />
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
              Creating Account...
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>

      {/* footer link */}
      <div className="mt-6 text-center">
        <p className="text-sm leading-6 text-secondary">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-soft-black underline underline-offset-4! transition hover:text-main! hover:underline! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/20"
          >
            Login
          </Link>
        </p>
      </div>
    </>
  );
});

RegisterForm.displayName = "RegisterForm";

/* ═══════════════════════════════════════════════
   Main Export
   ═══════════════════════════════════════════════ */

export default function RegisterPageView() {
  const [step, setStep] = useState("register");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [state, dispatch] = useReducer(formReducer, INITIAL_FORM_STATE);

  // ✅ Fix: useRef للـ formData عشان handleSubmit ما يعتمدش على state كاملة
  const formDataRef = useRef(state.formData);
  const isSubmittingRef = useRef(state.isSubmitting);

  // sync refs مع state
  formDataRef.current = state.formData;
  isSubmittingRef.current = state.isSubmitting;

  const handleBackToRegister = useCallback(() => {
    setStep("register");
  }, []);

  // ✅ Fix: handleSubmit بيقرأ من refs مش من state مباشرة
  const handleSubmit = useCallback(
    async function handleSubmit(event) {
      event.preventDefault();

      if (isSubmittingRef.current) return;

      dispatch({ type: FORM_ACTIONS.RESET_ERRORS });

      const currentFormData = formDataRef.current;
      const errors = validateForm(currentFormData);

      if (Object.keys(errors).length > 0) {
        dispatch({ type: FORM_ACTIONS.SET_FIELD_ERRORS, payload: errors });
        return;
      }

      dispatch({ type: FORM_ACTIONS.SET_SUBMITTING, payload: true });

      try {
        const result = await register({
          name: currentFormData.name.trim(),
          email: currentFormData.email.trim(),
          password: currentFormData.password,
          confirm_password: currentFormData.confirm_password,
          codeCountry: currentFormData.codeCountry.trim(),
          gender: currentFormData.gender.trim(),
          country: currentFormData.country.trim(),
          address: currentFormData.address.trim(),
          phone: currentFormData.phone.trim(),
        });

        if (!result.success) {
          dispatch({
            type: FORM_ACTIONS.SET_SUBMIT_ERROR,
            payload: buildSubmitError(result),
          });
          return;
        }

        setRegisteredEmail(currentFormData.email.trim());
        setStep("verify");
      } finally {
        dispatch({ type: FORM_ACTIONS.SET_SUBMITTING, payload: false });
      }
    },
    [dispatch]
  );

  return (
    <main className="relative flex min-h-screen min-h-dvh items-center justify-center overflow-hidden bg-[#f4f3f0] px-4 py-8 font-poppins! sm:px-6 lg:px-8">
      <BackgroundBlobs />

      {/* ✅ Fix: مش بنغير الـ max-width بـ transition-all
          بدل كده بنخلي الـ section يبقى full width دايمًا
          والـ inner card هو اللي بيتحكم في الـ width */}
      <section
        aria-labelledby="register-heading"
        className="relative z-10 w-full"
      >
        <div
          className={`mx-auto transition-[max-width] duration-300 ease-in-out ${
            step === "register" ? "max-w-[760px]" : "max-w-[460px]"
          }`}
        >
          <div className="rounded-[30px] border border-black/5 bg-white/95 p-6 shadow-[0_24px_80px_rgba(45,45,45,0.10)] backdrop-blur-sm sm:p-8">
            {step === "verify" ? (
              <VerificationStep
                email={registeredEmail}
                onBack={handleBackToRegister}
              />
            ) : (
              <RegisterForm
                state={state}
                dispatch={dispatch}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
