import { initializeApp } from "firebase/app";


import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDt05Or02ktA7lo0GkhW8BJk0ST_sOeNpk",
    authDomain: "buy-today.firebaseapp.com",
    projectId: "buy-today",
    storageBucket: "buy-today.appspot.com",
    messagingSenderId: "778718404015",
    appId: "1:778718404015:web:f7fdcfe995dad3ee74e35a"
  };

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();