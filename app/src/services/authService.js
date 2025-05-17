import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://atividade-auth.vercel.app'; 

export const registerUser = async (userData ) => {
  try {
   
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data; 
  } catch (error) {
 
    throw error.response.data || { message: 'Erro desconhecido no cadastro' };
  }
};


export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    if (response.data && response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data || { message: "Erro desconhecido no login" };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('authToken');
  // Aqui você pode adicionar qualquer outra lógica de limpeza necessária
};

// Função para pegar o token (pode ser útil em outros services)
export const getToken = () => {
  return localStorage.getItem('authToken');
};

