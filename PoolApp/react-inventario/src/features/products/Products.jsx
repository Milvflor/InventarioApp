import React, { use } from 'react';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productServices';
import Table from '../../components/Table';
import { useNavigate } from 'react-router-dom';

const Products = () => {

    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState('');
    const [cabeceras, setCabeceras] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [item, setItem] = useState({});
    const [acciones, setAcciones] = useState([
        {
            nombre: 'Editar',
            icono: 'fa-solid fa-pen-to-square',
            funcion: (item) => {
                console.log(item);
            }
        },
        {
            nombre: 'Eliminar',
            icono: 'fa-solid fa-trash',
            funcion: (item) => {
                console.log(item);
            }
        }
    ]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await getAllProducts();
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

                <h1 className="text-2xl font-bold mb-4">Productos</h1> 


                <div className="flex justify-between mb-4 h-10 w-full">
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    className="border border-gray-300 rounded-lg px-2 mr-2"
                    onChange={(e) => {
                        const value = e.target.value;
                        const filteredData = data.filter(item => item.nombre.toLowerCase().includes(value.toLowerCase()));
                        setData(filteredData);
                    }}
                />
                

                <button
                    className="bg-blue-500 cursor-pointer hover:bg-blue-700 h-full text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={() => navigate('/products/new')}
                >
                    Agregar nuevo producto
                </button>  
                </div>

                <Table
                    cabecera={cabeceras}
                    data={data}
                    acciones={acciones}
                />


            </div>
        </div>
    );

}

export default Products;
