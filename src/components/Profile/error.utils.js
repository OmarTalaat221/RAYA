// components/Profile/error.utils.js

export function extractErrorMessage(error, fallback = "Something went wrong.") {
  if (!error) return fallback;
  if (typeof error === "string") return error;

  const data = error?.response?.data || error;

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors.join("\n");
  }

  if (data?.message) return data.message;
  if (error?.message) return error.message;

  return fallback;
}
