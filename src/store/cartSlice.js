// store/cartSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart,
  toggleCartItem,
  updateCartItem,
  clearCartApi,
} from "../services/cart.service";
import { adaptCartResponse } from "../components/Cart/cart.adapter";

const FREE_SHIPPING_THRESHOLD = 250;

/* ─── helpers ─────────────────────────────────────────────────────────────── */

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

/* ─── initial state ───────────────────────────────────────────────────────── */

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
        applyCartData(state, action.payload);
      })
      .addCase(clearEntireCart.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Failed to clear cart";
      });
  },
});

export const { openCart, closeCart, toggleCart, clearError } =
  cartSlice.actions;

export default cartSlice.reducer;
