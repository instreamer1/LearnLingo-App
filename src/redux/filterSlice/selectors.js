import { createSelector } from "reselect";

export const selectLanguage = (state) => state.filters.language;
export const selectLevel = (state) => state.filters.level;
export const selectPrice = (state) => state.filters.price;
export const selectFilteredTeachers = (state) => state.filters.filteredTeachers;
export const selectFiltersLoading = (state) => state.filters.loading;
export const selectError = (state) => state.filters.error;
export const selectAllTeachers = (state) => state.filters.allTeachers

export const selectAllLanguages = createSelector([selectAllTeachers], (teachers) =>
    [...new Set(teachers.flatMap((teacher) => teacher.languages))]
  );
