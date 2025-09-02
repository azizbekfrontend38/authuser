
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA4wnLaVrXy1M8zYX_2zQ6Rne4cl3-Tkec",
  authDomain: "user-6f441.firebaseapp.com",
  projectId: "user-6f441",
  storageBucket: "user-6f441.firebasestorage.app",
  messagingSenderId: "763649460979",
  appId: "1:763649460979:web:803820fdc72eed2e970586"
};


const app = initializeApp(firebaseConfig);
export  const auth=getAuth(app)