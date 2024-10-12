import { Home, Ticket, BookOpen, Palmtree, FileText } from "lucide-react"
import React from "react"

export default function Notificaciones() {
  return (

    <nav className="flex flex-col justify-center bg-white h-[270px] w-72 shadow-md rounded-lg">
        <div className="flex justify-between my-3 mx-5">
        <h1 className="text-2xl  font-bold flex">Notificaciones </h1><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </div>
      <div className="w-full flex h-2/3 justify-center items-center">
         <p className=" text-gray-400">Sin notificaciones</p>
      </div>
    </nav>
  )
}
