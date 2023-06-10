import { initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBsymXYkosL7XMi8Lk65mqH70kvD_jMFlg",
  authDomain: "hiredgo-6744a.firebaseapp.com",
  projectId: "hiredgo-6744a",
  storageBucket: "hiredgo-6744a.appspot.com",
  messagingSenderId: "305485509471",
  appId: "1:305485509471:web:16b28930fd7069d821fcea",
  measurementId: "G-QWXS4PHR91"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const fireDB=getFirestore(app);