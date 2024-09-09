import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyW4aCucmhrda-eSKatv68hzi2ncWnc8Y",
  authDomain: "car-rental-a38ec.firebaseapp.com",
  projectId: "car-rental-a38ec",
  storageBucket: "car-rental-a38ec.appspot.com",
  messagingSenderId: "200928230187",
  appId: "1:200928230187:web:482f476e7fd5c96358636e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
