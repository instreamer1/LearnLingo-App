import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllTeachers } from "../../auth-firebase/database/";

export const getFilteredTeachers = createAsyncThunk(
  "teachers/fetch",
  async ({ language, level, price }, thunkAPI) => {

    try {
     
      const teachers = await fetchAllTeachers();
   
      const filteredTeachers = teachers.filter((teacher) => {
        const matchesLanguage =
          !language ||
          teacher.languages.some(
            (lang) => lang.toLowerCase() === language.toLowerCase()
          ); 
        const matchesLevel = !level || teacher.levels.some((lvl) => lvl.toLowerCase().startsWith(level.toLowerCase())); 
        const matchesPrice = !price|| teacher.price_per_hour <= price;
        return matchesLanguage && matchesLevel && matchesPrice;
      });
      return filteredTeachers;
    } catch (error) {
      console.error("Error fetching or filtering teachers:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


