import { createContext, useState, useEffect } from "react";
import { analytics, auth } from "../config/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { setUserProperties } from "firebase/analytics";

export const AuthContext = createContext({
  user: null,
  loading: true,
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider(auth);

  const loginWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const authStateChanged = async (user) => {
    setLoading(true);
    if (!user) {
      setUser(null);
      setLoading(false);
      return;
    }
    setUser(user);
    setUserProperties(analytics, {
      email: user?.email,
    });
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  const values = { user, loading, loginWithGoogle, logout };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
