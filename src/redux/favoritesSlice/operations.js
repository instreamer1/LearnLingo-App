import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFavoriteTeachers } from "../../auth-firebase/firestore";




export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (uid, { rejectWithValue }) => {
    console.log("fetchFavorites userId", uid);
      try {
        if (!uid) throw new Error("User ID is not provided.");
        const favoriteTeachers = await getUserFavoriteTeachers(uid); //getUserFavoriteTeachers возвращает массив избранных учителей
        console.log("Fetched favoriteTeachers:",favoriteTeachers);
        return favoriteTeachers
      } catch (error) {
        console.error("Error fetching favorites:", error.message);
        return rejectWithValue(error.message);
      }
    }
  );