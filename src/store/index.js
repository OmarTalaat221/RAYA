// store/index.js

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import geoReducer from "./geoSlice";
import { injectStore } from "../services/axios";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    geo: geoReducer,
  },
});

// ⭐ حقن الـ store في axios عشان يقدر يقرأ منه
injectStore(store);
