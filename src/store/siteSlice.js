import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSiteInfo } from "../services/site.service";

export const fetchSiteInfo = createAsyncThunk(
  "site/fetchSiteInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSiteInfo();
      localStorage.setItem("codOpen", response.data.codOpen);
      return response.data; // This is the 'data' object from the API response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch site info",
      );
    }
  },
);

const initialState = {
  data: {
    siteName: "RDS Pharma",
    email: "Rdspharma.online@gmail.com",
    phone: "+971501234567",
    whatsapp: "+971501234567",
    siteInfoTranslations: [],
    shippingInfo: [],
    socialLinks: {},
    targetCurrency: "AED",
    abovePriceFreeShipping: {
      priceLocal: 400,
      currency: "AED",
    },
    extraInfo: {
      businessHours: {},
      paymentMethods: [],
      returnPolicy: "",
      warranty: "",
      supportEmail: "",
    },
  },
  loading: false,
  error: null,
  initialized: false,
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSiteInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSiteInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Store the entire data object
        state.initialized = true;
      })
      .addCase(fetchSiteInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.initialized = true;
      });
  },
});

/* Helper to resolve localized site name or address */
export const selectLocalizedSiteInfo = (state, locale) => {
  const siteData = state.site.data;
  const translations = siteData.siteInfoTranslations || [];
  const translation =
    translations.find((t) => t.lang === locale) ||
    translations.find((t) => t.lang === "en") ||
    {};

  return {
    siteName: translation.siteName || siteData.siteName || "RDS Pharma",
    address: translation.address || siteData.address || "Dubai, UAE",
    freeExchange: translation.freeExchage || translation.freeExchange || "",
  };
};

/* Helper to get shipping info by type (inside/outside) */
export const selectShippingDetails = (state, type = "inside") => {
  const shippingInfo = state.site.data.shippingInfo || [];
  const info = shippingInfo.find((s) => s.type === type);
  const targetCurrency = state.site.data.targetCurrency || "AED";

  if (info) {
    return {
      price: info.price,
      priceAed: info.priceAed,
      currency: info.currency || info.currancy || targetCurrency,
    };
  }

  return {
    price: type === "inside" ? 20 : 30,
    priceAed: type === "inside" ? 20 : 30,
    currency: targetCurrency,
  };
};

export const selectShippingPrice = (state, type = "inside") => {
  const details = selectShippingDetails(state, type);
  return details.price;
};

export const selectFreeShippingThreshold = (state, type = "inside") => {
  const siteData = state.site.data;
  const shippingInfo = siteData.shippingInfo || [];
  const info = shippingInfo.find((s) => s.type === type);
  const targetCurrency = siteData.targetCurrency || "AED";

  if (
    info &&
    typeof info.freeAboveOrder === "number" &&
    info.freeAboveOrder > 0
  ) {
    return {
      price: info.freeAboveOrder,
      priceAed: info.freeAboveOrderAed || 0,
      currency: info.currency || info.currancy || targetCurrency,
    };
  }

  /* ── fallback to abovePriceFreeShipping if shipping info doesn't have threshold ── */
  const fallback = siteData.abovePriceFreeShipping || {};
  const fallbackPrice = Number(fallback.priceLocal);

  return {
    price: fallbackPrice > 0 ? fallbackPrice : 0,
    priceAed: 0,
    currency: fallback.currency || targetCurrency,
  };
};

export const selectTopBarMessage = (state, locale, shippingType = "inside") => {
  const details = selectShippingDetails(state, shippingType);
  const threshold = selectFreeShippingThreshold(state, shippingType);
  const isAr = locale === "ar";

  const thresholdStr = `${threshold.price} ${threshold.currency.toUpperCase()}`;
  const priceStr = `${details.price} ${details.currency.toUpperCase()}`;

  if (isAr) {
    const region =
      shippingType === "inside" ? "داخل الإمارات" : "خارج الإمارات";
    return `شحن مجاني للطلبات فوق ${thresholdStr} | توصيل ${region} بـ ${priceStr}`;
  }

  const region = shippingType === "inside" ? "UAE Delivery" : "Global Shipping";
  return `Free Shipping over ${thresholdStr} | ${region} for ${priceStr}`;
};

export default siteSlice.reducer;
