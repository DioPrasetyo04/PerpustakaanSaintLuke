<?php

namespace App\Console\Commands;

use App\Models\Loan;
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

        $loans = Loan::with(['user', 'book'])
            ->whereDoesntHave('returnBook')->get();

        foreach ($loans as $loan) {
            $dueDate = Carbon::parse($loan->due_date);
            $diff = $today->diffInDays($dueDate, false);

            if (in_array($diff, [3, 1, 0])) {
                $loan->user->notify(new LoanReminderNotification($loan, $diff));

                app(WhatsAppService::class)->sendReminder(
                    $loan->user->phone,
                    $loan,
                    $diff
                );
            }
        }
        $this->info('Reminder sent successfully!');
    }
}
