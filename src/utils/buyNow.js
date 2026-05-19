// utils/buyNow.js

const BUY_NOW_KEY = "rds-buy-now";
const BUY_NOW_TTL = 30 * 60 * 1000; // 30 minutes

export function setBuyNowItem(item) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      BUY_NOW_KEY,
      JSON.stringify({ ...item, createdAt: Date.now() })
    );
  } catch {
    /* ignore */
  }
}

export function getBuyNowItem() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(BUY_NOW_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.createdAt || Date.now() - parsed.createdAt > BUY_NOW_TTL) {
      window.sessionStorage.removeItem(BUY_NOW_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearBuyNowItem() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(BUY_NOW_KEY);
  } catch {
    /* ignore */
  }
}