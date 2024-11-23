import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTeachers } from "../../auth-firebase/database/";




export const getTeachers = createAsyncThunk(
  "teachers/fetch",
  async ({ pageSize, lastKey }, thunkAPI) => {
    try {
      console.log("Fetching teachers with", { pageSize, lastKey });
      const teachers = await fetchTeachers({ pageSize, lastKey });
      console.log("Fetched teachers:", teachers);
      return teachers;
    } catch (error) {
      console.error("Error fetching teachers:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

