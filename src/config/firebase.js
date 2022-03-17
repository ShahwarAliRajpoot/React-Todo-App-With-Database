import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARFAd_-WhOK0K5g5D7POemuy9Z-gJNMMw",
  authDomain: "reacttodowithdatabase.firebaseapp.com",
  projectId: "reacttodowithdatabase",
  storageBucket: "reacttodowithdatabase.appspot.com",
  messagingSenderId: "443419428900",
  appId: "1:443419428900:web:87a30047e086a9250a30b1"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export default db;

