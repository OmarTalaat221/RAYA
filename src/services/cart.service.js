// services/cart.service.js

import axiosInstance from "./axios";
import { getOrCreateDeviceId } from "../utils/deviceId";

/**
 * GET /cart/{deviceId}
 */
export async function getCart() {
  const deviceId = getOrCreateDeviceId();
  const response = await axiosInstance.get(`/cart/${deviceId}`);
  return response.data;
}

/**
 * POST /cart/toggle-cart-item  (Add / Remove toggle)
 */
export async function toggleCartItem(productId, quantity = 1) {
  const deviceId = getOrCreateDeviceId();
  const response = await axiosInstance.post("/cart/toggle-cart-item", {
    deviceId,
    productId,
    quantity,
  });
  return response.data;
}

/**
 * PATCH /cart/update-cart-item  (increment +1 / decrement -1)
 */
export async function updateCartItem(productId, quantity) {
  const deviceId = getOrCreateDeviceId();
  const response = await axiosInstance.patch("/cart/update-cart-item", {
    deviceId,
    productId,
    quantity,
  });
  return response.data;
}

/**
 * DELETE /cart/clear-cart
 */
export async function clearCartApi() {
  const deviceId = getOrCreateDeviceId();
  const response = await axiosInstance.delete("/cart/clear-cart", {
    data: { deviceId },
  });
  return response.data;
}
