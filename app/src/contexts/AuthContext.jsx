import React, { createContext, useState, useEffect, useContext } from 'react';
import { getToken, logoutUser as serviceLogout } from '../services/authService'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(getToken()); // Pega o token inicial do localStorage

  useEffect(() => {
   
    const token = getToken();
    if (token) {
      setAuthToken(token);

    } else {
      setAuthToken(null);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);

  };

  const logout = () => {
    serviceLogout(); 
    setAuthToken(null);

  };

 
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    login,
    logout,

  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  return useContext(AuthContext);
};
