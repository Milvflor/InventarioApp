import React, { use } from 'react';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/userServices';
import Table from '../../components/Table';

const Users = () => {

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
        getUsers();
    }, []);

    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await getAllUsers();
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
        return  <div className="p-4 sm:ml-64">
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
        <div>
      <div className="p-4">
        <div className="flex flex-col items-center justify-center">

            <h1 className="text-2xl font-bold mb-4">Usuarios</h1>   

            <Table
                cabecera={cabeceras}
                data={data}
                acciones={acciones}
            />


        </div>
        </div></div>
    );

}

export default Users;
