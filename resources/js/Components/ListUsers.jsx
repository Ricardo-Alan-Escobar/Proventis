import React from "react"
import { Users } from "lucide-react"


export default function ListUsers() {
  return (

    <nav className="flex flex-col justify-center px-5 mt-10 bg-white h-[270px] w-full shadow-md rounded-lg">
        <div className="flex justify-between my-3 mx-5">
        <h1 className="text-2xl  font-bold flex">Usuarios </h1><Users />
        
        </div>
      <hr />
      

      <div className="w-full flex h-2/3 justify-center items-center">
         <p className=" text-gray-400">sin usuarios aun</p>
         
      </div>
    </nav>
  )
}
