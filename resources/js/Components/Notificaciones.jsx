import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Notificaciones() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get("/api/notifications").then((response) => {
      setNotifications(response.data);
    });
  }, []);

  return (
    <nav className="flex flex-col   bg-white px-5 h-auto w-full shadow-md rounded-lg">
      <div className="flex justify-between mt-8 mb-3 mx-5 ">
        <h1 className="text-2xl font-bold flex">Notificaciones</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-bell"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      </div>
      <hr />
      <div className="w-full flex flex-col items-center my-5">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-gray-100 p-3 mb-2 rounded-md shadow-md w-full"
            >
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
          ))
        ) : (
          <p className="text-gray-400">Sin notificaciones</p>
        )}
      </div>
    </nav>
  );
}
