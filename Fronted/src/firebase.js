// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADPtf-5UUPe6pRLjVgExViaphcRBTDhVU",
  authDomain: "power-house-gym-f39a7.firebaseapp.com",
  projectId: "power-house-gym-f39a7",
  storageBucket: "power-house-gym-f39a7.appspot.com",
  messagingSenderId: "397420466474",
  appId: "397420466474:web:50616343a81d6e9ac88e53",
  measurementId: "G-8B956LH5G8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { auth, provider, signInWithPopup };
