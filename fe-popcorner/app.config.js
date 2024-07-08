// require("dotenv").config()
import "dotenv/config";

export default ({ config }) => ({
  // expo: {
  ...config,
  name: "fe-popcorner",
  slug: "fe-popcorner",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.anonymous.fepopcorner",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.anonymous.fepopcorner",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
  },
});

//     "apiKey": "AIzaSyCG2hhXmTHekwks1Gp6-wGbZWB9kI9AtLw",
// "authDomain": "practice-group-chat.firebaseapp.com",
// "projectId": "practice-group-chat",
// "storageBucket": "practice-group-chat.appspot.com",
// "messagingSenderId": "1028564997218",
// "appId": "1:1028564997218:web:5424394a904159f6b02d3b"
