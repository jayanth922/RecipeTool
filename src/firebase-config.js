import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC2RfroHfEZlarTd3yxNhIQjOQ39AW5Jns",
  authDomain: "recipe-e99b2.firebaseapp.com",
  projectId: "recipe-e99b2",
  storageBucket: "recipe-e99b2.appspot.com",
  messagingSenderId: "1015671491699",
  appId: "1:1015671491699:web:52cf30537117a58886ae06"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export { auth };

