import {
  ref,
  get,
  query,
  orderByChild,
  startAt,
  limitToFirst,
} from "firebase/database";
import { database } from "./firebase";

// Функция для получения данных учителей с пагинацией
export const fetchTeachers = async ({ pageSize, lastKey = null }) => {
  const teacherQuery = query(
    ref(database, "teachers"),
    orderByChild("id"), // Поле для сортировки
    startAt(lastKey || 0), // Если нет ключа, начинаем с 0
    limitToFirst(pageSize) // Лимит на страницу
  );

  try {
    const snapshot = await get(teacherQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Преобразуем данные в массив с объектами
      const teachers = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));

      return teachers;
    }

    return []; // Если данных нет
  } catch (error) {
    console.error("Error fetching teachers:", error.message);
    throw error;
  }
};

