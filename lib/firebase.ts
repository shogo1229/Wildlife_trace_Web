// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import exp from "constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcUHsHEGCjb2IB9Foi4507wM1JlH2xiwI",
  authDomain: "wildlife-tra.firebaseapp.com",
  databaseURL: "https://wildlife-tra-default-rtdb.firebaseio.com",
  projectId: "wildlife-tra",
  storageBucket: "wildlife-tra.appspot.com",
  messagingSenderId: "405054998859",
  appId: "1:405054998859:web:007320730771e2983480ce",
  measurementId: "G-XFFDD6168R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
