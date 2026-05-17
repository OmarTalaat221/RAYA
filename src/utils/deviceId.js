// utils/deviceId.js

const DEVICE_ID_KEY = "rds-device-id";

function generateUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getOrCreateDeviceId() {
  if (typeof window === "undefined") return "";

  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = generateUUID();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }

  // Ensure it's in cookies for SSR
  if (!document.cookie.includes(`${DEVICE_ID_KEY}=`)) {
    document.cookie = `${DEVICE_ID_KEY}=${deviceId}; path=/; max-age=31536000; SameSite=Lax`;
  }

  return deviceId;
}
