import React, { createContext, useState, useEffect, useContext } from 'react';
import { getToken, logoutUser as serviceLogout } from '../services/authService'; // Importamos getToken e renomeamos logoutUser

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(getToken()); // Pega o token inicial do localStorage
  // Poderíamos adicionar um estado para o usuário: const [user, setUser] = useState(null);

  useEffect(() => {
    // Este efeito pode ser usado para validar o token com o backend
    // ou para decodificar o token e pegar informações do usuário, se necessário.
    // Por enquanto, apenas garantimos que o estado reflita o localStorage.
    const token = getToken();
    if (token) {
      setAuthToken(token);
      // Aqui você poderia, por exemplo, buscar os dados do usuário usando o token
    } else {
      setAuthToken(null);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    // Aqui você também poderia buscar/setar dados do usuário
  };

  const logout = () => {
    serviceLogout(); // Chama a função do authService que limpa o localStorage
    setAuthToken(null);
    // Limpar dados do usuário também, se houver
  };

  // O valor do contexto inclui o token e as funções de login/logout
  // Adicionamos !!authToken para ter um booleano `isAuthenticated`
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    login,
    logout,
    // user, // Se você adicionar o estado do usuário
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
