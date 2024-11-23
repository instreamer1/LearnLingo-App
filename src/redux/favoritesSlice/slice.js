import { createSlice } from "@reduxjs/toolkit";
import { fetchFavorites } from "./operations";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../firebase"; // Путь к вашей конфигурации Firebase

// export const fetchFavorites = createAsyncThunk(
//   "favorites/fetchFavorites",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const userRef = doc(db, "users", userId);
//       const snapshot = await getDoc(userRef);
//       if (snapshot.exists() && snapshot.data().favorites) {
//         return snapshot.data().favorites;
//       }
//       return [];
//     } catch (error) {
//       console.error("Error fetching favorites:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (teacher) => teacher.id !== action.payload.id
      );
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;