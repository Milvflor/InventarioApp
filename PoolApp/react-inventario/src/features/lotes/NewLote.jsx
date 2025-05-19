import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLote } from '../../services/lotesServices';
import { getAllProducts } from '../../services/productServices';

const NewLote = (
    {title= 'Nuevo Lote',
    item = null,
    }
) => {

    const [error, setError] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState('');
    const [loading, setLoading] = useState(false);
    const [productos, setProductos] = useState([]);
    const [idProducto, setIdProducto] = useState('');
    const [precio, setPrecio] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (item && Object.keys(item).length > 0) {
            setCantidad(item.cantidad);
            setFecha(formatDate(item.fechaIngreso));
            setIdProducto(item.id_producto);
            setPrecio(item.precio);
        }
    }, [item]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toISOString().split('T')[0];
    };

    const handleSubmit = async (e) => {
        setError('');
        setLoading(true);
        e.preventDefault();
        try {
            const response = await createLote({ 
                id_producto: idProducto,
                fecha_ingreso: fecha,
                cantidad: cantidad,
                precio: precio
             });
            if (response.error) {
                setError(response.error.message);
                setLoading(false);
                return;
            }else{
                setLoading(false);
                navigate('/lotes');
            }
        } catch (err) {
            console.log(err)
            setError('Error al crear el lote. Inténtalo de nuevo.');
            setLoading(false);
        }
    }

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
            setIdProducto(data[0].id);

        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="p-4">
        <div className='w-full h-screen bg-gray-100 justify-items-center'>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {title}
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          
                            <div>
                                <label for="producto" class="block mb-2 w-fit text-sm font-medium text-gray-900 dark:text-white">Producto</label>
                                <select 
                                onChange={(e) => {
                                        const selectedProduct = productos.find(producto => producto.id == e.target.value);
                                        setIdProducto(selectedProduct.id);
                                    }
                                }
                                name="producto" id="producto" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {productos.map((producto) => (
                                        <option key={producto.id} value={producto.id}>{producto.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label for="fecha" class="block mb-2 w-fit text-sm font-medium text-gray-900 dark:text-white">Fecha de Ingreso</label>
                                <input type="date" name="fecha" id="fecha" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" 
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                />
                            </div>

                            <div>
                                <label for="cantidad" class="block mb-2 w-fit text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
                                <input type="number" name="cantidad" id="cantidad" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cantidad del lote" required="" 
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                                />
                            </div>

                            <div>
                                <label for="precio" class="block mb-2 w-fit text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                                <input type="number" name="precio" id="precio" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Precio del lote" required="" 
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" class="max-w-sm text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={handleSubmit}
                        disabled={loading}
                        >
                            {loading ? 
                            title === 'Nuevo Lote' ?
                            'Creando Lote...' :
                            'Actualizando Lote...' : 
                            title === 'Nuevo Lote' ?
                            'Crear Lote' :
                            'Actualizar Lote'}
                            
                        </button>
                        
                    </form>
                </div>
            </div>
        </div>
        </div>
    )

}

export default NewLote