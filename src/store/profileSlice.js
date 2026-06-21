// store/profileSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProfile,
  updateProfile as updateProfileApi,
  addAddress as addAddressApi,
  updateAddress as updateAddressApi,
  deleteAddress as deleteAddressApi,
  requestPasswordChange,
  verifyPasswordChange,
} from "../services/profile.service";
import {
  adaptProfile,
  buildProfileUpdatePayload,
} from "../components/Profile/profile.adapter";
import { extractErrorMessage } from "../components/Profile/error.utils";

const MAX_ADDRESSES = 2;

/* ─── Profile thunks ──────────────────────────────────────────────────────── */

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();
      return adaptProfile(response?.data);
    } catch (error) {
      console.error("[Profile] fetchProfile failed:", error);
      return rejectWithValue(
        extractErrorMessage(error, "Failed to load profile"),
      );
    }
  },
);

export const updateProfileThunk = createAsyncThunk(
  "profile/updateProfile",
  async (formValues, { rejectWithValue }) => {
    try {
      const payload = buildProfileUpdatePayload(formValues);
      const response = await updateProfileApi(payload);
      return adaptProfile(response?.data);
    } catch (error) {
      console.error("[Profile] updateProfile failed:", error);
      return rejectWithValue(
        extractErrorMessage(error, "Failed to update profile"),
      );
    }
  },
);

/* ─── Address thunks ──────────────────────────────────────────────────────── */

export const addAddressThunk = createAsyncThunk(
  "profile/addAddress",
  async (addressValue, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const current = state.profile.data?.addresses || [];
      if (current.length >= MAX_ADDRESSES) {
        return rejectWithValue(`You can only have ${MAX_ADDRESSES} addresses.`);
      }
      await addAddressApi(addressValue);
      const fresh = await dispatch(fetchProfile()).unwrap();
      return fresh;
    } catch (error) {
      if (typeof error === "string") return rejectWithValue(error);
      console.error("[Profile] addAddress failed:", error);
      return rejectWithValue(
        extractErrorMessage(error, "Failed to add address"),
      );
    }
  },
);

export const updateAddressThunk = createAsyncThunk(
  "profile/updateAddress",
  async ({ id, value }, { dispatch, rejectWithValue }) => {
    try {
      await updateAddressApi(id, value);
      const fresh = await dispatch(fetchProfile()).unwrap();
      return fresh;
    } catch (error) {
      console.error("[Profile] updateAddress failed:", error);
      return rejectWithValue(
        extractErrorMessage(error, "Failed to update address"),
      );
    }
  },
);

export const deleteAddressThunk = createAsyncThunk(
  "profile/deleteAddress",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await deleteAddressApi(id);
      const fresh = await dispatch(fetchProfile()).unwrap();
      return fresh;
    } catch (error) {
      console.error("[Profile] deleteAddress failed:", error);
      return rejectWithValue(
        extractErrorMessage(error, "Failed to delete address"),
      );
    }
  },
);

/* ─── Change password thunks ──────────────────────────────────────────────── */

export const requestPasswordChangeThunk = createAsyncThunk(
  "profile/requestPasswordChange",
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestPasswordChange();
      return response?.message || "OTP sent to your email.";
    } catch (error) {
      console.error("[Profile] requestPasswordChange failed:", error);
      return rejectWithValue(
        extractErrorMessage(error, "Failed to request OTP"),
      );
    }
  },
);

export const verifyPasswordChangeThunk = createAsyncThunk(
  "profile/verifyPasswordChange",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await verifyPasswordChange(payload);
      return response?.message || "Password changed successfully.";
    } catch (error) {
      console.error("[Profile] verifyPasswordChange failed:", error);
      return rejectWithValue(
        extractErrorMessage(error, "Failed to change password"),
      );
    }
  },
);

/* ─── Initial state ───────────────────────────────────────────────────────── */

const initialState = {
  data: null,
  loading: false,
  initialized: false,
  error: null,

  updating: false,
  updateError: null,
  updateSuccess: false,

  addressLoading: false,
  addressError: null,
  addressSuccess: "",

  passwordRequestLoading: false,
  passwordRequestError: null,
  passwordRequestSuccess: "",
  passwordVerifyLoading: false,
  passwordVerifyError: null,
  passwordVerifySuccess: "",
  passwordOtpSent: false,
};

/* ─── Slice ───────────────────────────────────────────────────────────────── */

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state) {
      Object.assign(state, initialState);
    },
    clearUpdateStatus(state) {
      state.updateError = null;
      state.updateSuccess = false;
    },
    clearAddressStatus(state) {
      state.addressError = null;
      state.addressSuccess = "";
    },
    clearPasswordStatus(state) {
      state.passwordRequestError = null;
      state.passwordRequestSuccess = "";
      state.passwordVerifyError = null;
      state.passwordVerifySuccess = "";
    },
    resetPasswordFlow(state) {
      state.passwordOtpSent = false;
      state.passwordRequestError = null;
      state.passwordRequestSuccess = "";
      state.passwordVerifyError = null;
      state.passwordVerifySuccess = "";
    },
  },
  extraReducers: (builder) => {
    /* ── fetchProfile ── */
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = action.payload;
      });

    /* ── updateProfile ── */
    builder
      .addCase(updateProfileThunk.pending, (state) => {
        state.updating = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.updating = false;
        state.data = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload;
      });

    /* ── addresses ── */
    builder
      .addCase(addAddressThunk.pending, (state) => {
        state.addressLoading = true;
        state.addressError = null;
        state.addressSuccess = "";
      })
      .addCase(addAddressThunk.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.addressSuccess = "Address added successfully.";
        state.data = action.payload;
      })
      .addCase(addAddressThunk.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
      });

    builder
      .addCase(updateAddressThunk.pending, (state) => {
        state.addressLoading = true;
        state.addressError = null;
        state.addressSuccess = "";
      })
      .addCase(updateAddressThunk.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.addressSuccess = "Address updated successfully.";
        state.data = action.payload;
      })
      .addCase(updateAddressThunk.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
      });

    builder
      .addCase(deleteAddressThunk.pending, (state) => {
        state.addressLoading = true;
        state.addressError = null;
        state.addressSuccess = "";
      })
      .addCase(deleteAddressThunk.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.addressSuccess = "Address deleted.";
        state.data = action.payload;
      })
      .addCase(deleteAddressThunk.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
      });

    /* ── password change ── */
    builder
      .addCase(requestPasswordChangeThunk.pending, (state) => {
        state.passwordRequestLoading = true;
        state.passwordRequestError = null;
        state.passwordRequestSuccess = "";
      })
      .addCase(requestPasswordChangeThunk.fulfilled, (state, action) => {
        state.passwordRequestLoading = false;
        state.passwordRequestSuccess = action.payload;
        state.passwordOtpSent = true;
      })
      .addCase(requestPasswordChangeThunk.rejected, (state, action) => {
        state.passwordRequestLoading = false;
        state.passwordRequestError = action.payload;
      });

    builder
      .addCase(verifyPasswordChangeThunk.pending, (state) => {
        state.passwordVerifyLoading = true;
        state.passwordVerifyError = null;
        state.passwordVerifySuccess = "";
      })
      .addCase(verifyPasswordChangeThunk.fulfilled, (state, action) => {
        state.passwordVerifyLoading = false;
        state.passwordVerifySuccess = action.payload;
        state.passwordOtpSent = false;
      })
      .addCase(verifyPasswordChangeThunk.rejected, (state, action) => {
        state.passwordVerifyLoading = false;
        state.passwordVerifyError = action.payload;
      });
  },
});

export const {
  clearProfile,
  clearUpdateStatus,
  clearAddressStatus,
  clearPasswordStatus,
  resetPasswordFlow,
} = profileSlice.actions;

export default profileSlice.reducer;
