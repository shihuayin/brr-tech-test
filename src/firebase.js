import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCczheB5g2rVOumrCVwFKTwyhh4SRUiHX0",
  authDomain: "brr-tech-test.firebaseapp.com",
  projectId: "brr-tech-test",
  storageBucket: "brr-tech-test.firebasestorage.app",
  messagingSenderId: "318139066970",
  appId: "1:318139066970:web:7a4680b2fbe7da86a4c663",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
