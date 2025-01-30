import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell, X } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Notificaciones() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get("/api/notifications").then((response) => {
      setNotifications(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/api/notifications/${id}`)
      .then(() => {
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar la notificación:", error);
      });
  };

  return (
    <nav className="flex flex-col bg-white px-5 h-[26rem] w-full shadow-md rounded-lg">
      <div className="flex justify-between mt-8 mb-3 mx-5">
        <h1 className="text-2xl font-bold flex">Notificaciones</h1>
        <Bell />
      </div>
      <hr />

      <div className="w-full flex flex-col items-center my-5 overflow-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="w-full flex items-center justify-between cursor-pointer bg-blue-50 p-3 mb-3 rounded-md shadow-sm hover:bg-blue-100"
            >
            
                <div>
                  {notification.data.accion && notification.data.nombre ? (
                   <Link href={route("tickets.userTickets")} className="w-full">
                    <>
                      <p className="text-gray-700">
                        Tu ticket ha sido{" "}
                        <strong>{notification.data.accion}</strong>.
                      </p>
                      <p className="text-gray-500 text-sm">
                        Departamento: {notification.data.departamento}
                      </p>
                    </></Link>
                  ) : (
                    <Link href={route("tickets.index")} className="w-full">
                    <>
                    <div className="w-full">
                      <p className="text-gray-700">
                        Nuevo ticket creado: <strong>{notification.data.nombre}</strong>
                      </p>
                      <p className="text-gray-500 text-sm">
                        Departamento: {notification.data.departamento}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Prioridad: {notification.data.prioridad}
                      </p>
                      </div>
                    </>
                    </Link>
                  )}
                </div>
              
              <button
                onClick={() => handleDelete(notification.id)}
                className=" mb-10 text-red-500 hover:bg-red-600 hover:text-white rounded-full p-1"
              >
                <X size={15} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 mt-28">Sin notificaciones</p>
        )}
      </div>
    </nav>
  );
}
