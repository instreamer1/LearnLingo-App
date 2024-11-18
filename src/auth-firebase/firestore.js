import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";

// Инициализация Firestore
const db = getFirestore();
const auth = getAuth();

// Функция для сохранения профиля пользователя
// Добавление документа в коллекцию 'users'
export async function saveUserProfile(user) {
    try {
      await setDoc(doc(db, "users", user.uid), {
        name: user.name,
        email: user.email,
        createdAt: new Date(),
      });
      console.log("User profile saved!");
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;  // Пробрасываем ошибку, если что-то пошло не так
  }
};


import { getDoc, collection, getDocs } from 'firebase/firestore';

// Чтение одного документа
export async function getUserProfile(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("User profile:", docSnap.data());
  } else {
    console.log("No such user profile!");
  }
}

// Чтение всех документов из коллекции
async function getAllUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}


// import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";

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