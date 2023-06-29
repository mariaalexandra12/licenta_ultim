// Import the functions you need from the SDKs you need
import { initializeApp , getApp ,getApps} from "firebase/app";
import     { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlkF5WPDfIjFzf4PU1z-il-VAWbmkk0XE",
  authDomain: "invoice-reader-4b865.firebaseapp.com",
  databaseURL: "https://invoice-reader-4b865-default-rtdb.firebaseio.com",
  projectId: "invoice-reader-4b865",
  storageBucket: "invoice-reader-4b865.appspot.com",
  messagingSenderId: "1079218684020",
  appId: "1:1079218684020:web:759261781a389b346bd121"
};

// Initialize Firebase
const app =initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage();
const auth=getAuth(app);
export {db,app,storage,auth};