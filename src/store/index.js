// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import geoReducer from "./geoSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    geo: geoReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
