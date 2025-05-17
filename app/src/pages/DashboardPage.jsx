import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { getItemsWithDetails, createItem, updateItem, deleteItem } from '../services/itemService';
import '/workspaces/AtividadeAuth-Frontend/app/src/Dashboard.css'; // Importe o CSS para estilização


function DashboardPage() {
  const { logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', prioridade: 'media' });
  const [editingItem, setEditingItem] = useState(null);

  // Buscar itens ao carregar a página
  useEffect(() => {
    fetchItems();
  }, []);


const fetchItems = async () => {
  setLoading(true);
  try {
    const data = await getItemsWithDetails();
    console.log("Itens com detalhes:", data); // Para debug
    setItems(data);
  } catch (error) {
    toast.error(error.message || 'Erro ao carregar itens');
  } finally {
    setLoading(false);
  }
};

  // Função para adicionar um novo item
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const addedItem = await createItem(newItem);
      setItems([...items, addedItem]);
      setNewItem({ name: '', quantity: '', prioridade: 'media' });
      toast.success('Item adicionado com sucesso!');
    } catch (error) {
      toast.error(error.message || 'Erro ao adicionar item');
    }
  };

  // Função para iniciar a edição de um item
  const handleEditStart = (item) => {
    setEditingItem({ ...item });
  };

 // Em DashboardPage.jsx, modifique a função handleEditSave:
const handleEditSave = async () => {
  try {
    // Certifique-se de que o ID está sendo passado corretamente
    console.log("Editando item:", editingItem); // Para debug
    
    // Envie apenas os dados necessários, sem o _id no objeto
    const { _id, ...itemData } = editingItem;
    const updatedItem = await updateItem(_id, itemData);
    
    // Atualize o estado local
    setItems(items.map(item => item._id === _id ? updatedItem : item));
    setEditingItem(null);
    toast.success('Item atualizado com sucesso!');
  } catch (error) {
    console.error("Erro ao atualizar:", error); // Para debug
    toast.error(error.message || 'Erro ao atualizar item');
  }
};


  // Função para cancelar a edição
  const handleEditCancel = () => {
    setEditingItem(null);
  };

  // Função para excluir um item
  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        await deleteItem(itemId);
        setItems(items.filter(item => item._id !== itemId));
        toast.success('Item excluído com sucesso!');
      } catch (error) {
        toast.error(error.message || 'Erro ao excluir item');
      }
    }
  };

  // Função para fazer logout
  const handleLogout = () => {
    logout();
    toast.info('Você foi desconectado');
    // O redirecionamento para /login acontecerá automaticamente pelo ProtectedRoute
  };

  return (
    <div className="dashboard-container">
      <header>
        <h2>Sua Lista de Compras</h2>
        <button onClick={handleLogout} className="logout-btn">Sair</button>
      </header>

      {/* Formulário para adicionar novo item */}
      <div className="add-item-form">
        <h3>Adicionar Novo Item</h3>
        <form onSubmit={handleAddItem}>
          <div>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantidade:</label>
            <input
              type="text"
              id="quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="prioridade">Prioridade:</label>
            <select
              id="prioridade"
              value={newItem.prioridade}
              onChange={(e) => setNewItem({ ...newItem, prioridade: e.target.value })}
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <button type="submit">Adicionar Item</button>
        </form>
      </div>

      {/* Lista de itens */}
      <div className="items-list">
        <h3>Seus Itens</h3>
        {loading ? (
          <p>Carregando itens...</p>
        ) : items.length === 0 ? (
          <p>Nenhum item encontrado. Adicione seu primeiro item!</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item._id} className={`priority-${item.prioridade}`}>
                {editingItem && editingItem._id === item._id ? (
                  // Formulário de edição
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      value={editingItem.quantity}
                      onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                    />
                    <select
                      value={editingItem.prioridade}
                      onChange={(e) => setEditingItem({ ...editingItem, prioridade: e.target.value })}
                    >
                      <option value="baixa">Baixa</option>
                      <option value="media">Média</option>
                      <option value="alta">Alta</option>
                    </select>
                    <button onClick={handleEditSave}>Salvar</button>
                    <button onClick={handleEditCancel}>Cancelar</button>
                  </div>
                ) : (
                  // Exibição normal do item
                  <div className="item-display">
                    <div className="item-info">
                      <strong>{item.name}</strong>
                      {item.quantity && <span> - {item.quantity}</span>}
                      <span className="priority-badge">{item.prioridade}</span>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => handleEditStart(item)}>Editar</button>
                      <button onClick={() => handleDeleteItem(item._id)}>Excluir</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
