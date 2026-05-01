// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const FREE_SHIPPING_THRESHOLD = 250;

const recalculate = (state) => {
  state.subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.freeShippingRemaining = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - state.subtotal
  );
  state.qualifiesForFreeShipping = state.subtotal >= FREE_SHIPPING_THRESHOLD;
};

const initialState = {
  items: [],
  isOpen: false,
  subtotal: 0,
  itemCount: 0,
  freeShippingRemaining: FREE_SHIPPING_THRESHOLD,
  qualifiesForFreeShipping: false,
  freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
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
    addItem(state, action) {
      const {
        id,
        title,
        price,
        image,
        slug,
        quantity = 1,
        maxQuantity = 99,
      } = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + quantity,
          existing.maxQuantity
        );
      } else {
        state.items.push({
          id,
          title,
          price,
          image,
          slug,
          quantity: Math.max(1, quantity),
          maxQuantity,
        });
      }
      state.isOpen = true;
      recalculate(state);
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      recalculate(state);
    },
    incrementQuantity(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity < item.maxQuantity) {
        item.quantity += 1;
      }
      recalculate(state);
    },
    decrementQuantity(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity <= 1) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        } else {
          item.quantity -= 1;
        }
      }
      recalculate(state);
    },
    clearCart(state) {
      state.items = [];
      recalculate(state);
    },
  },
});

export const {
  openCart,
  closeCart,
  toggleCart,
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
