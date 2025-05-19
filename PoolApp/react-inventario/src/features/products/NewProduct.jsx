import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../services/productServices';

const NewProduct = () => {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setError('');
        setLoading(true);
        e.preventDefault();
        try {
            const response = await createProduct({ nombre, descripcion });
            if (response.error) {
                setError(response.error);
                setLoading(false);
                return;
            }else{
                setLoading(false);
                navigate('/products');
            }
        } catch (err) {
            console.log(err)
            setError('Error al crear el producto. Inténtalo de nuevo.');
            setLoading(false);
        }
    }


    return (
        <div className="p-4">
        <div className='w-full h-screen bg-gray-100 justify-items-center'>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Nuevo Producto
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label for="nombre" class="block mb-2 w-fit text-sm font-medium text-gray-900 dark:text-white">Nombre del Producto</label>
                                <input type="text" name="nombre" id="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre del producto" required="" 
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div>
                                <label for="descripcion" class="block mb-2 w-fit text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                                <input type="text" name="descripcion" id="descripcion" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descripción del producto" required="" 
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" class="max-w-sm text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={handleSubmit}
                        disabled={loading}
                        >
                            {loading ? 'Creando...' : 'Crear Producto'}
                        </button>
                        
                    </form>
                </div>
            </div>
        </div>
        </div>
    )

}

export default NewProduct