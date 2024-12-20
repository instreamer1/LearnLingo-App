import { createSlice } from "@reduxjs/toolkit";
import {
  startSession,
  getSession,
  endSession,
} from "../../auth-firebase/session";
import { loginUser, registerUser } from "./operations";

const savedSession = getSession();

const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: savedSession.uid || null,
    email: savedSession.email || null,
    name: null,
    accessToken: savedSession.accessToken || null,
    isLoggedIn: !!savedSession.accessToken,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.uid = null;
      state.email = null;
      state.name = null;
      state.accessToken = null;
      state.isLoggedIn = false;
      endSession();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        startSession(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        startSession(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
