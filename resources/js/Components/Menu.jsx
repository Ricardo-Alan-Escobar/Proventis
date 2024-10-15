import { Home, Ticket, BookOpen, Palmtree, FileText } from "lucide-react"
import React from "react"

export default function Menu() {
  return (

    <nav className="flex flex-col justify-center bg-white h-[270px] w-full shadow-md rounded-lg">
        <h1 className="text-2xl ml-4 mb-5 font-bold">Menu</h1>
      <a href="#" className="flex items-center space-x-3 py-2 px-4 bg-blue-100 text-green-600">
        <Home className="w-5 h-5" />
        <span className="text-sm font-medium">Inicio</span>
      </a>
      
      <a href="#" className="flex items-center space-x-3 py-2 px-4 text-gray-600 hover:bg-gray-200">
        <Ticket className="w-5 h-5" />
        <span className="text-sm font-medium">Tickets</span>
      </a>
      
      <a href="#" className="flex items-center space-x-3 py-2 px-4 text-gray-600 hover:bg-gray-200">
        <BookOpen className="w-5 h-5" />
        <span className="text-sm font-medium">Cursos</span>
      </a>
      
      <a href="#" className="flex items-center space-x-3 py-2 px-4 text-gray-600 hover:bg-gray-200">
        <Palmtree className="w-5 h-5" />
        <span className="text-sm font-medium">Vacaciones</span>
      </a>
      
      <a href="#" className="flex items-center space-x-3 py-2 px-4 text-gray-600 hover:bg-gray-200">
        <FileText className="w-5 h-5" />
        <span className="text-sm font-medium">Formularios</span>
      </a>
    </nav>
  )
}
