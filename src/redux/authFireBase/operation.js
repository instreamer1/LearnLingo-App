import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { auth } from "../../auth/firebase";
// const auth = getAuth();
// const db = getDatabase();

export const register = createAsyncThunk(
    "auth/register",
    async ({ email, password, name }, thunkAPI) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Здесь вы можете добавить логику для сохранения дополнительных данных, например, имя пользователя в Firestore или Realtime Database
        // Для примера: await setDoc(doc(db, "users", user.uid), { name });
  
        return {
          uid: user.uid,
          email: user.email,
          name,
        };
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });