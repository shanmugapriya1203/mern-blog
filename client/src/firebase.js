// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-dd2cb.firebaseapp.com",
  projectId: "mern-blog-dd2cb",
  storageBucket: "mern-blog-dd2cb.appspot.com",
  messagingSenderId: "1067199821839",
  appId: "1:1067199821839:web:7bf1f3dcb1ee0888a34b7a"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);