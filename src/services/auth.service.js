// services/auth.service.js
import axiosInstance from "./axios";

/* ═══════════════════════════════════════════════
   Token Helpers
   ═══════════════════════════════════════════════ */

function isBrowser() {
  return typeof window !== "undefined";
}

export function setAuthToken(token) {
  if (!isBrowser()) return;
  localStorage.setItem("token", token);
}

export function getAuthToken() {
  if (!isBrowser()) return null;
  return localStorage.getItem("token");
}

export function removeAuthToken() {
  if (!isBrowser()) return;
  localStorage.removeItem("token");
}

/* ═══════════════════════════════════════════════
   Error Handler — بيهندل كل حالات الأخطاء
   ═══════════════════════════════════════════════ */

function handleServiceError(error) {
  if (error?.response) {
    const status = error.response.status;
    const data = error.response.data;

    // بيجيب أول error من الـ array لو موجود
    // وإلا بيجيب الـ message العادية
    // وإلا بيجيب fallback حسب الـ status
    const message =
      (Array.isArray(data?.errors) && data.errors.length > 0
        ? data.errors[0]
        : null) ||
      data?.message ||
      data?.error ||
      data?.msg ||
      getFallbackMessage(status);

    return {
      success: false,
      message,
      errors: Array.isArray(data?.errors) ? data.errors : [],
      data: data || null,
      status,
    };
  }

  if (error?.request) {
    const isTimeout = error.code === "ECONNABORTED";

    return {
      success: false,
      message: isTimeout
        ? "Request timed out. Please check your connection and try again."
        : "Network error. Please check your connection and try again.",
      errors: [],
      data: null,
      status: 0,
    };
  }

  return {
    success: false,
    message:
      error?.message || "Something went wrong. Please try again in a moment.",
    errors: [],
    data: null,
    status: 0,
  };
}

function getFallbackMessage(status) {
  switch (status) {
    case 400:
      return "Invalid request. Please check your details and try again.";
    case 401:
      return "Invalid credentials. Please check your email and password.";
    case 403:
      return "You do not have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 409:
      return "An account with this email already exists.";
    case 422:
      return "Please check your details and try again.";
    case 429:
      return "Too many attempts. Please wait a moment and try again.";
    case 500:
    case 502:
    case 503:
    case 504:
      return "Server error. Please try again in a moment.";
    default:
      return "Something went wrong. Please try again.";
  }
}

/* ═══════════════════════════════════════════════
   Auth API
   ═══════════════════════════════════════════════ */

export async function login({ email, password }) {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    const token =
      response?.data?.token ||
      response?.data?.data?.token ||
      response?.data?.accessToken ||
      response?.data?.data?.accessToken ||
      null;

    if (token) {
      setAuthToken(token);
    }

    return {
      success: true,
      data: response.data,
      message: response?.data?.message || "Logged in successfully.",
      status: response.status,
    };
  } catch (error) {
    return handleServiceError(error);
  }
}

export async function register({
  name,
  email,
  password,
  confirm_password,
  phone,
  codeCountry,
  gender,
  country,
  address,
}) {
  try {
    const response = await axiosInstance.post("/auth/register", {
      name,
      email,
      password,
      confirm_password,
      phone,
      codeCountry,
      gender,
      country,
      address,
    });

    return {
      success: true,
      data: response.data,
      message: response?.data?.message || "Account created successfully.",
      status: response.status,
    };
  } catch (error) {
    return handleServiceError(error);
  }
}

// payload الحقيقي: { email, otp }
export async function verifyEmailCode({ email, otp }) {
  try {
    const response = await axiosInstance.post("/auth/verify-account", {
      email,
      otp,
    });

    return {
      success: true,
      data: response.data,
      message: response?.data?.message || "Email verified successfully.",
      status: response.status,
    };
  } catch (error) {
    return handleServiceError(error);
  }
}

// payload الحقيقي: { email }
export async function resendVerificationCode({ email }) {
  try {
    const response = await axiosInstance.post("/auth/resend-otp", {
      email,
    });

    return {
      success: true,
      data: response.data,
      message:
        response?.data?.message ||
        "A new verification code has been sent to your email.",
      status: response.status,
    };
  } catch (error) {
    return handleServiceError(error);
  }
}

/* ═══════════════════════════════════════════════
   Authenticated Requests
   ═══════════════════════════════════════════════ */

export async function getProfile() {
  try {
    const response = await axiosInstance.get("/auth/profile", {
      withToken: true,
    });

    return {
      success: true,
      data: response.data,
      message: response?.data?.message || "Profile fetched successfully.",
      status: response.status,
    };
  } catch (error) {
    return handleServiceError(error);
  }
}

export async function logout() {
  try {
    const response = await axiosInstance.post(
      "/auth/logout",
      {},
      { withToken: true }
    );

    removeAuthToken();

    return {
      success: true,
      data: response.data,
      message: response?.data?.message || "Logged out successfully.",
      status: response.status,
    };
  } catch (error) {
    // لازم نشيل التوكن حتى لو الـ logout request فشل
    removeAuthToken();
    return handleServiceError(error);
  }
}

// ═══════════════════════════════════════════════
// أضف هذه الـ functions في نهاية الملف
// قبل أو بعد الـ Authenticated Requests section
// ═══════════════════════════════════════════════

// payload: { email }
export async function forgetPassword({ email }) {
  try {
    const response = await axiosInstance.post("/auth/forget-password", {
      email,
    });

    return {
      success: true,
      data: response.data,
      message:
        response?.data?.message ||
        "A verification code has been sent to your email.",
      status: response.status,
    };
  } catch (error) {
    return handleServiceError(error);
  }
}

// payload: { email }
export async function resendForgetPasswordOtp({ email }) {
  try {
    const response = await axiosInstance.post(
      "/auth/resend-otp-forget-password",
      { email }
    );

    return {
      success: true,
      data: response.data,
      message:
        response?.data?.message ||
        "A new verification code has been sent to your email.",
      status: response.status,
    };
  } catch (error) {
    return handleServiceError(error);
  }
}

// payload: { email, otp, password, confirm }
export async function resetPassword({ email, otp, password, confirm }) {
  try {
    const response = await axiosInstance.patch("/auth/reset-password", {
      email,
      otp,
      password,
      confirm,
    });

    return {
      success: true,
      data: response.data,
      message: response?.data?.message || "Password reset successfully.",
      status: response.status,
    };
  } catch (error) {
    return handleServiceError(error);
  }
}
