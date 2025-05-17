import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importado
import { toast } from 'react-toastify'; // Importado
import { registerUser } from '../services/authService'; // Importado

function RegisterPage() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Para feedback de carregamento
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userData = { username, email, password };
      const response = await registerUser(userData);
      // Assumindo que seu backend envia uma mensagem de sucesso
      toast.success(response.message || 'Cadastro realizado com sucesso! Faça o login.'); 
      navigate('/login'); // Redireciona para a página de login após o sucesso
    } catch (error) {
      // error.message virá do throw no authService
      toast.error(error.message || 'Não foi possível realizar o cadastro.');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nome:</label>
          <input 
            type="text" 
            id="name" 
            value={username} 
            onChange={(e) => setName(e.target.value)} 
            required 
            disabled={isLoading} 
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
