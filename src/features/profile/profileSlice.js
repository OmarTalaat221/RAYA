import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProfileAPI,
  getTargetProfileAPI,
  updateProfileAPI,
  updateTargetProfileAPI,
  deleteProfileFileAPI,
} from "../../services/profileService";

const initialState = {
  mainProfile: null,
  targetProfile: null,
  isLoading: false,
  isDeleting: false, // ✅ Separate loading state for delete
  error: null,
};

export const fetchMainProfile = createAsyncThunk(
  "profile/fetchMainProfile",
  async (_, thunkAPI) => {
    try {
      const response = await getProfileAPI("main");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const fetchTargetProfile = createAsyncThunk(
  "profile/fetchTargetProfile",
  async (_, thunkAPI) => {
    try {
      const response = await getTargetProfileAPI();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const updateMainProfile = createAsyncThunk(
  "profile/updateMainProfile",
  async (formData, thunkAPI) => {
    try {
      const response = await updateProfileAPI(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const updateTargetProfile = createAsyncThunk(
  "profile/updateTargetProfile",
  async (data, thunkAPI) => {
    try {
      const response = await updateTargetProfileAPI(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ✅ Fixed: Delete file and refetch profile
export const deleteProfileFile = createAsyncThunk(
  "profile/deleteProfileFile",
  async ({ fieldName, filePath }, thunkAPI) => {
    try {
      await deleteProfileFileAPI({ fieldName, filePath });

      // ✅ Refetch profile after successful delete
      await thunkAPI.dispatch(fetchMainProfile());

      return { fieldName, filePath };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileData: (state) => {
      state.mainProfile = null;
      state.targetProfile = null;
      state.error = null;
    },
    setContractDetails: (state, action) => {
      if (state.mainProfile) {
        state.mainProfile = {
          ...state.mainProfile,
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Main Profile
      .addCase(fetchMainProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMainProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const currentTempSignature = state.mainProfile?.temp_signature;
        state.mainProfile = {
          ...action.payload,
          temp_signature:
            currentTempSignature || action.payload.temp_signature || null,
        };
      })
      .addCase(fetchMainProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch main profile";
      })
      // Target Profile
      .addCase(fetchTargetProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTargetProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.targetProfile = action.payload;
      })
      .addCase(fetchTargetProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to fetch target profile";
      })
      // Update Main Profile
      .addCase(updateMainProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMainProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const currentTempSignature = state.mainProfile?.temp_signature;
        state.mainProfile = {
          ...action.payload,
          temp_signature:
            currentTempSignature || action.payload.temp_signature || null,
        };
      })
      .addCase(updateMainProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to update profile";
      })
      // Update Target Profile
      .addCase(updateTargetProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTargetProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.targetProfile = action.payload;
      })
      .addCase(updateTargetProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to update target profile";
      })
      // ✅ Delete File
      .addCase(deleteProfileFile.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteProfileFile.fulfilled, (state) => {
        state.isDeleting = false;
        // Profile already updated by refetch inside thunk
      })
      .addCase(deleteProfileFile.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload?.message || "Failed to delete file";
      });
  },
});

export const { clearProfileData, setContractDetails } = profileSlice.actions;
export default profileSlice.reducer;
