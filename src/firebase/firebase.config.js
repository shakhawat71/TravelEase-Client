import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6k3tOvV8abk9YvmUpJYB1Qlgygagltjo",
  authDomain: "travelease-288b7.firebaseapp.com",
  projectId: "travelease-288b7",
  storageBucket: "travelease-288b7.firebasestorage.app",
  messagingSenderId: "763260372322",
  appId: "1:763260372322:web:4bb7bf864b41d1552dd83b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
