<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class TicketUpdatedNotification extends Notification
{
    use Queueable;

    public $ticket;
    public $action;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($ticket, $action)
    {
        $this->ticket = $ticket;
        $this->action = $action; 
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database']; // Puedes agregar 'mail' si necesitas notificación por correo.
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'ticket_id' => $this->ticket->id,
            'nombre' => $this->ticket->Nombre,
            'problema' => $this->ticket->Problema,
            'departamento' => $this->ticket->Departamento,
            'accion' => $this->action,
        ];
    }
}
