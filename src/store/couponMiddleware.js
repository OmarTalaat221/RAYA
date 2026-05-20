// store/couponMiddleware.js

import {
  addToCart,
  updateQuantity,
  removeFromCart,
  reapplyCouponSilently,
} from "./cartSlice";

/**
 * Listens for cart mutations and re-applies the active coupon silently.
 */
const couponMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const triggerTypes = [
    addToCart.fulfilled.type,
    updateQuantity.fulfilled.type,
    removeFromCart.fulfilled.type,
  ];

  if (triggerTypes.includes(action.type)) {
    const state = store.getState();
    const hasCoupon = Boolean(state.cart.coupon?.code);
    const hasItems = state.cart.items.length > 0;

    if (hasCoupon && hasItems) {
      store.dispatch(reapplyCouponSilently());
    }
  }

  return result;
};

export default couponMiddleware;