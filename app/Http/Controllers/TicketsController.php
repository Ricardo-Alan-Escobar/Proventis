<?php

namespace App\Http\Controllers;

use App\Models\Tickets;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class TicketsController extends Controller
{
    
    public function index(){
        $tickets = Tickets::all();
        
        return Inertia::render('Tickets/Index',['tickets'=>$tickets]);
        }
        
        public function store(Request $request){
            $request->validate([
                'Nombre' => 'required|string|max:60',
                'Departamento' => 'required|string|max:50',
                'Problema' => 'required|string|max:150',
                'Prioridad' => 'required|string|max:20',
                'Estado' => 'required|string|max:20',
                'Creacion' => 'required|max:20',
                'Termino' => 'nullable|max:20'
            ]);
        
        
            $ticket = new Tickets($request->all());
            $ticket->user_id = auth()->id();  
            $ticket->save();
        
           return back()->with('success', 'Ticket creado exitosamente');
        }
       
        public function update(Request $request, Tickets $tickets, $id){
        $ticket = Tickets::find($id);
        $ticket ->fill($request->input())->saveOrFail();
        return redirect('tickets');
        }
        public function destroy($id){
            $ticket = Tickets::find($id);
            $ticket->delete();
            return redirect('tickets');
        }
        
        public function userTickets()
        {
            $userTickets = Tickets::where('user_id', auth()->id())->get();
        
            return Inertia::render('Tickets/UsuarioTickets', [
                'userTickets' => $userTickets,
                'user' => auth()->user(), 
            ]);
        }
        

        
}
