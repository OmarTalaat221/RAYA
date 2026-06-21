// services/profile.service.js

import axiosInstance from "./axios";

/* ─── Profile ─────────────────────────────────────────────────────────────── */

export async function getProfile() {
  const response = await axiosInstance.get("/profile");
  return response.data;
}

export async function updateProfile(payload) {
  const response = await axiosInstance.patch("/profile", payload);
  return response.data;
}

/* ─── Orders ──────────────────────────────────────────────────────────────── */

export async function getProfileOrders({ page = 1, limit = 20 } = {}) {
  const response = await axiosInstance.get("/profile/orders", {
    params: { page, limit },
  });
  return response.data;
}

export async function getProfileOrderById(orderId) {
  const response = await axiosInstance.get(`/profile/orders/${orderId}`);
  return response.data;
}

/* ─── Change password (2-step OTP) ────────────────────────────────────────── */

export async function requestPasswordChange() {
  const response = await axiosInstance.post(
    "/profile/change-password/request",
    {},
  );
  return response.data;
}

export async function verifyPasswordChange({ otp, password, confirmPassword }) {
  const response = await axiosInstance.post("/profile/change-password/verify", {
    otp: String(otp || "").trim(),
    password,
    confirmPassword,
  });
  return response.data;
}

/* ─── Addresses ──────────────────────────────────────────────────────────── */

/**
 * Add a new address.
 * NOTE: backend expects `adress` (single d) — do not change.
 */
export async function addAddress(addressValue) {
  const response = await axiosInstance.post("/profile/adress", {
    address: String(addressValue || "").trim(),
  });
  return response.data;
}

/**
 * Update an existing address.
 * NOTE: backend expects `address` (double d) — do not change.
 */
export async function updateAddress(id, addressValue) {
  const response = await axiosInstance.patch(`/profile/adress/${id}`, {
    address: String(addressValue || "").trim(),
  });
  return response.data;
}

export async function deleteAddress(id) {
  const response = await axiosInstance.delete(`/profile/adress/${id}`);
  return response.data;
}
