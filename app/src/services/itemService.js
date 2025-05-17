import axios from 'axios';
import { getToken } from './authService';

// Recupere a URL da API do arquivo .env
const API_URL = import.meta.env.VITE_API_URL || 'https://atividade-auth.vercel.app';

// Configuração do axios com o token JWT
const getAuthHeader = ( ) => {
  const token = getToken();
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};

// Buscar todos os itens do usuário
export const getItemsWithDetails = async () => {
  try {
    // Primeiro, obtenha a lista de itens (que contém apenas IDs ou nomes)
    const response = await axios.get(`${API_URL}/items`, getAuthHeader());
    const items = response.data;
    
    // Se não houver itens, retorne a lista vazia
    if (!items || items.length === 0) return [];
    
    // Para cada item, busque os detalhes completos
    const itemsWithDetails = await Promise.all(
      items.map(async (item) => {
        // Assumindo que cada item tem um _id ou id
        const itemId = item._id || item.id;
        if (!itemId) return item; // Se não tiver ID, retorne o item como está
        
        try {
          // Busque os detalhes completos do item
          const detailsResponse = await axios.get(`${API_URL}/items/${itemId}`, getAuthHeader());
          // Combine o ID original com os detalhes retornados
          return { _id: itemId, ...detailsResponse.data };
        } catch (error) {
          console.error(`Erro ao buscar detalhes do item ${itemId}:`, error);
          return item; // Em caso de erro, retorne o item original
        }
      })
    );
    
    return itemsWithDetails;
  } catch (error) {
    throw error.response?.data || { message: 'Erro ao buscar itens com detalhes' };
  }
};

// Buscar um item específico
export const getItemById = async (itemId) => {
  try {
    const response = await axios.get(`${API_URL}/items/${itemId}`, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erro ao buscar detalhes do item' };
  }
};

// Criar um novo item
export const createItem = async (itemData) => {
  try {
    const response = await axios.post(`${API_URL}/items`, itemData, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erro ao criar item' };
  }
};

// Atualizar um item existente (PUT - atualização completa)
export const updateItem = async (itemId, itemData) => {
  try {
    const response = await axios.put(`${API_URL}/items/${itemId}`, itemData, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erro ao atualizar item' };
  }
};

// Atualizar parcialmente um item (PATCH - atualização parcial)
export const patchItem = async (itemId, itemData) => {
  try {
    const response = await axios.patch(`${API_URL}/items/${itemId}`, itemData, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erro ao atualizar item parcialmente' };
  }
};

// Excluir um item
export const deleteItem = async (itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/items/${itemId}`, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erro ao excluir item' };
  }
};
