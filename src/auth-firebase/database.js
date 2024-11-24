import {
  ref,
  get,
  query,
  orderByChild,
  startAt,
  limitToFirst,
  equalTo,
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


export const fetchAllTeachers = async () => {
  const teachersRef = ref(database, "teachers");
  try {
  const snapshot = await get(teachersRef);
 
  if (!snapshot.exists()) {
    console.log("No teachers found in database.");
    return [];
  }

  const teachers = Object.keys(snapshot.val()).map((key) => ({
    id: key,
    ...snapshot.val()[key],
  }));
  console.log("Fetched teachers from database:", teachers);
  return teachers;


} catch (error) {
  console.error("Error fetching teachers:", error.message);
  throw error;
}
};









export const fetchFilteredTeachers = async (filters) => {
  // const db = getDatabase();
  let teachersRef = ref(database, "teachers");

  // Применяем фильтр по языку преподавания (если задан)
  if (filters.language) {
    teachersRef = query(
      teachersRef,
      orderByChild("language"),
      equalTo(filters.language)
    );
  }

  // Выполняем запрос и получаем данные
  const snapshot = await get(teachersRef);
  if (!snapshot.exists()) {
    return []; // Если данные отсутствуют
  }

  // Преобразуем объект в массив
  const teachers = Object.keys(snapshot.val()).map((key) => ({
    id: key,
    ...snapshot.val()[key],
  }));

  // // Дополнительная фильтрация на клиенте
  // return teachers.filter((teacher) => {
  //   let isMatch = true;

  //   // Фильтр по уровню знаний (если задан)
  //   if (filters.level) {
  //     isMatch = isMatch && teacher.level === filters.level;
  //   }

  //   // Фильтр по цене (если задан)
  //   if (filters.price) {
  //     isMatch = isMatch && teacher.price <= Number(filters.price);
  //   }

    // return isMatch;
    return teachers;

  // });
};
