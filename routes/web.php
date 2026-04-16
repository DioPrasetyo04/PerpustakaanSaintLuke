<?php

use App\Http\Controllers\CatalogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ResourceController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

// Route::get('dashboard', function () {
//     return Inertia::render('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/book/{id}', 'bookDetail')->name('book.detail');
    Route::get('/announcements', 'announcements')->name('announcements');
    Route::get('/dashboard', 'dashboard')->middleware(['auth', 'verified'])->name('dashboard');
});

Route::controller(CatalogController::class)->group(function () {
    Route::get('/catalog', 'catalog')->name('catalog');
});

Route::controller(ResourceController::class)->group(function () {
    Route::get('/resources', 'index')->name('resource');
});

Route::controller(PaymentController::class)->group(function () {
    Route::post('/payments', 'create')->name('payment.create');
    Route::post('/payments/callback', 'callback')->name('payment.callback');
    Route::get('/payments/pending', 'handlePending')->name('payment.pending');
    Route::get('/payments/error', 'handleError')->name('payment.error');
    Route::get('/payments/success', 'handleSuccess')->name('payment.success');
    Route::get('/payments/failed', 'handleFailed')->name('payment.failed');
    Route::get('/payments/cancel', 'handleCancel')->name('payment.cancel');
});

require __DIR__ . '/settings.php';
