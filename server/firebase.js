const firebase = require("firebase");
const secretKeys = require("./secretKeys")

const firebaseConfig = {
  apiKey: secretKeys.apiKey,
  authDomain: secretKeys.authDomain, 
  projectId: secretKeys.projectId, 
  storageBucket: secretKeys.storageBucket, 
  messagingSenderId: secretKeys.messagingSenderId, 
  appId: secretKeys.appId, 
  measurementId: secretKeys.measurementId, 
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = firebase.getAnalytics(app);