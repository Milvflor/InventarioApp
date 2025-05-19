import React from 'react';
import { useEffect, useState } from 'react';
import { getAllLotes, getPreciosPorFecha, getPreciosPorProductoYFecha } from '../../services/lotesServices';
import { getAllProducts } from '../../services/productServices';
import Table from '../../components/Table';
import { useNavigate } from 'react-router-dom';

const Lotes = () => {

    const navigate = useNavigate();
    const [cabeceras, setCabeceras] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [item, setItem] = useState({});
    const [fechaConsulta, setFechaConsulta] = useState('');
    const [preciosPorFecha, setPreciosPorFecha] = useState([]);
    const [productoIdConsulta, setProductoIdConsulta] = useState('');
    const [preciosConsulta, setPreciosConsulta] = useState([]);
    const [productos, setProductos] = useState([]);
    const [loadingConsulta, setLoadingConsulta] = useState(false);

    const [acciones, setAcciones] = useState([
        {
            nombre: 'Editar',
            option: 'editarLote',
            icono: 'fa-solid fa-pen-to-square',
            funcion: (item) => {
                console.log(item);
            }
        },
        {
            nombre: 'Eliminar',
            option: 'eliminarLote',
            icono: 'fa-solid fa-trash',
            funcion: (item) => {
                console.log(item);
            }
        }
    ]);

    useEffect(() => {
        getLotes();
        getProducts();
    }, []);

    const getLotes = async () => {
        setLoading(true);
        try {
            const response = await getAllLotes();
            if (response.error) {
                setError(response.error);
                return;
            }
            const data = response.data;
            setData(data);
            setCabeceras(Object.keys(data[0]));

        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }

    const consultarPreciosFecha = async () => {
        if (!fechaConsulta) return;

        const response = await getPreciosPorFecha(fechaConsulta);
        if (response.error) {
            setError(response.error);
        } else {
            setPreciosPorFecha(response.data);
        }
    };

    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await getAllProducts();
            if (response.error) {
                setError(response.error);
                return;
            }
            const data = response.data;
            setProductos(data);
            setProductoIdConsulta(data[0].id);

        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }

    const consultarPreciosProdFecha = async () => {
        setLoadingConsulta(true);
        setError('');
        if (!fechaConsulta || !productoIdConsulta) return;

        const response = await getPreciosPorProductoYFecha(productoIdConsulta, fechaConsulta);
        if (response.error) {
            setError(response.error);
            setLoadingConsulta(false);

        } else {
            setPreciosConsulta(response.data);
            setLoadingConsulta(false);

        }
    };


     if (loading) {
        return  <div className="p-4">
            <div className="relative overflow-x-auto sm:rounded-lg justify-center items-center flex flex-col h-screen">
                <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5 0a5.5 5.5 0 1 0 11 0A5.5 5.5 0 0 0 6.5 12z"></path>
                </svg>
                <p className="text-gray-500">Buscando...</p>
            </div>
        </div>
    }


    return (
        <div className="p-4">
            <div className="flex flex-col items-center justify-center">

                <h1 className="text-2xl font-bold mb-4">Lotes</h1> 


                <div className="flex justify-between mb-4 h-10 w-full">
            
                <button
                    className="bg-blue-500 cursor-pointer hover:bg-blue-700 h-full text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={() => navigate('/lotes/new')}
                >
                    Agregar nuevo lote
                </button>  
                </div>

                <Table
                    cabecera={cabeceras}
                    data={data}
                    acciones={acciones}
                />


            </div>

            <br/>

           <div className="w-full">
            <h2 className="text-xl font-semibold mb-2">Consultar precios por producto y fecha</h2>
            <div className="flex gap-2 mb-2 justify-center">
                 <select 
                onChange={(e) => {
                        const selectedProduct = productos.find(producto => producto.id == e.target.value);
                        setProductoIdConsulta(selectedProduct.id);
                    }
                }
                name="producto" id="producto" class="border rounded p-2 w-1/3">
                    {productos.map((producto) => (
                        <option key={producto.id} value={producto.id}>{producto.name}</option>
                    ))}
                </select>

                <input
                type="date"
                value={fechaConsulta}
                onChange={(e) => setFechaConsulta(e.target.value)}
                className="border rounded p-2 w-1/3"
                />
                <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={consultarPreciosProdFecha}
                >
                {loadingConsulta ? 'Consultando...' : 'Consultar'}
                </button>
            </div>

            {preciosConsulta.length === 0 && (
                <p className="text-gray-500 text-center">No hay precios disponibles para la fecha seleccionada.</p>
            )}

            {preciosConsulta.length > 0 && (
                <table className="table-auto w-full border mt-4">
                <thead>
                    <tr>
                    <th className="border px-4 py-2">Producto</th>
                    <th className="border px-4 py-2">Precio</th>
                    <th className="border px-4 py-2">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {preciosConsulta.map((item, idx) => (
                    <tr key={idx}>
                        <td className="border px-4 py-2">{item.producto}</td>
                        <td className="border px-4 py-2">{item.precio}</td>
                        <td className="border px-4 py-2">{new Date(item.fecha).toLocaleDateString()}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
            </div>

        </div>
    );

}

export default Lotes;
