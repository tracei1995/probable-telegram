// Flexible Firebase initialization that reads config from environment variables.
// Exports: app (default), db, auth.
// Supports CRA (REACT_APP_*), Next (NEXT_PUBLIC_*), Vite (VITE_*), or plain process.env.FIREBASE_*
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function getEnv(names) {
  for (const n of names) {
    if (typeof process !== "undefined" && process.env && process.env[n]) {
      return process.env[n];
    }
    if (typeof import !== "undefined" && typeof import.meta !== "undefined" && import.meta.env && import.meta.env[n]) {
      return import.meta.env[n];
    }
  }
  return "";
}

const firebaseConfig = {
  apiKey: getEnv(["REACT_APP_FIREBASE_API_KEY", "NEXT_PUBLIC_FIREBASE_API_KEY", "VITE_FIREBASE_API_KEY", "FIREBASE_API_KEY"]) || "",
  authDomain: getEnv(["REACT_APP_FIREBASE_AUTH_DOMAIN", "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", "VITE_FIREBASE_AUTH_DOMAIN", "FIREBASE_AUTH_DOMAIN"]) || "",
  projectId: getEnv(["REACT_APP_FIREBASE_PROJECT_ID", "NEXT_PUBLIC_FIREBASE_PROJECT_ID", "VITE_FIREBASE_PROJECT_ID", "FIREBASE_PROJECT_ID"]) || "",
  storageBucket: getEnv(["REACT_APP_FIREBASE_STORAGE_BUCKET", "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", "VITE_FIREBASE_STORAGE_BUCKET", "FIREBASE_STORAGE_BUCKET"]) || "",
  messagingSenderId: getEnv(["REACT_APP_FIREBASE_MESSAGING_SENDER_ID", "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", "VITE_FIREBASE_MESSAGING_SENDER_ID", "FIREBASE_MESSAGING_SENDER_ID"]) || "",
  appId: getEnv(["REACT_APP_FIREBASE_APP_ID", "NEXT_PUBLIC_FIREBASE_APP_ID", "VITE_FIREBASE_APP_ID", "FIREBASE_APP_ID"]) || "",
};

// Warn in non-dev if using fallbacks
if (
  typeof process !== "undefined" &&
  process.env &&
  process.env.NODE_ENV &&
  process.env.NODE_ENV !== "development" &&
  (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId)
) {
  // eslint-disable-next-line no-console
  console.warn(
    "Firebase config appears to be using empty/fallback values. Ensure environment variables are set for production."
  );
}

// Initialize app only once (works with hot-reload / HMR)
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
