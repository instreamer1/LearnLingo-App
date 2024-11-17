import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./operation";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Логика для регистрации
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      })
      // Логика для входа
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Логика для выхода
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
