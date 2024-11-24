import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllTeachers } from "../../auth-firebase/database/";

// export const getFilteredTeachers = createAsyncThunk(
//   "teachers/fetch",
//   async ({ language, level, price }, thunkAPI) => {
//     console.log("Received params:", { language, level, price });
//     try {
     
//       const teachers = await fetchAllTeachers();
   
//       const filteredTeachers = teachers.filter((teacher) => {
//         const matchesLanguage =
//           !language ||
//           teacher.languages.some(
//             (lang) => lang.toLowerCase() === language.toLowerCase()
//           ); 
//         const matchesLevel = !level || teacher.levels.some((lvl) => lvl.toLowerCase().startsWith(level.toLowerCase())); 
//         const matchesPrice = !price|| teacher.price_per_hour <= price;
//         return matchesLanguage && matchesLevel && matchesPrice;
//       });
//       console.log("filteredTeachers", filteredTeachers);
//       return filteredTeachers;
//     } catch (error) {
//       console.error("Error fetching or filtering teachers:", error.message);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );


export const getFilteredTeachers = createAsyncThunk(
  "teachers/fetchFiltered",
  async ({ language, level, price, lastKey }, thunkAPI) => {
    console.log("Received params:", { language, level, price, lastKey });
    try {
      // Получаем все учителей (с учетом пагинации, если это необходимо)
      const teachers = await fetchAllTeachers(lastKey);

      // Фильтрация учителей по параметрам
      const filteredTeachers = teachers.filter((teacher) => {
        const matchesLanguage =
          !language ||
          teacher.languages.some(
            (lang) => lang.toLowerCase() === language.toLowerCase()
          );
        const matchesLevel =
          !level ||
          teacher.levels.some((lvl) =>
            lvl.toLowerCase().startsWith(level.toLowerCase())
          );
        const matchesPrice = !price || teacher.price_per_hour <= price;

        return matchesLanguage && matchesLevel && matchesPrice;
      });

      console.log("Filtered teachers:", filteredTeachers);

      return filteredTeachers;  // Возвращаем отфильтрованных учителей
    } catch (error) {
      console.error("Error fetching or filtering teachers:", error.message);
      return thunkAPI.rejectWithValue(error.message);  // Возвращаем ошибку в случае неудачи
    }
  }
);