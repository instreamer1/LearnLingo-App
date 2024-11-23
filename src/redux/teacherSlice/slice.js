import { createSlice } from "@reduxjs/toolkit";
import { getTeachers } from "./operations";

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    list: [],
    loading: false,
    error: null,
    lastKey: null,
    teacherPage: null,
  },
  reducers: {
    resetTeachers(state) {
      state.list = [];
      state.lastKey = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeachers.pending, (state) => {
        console.log("Fetching teachers: pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        console.log(
          "Fetching teachers: fulfilled with payload",
          action.payload
        );
        state.loading = false;
        const newTeachers = action.payload;
        state.teacherPage = newTeachers.length;
        // state.list = [...state.list, ...newTeachers];
       
        const existingIds = new Set(state.list.map((teacher) => teacher.id)); 
        const uniqueTeachers = newTeachers.filter(
          (teacher) => !existingIds.has(teacher.id)
        ); 
        state.list = [...state.list, ...uniqueTeachers];
        //
        state.lastKey = newTeachers.length
          ? newTeachers[newTeachers.length - 1].id
          : null;
      })
      .addCase(getTeachers.rejected, (state, action) => {
        console.error("Fetching teachers: rejected with error", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTeachers } = teacherSlice.actions;
export default teacherSlice.reducer;
