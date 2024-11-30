import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllTeachers } from "../../auth-firebase/database/";


export const fetchTeachers = createAsyncThunk(
  "teachers/fetchAll",
  async (_, thunkAPI) => {
    try {
      const teachers = await fetchAllTeachers();
      return teachers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

