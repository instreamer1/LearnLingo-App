import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTeachers } from "../../auth-firebase/database/";

// export const getTeachers = createAsyncThunk(
//   "teachers/fetch",
//   async ({ pageSize, lastKey }, thunkAPI) => {
//     try {
//       // const teachers = await fetchTeachers(pageSize, lastKey);
//       const teachers = await fetchTeachers({ pageSize, lastKey });
//       return teachers;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );



export const getTeachers = createAsyncThunk(
  "teachers/fetch",
  async ({ pageSize, lastKey }, thunkAPI) => {
    try {
      console.log("Fetching teachers with", { pageSize, lastKey });
      const teachers = await fetchTeachers({ pageSize, lastKey });
      console.log("Fetched teachers:", teachers);
      return teachers;
    } catch (error) {
      console.error("Error fetching teachers:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// import { getDatabase, ref, get, update } from "firebase/database";

// // Получаем ссылку на базу данных
// const db = getDatabase();

// // Ссылка на коллекцию преподавателей
// const teachersRef = ref(db, 'teachers');

// // Получаем все данные о преподавателях
// get(teachersRef).then(snapshot => {
//   if (snapshot.exists()) {
//     const teachers = snapshot.val();
//     const updates = {};

//     // Для каждого преподавателя добавляем уникальное поле id
//     Object.keys(teachers).forEach(key => {
//       const teacher = teachers[key];
//       updates[`teachers/${key}/id`] = key; // Используем уникальный ключ как id
//     });

//     // Обновляем записи
//     update(db, updates).then(() => {
//       console.log("IDs добавлены успешно");
//     }).catch(error => {
//       console.error("Ошибка при добавлении ID:", error);
//     });
//   } else {
//     console.log("Нет данных");
//   }
// });
