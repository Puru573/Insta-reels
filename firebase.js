import { initializeApp } from "firebase/app";
import {getAuth} from "fireBase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3mesZ0gSFrsZb3jzqjRmT6l1xmLN2PD4",
  authDomain: "insta-reels-36051.firebaseapp.com",
  projectId: "insta-reels-36051",
  storageBucket: "insta-reels-36051.appspot.com",
  messagingSenderId: "709173977139",
  appId: "1:709173977139:web:74e49b4a6ef9f7a4ac0346"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const storage=getStorage(app);
const db = getFirestore(app);
export {auth,storage,db};


