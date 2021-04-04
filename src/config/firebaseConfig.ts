import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDANjgh6MKRem_vezpTJLQVNLTskOOOuvk",
  authDomain: "heard-when-52dce.firebaseapp.com",
  projectId: "heard-when-237e7",
  storageBucket: "heard-when-52dce.appspot.com",
  messagingSenderId: "790386471582",
  appId: "1:790386471582:web:8d7c8362b3e825d6b8818f"
};

// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);

export const auth = fb.auth();
export const functions = fb.functions();
