import {
  ref,
  get,
  query,
  orderByChild,
  startAt,
  limitToFirst,
  equalTo,
  startAfter,
} from "firebase/database";
import { database } from "./firebase";

export const fetchTeachers = async ({ pageSize, lastKey = null }) => {
  const teacherQuery = query(
    ref(database, "teachers"),
    orderByChild("id"),
    lastKey ? startAfter(lastKey) : startAt(0),
    limitToFirst(pageSize)
  );

  try {
    const snapshot = await get(teacherQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();

      const teachers = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));

      return teachers;
    }

    return [];
  } catch (error) {
    console.error("Error fetching teachers:", error.message);
    throw error;
  }
};

export const fetchAllTeachers = async () => {
  const teachersRef = ref(database, "teachers");
  try {
    const snapshot = await get(teachersRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      const teachers = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));

      return teachers;
    }

    return [];

  } catch (error) {
    console.error("Error fetching teachers:", error.message);
    throw error;
  }
};

export const fetchFilteredTeachers = async (filters) => {
  let teachersRef = ref(database, "teachers");

  if (filters.language) {
    teachersRef = query(
      teachersRef,
      orderByChild("language"),
      equalTo(filters.language)
    );
  }

  const snapshot = await get(teachersRef);
  if (!snapshot.exists()) {
    return [];
  }

  const teachers = Object.keys(snapshot.val()).map((key) => ({
    id: key,
    ...snapshot.val()[key],
  }));

  return teachers;
};
