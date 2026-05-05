<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class WhatsAppService
{
    public function sendReminder($phone, $loan, $diff)
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

        $loanDate = Carbon::parse($loan->loan_date)->format('d M Y');
        $dueDate = Carbon::parse($loan->due_date)->format('d M Y');

        $cover = $loan->book->cover ? config('app.url') . '/srorage/' . $loan->book->cover : null;

        $message = $this->formatMessage(
            $loan,
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

    private function formatMessage($loan, $loanDate, $dueDate, $status, $statusIcon)
    {
        return "📚 *Reminder E-Library Santo Lukas 📚*\n\n"
            . "Halo {$loan->user->name} 👋\n\n"
            . "📖 Book Title: *{$loan->book->title}*\n\n"
            . "📅 Tanggal Pinjam: *{$loanDate}*\n"
            . "📅 Jatuh Tempo: *{$dueDate}*\n\n"
            . "⏰ {$statusIcon} *Sisa Waktu: {$status}*\n\n"
            . "*⚠️ Peringatan Segera kembalikan buku yang anda pinjam untuk menghindari denda*\n\n"
            . "🔗 Link URL Website: " . config('app.url') . "/assets/book/{$loan->book->slug}";
    }
}
