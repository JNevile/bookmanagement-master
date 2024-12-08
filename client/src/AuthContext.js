import React, { createContext, useContext, useState} from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Custom Hook to Access AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    // Load token from localStorage during initial state setup
    return localStorage.getItem('authToken') || null;
  });

  // Save token to localStorage and state
  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  // Remove token from localStorage and state
  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  // Provide authentication-related values and methods
  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
