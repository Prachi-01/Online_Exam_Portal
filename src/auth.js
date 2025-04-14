import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from './firebaseConfig'; // Ensure your firebaseConfig is correctly exported

// Initialize Firebase Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign In Function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User Info:", user);
    alert(`Welcome ${user.displayName}!`);
  } catch (error) {
    console.error("Error during sign-in:", error);
    alert("Sign-in failed. Please try again.");
  }
};
