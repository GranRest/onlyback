// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNRBN5wE1Ssm-JKYPX74TLoX2SQx80-i0",
  authDomain: "onlyback-gt.firebaseapp.com",
  databaseURL: "https://onlyback-gt-default-rtdb.firebaseio.com",
  projectId: "onlyback-gt",
  storageBucket: "onlyback-gt.appspot.com",
  messagingSenderId: "883777077511",
  appId: "1:883777077511:web:068157b3a03b3e5abb05a2",
  measurementId: "G-RS7006KEHJ",
};

const appFirebase = initializeApp(firebaseConfig);
//const db = getDatabase(appFirebase);
export default appFirebase;
