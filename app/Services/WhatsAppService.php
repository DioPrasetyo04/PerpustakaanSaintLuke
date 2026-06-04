<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    public function sendReminder($phone, $loanDetail, $diff)
    {
        $token = env('FONNTE_TOKEN');
        if (empty($token)) {
            Log::error('[Fonte] FONNTE_TOKEN tidak diset di .env');
            return null;
        }
        if (empty($phone)) {
            Log::warning('[Fonte] Skip kirim WA: nomor phone user kosong', [
                'loan_detail_id' => $loanDetail->id ?? null,
            ]);
            return null;
        }

        $statusData = $this->pickStatus($diff);
        $variant = $this->pickVariant();

        $loanDate = Carbon::parse($loanDetail->loan_date)->format('d M Y');
        $dueDate = Carbon::parse($loanDetail->due_date)->format('d M Y');

        $book = $loanDetail->book;
        $user = $loanDetail->loan?->user;

        // Fonte server cloud tidak bisa fetch dari URL localhost. Skip cover jika APP_URL local.
        $appUrl = (string) config('app.url');
        $isLocalUrl = (bool) preg_match('~^https?://(127\.0\.0\.1|localhost|0\.0\.0\.0|\[::1\])~i', $appUrl);
        $cover = (! $isLocalUrl && $book?->cover)
            ? rtrim($appUrl, '/') . '/storage/' . $book->cover
            : null;

        if ($isLocalUrl && $book?->cover) {
            Log::info('[Fonte] APP_URL local — skip cover (Fonte tidak bisa fetch localhost). Pakai ngrok atau public URL untuk testing cover.');
        }

        $message = $this->formatMessage(
            $user,
            $book,
            $loanDate,
            $dueDate,
            $statusData['text'],
            $statusData['icon'],
            $variant,
        );

        try {
            $payload = [
                'target' => $phone,
                'message' => $message,
            ];
            if (! empty($cover)) {
                $payload['url'] = $cover;
            }

            $response = Http::withHeaders([
                'Authorization' => $token,
            ])->asForm()->post('https://api.fonnte.com/send', $payload);

            Log::info('[Fonte] Response', [
                'phone' => $phone,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return $response;
        } catch (\Throwable $e) {
            Log::error('[Fonte] Exception saat kirim WA', [
                'phone' => $phone,
                'message' => $e->getMessage(),
            ]);
            return null;
        }
    }

    private function pickStatus(int $diff): array
    {
        $icons = match ($diff) {
            3 => ['🟢', '🟩', '✅', '💚', '🌿'],
            1 => ['🟡', '🟨', '⚠️', '💛', '🌼'],
            0 => ['🔴', '🟥', '❗', '❤️', '🔥'],
            default => ['⚪', '⬜', '🔘', '🤍', '⭕'],
        };

        $text = match ($diff) {
            3 => '3 Hari Lagi',
            1 => '1 Hari Lagi',
            0 => 'Hari Ini',
            default => '',
        };

        return ['text' => $text, 'icon' => Arr::random($icons)];
    }

    private function pickVariant(): array
    {
        return [
            'greeting' => Arr::random(['Halo', 'Hai', 'Salam', 'Hello', 'Selamat pagi']),
            'header' => Arr::random([
                '📚 *Reminder E-Library Santo Lukas* 📚',
                '🔔 *Pengingat Peminjaman Buku* 🔔',
                '📖 *Info Buku Pinjaman* 📖',
                '⏰ *Notifikasi Pengembalian* ⏰',
            ]),
            'warning' => Arr::random([
                '⚠️ Segera kembalikan buku yang Anda pinjam untuk menghindari denda keterlambatan.',
                '⚠️ Mohon dikembalikan tepat waktu agar tidak dikenakan biaya keterlambatan.',
                '⚠️ Jangan sampai terlambat — denda akan dihitung per hari setelah jatuh tempo.',
                '⚠️ Pastikan buku kembali sebelum jatuh tempo untuk menghindari denda.',
            ]),
        ];
    }

    private function formatMessage($user, $book, $loanDate, $dueDate, $status, $statusIcon, array $variant)
    {
        $userName = $user?->name ?? 'Peminjam';
        $bookTitle = $book?->title ?? '-';
        $bookSlug = $book?->slug ?? '';
        $isbn = $book?->isbn ?? '-';
        $classification = $book?->classification_number ?? '-';
        $year = $book?->publication_year ?? '-';
        $pages = $book?->number_of_pages ?? '-';
        $location = $book?->location_book ?? '-';
        $publisher = $book?->publisher?->name ?? '-';
        $authors = $book?->authors?->pluck('name')->filter()->join(', ') ?: '-';

        return "{$variant['header']}\n\n"
            . "{$variant['greeting']} {$userName} 👋\n\n"
            . "📖 Title: *{$bookTitle}*\n"
            . "📚 ISBN: {$isbn}\n"
            . "🗂️ Classification: {$classification}\n"
            . "📅 Publication Year: {$year}\n"
            . "📄 Pages: {$pages}\n"
            . "📍 Location: {$location}\n\n"
            . "🏢 Publisher: *{$publisher}*\n"
            . "✍️ Authors: {$authors}\n\n"
            . "📅 Tanggal Pinjam: *{$loanDate}*\n"
            . "📅 Jatuh Tempo: *{$dueDate}*\n\n"
            . "⏰ {$statusIcon} *Sisa Waktu: {$status}*\n\n"
            . "*{$variant['warning']}*\n\n"
            . "🔗 Link URL Website: " . config('app.url') . "/assets/book/{$bookSlug}";
    }
}
