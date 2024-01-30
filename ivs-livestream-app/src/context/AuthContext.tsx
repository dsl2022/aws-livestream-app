import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (idToken: string, accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Initialize isLoggedIn based on the presence of an idToken in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const idToken = localStorage.getItem('idToken');
    return !!idToken; // Convert to boolean: true if idToken exists, otherwise false
  });

  // Define the login method
  const login = (idToken: string, accessToken: string) => {
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('accessToken', accessToken);
    setIsLoggedIn(true);
  };

  // Define the logout method
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
  };

  // Effect to handle the page refresh and check the authentication status
  useEffect(() => {
    const idToken = localStorage.getItem('idToken');
    setIsLoggedIn(!!idToken);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
