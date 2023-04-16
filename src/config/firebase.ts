import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
};

let analytics, db: Firestore;

if (firebaseConfig?.projectId) {
  const app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== "undefined") {
    db = getFirestore(app);
    analytics = getAnalytics(app);
  }
}

const auth = getAuth();

export { auth, db, analytics };
