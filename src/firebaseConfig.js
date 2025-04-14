
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHy5t-_YzgetaPLr42Ab3EPT7uhHdAEUw",
  authDomain: "online-exam-system-8b2cf.firebaseapp.com",
  projectId: "online-exam-system-8b2cf",
  storageBucket: "online-exam-system-8b2cf.appspot.com",
  messagingSenderId: "788882872019",
  appId: "1:788882872019:web:b20411e50808d6945b2626"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const provider = new GoogleAuthProvider();
const db = getFirestore(app);
/*
// Enable persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.log("Persistence can only be enabled in one tab at a time.");
  } else if (err.code === 'unimplemented') {
    console.log("The current browser does not support all of the features required to enable persistence.");
  }
});
*/
export { auth,  db };
