import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADPtf-5UUPe6pRLjVgExViaphcRBTDhVU",
  authDomain: "power-house-gym-f39a7.firebaseapp.com",
  projectId: "power-house-gym-f39a7",
  storageBucket: "power-house-gym-f39a7.appspot.com",
  messagingSenderId: "397420466474",
  appId: "1:397420466474:web:50616343a81d6e9ac88e53",
  measurementId: "G-8B956LH5G8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
