import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login
    // Você pode passar a localização atual para redirecionar de volta após o login, se desejar
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Renderiza o componente filho (a rota protegida)
};

export default ProtectedRoute;
