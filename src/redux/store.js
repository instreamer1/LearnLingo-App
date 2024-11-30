import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/slice";
import teacherReducer from "./teacherSlice/slice";
import favoritesReducer from "./favoritesSlice/slice"
import changeFilterReducer from "./filterSlice/slice"

const store = configureStore({
  reducer: {
    user: userReducer,
    teachers: teacherReducer,
    favorites: favoritesReducer,
    filters: changeFilterReducer,
  },
});

export default store;
