import { createSelector } from "@reduxjs/toolkit";
import {selectFilteredTeachers } from "../filterSlice/selectors";

export const selectTeachers = (state) => state.teachers.teachers;
export const selectTeachersLoading = (state) => state.teachers.loading;
export const selectError = (state) => state.teachers.error;
export const selectLastKey = (state) => state.teachers.lastKey;
export const selectTeacherPage = (state) => state.teachers.teacherPage


// export const selectFilteredTeachersList = createSelector(
//     [selectList, selectFilteredTeachers],
//     (teachers, filteredTeachers) => {

    

//     }
//   );
