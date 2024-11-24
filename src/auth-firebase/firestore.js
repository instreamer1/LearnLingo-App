import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  getDoc, collection, getDocs,
} from "firebase/firestore";

import { firestore } from "./firebase";
;




export async function saveUserProfile(user) {
  try {
    const userRef = doc(firestore, "users", user.uid);
    await setDoc(userRef, {
      name: user.name,
      email: user.email,
      createdAt: new Date(),
      favorites: [], 
    });
  
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
}



export async function toggleFavoriteTeacher(uid, teacher, isFavorite) {
  try {
    const userRef = doc(firestore, "users", uid);

    if (isFavorite) {
   
      await updateDoc(userRef, {
        favorites: arrayRemove(teacher),
      });
  
    } else {
    
      await updateDoc(userRef, {
        favorites: arrayUnion(teacher),
      });

    }
  } catch (error) {
    console.error("Error updating favorites:", error);
    throw error;
  }
}

export async function getUserFavoriteTeachers({uid, accessToken}) {
  try {
    const userRef = doc(firestore, "users", uid); 
    const userDoc = await getDoc(userRef); 

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.favorites || []; 
    } else {
      console.error(`No user document found for UID: ${uid}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error; 
  }
}

export async function getUserProfile(uid) {
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
   
  } else {
  
  }
}


export async function getAllUsers() {
  const querySnapshot = await getDocs(collection(firestore, "users"));
  querySnapshot.forEach((doc) => {

  });
}


