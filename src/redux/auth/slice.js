import { createSlice } from "@reduxjs/toolkit";
import { registerAuth, login, logout, refreshUser } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAuth.pending, (state) => {
        state.error = null;
      })
      .addCase(registerAuth.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerAuth.rejected, (state, action) => {
        state.error =
          action.payload ?? action.error?.message ?? "Registration failed";
      })

      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ?? action.error?.message ?? "Login failed";
      })

      .addCase(logout.pending, (state) => {
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = { name: null, email: null };
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error =
          action.payload ?? action.error?.message ?? "Logout failed";
      })

      .addCase(refreshUser.pending, (state) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.error =
          action.payload ?? action.error?.message ?? "Session refresh failed";
        state.isRefreshing = false;
      });
  },
});

export default authSlice.reducer;
