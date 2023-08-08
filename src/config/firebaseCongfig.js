// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//alows to connect to the db
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBek2dFrdMwmHpQLdGyMFlB_3vpgS3yldU",
  authDomain: "blog-2425e.firebaseapp.com",
  projectId: "blog-2425e",
  storageBucket: "blog-2425e.appspot.com",
  messagingSenderId: "404232544173",
  appId: "1:404232544173:web:dafb392284584d452d8b24",
  measurementId: "G-3GQLGDS9MH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//setup db and export
export const db = getFirestore(app)