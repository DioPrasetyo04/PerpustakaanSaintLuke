<?php

namespace App\Console\Commands;

use App\Models\LoanDetail;
use App\Notifications\LoanReminderNotification;
use App\Services\WhatsAppService;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

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
    public function handle()
    {
        $today = Carbon::today();

        $details = LoanDetail::with(['book', 'loan.user'])
            ->whereDoesntHave('returnBook')
            ->get();

        foreach ($details as $detail) {
            $user = $detail->loan?->user;
            if (! $user) {
                continue;
            }

            $dueDate = Carbon::parse($detail->due_date);
            $diff = $today->diffInDays($dueDate, false);

            if (\in_array($diff, [3, 1, 0], true)) {
                $user->notify(new LoanReminderNotification($detail, $diff));

                app(WhatsAppService::class)->sendReminder(
                    $user->phone,
                    $detail,
                    $diff
                );
            }
        }
        $this->info('Reminder sent successfully!');
    }
}
