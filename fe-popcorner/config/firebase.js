import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.firebase.apiKey,
  authDomain: Constants.expoConfig.extra.firebase.authDomain,
  databaseURL: Constants.expoConfig.extra.firebase.databaseURL,
  projectId: Constants.expoConfig.extra.firebase.projectId,
  storageBucket: Constants.expoConfig.extra.firebase.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.firebase.messagingSenderId,
  appId: Constants.expoConfig.extra.firebase.appId,
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
