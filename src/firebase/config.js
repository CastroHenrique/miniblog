import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWBNMMw-y12F3MmcfEvKa3cP_T2ZjT3FE",
  authDomain: "miniblog-a6645.firebaseapp.com",
  projectId: "miniblog-a6645",
  storageBucket: "miniblog-a6645.appspot.com",
  messagingSenderId: "453896722370",
  appId: "1:453896722370:web:5bf64cc5431fa14e22285b"
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };