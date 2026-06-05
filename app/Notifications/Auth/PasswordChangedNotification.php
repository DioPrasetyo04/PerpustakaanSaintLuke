<?php

namespace App\Notifications\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordChangedNotification extends Notification
{
    use Queueable;

    /**
     * Saluran pengiriman notifikasi.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Representasi email — konfirmasi password berhasil diubah.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Password Berhasil Diubah — Saint Luke E-Library')
            ->view('emails.auth.password-changed', [
                'user' => $notifiable,
                'changedAt' => now()->translatedFormat('d F Y, H:i') . ' WIB',
                'loginUrl' => route('login'),
            ]);
    }
}
