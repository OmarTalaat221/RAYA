// services/axios.js

import axios from "axios";
import { getOrCreateDeviceId } from "../utils/deviceId";

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
  async (config) => {
    config.headers = config.headers || {};
    
    if (typeof config.headers.set === "function") {
      config.headers.set("lang", "en");
    } else {
      config.headers["lang"] = "en";
    }

    // ─── Geo/IP headers for SSR ───
    if (!isBrowser()) {
      try {
        const { headers, cookies } = await import("next/headers");
        const headersList = await headers();
        const forwardedFor = headersList.get("x-forwarded-for");
        const realIp = headersList.get("x-real-ip");
        
        const isLocalIp = (ip) => !ip || ip === "::1" || ip === "127.0.0.1" || ip.includes("localhost");

        if (forwardedFor && !isLocalIp(forwardedFor)) {
          if (typeof config.headers.set === "function") config.headers.set("x-forwarded-for", forwardedFor);
          else config.headers["x-forwarded-for"] = forwardedFor;
        }
        if (realIp && !isLocalIp(realIp)) {
          if (typeof config.headers.set === "function") config.headers.set("x-real-ip", realIp);
          else config.headers["x-real-ip"] = realIp;
        }

        const cookieStore = await cookies();
        const deviceId = cookieStore.get("rds-device-id")?.value;
        if (deviceId) {
          if (typeof config.headers.set === "function") config.headers.set("x-device-id", deviceId);
          else config.headers["x-device-id"] = deviceId;
        }
      } catch (error) {
        // Safe to ignore: might be used outside request context or static generation
      }
    }

    // ─── Currency headers (read from Redux) ───
    const currency = getCurrencyFromStore();
    if (currency) {
      if (typeof config.headers.set === "function") {
        config.headers.set("x-user-currency", currency);
        config.headers.set("x-currency", currency);
      } else {
        config.headers["x-user-currency"] = currency;
        config.headers["x-currency"] = currency;
      }
    }

    // ─── Auth token ───
    if (config.withToken === true) {
      const token = config.token || getStoredToken();
      if (token) {
        if (typeof config.headers.set === "function") {
          config.headers.set("Authorization", `Bearer ${token}`);
        } else {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }
    }

    // ─── Device ID ───
    const deviceId = getOrCreateDeviceId();
    if (deviceId) {
      if (typeof config.headers.set === "function") {
        config.headers.set("x-device-id", deviceId);
      } else {
        config.headers["x-device-id"] = deviceId;
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
