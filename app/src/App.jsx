import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute'; 


function App() {


  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Inicial</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Cadastro</Link></li>

          <li><Link to="/dashboard">Dashboard</Link></li> 
        </ul>
      </nav>

      <ToastContainer  />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        

        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} /> 

        </Route>

        <Route path="/" element={<div><h2>Página Inicial</h2><p>Use os links acima para navegar.</p></div>} />
      </Routes>
    </Router>
  );
}

export default App;
