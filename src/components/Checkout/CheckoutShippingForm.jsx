"use client";

import { useCallback, useReducer, useRef, memo } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import "react-phone-input-2/lib/style.css";
import "./checkout-style.css";

/* ═══════════════════════════════════════════════
   Dynamic imports
   ═══════════════════════════════════════════════ */

function PhoneInputLoading() {
  const t = useTranslations("checkout");

  return (
    <div className="flex h-[48px] w-full items-center rounded-2xl border border-black/10 bg-white px-4">
      <span className="text-sm text-secondary">{t("loading")}</span>
    </div>
  );
}

const PhoneInput = dynamic(() => import("react-phone-input-2"), {
  ssr: false,
  loading: () => <PhoneInputLoading />,
});

/* ═══════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════ */

const INITIAL_FORM_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  codeCountry: "",
  country: "",
  city: "",
  state: "",
  address: "",
  apartment: "",
  postalCode: "",
  notes: "",
};

/* ═══════════════════════════════════════════════
   Reducer
   ═══════════════════════════════════════════════ */

const ACTIONS = {
  SET_FIELD: "SET_FIELD",
  SET_PHONE: "SET_PHONE",
  SET_ERRORS: "SET_ERRORS",
  RESET_ERRORS: "RESET_ERRORS",
};

function formReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_FIELD: {
      const { name, value } = action.payload;
      return {
        ...state,
        formData: { ...state.formData, [name]: value },
        fieldErrors: state.fieldErrors[name]
          ? { ...state.fieldErrors, [name]: "" }
          : state.fieldErrors,
      };
    }
    case ACTIONS.SET_PHONE: {
      const { phone, codeCountry } = action.payload;
      const nextErrors = { ...state.fieldErrors };
      if (nextErrors.phone) nextErrors.phone = "";
      return {
        ...state,
        formData: { ...state.formData, phone, codeCountry },
        fieldErrors: nextErrors,
      };
    }
    case ACTIONS.SET_ERRORS:
      return { ...state, fieldErrors: action.payload };
    case ACTIONS.RESET_ERRORS:
      return { ...state, fieldErrors: {} };
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

function validateShipping(values, t) {
  const errors = {};

  if (!values.firstName.trim()) errors.firstName = t("errors.firstName");
  if (!values.lastName.trim()) errors.lastName = t("errors.lastName");

  if (!values.email.trim()) {
    errors.email = t("errors.email");
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = t("errors.emailInvalid");
  }

  if (!values.codeCountry.trim() || !values.phone.trim()) {
    errors.phone = t("errors.phone");
  }

  if (!values.country.trim()) errors.country = t("errors.country");
  if (!values.city.trim()) errors.city = t("errors.city");
  if (!values.address.trim()) errors.address = t("errors.address");

  return errors;
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

/* ═══════════════════════════════════════════════
   InputShell — click anywhere to focus the input
   ═══════════════════════════════════════════════ */

const InputShell = memo(function InputShell({ hasError, children, inputId }) {
  const handleShellClick = useCallback(() => {
    if (inputId) {
      const el = document.getElementById(inputId);
      if (el) el.focus();
    }
  }, [inputId]);

  return (
    <div
      onClick={handleShellClick}
      className={`flex w-full cursor-text items-center rounded-2xl border bg-white px-4 py-3 transition duration-200 ${
        hasError
          ? "border-red-300 ring-4! ring-red-50!"
          : "border-black/10 focus-within:border-main/60! focus-within:ring-4! focus-within:ring-main/10!"
      }`}
    >
      {children}
    </div>
  );
});

InputShell.displayName = "InputShell";

/* ═══════════════════════════════════════════════
   TextareaShell — click anywhere to focus
   ═══════════════════════════════════════════════ */

const TextareaShell = memo(function TextareaShell({
  hasError,
  children,
  inputId,
}) {
  const handleShellClick = useCallback(() => {
    if (inputId) {
      const el = document.getElementById(inputId);
      if (el) el.focus();
    }
  }, [inputId]);

  return (
    <div
      onClick={handleShellClick}
      className={`flex w-full cursor-text rounded-2xl border bg-white px-4 py-3 transition duration-200 ${
        hasError
          ? "border-red-300 ring-4! ring-red-50!"
          : "border-black/10 focus-within:border-main/60! focus-within:ring-4! focus-within:ring-main/10!"
      }`}
    >
      {children}
    </div>
  );
});

TextareaShell.displayName = "TextareaShell";

/* ═══════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════ */

export default function CheckoutShippingForm({
  onSubmit,
  loading,
  initialData,
}) {
  const t = useTranslations("checkout");
  const [state, dispatch] = useReducer(formReducer, {
    formData: initialData || INITIAL_FORM_DATA,
    fieldErrors: {},
  });

  const formDataRef = useRef(state.formData);
  formDataRef.current = state.formData;

  const { formData, fieldErrors } = state;
  const phoneHasError = Boolean(fieldErrors.phone);

  /* ── Handlers ── */

  const handleField = useCallback(
    (name) => (e) => {
      dispatch({
        type: ACTIONS.SET_FIELD,
        payload: { name, value: e.target.value },
      });
    },
    []
  );

  const handlePhoneChange = useCallback((value, countryData) => {
    const dialCode = countryData?.dialCode ? `+${countryData.dialCode}` : "";
    const phoneWithoutCode = dialCode
      ? value.slice(countryData.dialCode.length)
      : value;
    dispatch({
      type: ACTIONS.SET_PHONE,
      payload: { phone: phoneWithoutCode, codeCountry: dialCode },
    });
  }, []);

  const phoneValue = formData.codeCountry
    ? `${formData.codeCountry.replace("+", "")}${formData.phone}`
    : formData.phone;

  /* ── Submit ── */

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({ type: ACTIONS.RESET_ERRORS });

      const current = formDataRef.current;
      const errors = validateShipping(current, t);

      if (Object.keys(errors).length > 0) {
        dispatch({ type: ACTIONS.SET_ERRORS, payload: errors });

        // scroll to first error
        const firstErrorKey = Object.keys(errors)[0];
        const el = document.getElementById(firstErrorKey);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      onSubmit({
        firstName: current.firstName.trim(),
        lastName: current.lastName.trim(),
        email: current.email.trim(),
        phone: `${current.codeCountry}${current.phone}`.trim(),
        country: current.country.trim(),
        city: current.city.trim(),
        state: current.state.trim(),
        address: current.address.trim(),
        apartment: current.apartment.trim(),
        postalCode: current.postalCode.trim(),
        notes: current.notes.trim(),
      });
    },
    [onSubmit, t]
  );

  /* ── Render helper ── */

  const renderField = (name, label, placeholder, opts = {}) => {
    const {
      type = "text",
      autoComplete = "off",
      inputMode,
      colSpan,
      required = true,
    } = opts;
    const hasError = Boolean(fieldErrors[name]);

    return (
      <div className={`space-y-2 ${colSpan || ""}`}>
        <label
          htmlFor={name}
          className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black"
        >
          {label}
          {!required && (
            <span className="ml-1.5 normal-case tracking-normal font-normal text-secondary">
              ({t("optional")})
            </span>
          )}
        </label>

        <InputShell hasError={hasError} inputId={name}>
          <input
            id={name}
            name={name}
            type={type}
            inputMode={inputMode}
            autoComplete={autoComplete}
            value={formData[name]}
            onChange={handleField(name)}
            placeholder={placeholder}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${name}-error` : undefined}
            className="w-full bg-transparent text-sm text-soft-black outline-none placeholder:text-secondary"
          />
        </InputShell>

        <FieldError id={`${name}-error`} message={fieldErrors[name]} />
      </div>
    );
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-oswald! text-soft-black sm:text-2xl">
        {t("shippingInformation")}
      </h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* First Name */}
          {renderField("firstName", t("fields.firstName"), t("placeholders.firstName"), {
            autoComplete: "given-name",
          })}

          {/* Last Name */}
          {renderField("lastName", t("fields.lastName"), t("placeholders.lastName"), {
            autoComplete: "family-name",
          })}

          {/* Email */}
          {renderField("email", t("fields.email"), t("placeholders.email"), {
            type: "email",
            inputMode: "email",
            autoComplete: "email",
            colSpan: "sm:col-span-2",
          })}

          {/* Phone */}
          <div className="space-y-2 sm:col-span-2">
            <label
              htmlFor="checkout-phone"
              className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black"
            >
              {t("fields.phone")}
            </label>

            <div
              className={
                phoneHasError
                  ? "checkout-phone-shell checkout-phone-error"
                  : "checkout-phone-shell checkout-phone-normal"
              }
            >
              <PhoneInput
                country="ae"
                disableCountryGuess
                countryCodeEditable={false}
                enableSearch={false}
                disableSearchIcon
                placeholder="50 123 4567"
                value={phoneValue}
                onChange={handlePhoneChange}
                inputProps={{
                  id: "checkout-phone",
                  name: "phone",
                  autoComplete: "tel",
                }}
                containerClass="checkout-phone-container"
                inputClass="checkout-phone-input"
                buttonClass="checkout-phone-button"
                dropdownClass="checkout-phone-dropdown"
              />
            </div>

            <FieldError id="phone-error" message={fieldErrors.phone} />
          </div>

          {/* Country */}
          {renderField("country", t("fields.country"), t("placeholders.country"), {
            autoComplete: "country-name",
          })}

          {/* State / Province / Region */}
          {renderField("state", t("fields.state"), t("placeholders.state"), {
            autoComplete: "address-level1",
            required: false,
          })}

          {/* City */}
          {renderField("city", t("fields.city"), t("placeholders.city"), {
            autoComplete: "address-level2",
          })}

          {/* Postal Code */}
          {renderField("postalCode", t("fields.postalCode"), t("placeholders.postalCode"), {
            autoComplete: "postal-code",
            required: false,
          })}

          {/* Street Address */}
          {renderField("address", t("fields.address"), t("placeholders.address"), {
            autoComplete: "address-line1",
            colSpan: "sm:col-span-2",
          })}

          {/* Apartment */}
          {renderField(
            "apartment",
            t("fields.apartment"),
            t("placeholders.apartment"),
            {
              autoComplete: "address-line2",
              colSpan: "sm:col-span-2",
              required: false,
            }
          )}

          {/* Order Notes */}
          <div className="space-y-2 sm:col-span-2">
            <label
              htmlFor="notes"
              className="block text-[13px] font-medium uppercase tracking-[0.12em] text-soft-black"
            >
              {t("fields.notes")}
              <span className="ml-1.5 normal-case tracking-normal font-normal text-secondary">
                ({t("optional")})
              </span>
            </label>

            <TextareaShell hasError={false} inputId="notes">
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleField("notes")}
                placeholder={t("placeholders.notes")}
                className="w-full resize-none bg-transparent text-sm text-soft-black outline-none placeholder:text-secondary"
              />
            </TextareaShell>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-main px-5 text-sm font-medium uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(104,188,82,0.28)] transition duration-200 hover:bg-[#5eae49] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-main/20 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {t("processing")}
            </>
          ) : (
            t("continueToPayment")
          )}
        </button>
      </form>
    </div>
  );
}
