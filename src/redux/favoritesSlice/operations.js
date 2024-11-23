import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../auth-firebase/firebase";
import { getUserFavoriteTeachers } from "../../auth-firebase/firestore";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId, { rejectWithValue }) => {
    try {
      // const userRef = doc(firestore, "users", userId);
      // const snapshot = await getDoc(userRef);
      // if (snapshot.exists() && snapshot.data().favorites) {
      //   return snapshot.data().favorites;
      const snapshot = await getUserFavoriteTeachers(userId)
    
      // if (snapshot.exists() && snapshot.data().favorites) {
        return snapshot;
        // return snapshot.data().favorites;
      // }
      // return [];
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return rejectWithValue(error.message);
    }
  }
);