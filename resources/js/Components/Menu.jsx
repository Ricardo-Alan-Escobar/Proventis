import { Home, Ticket, BookOpen, Palmtree, FileText } from "lucide-react"
import React from "react"
import NavLink from "./NavLink"

export default function Menu() {
  return (

    <nav className="flex flex-col justify-center bg-white h-auto py-5 w-full shadow-md rounded-lg">
        <h1 className="text-2xl ml-6  mb-5 font-bold">Menu</h1>

      <NavLink href={route('dashboard')} className="flex items-center space-x-3 py-2 px-4 " active={route().current('dashboard')}>
                <Home className="w-5 h-5" />
                <span className="text-sm font-medium">Inicio</span>
      </NavLink>
      
      <NavLink href={route('tickets.index')} className="flex items-center space-x-3 py-2 px-4 " active={route().current('tickets.index')}>
                <Ticket className="w-5 h-5" />
                <span className="text-sm font-medium">Tickets</span>
                </NavLink>
      
      <NavLink href={route('tickets.index')} className="flex items-center space-x-3 py-2 px-4 " active={route().current('tickets.index')}>
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-medium">Cursos</span>
      </NavLink>
      
      <NavLink href={route('tickets.index')} className="flex items-center space-x-3 py-2 px-4 " active={route().current('tickets.index')}>
                <Palmtree className="w-5 h-5" />
                <span className="text-sm font-medium">Vacaciones</span>
      </NavLink>
      
      <NavLink href={route('tickets.index')} className="flex items-center space-x-3 py-2 px-4 " active={route().current('tickets.index')}>
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">Formularios</span>
      </NavLink>
    </nav>
  )
}
