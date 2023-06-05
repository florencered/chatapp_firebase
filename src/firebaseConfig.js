//contains all the keys and ids required for setting up my firebase project and using my firestore database

// Import the functions you need from the SDKs you need 
import { initializeApp } from "firebase/app"; 
///setting up authentication via google  
import {getAuth,GoogleAuthProvider} from 'firebase/auth'; 
//accessing the database by importing firestore database
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRu5OtvnsAaABNzNWpvR6HI9tjClISE1g",
  authDomain: "chatbot-e3d89.firebaseapp.com",
  projectId: "chatbot-e3d89",
  storageBucket: "chatbot-e3d89.appspot.com",
  messagingSenderId: "324977012004",
  appId: "1:324977012004:web:699c5ccc3a2237864917b1"
};

// Initialize Firebase and modify accrdingly so that we can use firebase by just calling the app variable
const app = initializeApp(firebaseConfig); 
////configuring authentication//////
//we need to export the auth to be able to use it ,app represents whole of the firebase
export const auth=getAuth(app); 
//handling authentication via google,exporting the function so that it can be used across all the platforms
export const provider=new GoogleAuthProvider(); 
//make sure that the firestore can be accessed by the whole app 
export const db=getFirestore(app);
