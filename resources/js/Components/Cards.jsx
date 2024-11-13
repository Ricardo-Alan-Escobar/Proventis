import React from "react";
import TicketsIndex from "@/Pages/Tickets/Index";

function Card({TicketsIndex, totalTickets, openTickets, inProgressTickets, closedTickets }) {
    return (
        <>
            <div className="flex w-full mb-3">

                <div className="block bg-white w-1/4 h-auto mr-4 p-5 rounded-lg border-2 drop-shadow-lg border-slate-200">
                    <div className="mb-2 text-lg text-slate-500">Total de Tickets</div>
                    <div className="text-5xl mb-8"><b>{totalTickets}</b></div>
                    <div className="text-slate-500">+1% el último mes</div>
                </div>

                <div className="block bg-white w-1/4 h-auto mr-4 p-5 rounded-lg border-2 drop-shadow-lg border-slate-200">
                    <div className="mb-2 text-lg text-slate-500">Tickets Abiertos</div>
                    <div className="text-5xl mb-8"><b>{openTickets}</b></div>
                    <div className="text-slate-500">+1% el último mes</div>
                </div>

                <div className="block bg-white w-1/4 h-auto mr-4 p-5 rounded-lg border-2 drop-shadow-lg border-slate-200">
                    <div className="mb-2 text-lg text-slate-500">En Seguimiento</div>
                    <div className="text-5xl mb-8"><b>{inProgressTickets}</b></div>
                    <div className="text-slate-500">+11% el último mes</div>
                </div>

                <div className="block bg-white w-1/4 h-auto p-5 rounded-lg border-2 drop-shadow-lg border-slate-200">
                    <div className="mb-2 text-lg text-slate-500">Tickets Cerrados</div>
                    <div className="text-5xl mb-8"><b>{closedTickets}</b></div>
                    <div className="text-slate-500">+20% el último mes</div>
                </div>
               
            </div>

            
        </>
    );
}

export default Card;