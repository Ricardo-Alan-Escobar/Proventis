<?php

namespace App\Http\Controllers;

use App\Models\Tickets;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Notifications\TicketCreatedNotification;
use App\Notifications\TicketUpdatedNotification;
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
                'Termino' => 'nullable|max:20',
                'TemasAyuda' => 'nullable|string|max:100',
                'Asignado' => 'nullable|string|max:100',  
            ]);
        
        
            $ticket = new Tickets($request->all());
            $ticket->user_id = auth()->id();  
            $ticket->save();

            $admins = User::where('role', 'admin')->get();

            foreach ($admins as $admin) {
                $admin->notify(new TicketCreatedNotification($ticket));
            }
        
           return back()->with('success', 'Ticket creado exitosamente');
        }
       
        public function update(Request $request, Tickets $tickets, $id)
        {
            $ticket = Tickets::find($id);
            $ticket->fill($request->input())->saveOrFail();
        
            $ticketOwner = User::find($ticket->user_id);
            if ($ticketOwner) {
                $ticketOwner->notify(new TicketUpdatedNotification($ticket, 'Asignado'));
            }
        
            return redirect('tickets')->with('success', 'Ticket actualizado correctamente');
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

        public function close($id)
        {
            $ticket = Tickets::findOrFail($id);
            $ticket->Estado = 'Cerrado';
            $ticket->save();
        
          
            $ticketOwner = User::find($ticket->user_id);
            if ($ticketOwner) {
                $ticketOwner->notify(new TicketUpdatedNotification($ticket, 'Cerrado'));
            }
        
            return redirect()->route('tickets.index')->with('success', 'Ticket cerrado correctamente');
        }
        

            public function getNotifications()
            {
                $notifications = Auth::user()->unreadNotifications;
                return response()->json($notifications);
            }

        
}
