import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/slice";
import teacherReducer from "./teacherSlice/slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    teachers: teacherReducer,
  },
});

export default store;
