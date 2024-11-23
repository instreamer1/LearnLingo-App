import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, signInUser } from "../../auth-firebase/firebase";
import { startSession } from "../../auth-firebase/session";
import { saveUserProfile } from "../../auth-firebase/firestore";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await createUser(email, password);

      if (!response?.user) {
        throw new Error("Failed to register user. Invalid response.");
      }

      const user = {
        uid: response.user.uid,
        email: response.user.email,
        name,
        accessToken: await response.user.getIdToken(),
      };

      startSession(user); // Save session data after registration
      await saveUserProfile(user); // Save user profile in Firestore

      return user;
    } catch (error) {
      console.error("Registration error:", error.message);
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
      const user = {
        uid: response.user.uid,
        email: response.user.email,
        accessToken: await response.user.getIdToken(),
      };

      startSession(user); // Save session data after login
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);