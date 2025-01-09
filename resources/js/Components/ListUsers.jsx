import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import axios from "axios";
import { Link } from '@inertiajs/react';
import ReactPaginate from 'react-paginate';
import { ArrowLeft , ArrowRight  } from 'lucide-react';


export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Estado para la página actual
  const usersPerPage = 5; // Número de usuarios por página

  useEffect(() => {
    axios
      .get("/usuarios")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
        setLoading(false);
      });
  }, []);

  // Calculamos el índice de los usuarios para la página actual
  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Función para manejar el cambio de página
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <nav className="flex flex-col justify-center px-5 mt-10 bg-white h-auto p-2 w-full shadow-md rounded-lg">
      <div className="flex justify-between my-3 mx-5">
        <h1 className="text-2xl font-bold flex">Usuarios </h1>
        <Users />
      </div>
      <hr />
      <div className="w-full flex h-2/3 justify-center items-center my-2">
        {loading ? (
          <p className="text-gray-400">Cargando usuarios...</p>
        ) : users.length > 0 ? (
          <ul className="w-full">
            {currentUsers.map((user) => (
              <li key={user.id} className="p-2 flex justify-between items-center">
                <Link 
                  href={route('usuario', { id: user.id })} 
                  className="text-gray-900 hover:text-gray-700 flex items-center"
                >
                  <strong className="text-gray-600 bg-green-50 rounded-xl p-1 px-2 hover:bg-green-500 hover:text-white">
                    {user.name}
                  </strong>
                </Link>
                <p className="text-gray-400">({user.email})</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Sin usuarios aún</p>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-5 space-x-2">
  <ReactPaginate
    previousLabel={<ArrowLeft  className="text-gray-600 hover:bg-slate-300 rounded-full" />}  
    nextLabel={<ArrowRight  className="text-gray-600 hover:bg-slate-300 rounded-full" />}  
    breakLabel={<span className="text-gray-600">...</span>}  
    pageCount={Math.ceil(users.length / usersPerPage)} 
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={handlePageChange}
    containerClassName="flex items-center space-x-2"  
    activeClassName="bg-green-500 text-white rounded-full"  
    pageClassName="px-3 py-1 text-gray-600 rounded-full hover:bg-gray-200"  // Estilo de cada número de página
    disabledClassName="text-gray-300 cursor-not-allowed"  // Desactivar botones si es necesario
  />
</div>


    </nav>
  );
}
