<?php

namespace App\Notifications\Auth;

use Illuminate\Auth\Notifications\VerifyEmail as BaseVerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmailNotification extends BaseVerifyEmail
{
    /**
     * Bangun representasi email menggunakan template branded Saint Luke.
     *
     * Memanfaatkan verificationUrl() bawaan (URL bertanda tangan & kedaluwarsa).
     */
    public function toMail($notifiable): MailMessage
    {
        $url = $this->verificationUrl($notifiable);

        return (new MailMessage)
            ->subject('Verifikasi Email Anda — Saint Luke E-Library')
            ->view('emails.auth.verify-email', [
                'url' => $url,
                'user' => $notifiable,
            ]);
    }
}
