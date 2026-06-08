// store/index.js

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import geoReducer from "./geoSlice";
import siteReducer from "./siteSlice";
import { injectStore } from "../services/axios";
import couponMiddleware from "./couponMiddleware";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    geo: geoReducer,
    site: siteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(couponMiddleware),
});

// ⭐ حقن الـ store في axios عشان يقدر يقرأ منه
injectStore(store);
