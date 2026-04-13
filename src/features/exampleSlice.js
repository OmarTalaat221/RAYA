import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchExampleDataService } from '../services/exampleService';

// Async thunk action
export const fetchExampleData = createAsyncThunk(
  'example/fetchExampleData',
  async (_, thunkAPI) => {
    try {
      const data = await fetchExampleDataService();
      return data;
    } catch (error) {
      // Returning handled error response
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    clearExampleData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExampleData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExampleData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchExampleData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearExampleData } = exampleSlice.actions;

export default exampleSlice.reducer;
