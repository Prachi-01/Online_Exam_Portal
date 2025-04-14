// src/components/DebugAuth.jsx
import { useEffect } from 'react';
import { auth } from '../firebaseConfig';

const DebugAuth = () => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Current User UID:', user.uid);
        console.log('Current User Email:', user.email);
      } else {
        console.log('No user signed in');
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default DebugAuth;