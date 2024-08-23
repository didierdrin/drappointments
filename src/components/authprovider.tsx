import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from '../../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, onSuccess?: () => void) => Promise<void>;
  logout: (onSuccess?: () => void) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        user.getIdToken().then((token) => {
          localStorage.setItem('auth_token', token);
        });
      } else {
        localStorage.removeItem('auth_token');
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, onSuccess?: () => void) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async (onSuccess?: () => void) => {
    try {
      await signOut(auth);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}