import { Home, Ticket, BookOpen, Palmtree, FileText, Logs, UserPlus } from "lucide-react"
import React from "react"
import NavLink from "./NavLinkmenu"
import { usePage } from '@inertiajs/react';

export default function Menu() {
  const { auth } = usePage().props;
  const role = auth?.user?.role;


  return (

    <nav className="flex flex-col justify-center bg-white h-auto py-5 w-full shadow-md rounded-lg">
        <h1 className="text-2xl   mb-5 font-bold flex items-center justify-between px-6">Menu <Logs /> </h1>
<hr />

      <NavLink href={route('dashboard')} className="flex items-center space-x-3 px-4 " active={route().current('dashboard')}>
                <Home className="w-5 h-5" />
                <span className="text-sm font-medium">Inicio</span>
      </NavLink>
      
      {role === 'admin' && (
      <NavLink href={route('tickets.index')} className="flex items-center space-x-3  px-4 " active={route().current('tickets.index')}>
                <Ticket className="w-5 h-5" />
                <span className="text-sm font-medium">Admin Tickets</span>
                </NavLink>
      )}
 
      {role === 'admin' && (
      <NavLink href={route('crearusuario')} className="flex items-center space-x-3  px-4 " active={route().current('crearusuario')}>
                <UserPlus className="w-5 h-5" />
                <span className="text-sm font-medium">Crear usuario</span>
                </NavLink>
      )}

       {(role === 'user' || role === 'moderator') && (
      <NavLink href={route('tickets.userTickets')} className="flex items-center space-x-3  px-4 " active={route().current('tickets.userTickets')}>
                <Ticket className="w-5 h-5" />
                <span className="text-sm font-medium">Tickets</span>
                </NavLink>
      )}
      
      <NavLink href={route('construccion')} className="flex items-center space-x-3  px-4 " active={route().current('construccion')}>
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-medium">Cursos</span>
      </NavLink>
      
    <NavLink href="http://127.0.0.1:8001/" className="flex items-center space-x-3 px-4">
    <Palmtree className="w-5 h-5" />
    <span className="text-sm font-medium">Vacaciones</span>
</NavLink>

      
      <NavLink href={route('construccion')} className="flex items-center space-x-3 px-4 " active={route().current('construccion')}>
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">Formularios</span>
      </NavLink>
    </nav>
  )
}
