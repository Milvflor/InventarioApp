import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const getAllLotes = async () => {
    try {
        const response = await axios.get(`${API_URL}/lotes/all`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
    
        if (response.status === 200) {
        return { data: response.data };
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
        return { error: "No autorizado" };
        }
        return { error: "Error al obtener los lotes. Inténtalo de nuevo." };
    }
}

const createLote = async (loteData) => {
    try {
        const response = await axios.post(`${API_URL}/lotes/registerLote`, {
            id_producto: loteData.id_producto,
            fecha_ingreso: loteData.fecha_ingreso,
            cantidad: loteData.cantidad,
            precio: loteData.precio,
        }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
    
        if (response.status === 200) {
            return { message: "Lote creado exitosamente." };
        }
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
            return { error: error.response.data };
        }
        return { error: "Error al crear el lote. Inténtalo de nuevo." };
    }
};

const getPreciosPorFecha = async (fecha) => {
  try {
    const response = await axios.get(`${API_URL}/lotes/precios-por-fecha`, {
      params: { fecha }
    });
    return { data: response.data };
  } catch (error) {
    console.error('Error al obtener precios por fecha:', error);
    return { error: 'No se pudieron obtener los precios.' };
  }
};

const getPreciosPorProductoYFecha = async (productId, fecha) => {
  try {
    const response = await axios.get(`${API_URL}/lotes/precios`, {
      params: { productId, fecha }
    });
    return { data: response.data };
  } catch (error) {
    console.error('Error al obtener precios:', error);
    return { error: 'Error al consultar precios.' };
  }
};


export { getAllLotes, createLote, getPreciosPorFecha,getPreciosPorProductoYFecha };