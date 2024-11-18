import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, signInUser } from "../../auth-firebase/firebase";
import { startSession } from "../../auth-firebase/session";



// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await createUser(email, password);
      startSession(response.user);
      return response.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await signInUser(email, password);
      startSession(response.user);
      return response.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);