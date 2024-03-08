import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBojMKMNZy_k_HViZks9bugmlfeNeL4C5o",
  authDomain: "blogging-app-d4e68.firebaseapp.com",
  projectId: "blogging-app-d4e68",
  storageBucket: "blogging-app-d4e68.appspot.com",
  messagingSenderId: "672775429010",
  appId: "1:672775429010:web:38ac3a6f541cac1aef3f4b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { app, auth };
