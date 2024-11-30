import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachers } from "./operations";
import { applyFilters } from "./filters";

const initialState = {
  allTeachers: [], 
  filteredTeachers: [], 
  level: "",
  price: "",
  loading: false,
  error: null,
};

const changeFilter = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      console.log("setLanguage action payload:", action.payload);
      console.log("Updated state.language:", state.language);
      state.filteredTeachers = applyFilters(state); 
    },
    setLevel: (state, action) => {
      state.level = action.payload;
      console.log("setLanguage action payload:", action.payload);
      console.log(action.payload);
      state.filteredTeachers = applyFilters(state);
    },
    setPrice: (state, action) => {
      state.price = action.payload;
      state.filteredTeachers = applyFilters(state);
    },
    resetFilters: (state) => {
      state.language = "";
      state.level = "";
      state.price = "";
      state.filteredTeachers = [...state.allTeachers]; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.allTeachers = action.payload;
        console.log("state.allTeachers", state.allTeachers);
        state.filteredTeachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export const { setLanguage, setLevel, setPrice, resetFilters } = changeFilter.actions;
export default  changeFilter.reducer;
