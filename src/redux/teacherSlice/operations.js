import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTeachers } from "../../auth-firebase/database/";




export const getTeachers = createAsyncThunk(
  "teachers/fetch",
  async ({ pageSize, lastKey }, thunkAPI) => {
    try {
      const teachers = await fetchTeachers({ pageSize, lastKey });
      return teachers;
    } catch (error) {
      console.error("Error fetching teachers:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

