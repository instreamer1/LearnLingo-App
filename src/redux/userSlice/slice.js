import { createSlice} from "@reduxjs/toolkit";
import { endSession, getSession, startSession } from "../../auth-firebase/session";
import { loginUser, registerUser } from "./operation";





const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: null,
    email: null,
    name: null,
    accessToken: null,
    isLoggedIn: false,
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
        state.loading = false;
        console.log(action.payload);
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //   .addCase(loginUser.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(loginUser.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.isLoggedIn = true;
        
    
    //     console.log("Login success:", action.payload);
        
    //     state.email = action.payload.email;
    //     state.accessToken = action.payload.accessToken;

    //   })
    //   .addCase(loginUser.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

