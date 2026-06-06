<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class AdminApprovalRequestNotification extends Notification
{

    public function __construct(public User $pendingUser) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $approveUrl = URL::temporarySignedRoute(
            'admin.users.approve',
            now()->addDays(7),
            ['user' => $this->pendingUser->id]
        );

        $rejectUrl = URL::temporarySignedRoute(
            'admin.users.reject',
            now()->addDays(7),
            ['user' => $this->pendingUser->id]
        );

        $roleLabel = $this->pendingUser->getRoleNames()->first() ?? '-';

        return (new MailMessage)
            ->subject('Permintaan Verifikasi Akun Baru - Perpustakaan Saint Luke')
            ->view('emails.admin.approval-request', [
                'staff' => $notifiable,
                'pendingUser' => $this->pendingUser,
                'roleLabel' => $roleLabel,
                'approveUrl' => $approveUrl,
                'rejectUrl' => $rejectUrl,
            ]);
    }

    public function toArray(object $notifiable): array
    {
        return [
            'user_id' => $this->pendingUser->id,
            'name' => $this->pendingUser->name,
            'email' => $this->pendingUser->email,
        ];
    }
}
