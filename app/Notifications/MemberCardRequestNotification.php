<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Notifikasi ke staf (super_admin/admin/manager) bahwa seorang anggota
 * meminta dibuatkan kartu tanda anggota. Hanya berisi pemberitahuan —
 * pembuatan kartu tetap dilakukan staf via panel admin (UserResource).
 */
class MemberCardRequestNotification extends Notification
{
    use Queueable;

    public function __construct(protected User $requester)
    {
    }

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Permintaan Kartu Anggota Baru — Saint Luke E-Library')
            ->view('emails.member-card.request', [
                'staff' => $notifiable,
                'requester' => $this->requester,
                'requestedAt' => now()->translatedFormat('d F Y, H:i') . ' WIB',
                'panelUrl' => url('/admin/users'),
            ]);
    }
}
