import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBlwK-uzaeiXYGW_CTKig3W1deHurlipNo",
  authDomain: "getlink-2625c.firebaseapp.com",
  projectId: "getlink-2625c",
  storageBucket: "getlink-2625c.appspot.com",
  messagingSenderId: "954311302157",
  appId: "1:954311302157:web:c97df203e450c15e490944",
  measurementId: "G-9G4QZF47CY"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app)