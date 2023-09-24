import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKgXVi9sYkUie_ujDTWlGTdGNGPdXhLiE",
  authDomain: "chat-2-3e2f2.firebaseapp.com",
  projectId: "chat-2-3e2f2",
  storageBucket: "chat-2-3e2f2.appspot.com",
  messagingSenderId: "183394762807",
  appId: "1:183394762807:web:a0e4f2cd40fbf5d0653fb2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);

