<?php

namespace App\Notifications\Admin;

use Illuminate\Auth\Notifications\ResetPassword as BaseResetPassword;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Config;

/**
 * Versi SINKRON (tidak di-queue) dari notifikasi reset password panel admin.
 *
 * `Filament\Auth\Notifications\ResetPassword` bawaan mengimplementasikan
 * ShouldQueue, sehingga emailnya hanya masuk ke tabel `jobs` dan tidak pernah
 * terkirim selama tidak ada `php artisan queue:work` berjalan (QUEUE_CONNECTION
 * = database). Kelas ini di-bind menggantikannya (lihat AppServiceProvider)
 * agar email reset dikirim langsung + memakai template branded Saint Luke.
 */
class FilamentResetPasswordNotification extends BaseResetPassword
{
    /** URL reset diisi oleh Filament (RequestPasswordReset) setelah instansiasi. */
    public string $url;

    public function toMail($notifiable): MailMessage
    {
        $count = Config::get('auth.passwords.' . Config::get('auth.defaults.passwords') . '.expire', 60);

        return (new MailMessage)
            ->subject('Atur Ulang Password — Saint Luke E-Library')
            ->view('emails.auth.reset-password', [
                'url' => $this->url,
                'user' => $notifiable,
                'count' => $count,
            ]);
    }
}
