import axiosInstance from "./axios";
import { getOrCreateDeviceId } from "../utils/deviceId";

/**
 * POST /checkout/create-payment-intent
 *
 * When the real API is ready, this will call the backend.
 * For now, we simulate the response so we can test the full flow.
 */
export async function createPaymentIntent(shippingInfo) {
  const deviceId = getOrCreateDeviceId();

  /* ═══════════════════════════════════════════════
     🔧 MOCK MODE — Remove this block once the
        backend endpoint is ready, and uncomment
        the real API call below.
     ═══════════════════════════════════════════════ */
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    data: {
      clientSecret: "MOCK_SECRET_FOR_UI_TESTING",
      orderId: `ORD-${Date.now().toString(36).toUpperCase()}`,
      summary: {
        subtotal: 0,
        shipping: 0,
        discount: 0,
        tax: 0,
        total: 0,
      },
    },
  };

  /* ═══════════════════════════════════════════════
     🚀 REAL API — Uncomment when backend is ready
     ═══════════════════════════════════════════════

  const response = await axiosInstance.post("/checkout/create-payment-intent", {
    deviceId,
    shippingInfo,
  });
  return response.data;

  */
}
