import { createSelector } from "@reduxjs/toolkit";
import {selectFilterTeacher, selectLanguage, selectLevel, selectPrice } from "../filterSlice/selectors";

export const selectList = (state) => state.teachers.teachers;
export const selectLoading = (state) => state.teachers.loading;
export const selectError = (state) => state.teachers.error;
export const selectLastKey = (state) => state.teachers.lastKey;
export const selectTeacherPage = (state) => state.teachers.teacherPage

// export const selectFilteredTeachers = createSelector(
//     [selectList, selectLanguage, selectLevel, selectPrice],
//     (teachers, language, level, price) => {
//       return teachers?.filter((teacher) => {
//         const matchesLanguage =
//           !language || teacher.languages.some((lang) => lang.toLowerCase() === language.toLowerCase());
//         const matchesLevel =
//           !level || teacher.levels.some((lvl) => lvl.toLowerCase().startsWith(level.toLowerCase()));
//         const matchesPrice = !price || teacher.price_per_hour >= price;
//         return matchesLanguage && matchesLevel && matchesPrice;
//       });
//     }
//   );
export const selectFilteredTeachers = createSelector(
    [selectList, selectFilterTeacher, selectLanguage, selectLevel, selectPrice],
    (teachers, filterTeacher, language, level, price) => {
        console.log("filterTeacher", filterTeacher);
      // Фильтруем сначала по языку
      console.log(language);
      const filteredByLanguage = (filterTeacher || teachers).filter((teacher) => {
        const matchesLanguage =
          !language ||
          teacher.languages.some(
            (lang) => lang.toLowerCase() === language.toLowerCase()
          );
        return matchesLanguage;
      });
  
      // Затем фильтруем по уровню
      const filteredByLevel = filteredByLanguage.filter((teacher) => {
        const matchesLevel =
          !level || teacher.levels.some((lvl) => lvl.toLowerCase().startsWith(level.toLowerCase()));
        return matchesLevel;
      });
  
      // И наконец, фильтруем по цене
      const filteredByPrice = filteredByLevel.filter((teacher) => {
        const matchesPrice = !price || teacher.price_per_hour >= price;
        return matchesPrice;
      });
  
      return filteredByPrice;
    }
  );



// export const selectFilteredTeachers = createSelector(
//   [selectList, selectLanguage, selectLevel, selectPrice],
//   (teachers, language, level, price) => {
//     return teachers?.filter((teacher) => {
//         const matchesLanguage =
//         !language ||
//         teacher.languages.some(
//           (lang) => lang.toLowerCase() === language.toLowerCase()
//         ); 
//       const matchesLevel = !level || teacher.levels.some((lvl) => lvl.toLowerCase().startsWith(level.toLowerCase())); 
//       const matchesPrice = !price|| teacher.price_per_hour <= price;
 
//       return matchesLanguage && matchesLevel && matchesPrice;
//     });
//   }
// );





// import { createSelector } from "@reduxjs/toolkit";
// import { selectNameFilter, selectNumberFilter } from "../filters/selectors";

// export const selectIsLoading = state => state.contacts.loading;
// export const selectError = state => state.contacts.error;
// export const selectContacts = state => state.contacts.items;

// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectNameFilter, selectNumberFilter],
//   (contacts, findNameContacts, findNumberContacts) => {
//     return contacts?.filter(
//       contact =>
//         contact.name.toLowerCase().includes(findNameContacts.toLowerCase()) &&
//         contact.number.includes(findNumberContacts)
//     );
//   }
// );