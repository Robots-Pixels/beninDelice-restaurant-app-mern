import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "benindelice-4f221.firebaseapp.com",
  projectId: "benindelice-4f221",
  storageBucket: "benindelice-4f221.firebasestorage.app",
  messagingSenderId: "341977766260",
  appId: "1:341977766260:web:42a724fc3f4fbf6ef03421"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();