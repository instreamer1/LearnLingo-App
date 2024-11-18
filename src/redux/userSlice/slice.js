import { createSlice} from "@reduxjs/toolkit";
import { endSession, getSession } from "../../auth-firebase/session";
import { loginUser, registerUser } from "./operation";





const userSlice = createSlice({
  name: "user",
  initialState: {
    email: getSession().email || null,
    accessToken: getSession().accessToken || null,
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.email = null;
      state.accessToken = null;
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
        state.loading = false;
        state.email = action.payload.email;
        state.accessToken = action.payload.accessToken;
        console.log(state.accessToken);
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        
    
        console.log("Login success:", action.payload);
        
        state.email = action.payload.email;
        state.accessToken = action.payload.accessToken;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

