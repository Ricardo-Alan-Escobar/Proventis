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
     */
    public function __construct($ticket, $action)
    {
        $this->ticket = $ticket;
        $this->action = $action;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via($notifiable)
    {
        return ['database', 'mail']; 
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Actualización de Ticket')
            ->greeting('Hola ' . $notifiable->name . ',')
            ->line('Tu ticket ha sido actualizado.')
            ->line('**Acción:** ' . $this->action)
            ->line('**ID del Ticket:** ' . $this->ticket->id)
            ->line('**Problema:** ' . $this->ticket->Problema)
            ->line('**Departamento:** ' . $this->ticket->Departamento)
            ->action('Ver Ticket', url('/tickets/' . $this->ticket->id))
            ->line('Gracias por usar nuestro sistema.');
    }

    /**
     * Get the array representation of the notification.
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
