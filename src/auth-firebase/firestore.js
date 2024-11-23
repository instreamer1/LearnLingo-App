import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  getDoc, collection, getDocs,
} from "firebase/firestore";
// import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";
import { firestore } from "./firebase";
;



// Функция для сохранения профиля пользователя
// Добавление документа в коллекцию 'users'
export async function saveUserProfile(user) {
  try {
    const userRef = doc(firestore, "users", user.uid);
    await setDoc(userRef, {
      name: user.name,
      email: user.email,
      createdAt: new Date(),
      favorites: [], // Инициализация пустого массива избранных
    });
    console.log("User profile saved!");
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
}

/**
 * Добавляет или удаляет учителя из списка избранных пользователя.

 */



// export const toggleFavoriteTeacher = async (uid, teacher, isFavorite) => {
//   try {
//     const userRef = doc(firestore, "users", uid);
//     const favoritesRef = doc(userRef, "favorites", teacher.id);

//     if (isFavorite) {
//       // Удалить из избранного
//       await deleteDoc(favoritesRef);
//     } else {
//       // Добавить в избранное
//       await setDoc(favoritesRef, { ...teacher });
//     }
//   } catch (error) {
//     throw new Error("Error toggling favorite teacher: " + error.message);
//   }
// };

export async function toggleFavoriteTeacher(uid, teacher, isFavorite) {
  try {
    const userRef = doc(firestore, "users", uid);

    if (isFavorite) {
      // Удаление учителя из избранного
      await updateDoc(userRef, {
        favorites: arrayRemove(teacher),
      });
      console.log(
        `Teacher ${teacher.name} ${teacher.surname} removed from favorites.`
      );
    } else {
      // Добавление учителя в избранное
      await updateDoc(userRef, {
        favorites: arrayUnion(teacher),
      });
      console.log(
        `Teacher ${teacher.name} ${teacher.surname} added to favorites.`
      );
    }
  } catch (error) {
    console.error("Error updating favorites:", error);
    throw error;
  }
}

export async function getUserFavoriteTeachers({uid, accessToken}) {
  try {
    const userRef = doc(firestore, "users", uid); // Ссылка на документ пользователя
    const userDoc = await getDoc(userRef); // Получаем документ из Firestore

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.favorites || []; // Возвращаем массив избранных учителей
    } else {
      console.error(`No user document found for UID: ${uid}`);
      return []; // Если документ отсутствует, возвращаем пустой массив
    }
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error; // Пробрасываем ошибку для обработки вызывающей стороной
  }
}





// export async function getUserFavoriteTeachers(uid) {
//   try {
//     const userRef = doc(firestore, "users", uid); // Ссылка на документ пользователя
//     const userDoc = await getDoc(userRef); // Получаем документ из Firestore

//     if (userDoc.exists()) {
//       const userData = userDoc.data();
//       return userData.favorites || []; // Возвращаем массив избранных учителей
//     } else {
//       console.error(`No user document found for UID: ${uid}`);
//       return []; // Если документ отсутствует, возвращаем пустой массив
//     }
//   } catch (error) {
//     console.error("Error fetching favorites:", error);
//     throw error; // Пробрасываем ошибку для обработки вызывающей стороной
//   }
// }
// Пояснения
// Использование getDoc: Мы читаем весь документ пользователя с помощью getDoc и обращаемся к полю favorites, которое является массивом.

// Проверка существования документа:

// Если документа нет (!userDoc.exists()), возвращается пустой массив.
// Пустое значение favorites: Если поле favorites не существует в документе, возвращается пустой массив для предотвращения ошибок.

// Чтение одного документа
export async function getUserProfile(uid) {
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("User profile:", docSnap.data());
  } else {
    console.log("No such user profile!");
  }
}

// Чтение всех документов из коллекции
export async function getAllUsers() {
  const querySnapshot = await getDocs(collection(firestore, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

export const checkEmailExists = async (email) => {
  const auth = getAuth();
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0; // Если есть методы для входа, значит email уже используется
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
};
