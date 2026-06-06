<?php

namespace App\Http\Controllers\Settings;

use App\Exceptions\BusinessException;
use App\Http\Controllers\Controller;
use App\Services\MemberCardRequestService;
use App\Services\MemberCardService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class MemberCardController extends Controller
{
    public function __construct(protected MemberCardRequestService $memberCardRequest)
    {
    }

    /**
     * Unduh kartu anggota milik user yang sedang login sebagai PDF.
     */
    public function download(): Response
    {
        $user = Auth::user();

        abort_unless($user && $user->hasMemberCard(), 404);

        $pdf = Pdf::loadView('pdf.member-card', MemberCardService::payload($user))
            ->setPaper('a4', 'portrait');

        $filename = 'kartu-anggota-' . ($user->username ?: $user->id) . '.pdf';

        return $pdf->download($filename);
    }

    /**
     * Kirim notifikasi ke staf bahwa user meminta dibuatkan kartu anggota.
     */
    public function request(): RedirectResponse
    {
        try {
            $this->memberCardRequest->requestForCurrentUser();
        } catch (BusinessException $e) {
            return back()->withErrors([
                'member_card' => $this->translateError($e->getMessage()),
            ]);
        }

        return back()->with('status', 'member_card.request_sent');
    }

    private function translateError(string $key): string
    {
        return match ($key) {
            'member_card.already_issued' => 'Anda sudah memiliki kartu anggota.',
            'member_card.request_throttled' => 'Permintaan sudah dikirim. Mohon tunggu beberapa saat sebelum mengirim lagi.',
            'member_card.no_staff' => 'Belum ada petugas yang dapat menerima permintaan. Silakan hubungi perpustakaan.',
            default => 'Gagal mengirim permintaan kartu. Silakan coba lagi.',
        };
    }
}
