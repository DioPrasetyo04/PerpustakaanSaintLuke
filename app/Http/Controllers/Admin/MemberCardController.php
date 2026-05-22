<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\MemberCardService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class MemberCardController extends Controller
{
    /**
     * Unduh kartu anggota sebagai PDF (untuk dicetak / dilaminating).
     * Hanya pengelola perpustakaan (admin/manager/writer) yang boleh mengunduh.
     */
    public function download(User $user): Response
    {
        $actor = Auth::user();

        abort_unless($actor && $actor->hasAnyRole(['admin', 'manager', 'writer']), 403);

        $pdf = Pdf::loadView('pdf.member-card', MemberCardService::payload($user))
            ->setPaper('a4', 'portrait');

        $filename = 'kartu-anggota-' . ($user->username ?: $user->id) . '.pdf';

        return $pdf->download($filename);
    }
}
