<?php

use App\Console\Commands\AutoReturnExpiredLoans;
use App\Console\Commands\SendLoanReminder;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(function () {
    app(SendLoanReminder::class)->handle();
})->dailyAt('08:00');

Schedule::call(function () {
    app(AutoReturnExpiredLoans::class)->handle();
})->dailyAt('00:01');
