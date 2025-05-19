import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/all`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.status === 200) {
      return {data: response.data};
    }

  } catch (error) {
    
    if (error.response && error.response.status === 401) {
      return { error: 'No autorizado' };
    }
    return { error: 'Error al obtener los usuarios. Inténtalo de nuevo.' };
    
  }
};

const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products/registerProduct`, {
        name: productData.nombre,
        description: productData.descripcion
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (response.status === 200) {
      return {data: response.data};
    }
    }
    catch (error) {
        if (error.response && error.response.status === 401) {
            return { error: 'No autorizado' };
        }
        if (error.response && error.response.status === 400) {
            return { error: error.response.data };
        }
        return { error: 'Error al crear el producto. Inténtalo de nuevo.' };
        }
}



export { getAllProducts, createProduct };