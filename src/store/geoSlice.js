// store/geoSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGeoInfo } from "../services/auth.service";

const SESSION_KEY = "rds-geo-info";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

function readSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeSession(data) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

/* ─── async thunk ─────────────────────────────────────────────────────────── */

export const fetchGeoInfo = createAsyncThunk(
  "geo/fetchGeoInfo",
  async (_, { rejectWithValue }) => {
    try {
      // 1) Check sessionStorage first
      const cached = readSession();
      if (cached?.currency && cached?.country) {
        return { data: cached, fromCache: true };
      }

      // 2) Fetch from API
      const response = await getGeoInfo();
      const data = response?.data || {};

      // 3) Persist to sessionStorage
      if (data?.currency) {
        writeSession(data);
      }

      return { data, fromCache: false };
    } catch (error) {
      console.error("[Geo] fetchGeoInfo failed:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch geo info"
      );
    }
  }
);

/* ─── initial state ───────────────────────────────────────────────────────── */

const initialState = {
  country: "",
  currency: "",
  rate: 1,
  cartId: "",
  loading: false,
  initialized: false,
  error: null,
};

/* ─── slice ───────────────────────────────────────────────────────────────── */

const geoSlice = createSlice({
  name: "geo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeoInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGeoInfo.fulfilled, (state, action) => {
        const { data } = action.payload || {};
        state.country = data?.country || "";
        state.currency = data?.currency || "";
        state.rate = Number(data?.rate) || 1;
        state.cartId = data?.cartId || "";
        state.loading = false;
        state.initialized = true;
        state.error = null;
      })
      .addCase(fetchGeoInfo.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = action.payload || "Failed to fetch geo info";
      });
  },
});

export default geoSlice.reducer;
