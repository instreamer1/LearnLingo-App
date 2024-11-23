import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFavoriteTeachers } from "../../auth-firebase/firestore";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async ({ uid, accessToken }, { rejectWithValue }) => {
    try {
      if (!uid) {
        throw new Error("User is not authenticated.");
      }

      const favoriteTeachers = await getUserFavoriteTeachers({
        uid,
        accessToken,
      });

      console.log("Fetched favoriteTeachers:", favoriteTeachers);

      return favoriteTeachers;
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

