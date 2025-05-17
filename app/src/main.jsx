// Em src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext'; // Importe o AuthProvider
import './index.css'; // Ou seu arquivo de estilos global

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> { /* Envolva o App com o AuthProvider */ }
      <App />
    </AuthProvider>
  </React.StrictMode>
);
