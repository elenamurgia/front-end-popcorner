// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
import { config } from "dotenv";

// Load environment variables from .env file
config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.expoConfig.apiKey,
  authDomain: Constants.expoConfig.authDomain,
  projectId: Constants.expoConfig.projectId,
  storageBucket: Constants.expoConfig.storageBucket,
  messagingSenderId: Constants.expoConfig.messagingSenderId,
  appId: Constants.expoConfig.appId,
  databaseURL: Constants.expoConfig.databaseURL,
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
