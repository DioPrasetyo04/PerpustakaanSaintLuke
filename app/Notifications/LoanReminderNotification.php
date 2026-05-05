<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LoanReminderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $tries = 3;
    public $timeout = 120;
    protected $loan;
    protected $diff;

    /**
     * Create a new notification instance.
     */
    public function __construct($loan, $diff)
    {
        $this->loan = $loan;
        $this->diff = $diff;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $status = match ($this->diff) {
            3 => '3 Hari Lagi',
            1 => '1 Hari Lagi',
            0 => 'Hari Ini'
        };

        return (new MailMessage)
            ->subject('📚 Reminder Pengembalian Buku 📚')
            ->markdown('emails.loan.reminder', [
                'loan' => $this->loan,
                'user' => $notifiable,
                'status' => $status,
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
