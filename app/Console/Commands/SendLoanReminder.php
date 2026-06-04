<?php

namespace App\Console\Commands;

use App\Models\LoanDetail;
use App\Notifications\LoanReminderNotification;
use App\Services\WhatsAppService;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;

class SendLoanReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reminder:loan';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'send reminder for book return';

    /**
     * Execute the console command.
     */
    /**
     * Jeda antar pengiriman notifikasi (dalam detik).
     * Mencegah rate limit Mailtrap free plan (~1 email/sec) & Fonte (anti-spam WhatsApp).
     */
    private const SEND_DELAY_SECONDS = 3;

    public function handle()
    {
        $today = Carbon::today();

        $details = LoanDetail::with(['book.publisher', 'book.authors', 'loan.user'])
            ->whereDoesntHave('returnBook')
            ->get();

        $this->info("Found {$details->count()} active LoanDetail(s).");

        $sent = 0;
        foreach ($details as $detail) {
            $user = $detail->loan?->user;
            if (! $user) {
                $this->warn("Skip LoanDetail #{$detail->id}: user kosong.");
                continue;
            }

            $dueDate = Carbon::parse($detail->due_date);
            // Carbon 3 returns float — cast ke int agar in_array strict mode bekerja.
            $diff = (int) round($today->diffInDays($dueDate, false));

            $this->line("LoanDetail #{$detail->id} (user {$user->email}, phone={$user->phone}): due={$dueDate->format('Y-m-d')}, diff={$diff}");

            if (! \in_array($diff, [3, 1, 0], true)) {
                continue;
            }

            // Dedup harian: scheduler hourly tapi tiap (user, loan_detail) hanya 1x per hari.
            $cacheKey = "loan_reminder:{$user->id}:{$detail->id}:" . $today->format('Y-m-d');
            if (! Cache::add($cacheKey, true, $today->copy()->endOfDay())) {
                $this->warn("  → Sudah dikirim hari ini (cache dedup). Skip.");
                continue;
            }

            // Jeda sebelum kirim (kecuali kirim pertama), supaya tidak men-trigger rate limit.
            if ($sent > 0) {
                $this->line("  ⏳ Jeda " . self::SEND_DELAY_SECONDS . " detik sebelum kirim berikutnya...");
                sleep(self::SEND_DELAY_SECONDS);
            }

            $user->notify(new LoanReminderNotification($detail, $diff));
            app(WhatsAppService::class)->sendReminder(
                $user->phone,
                $detail,
                $diff
            );

            $this->info("  → Reminder terkirim (email + WA).");
            $sent++;
        }

        $this->info("Done. {$sent} reminder dikirim.");
    }
}
