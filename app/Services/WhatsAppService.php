<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class WhatsAppService
{
    public function sendReminder($phone, $loanDetail, $diff)
    {
        // =====================
        // STATUS + ICON
        // =====================
        $statusData = match ($diff) {
            3 => ['text' => '3 Hari Lagi', 'icon' => '🟢'],
            1 => ['text' => '1 Hari Lagi', 'icon' => '🟡'],
            0 => ['text' => 'Hari Ini', 'icon' => '🔴'],
            default => ['text' => '', 'icon' => '⚪'],
        };

        $status = $statusData['text'];
        $statusIcon = $statusData['icon'];

        $loanDate = Carbon::parse($loanDetail->loan_date)->format('d M Y');
        $dueDate = Carbon::parse($loanDetail->due_date)->format('d M Y');

        $book = $loanDetail->book;
        $user = $loanDetail->loan?->user;

        $cover = $book?->cover ? config('app.url') . '/storage/' . $book->cover : null;

        $message = $this->formatMessage(
            $user,
            $book,
            $loanDate,
            $dueDate,
            $status,
            $statusIcon
        );

        Http::withHeaders([
            'Authorization' => env('FONNTE_TOKEN'),
        ])->post('https://api.fonnte.com/send', [
            'url' => $cover,
            'target' => $phone,
            'caption' => $message,
        ]);
    }

    private function formatMessage($user, $book, $loanDate, $dueDate, $status, $statusIcon)
    {
        $userName = $user?->name ?? 'Peminjam';
        $bookTitle = $book?->title ?? '-';
        $bookSlug = $book?->slug ?? '';

        return "📚 *Reminder E-Library Santo Lukas 📚*\n\n"
            . "Halo {$userName} 👋\n\n"
            . "📖 Book Title: *{$bookTitle}*\n\n"
            . "📅 Tanggal Pinjam: *{$loanDate}*\n"
            . "📅 Jatuh Tempo: *{$dueDate}*\n\n"
            . "⏰ {$statusIcon} *Sisa Waktu: {$status}*\n\n"
            . "*⚠️ Peringatan Segera kembalikan buku yang anda pinjam untuk menghindari denda*\n\n"
            . "🔗 Link URL Website: " . config('app.url') . "/assets/book/{$bookSlug}";
    }
}
