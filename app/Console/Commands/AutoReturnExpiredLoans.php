<?php

namespace App\Console\Commands;

use App\Models\LoanDetail;
use App\Services\DigitalAutoReturnService;
use Carbon\Carbon;
use Illuminate\Console\Command;

class AutoReturnExpiredLoans extends Command
{
    protected $signature = 'loan:auto-return-expired';
    protected $description = 'Auto-return all expired digital loans without stock manipulation';

    public function handle(): void
    {
        $autoReturnService = app(DigitalAutoReturnService::class);

        $expiredDetails = LoanDetail::query()
            ->whereDoesntHave('returnBook')
            ->where('due_date', '<', Carbon::today())
            ->get();

        $count = $expiredDetails->count();

        foreach ($expiredDetails as $detail) {
            $autoReturnService->autoReturn($detail);
        }

        $this->info("Auto-returned {$count} expired loan(s).");
    }
}
