import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Provide a sensible fallback for authDomain to avoid auth/auth-domain-config-required
const inferredAuthDomain = process.env.REACT_APP_PROJECT_ID
  ? `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`
  : undefined;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || inferredAuthDomain,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Use default in-memory Firestore (no persistent offline cache)
const db = getFirestore(app);

export { app, db };
