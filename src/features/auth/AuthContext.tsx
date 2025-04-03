import React, { createContext, useState, useEffect } from 'react';
import { auth,getUserRole } from '@config/firebase.Config';
import { User,onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


type AuthContextType = {
  user: User | null;
  role: string | null;
  loading: boolean;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        const userRole = await getUserRole(user.uid);
        if (userRole) {
          setRole(userRole);
          await AsyncStorage.setItem('role', userRole);
        }
      } else {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('role');
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Logout function
  const logout = async () => {
    await auth.signOut();
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('role');
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};