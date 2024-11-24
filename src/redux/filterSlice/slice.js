import { createSlice } from "@reduxjs/toolkit";
import { getFilteredTeachers } from "./operations";

const initialState = {
  language: "",
  level: "", 
  price: "", 
  filterTeacher: [], 
  loading: false, 
  error: null, 
};

const changeFilter = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    resetFilters: (state) => {
      state.language = "";
      state.level = "";
      state.price = "";
      state.filterTeacher = []; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFilteredTeachers.fulfilled, (state, action) => {
     
        state.loading = false;
        const newTeachers = action.payload;

       
        let filteredTeachers = newTeachers;

       
        if (state.language) {
          filteredTeachers = filteredTeachers.filter((teacher) => 
            teacher.languages.some((lang) => lang.toLowerCase() === state.language.toLowerCase())
          );
        }

       
        if (state.level) {
          filteredTeachers = filteredTeachers.filter((teacher) => 
            teacher.levels.some((lvl) => lvl.toLowerCase().startsWith(state.level.toLowerCase()))
          );
        }

       
        if (state.price) {
          filteredTeachers = filteredTeachers.filter((teacher) => 
            teacher.price_per_hour >= state.price
          );
        }

       
        state.filterTeacher = filteredTeachers;
      })
      .addCase(getFilteredTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLanguage, setLevel, setPrice, resetFilters } = changeFilter.actions;
export const changeFilterReducer = changeFilter.reducer;
