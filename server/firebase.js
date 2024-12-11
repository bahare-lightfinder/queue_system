import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { keysFirebase } from "./secretVariables.js";


const firebaseConfig = {
  apiKey: keysFirebase.apiKey,
  authDomain: keysFirebase.authDomain,
  projectId:keysFirebase.projectId,
  storageBucket: keysFirebase.storageBucket,
  messagingSenderId: keysFirebase.messagingSenderId,
  appId: keysFirebase.appId,
  measurementId: keysFirebase.measurementId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };