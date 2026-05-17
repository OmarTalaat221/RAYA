// services/axios.js

import axios from "axios";

const API_BASE_URL = "https://rdspharma.cloud";

const TOKEN_KEY = "raya-token";

/* ─── Store reference (injected from Provider) ────────────────────────────── */

let storeRef = null;

/**
 * Called once from the Redux Provider after the store is created.
 * Allows axios to read state (currency, etc.) without importing the store
 * directly (avoids circular dependencies).
 */
export function injectStore(store) {
  storeRef = store;
}

/* ─── helpers ─────────────────────────────────────────────────────────────── */

function isBrowser() {
  return typeof window !== "undefined";
}

function getStoredToken() {
  if (!isBrowser()) return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function getCurrencyFromStore() {
  if (!storeRef) return null;
  try {
    const state = storeRef.getState();
    return state?.geo?.currency || null;
  } catch {
    return null;
  }
}

/* ─── axios instance ──────────────────────────────────────────────────────── */

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    lang: "en",
  },
});

/* ─── request interceptor ─────────────────────────────────────────────────── */

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    config.headers.lang = "en";

    // ─── Currency headers (read from Redux) ───
    const currency = getCurrencyFromStore();
    if (currency) {
      config.headers["x-user-currency"] = currency;
      config.headers["x-currency"] = currency;
    }

    // ─── Auth token ───
    if (config.withToken === true) {
      const token = config.token || getStoredToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ─── response interceptor ────────────────────────────────────────────────── */

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
