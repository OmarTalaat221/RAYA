import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart,
  toggleCartItem,
  updateCartItem,
  clearCartApi,
} from "../services/cart.service";
import { applyCouponApi } from "../services/checkout.service";
import { adaptCartResponse } from "../components/Cart/cart.adapter";

const FREE_SHIPPING_THRESHOLD = 400;
const COUPON_STORAGE_KEY = "rds-coupon";

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

function buildItemIds(items = []) {
  const ids = {};

  for (const item of items) {
    if (item?.id !== undefined && item?.id !== null) {
      ids[String(item.id)] = true;
    }
  }

  return ids;
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
    state.freeShippingThreshold - state.subtotal
  );
  state.qualifiesForFreeShipping = state.subtotal >= state.freeShippingThreshold;

  const discount = Number(state.couponDiscount || 0);
  const currentShipping = state.qualifiesForFreeShipping ? 0 : (state.shippingCost || 0);
  
  state.total = Math.max(0, state.subtotal + currentShipping - discount);
};

const applyCartData = (state, cartData = {}) => {
  const items = Array.isArray(cartData.items) ? cartData.items : [];

  state.items = items;
  state.itemIds = buildItemIds(items);
  state.apiSubtotal =
    cartData.subtotal === undefined ? state.apiSubtotal : cartData.subtotal;
  state.loading = false;
  state.actionLoading = false;
  state.actionProductId = null;
  state.error = null;

  recalculate(state);
};

async function fetchAndAdapt() {
  const response = await getCart();
  return adaptCartResponse(response.data);
}

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
      const exists = Boolean(state.cart.itemIds?.[String(productId)]);

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

const persistedCoupon = readPersistedCoupon();

const initialState = {
  items: [],
  itemIds: {},
  isOpen: false,
  subtotal: 0,
  apiSubtotal: null,
  itemCount: 0,
  freeShippingRemaining: 400,
  qualifiesForFreeShipping: false,
  freeShippingThreshold: 400,
  loading: false,
  actionLoading: false,
  actionProductId: null,
  error: null,
  initialized: false,
  coupon: persistedCoupon || null,
  couponDiscount: 0,
  couponLoading: false,
  couponError: null,
  shippingCost: 20, 
  currency: "AED",
  total: 0,
};

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
    setShippingCost(state, action) {
      state.shippingCost = Number(action.payload || 0);
      recalculate(state);
    },
    setCurrency(state, action) {
      state.currency = action.payload || "AED";
    },
    setFreeShippingThreshold(state, action) {
      state.freeShippingThreshold = Number(action.payload || 400);
      recalculate(state);
    },
  },
  extraReducers: (builder) => {
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

    builder
      .addCase(addToCart.pending, (state, action) => {
        state.actionLoading = true;
        state.actionProductId = action.meta.arg?.productId ?? null;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isOpen = true;
        applyCartData(state, action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionProductId = null;
        state.error = action.payload || "Failed to add item";
      });

    builder
      .addCase(updateQuantity.pending, (state, action) => {
        state.actionLoading = true;
        state.actionProductId = action.meta.arg?.productId ?? null;
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        applyCartData(state, action.payload);
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionProductId = null;
        state.error = action.payload || "Failed to update quantity";
      });

    builder
      .addCase(removeFromCart.pending, (state, action) => {
        state.actionLoading = true;
        state.actionProductId = action.meta.arg?.productId ?? null;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        applyCartData(state, action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionProductId = null;
        state.error = action.payload || "Failed to remove item";
      });

    builder
      .addCase(clearEntireCart.pending, (state) => {
        state.actionLoading = true;
        state.actionProductId = null;
        state.error = null;
      })
      .addCase(clearEntireCart.fulfilled, (state, action) => {
        state.coupon = null;
        state.couponDiscount = 0;
        persistCoupon(null);
        applyCartData(state, action.payload);
      })
      .addCase(clearEntireCart.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionProductId = null;
        state.error = action.payload || "Failed to clear cart";
      });

    builder
      .addCase(applyCoupon.pending, (state) => {
        state.couponLoading = true;
        state.couponError = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        const payload = action.payload || {};

        state.couponLoading = false;
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
  setShippingCost,
  setCurrency,
  setFreeShippingThreshold,
} = cartSlice.actions;

export { reapplyCouponSilently };

export default cartSlice.reducer;