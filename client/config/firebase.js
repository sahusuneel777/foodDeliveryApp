// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDCuRSjoH1WDYHHpklVy1ZcI1QtaFBmSF0",
  authDomain: "fooddeliverapp-af50a.firebaseapp.com",
  projectId: "fooddeliverapp-af50a",
  storageBucket: "fooddeliverapp-af50a.appspot.com",
  messagingSenderId: "545332267501",
  appId: "1:545332267501:web:7deb1ec2cbe83c9e5bffe4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)