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

const firebaseConfig2 = {
  apiKey: "AIzaSyAZ19ZhGvUyZ-rx28rXUk1fM-lhWlc-n0M",
  authDomain: "block-usergetlink.firebaseapp.com",
  projectId: "block-usergetlink",
  storageBucket: "block-usergetlink.appspot.com",
  messagingSenderId: "437720978831",
  appId: "1:437720978831:web:90caf74468c9ecc495e7fa",
  measurementId: "G-Q5ZJYWX0CC"
};

const app = initializeApp(firebaseConfig);
const app2 = initializeApp(firebaseConfig2,"app2");

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app)


export const auth2 = getAuth(app2);
export const googleProvider2 = new GoogleAuthProvider();
export const db2 = getFirestore(app2);
export const storage2 = getStorage(app2)