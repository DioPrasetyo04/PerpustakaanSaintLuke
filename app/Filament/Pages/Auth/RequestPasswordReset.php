<?php

namespace App\Filament\Pages\Auth;

use Filament\Auth\Pages\PasswordReset\RequestPasswordReset as BaseRequestPasswordReset;
use Illuminate\Contracts\Support\Htmlable;

class RequestPasswordReset extends BaseRequestPasswordReset
{
    /**
     * Hilangkan tautan "back to login" yang tampil di tengah (bawah judul).
     * Tautan dipindah ke pojok kiri atas kartu via render hook
     * `panels::simple-page.start` (lihat AdminPanelProvider).
     */
    public function getSubheading(): string | Htmlable | null
    {
        return null;
    }
}
