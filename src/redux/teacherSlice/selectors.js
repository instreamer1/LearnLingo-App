import { createSelector } from "@reduxjs/toolkit";
import {selectFilterTeacher, selectLanguage, selectLevel, selectPrice } from "../filterSlice/selectors";

export const selectList = (state) => state.teachers.teachers;
export const selectLoading = (state) => state.teachers.loading;
export const selectError = (state) => state.teachers.error;
export const selectLastKey = (state) => state.teachers.lastKey;
export const selectTeacherPage = (state) => state.teachers.teacherPage


export const selectFilteredTeachers = createSelector(
    [selectList, selectFilterTeacher, selectLanguage, selectLevel, selectPrice],
    (teachers, filterTeacher, language, level, price) => {

    
      const filteredByLanguage = (filterTeacher || teachers).filter((teacher) => {
        const matchesLanguage =
          !language ||
          teacher.languages.some(
            (lang) => lang.toLowerCase() === language.toLowerCase()
          );
        return matchesLanguage;
      });
  
      
      const filteredByLevel = filteredByLanguage.filter((teacher) => {
        const matchesLevel =
          !level || teacher.levels.some((lvl) => lvl.toLowerCase().startsWith(level.toLowerCase()));
        return matchesLevel;
      });
  

      const filteredByPrice = filteredByLevel.filter((teacher) => {
        const matchesPrice = !price || teacher.price_per_hour >= price;
        return matchesPrice;
      });
  
      return filteredByPrice;
    }
  );
