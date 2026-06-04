<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Arr;

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

        $variant = [
            'greeting' => Arr::random(['Halo', 'Hai', 'Salam', 'Hello', 'Selamat pagi']),
            'header' => Arr::random([
                '📚 Reminder E-Library Santo Lukas 📚',
                '🔔 Pengingat Peminjaman Buku 🔔',
                '📖 Info Buku Pinjaman Anda 📖',
                '⏰ Notifikasi Pengembalian Buku ⏰',
            ]),
            'warning' => Arr::random([
                '⚠️ Segera kembalikan buku untuk menghindari denda keterlambatan.',
                '⚠️ Mohon dikembalikan tepat waktu agar tidak dikenakan biaya keterlambatan.',
                '⚠️ Jangan sampai terlambat — denda akan dihitung per hari setelah jatuh tempo.',
                '⚠️ Pastikan buku kembali sebelum jatuh tempo untuk menghindari denda.',
            ]),
        ];

        $subject = Arr::random([
            '📚 Reminder Pengembalian Buku 📚',
            '🔔 Pengingat Buku Pinjaman Anda',
            '⏰ Saatnya Kembalikan Buku',
            '📖 Jangan Lupa Kembalikan Buku Anda',
        ]);

        return (new MailMessage)
            ->subject($subject)
            ->markdown('emails.loan.reminder', [
                'loan' => $this->loan,
                'user' => $notifiable,
                'status' => $status,
                'variant' => $variant,
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
