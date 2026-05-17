import axiosInstance from "./axios";
import { getOrCreateDeviceId } from "../utils/deviceId";

function normalizeCartItems(cartItems = []) {
  return cartItems.reduce((acc, item) => {
    const productId = item?.id;
    const quantity = Number(item?.quantity || 0);

    if (!productId || quantity < 1) return acc;

    acc.push({ productId, quantity });
    return acc;
  }, []);
}

export async function createCheckoutSession({
  cartItems = [],
  shippingInfo = {},
}) {
  const deviceId = getOrCreateDeviceId();
  const items = normalizeCartItems(cartItems);

  if (!items.length) {
    throw new Error("Your cart is empty.");
  }

  const response = await axiosInstance.post("/checkout/create-session", {
    items,
    guestEmail: String(shippingInfo?.email ?? "").trim(),
    cartToken: deviceId,
    firstName: String(shippingInfo?.firstName ?? "").trim(),
    lastName: String(shippingInfo?.lastName ?? "").trim(),
    email: String(shippingInfo?.email ?? "").trim(),
    phone: String(shippingInfo?.phone ?? "").trim(),
    country: String(shippingInfo?.country ?? "").trim(),
    state: String(shippingInfo?.state ?? "").trim(),
    city: String(shippingInfo?.city ?? "").trim(),
    zipCode: String(shippingInfo?.postalCode ?? "").trim(),
    streetAddress: String(shippingInfo?.address ?? "").trim(),
    apartment: String(shippingInfo?.apartment ?? "").trim(),
    deliveryNotes: String(shippingInfo?.notes ?? "").trim(),
    couponCode: "",
  });

  return response.data;
}

export async function getCheckoutSessionStatus(orderId, config = {}) {
  if (!orderId) {
    throw new Error("Order ID is required.");
  }

  const response = await axiosInstance.get(
    `/checkout/session-status/${orderId}`,
    config
  );

  return response.data;
}
