import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  registerAPI,
  getUserProfileAPI,
  updateUserAccountAPI,
} from "../../services/authService";

const getStoredToken = () => {
  if (typeof window !== "undefined")
    return localStorage.getItem("token") || null;
  return null;
};

const getStoredUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const initialState = {
  user: getStoredUser(),
  token: getStoredToken(),
  isLoading: false,
  error: null,
  validationErrors: [],
  isAuthenticated: !!getStoredToken(),
  isRegistered: false,
  registrationData: {
    fullName: "",
    email: "",
    phone: "358", // ✅ كود فنلندا الافتراضي
    country_code: "+358", // ✅ مش undefined
    password: "",
    confirmPassword: "",
    agreeToPrivacy: false,
    contractAccepted: false,
    signature: null,
  },
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await loginAPI(credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      const response = await registerAPI(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const response = await getUserProfileAPI();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const updateUserAccount = createAsyncThunk(
  "auth/updateUserAccount",
  async (formData, thunkAPI) => {
    try {
      const response = await updateUserAccountAPI(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.validationErrors = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
    clearAuthError: (state) => {
      state.error = null;
      state.validationErrors = [];
    },
    setRegistrationData: (state, action) => {
      state.registrationData = {
        ...state.registrationData,
        ...action.payload,
      };
    },
    resetRegisterStatus: (state) => {
      state.isRegistered = false;
      // ✅ reset registrationData بعد التسجيل
      state.registrationData = {
        fullName: "",
        email: "",
        phone: "358",
        country_code: "+358",
        password: "",
        confirmPassword: "",
        agreeToPrivacy: false,
        contractAccepted: false,
        signature: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.validationErrors = [];
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          if (typeof window !== "undefined") {
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
          }
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Login failed";
        state.validationErrors = action.payload?.errors || [];
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.validationErrors = [];
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegistered = true;
        if (action.payload?.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          if (typeof window !== "undefined") {
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
          }
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Registration failed";
        state.validationErrors = action.payload?.errors || [];
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(updateUserAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Update failed";
      });
  },
});

export const {
  logout,
  clearAuthError,
  setRegistrationData,
  resetRegisterStatus,
} = authSlice.actions;

export default authSlice.reducer;
