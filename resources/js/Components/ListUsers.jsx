import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import axios from "axios";
import { Link } from '@inertiajs/react';

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
          {users.map((user) => (
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
    </nav>
  );
}
