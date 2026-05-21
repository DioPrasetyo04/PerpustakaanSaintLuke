<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AccountApprovedNotification extends Notification
{

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $loginUrl = filament()->getPanel('admin')->getLoginUrl();

        return (new MailMessage)
            ->subject('Akun Anda Telah Disetujui - Perpustakaan Saint Luke')
            ->greeting('Halo ' . $notifiable->name . ',')
            ->line('Selamat! Akun Anda telah disetujui oleh admin.')
            ->line('Anda sekarang dapat masuk ke panel admin dengan email dan password yang sudah Anda daftarkan.')
            ->action('Masuk ke Panel', $loginUrl)
            ->salutation('Terima kasih, Perpustakaan Saint Luke');
    }

    public function toArray(object $notifiable): array
    {
        return [];
    }
}
