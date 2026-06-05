<?php

namespace App\Notifications\Auth;

use Illuminate\Auth\Notifications\ResetPassword as BaseResetPassword;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Config;

class ResetPasswordNotification extends BaseResetPassword
{
    /**
     * Bangun representasi email menggunakan template branded Saint Luke.
     */
    public function toMail($notifiable): MailMessage
    {
        $url = route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ]);

        $count = Config::get('auth.passwords.' . Config::get('auth.defaults.passwords') . '.expire', 60);

        return (new MailMessage)
            ->subject('Atur Ulang Password — Saint Luke E-Library')
            ->view('emails.auth.reset-password', [
                'url' => $url,
                'user' => $notifiable,
                'count' => $count,
            ]);
    }
}
