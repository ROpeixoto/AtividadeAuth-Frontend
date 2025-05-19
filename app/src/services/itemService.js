import axios from 'axios';
import { getToken } from './authService';


const API_URL = import.meta.env.VITE_API_URL || 'https://atividade-auth.vercel.app';


const getAuthHeader = ( ) => {
  const token = getToken();
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};


export const getItemsWithDetails = async () => {
  try {
    const response = await axios.get(`${API_URL}/items`, getAuthHeader());
    const items = response.data;
    

    if (!items || items.length === 0) return [];
    

    const itemsWithDetails = await Promise.all(
      items.map(async (item) => {

        const itemId = item._id || item.id;
        if (!itemId) return item; 
        
        try {

          const detailsResponse = await axios.get(`${API_URL}/items/${itemId}`, getAuthHeader());

          return { _id: itemId, ...detailsResponse.data };
        } catch (error) {
          console.error(`Erro ao buscar detalhes do item ${itemId}:`, error);
          return item; 
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
