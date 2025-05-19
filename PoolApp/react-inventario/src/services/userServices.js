import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/all`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.status === 200) {
      return {data: response.data}; // Retorna la lista de usuarios
    }

  } catch (error) {
    
    if (error.response && error.response.status === 401) {
      return { error: 'No autorizado' };
    }
    return { error: 'Error al obtener los usuarios. Inténtalo de nuevo.' };
    
  }
};

export { getAllUsers };