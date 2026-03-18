import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Credenciales reales del proyecto LockerUS-App
const firebaseConfig = {
  apiKey: "AIzaSyCZVoMKDcocnCd_AqsJ9nFX2L0SdWhMvtU",
  authDomain: "lockerus-app.firebaseapp.com",
  projectId: "lockerus-app",
  storageBucket: "lockerus-app.firebasestorage.app",
  messagingSenderId: "1050188037516",
  appId: "1:1050188037516:web:ee161c780432521fe4aaa9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
