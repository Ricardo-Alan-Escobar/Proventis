<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class TicketCreatedNotification extends Notification
{
    use Queueable;

    public $ticket;

    /**
     * Crear una nueva instancia de notificación.
     *
     * @param mixed $ticket
     */
    public function __construct($ticket)
    {
        $this->ticket = $ticket;
    }

    /**
     * Obtener los canales de entrega de la notificación.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        // Solo enviar por correo si el usuario es administrador
        if ($notifiable->role === 'admin') {
            return ['database', 'mail'];
        }

        return ['database'];
    }

    /**
     * Obtener la representación en correo de la notificación.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Nuevo Ticket Creado')
            ->greeting('Hola ' . $notifiable->name . ',')
            ->line('Se ha creado un nuevo ticket con la siguiente información:')
            ->line('**ID del Ticket:** ' . $this->ticket->id)
            ->line('**Nombre:** ' . $this->ticket->Nombre)
            ->line('**Departamento:** ' . $this->ticket->Departamento)
            ->line('**Prioridad:** ' . $this->ticket->Prioridad)
            ->line('**Creado por:** ' . $this->ticket->user->name)
            ->action('Ver Ticket', url('/tickets/' . $this->ticket->id))
            ->line('Gracias por usar nuestro sistema.');
    }

    /**
     * Obtener la representación de la notificación en formato de array.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'ticket_id' => $this->ticket->id,
            'nombre' => $this->ticket->Nombre,
            'departamento' => $this->ticket->Departamento,
            'prioridad' => $this->ticket->Prioridad,
            'creado_por' => $this->ticket->user->name,
        ];
    }
}
