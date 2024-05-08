import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDOrOhfEEAX-7ibX9MIQv1gnA8kSR2p3SQ",
  authDomain: "recipe-c46f6.firebaseapp.com",
  projectId: "recipe-c46f6",
  storageBucket: "recipe-c46f6.appspot.com",
  messagingSenderId: "688102002038",
  appId: "1:688102002038:web:723c3dc380a8cf659c7e57",
  measurementId: "G-5ZRT5PL2M1"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export { auth };

