import { createSlice } from "@reduxjs/toolkit";
import { getTeachers } from "./operations";

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    loading: false,
    error: null,
    lastKey: null,
    teacherPage: null,
  },
  reducers: {
    resetTeachers(state) {
      state.teachers = [];
      state.lastKey = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.loading = false;
        const newTeachers = action.payload;
        state.teacherPage = newTeachers.length;
        state.teachers = [...state.teachers, ...newTeachers];

        // const existingIds = new Set(state.teachers.map((teacher) => teacher.id));
        // const uniqueTeachers = newTeachers.filter(
        //   (teacher) => !existingIds.has(teacher.id)
        // );
        // state.teachers = [...state.teachers, ...uniqueTeachers];
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
