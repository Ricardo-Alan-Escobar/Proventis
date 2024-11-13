import React from "react";

function Card({TicketsIndex, totalTickets, openTickets, inProgressTickets, closedTickets }) {

    const tTickets= (totalTickets/365)*100;
    const ttTickets = tTickets.toFixed(1);

    const porcentajeAbiertos = (openTickets / totalTickets)*100;
    const tAbiertos= porcentajeAbiertos.toFixed(1);

    const pSeguimiento= (inProgressTickets / totalTickets)*100;
    const tSeguimiento= pSeguimiento.toFixed(1);

    const pCerrados = (closedTickets / totalTickets)*100;
    const tCerrados = pCerrados.toFixed(1);

    return (
        <>
            <div className="flex w-full mb-3">

                <div className="block bg-white w-1/4 h-auto mr-4 p-5 rounded-lg border-2 drop-shadow-lg border-slate-200">
                    <div className="mb-2 text-lg text-slate-500">Total de Tickets</div>
                    <div className="text-5xl mb-8"><b>{totalTickets}</b></div>
                    <div className="text-slate-500">+{ttTickets}% el último año</div>
                </div>

                <div className="block bg-white w-1/4 h-auto mr-4 p-5 rounded-lg border-2 drop-shadow-lg border-slate-200">
                    <div className="mb-2 text-lg text-slate-500">Tickets Abiertos</div>
                    <div className="text-5xl mb-8"><b>{openTickets}</b></div>
                    <div className="text-slate-500">+{tAbiertos}% del total de tickets</div>
                </div>

                <div className="block bg-white w-1/4 h-auto mr-4 p-5 rounded-lg border-2 drop-shadow-lg border-slate-200">
                    <div className="mb-2 text-lg text-slate-500">En Seguimiento</div>
                    <div className="text-5xl mb-8"><b>{inProgressTickets}</b></div>
                    <div className="text-slate-500">+{tSeguimiento}% del total de tickets</div>
                </div>

                <div className="block bg-white w-1/4 h-auto p-5 rounded-lg border-2 drop-shadow-lg border-slate-200">
                    <div className="mb-2 text-lg text-slate-500">Tickets Cerrados</div>
                    <div className="text-5xl mb-8"><b>{closedTickets}</b></div>
                    <div className="text-slate-500">+{tCerrados}% el del total de tickets</div>
                </div>
               
            </div>

            
        </>
    );
}

export default Card;