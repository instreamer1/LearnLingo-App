import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authFireBase/slice";

const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
});

export default store;
