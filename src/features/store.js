import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './exampleSlice';
import authReducer from './auth/authSlice';
import profileReducer from './profile/profileSlice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    auth: authReducer,
    profile: profileReducer,
    // Add other reducers here as you build your app
  },
  // Adding middleware or customizing it can be done here if needed
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
