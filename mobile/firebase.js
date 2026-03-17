import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Reemplazar esto con las credenciales reales de una consola de Firebase
const firebaseConfig = {
  apiKey: "AIzaSy_MOCK_API_KEY_PLEASE_REPLACE_ME",
  authDomain: "lockerus-app-demo.firebaseapp.com",
  projectId: "lockerus-app-demo",
  storageBucket: "lockerus-app-demo.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
