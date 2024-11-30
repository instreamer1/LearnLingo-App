import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachers } from "./operations";

const initialState = {
  allTeachers: [], // Все учителя
  filteredTeachers: [], // Отфильтрованные учителя
  language: "",
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
      state.filteredTeachers = [...state.allTeachers]; // Показываем всех учителей
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
        state.filteredTeachers = action.payload; // Изначально показываем всех
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Функция для применения фильтров
const applyFilters = (state) => {
  let teachers = [...state.allTeachers];

  if (state.language) {
    teachers = teachers.filter((teacher) =>
      teacher.languages.some(
        (lang) => lang.toLowerCase() === state.language.toLowerCase()
      )
    );
  }

  if (state.level) {
    teachers = teachers.filter((teacher) =>
      teacher.levels.some((lvl) => lvl.toLowerCase().startsWith(state.level.toLowerCase()))
    );
  }

  if (state.price) {
    teachers = teachers.filter((teacher) => teacher.price_per_hour >= state.price);
  }

  return teachers;
};

export const { setLanguage, setLevel, setPrice, resetFilters } = changeFilter.actions;
export default  changeFilter.reducer;
