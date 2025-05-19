import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import ModalEdit from "./modals/ModalEdit";
import { useState } from "react";
const Table = ({ cabecera, data, acciones }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState("");
  const [item, setItem] = useState({});
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
    if (!data || data.length === 0) {
        return (
            //no hay datos
            <div className="relative overflow-x-auto sm:rounded-lg justify-center items-center flex flex-col h-screen">
                <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5 0a5.5 5.5 0 1 0 11 0A5.5 5.5 0 0 0 6.5 12z"></path>
                </svg>
                <p className="text-gray-500">No hay datos disponibles</p>
            </div>
        );
    }
    
    return (
    <>
      <ModalEdit isOpen={isOpen} toggle={toggleModal} option={option} item={item} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {cabecera.map((item, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {item}
                </th>
              ))}
              {acciones && (
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {Object.values(item).map((value, idx) => (
                <td key={idx} className="px-6 py-4">
                    {typeof value === 'object' && value !== null
                    ? Object.values(value).join(', ')
                    : value}
                </td>
                ))}

                {acciones && (
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      {acciones.map((accion, idx) => {
                        if (accion.nombre === "Editar") {
                          return (
                            <a
                              className="text-blue-500 hover:opacity-80 cursor-pointer"
                              key={idx}
                              onClick={() => {
                                setOption(accion.option);
                                toggleModal();
                                setItem(item);
                              }}
                            >
                              <PencilSquareIcon className="size-6" />
                            </a>
                          );
                        }
                        if (accion.nombre === "Eliminar") {
                          return (
                            <a
                              className="text-red-500 hover:opacity-80 cursor-pointer"
                              key={idx}
                              onClick={() => {
                                setOption(accion.option);
                                toggleModal();
                                setItem(item);
                              }}
                            >
                              <TrashIcon className="size-6" />
                            </a>
                          );
                        }
                      })}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
