// store/cartSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart,
  toggleCartItem,
  updateCartItem,
  clearCartApi,
} from "../services/cart.service";
import { applyCouponApi } from "../services/checkout.service";
import { adaptCartResponse } from "../components/Cart/cart.adapter";

const FREE_SHIPPING_THRESHOLD = 250;
const COUPON_STORAGE_KEY = "rds-coupon";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

function persistCoupon(coupon) {
  if (typeof window === "undefined") return;
  try {
    if (coupon) {
      sessionStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
    } else {
      sessionStorage.removeItem(COUPON_STORAGE_KEY);
    }
  } catch {}
}

function readPersistedCoupon() {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(COUPON_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const recalculate = (state) => {
  const localSubtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  state.subtotal = state.apiSubtotal ?? localSubtotal;
  state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.freeShippingRemaining = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - state.subtotal
  );
  state.qualifiesForFreeShipping = state.subtotal >= FREE_SHIPPING_THRESHOLD;

  // total after discount
  const discount = Number(state.couponDiscount || 0);
  state.total = Math.max(0, state.subtotal - discount);
};

const applyCartData = (state, cartData) => {
  state.items = cartData.items;
  state.apiSubtotal = cartData.subtotal;
  state.loading = false;
  state.actionLoading = false;
  state.error = null;
  recalculate(state);
};

async function fetchAndAdapt() {
  const response = await getCart();
  return adaptCartResponse(response.data);
}

/* ─── async thunks ────────────────────────────────────────────────────────── */

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAndAdapt();
    } catch (error) {
      console.error("[Cart] fetchCart failed:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      await toggleCartItem(productId, quantity);
      return await fetchAndAdapt();
    } catch (error) {
      console.error("[Cart] addToCart failed:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      await updateCartItem(productId, quantity);
      return await fetchAndAdapt();
    } catch (error) {
      console.error("[Cart] updateQuantity failed:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update quantity"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const exists = state.cart.items.some((item) => item.id === productId);

      if (!exists) {
        return {
          items: state.cart.items,
          subtotal: state.cart.apiSubtotal ?? state.cart.subtotal,
        };
      }

      await toggleCartItem(productId, 1);
      return await fetchAndAdapt();
    } catch (error) {
      console.error("[Cart] removeFromCart failed:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

export const clearEntireCart = createAsyncThunk(
  "cart/clearEntireCart",
  async (_, { rejectWithValue }) => {
    try {
      await clearCartApi();
      return { items: [], subtotal: 0 };
    } catch (error) {
      console.error("[Cart] clearEntireCart failed:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

/* ─── coupon thunks ───────────────────────────────────────────────────────── */

export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const code = typeof payload === "string" ? payload : payload.couponCode;
      const customItems = typeof payload === "object" ? payload.items : null;

      const state = getState();
      const cartItems = customItems || state.cart.items;

      if (!cartItems || !cartItems.length) {
        return rejectWithValue("Your cart is empty.");
      }

      const response = await applyCouponApi({ cartItems, couponCode: code });
      return response?.data || null;
    } catch (error) {
      console.error("[Cart] applyCoupon failed:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Invalid coupon code."
      );
    }
  }
);

export const reapplyCouponSilently = createAsyncThunk(
  "cart/reapplyCouponSilently",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const couponCode = state.cart.coupon?.code;
      const cartItems = state.cart.items;

      if (!couponCode || !cartItems.length) {
        return rejectWithValue("No coupon or cart empty.");
      }

      const response = await applyCouponApi({ cartItems, couponCode });
      return response?.data || null;
    } catch (error) {
      console.warn("[Cart] reapplyCouponSilently failed:", error?.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to re-apply coupon."
      );
    }
  }
);

/* ─── initial state ───────────────────────────────────────────────────────── */

const persistedCoupon = readPersistedCoupon();

const initialState = {
  items: [],
  isOpen: false,
  subtotal: 0,
  apiSubtotal: null,
  itemCount: 0,
  freeShippingRemaining: FREE_SHIPPING_THRESHOLD,
  qualifiesForFreeShipping: false,
  freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
  loading: false,
  actionLoading: false,
  error: null,
  initialized: false,

  /* ── coupon state ── */
  coupon: persistedCoupon || null, // { id, name, code, discountValue, ... }
  couponDiscount: 0,
  couponLoading: false,
  couponError: null,
  total: 0,
};

/* ─── slice ───────────────────────────────────────────────────────────────── */

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    clearError(state) {
      state.error = null;
    },
    clearCouponError(state) {
      state.couponError = null;
    },
    removeCoupon(state) {
      state.coupon = null;
      state.couponDiscount = 0;
      state.couponError = null;
      persistCoupon(null);
      recalculate(state);
    },
  },
  extraReducers: (builder) => {
    /* ── fetchCart ── */
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.initialized = true;
        applyCartData(state, action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = action.payload || "Failed to fetch cart";
      });

    /* ── addToCart ── */
    builder
      .addCase(addToCart.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isOpen = true;
        applyCartData(state, action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Failed to add item";
      });

    /* ── updateQuantity ── */
    builder
      .addCase(updateQuantity.pending, (state) => {
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        applyCartData(state, action.payload);
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.error = action.payload || "Failed to update quantity";
      });

    /* ── removeFromCart ── */
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        applyCartData(state, action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Failed to remove item";
      });

    /* ── clearEntireCart ── */
    builder
      .addCase(clearEntireCart.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(clearEntireCart.fulfilled, (state, action) => {
        // clear coupon when cart is fully cleared
        state.coupon = null;
        state.couponDiscount = 0;
        persistCoupon(null);
        applyCartData(state, action.payload);
      })
      .addCase(clearEntireCart.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Failed to clear cart";
      });

    /* ── applyCoupon ── */
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.couponLoading = true;
        state.couponError = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.couponLoading = false;
        const payload = action.payload || {};
        state.coupon = payload.coupon || null;
        state.couponDiscount = Number(payload.discountAmount || 0);
        if (typeof payload.subtotal === "number") {
          state.apiSubtotal = payload.subtotal;
        }
        persistCoupon(state.coupon);
        recalculate(state);
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.couponLoading = false;
        state.couponError = action.payload || "Invalid coupon code.";
        state.coupon = null;
        state.couponDiscount = 0;
        persistCoupon(null);
        recalculate(state);
      });

    /* ── reapplyCouponSilently ── */
    builder
      .addCase(reapplyCouponSilently.fulfilled, (state, action) => {
        const payload = action.payload || {};
        state.coupon = payload.coupon || state.coupon;
        state.couponDiscount = Number(payload.discountAmount || 0);
        if (typeof payload.subtotal === "number") {
          state.apiSubtotal = payload.subtotal;
        }
        persistCoupon(state.coupon);
        recalculate(state);
      })
      .addCase(reapplyCouponSilently.rejected, (state) => {
        // coupon no longer valid for current cart → silently remove
        state.coupon = null;
        state.couponDiscount = 0;
        persistCoupon(null);
        recalculate(state);
      });
  },
});

export const {
  openCart,
  closeCart,
  toggleCart,
  clearError,
  clearCouponError,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;