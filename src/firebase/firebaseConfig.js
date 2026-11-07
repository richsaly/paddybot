import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaQPM9P9X5o7Q8EcCzPkb-zw0khVIuy4Q",
  authDomain: "paddybot-a3f6d.firebaseapp.com",
  projectId: "paddybot-a3f6d",
  storageBucket: "paddybot-a3f6d.firebasestorage.app",
  messagingSenderId: "238793612126",
  appId: "1:238793612126:web:2641db4572dd1fe0a64dcf"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;