import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../../Firebase/firebase.init';
import { useEffect, useState } from 'react';
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  //Google provider
  const googleProvider = new GoogleAuthProvider();
  //create a user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //Sign in a user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //sign in with Google
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //update user profile
  const updateUserProfile = (name, url) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: url,
    });
  };
  //Sign-out user
  const signOutUser = () => {
    return signOut(auth);
  };

  const authInfo = {
    createUser,
    signInUser,
    googleSignIn,
    signOutUser,
    updateUserProfile,
    loading,
    setLoading,
    user,
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setLoading(false);
      setUser(currentUser);
      console.log('currentUser..', currentUser);
    });
    return unsubscribe;
  }, []);
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
