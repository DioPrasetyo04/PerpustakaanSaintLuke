<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\ReturnBookController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/assets/stream/{id}', [AssetController::class, 'stream'])
//     ->name('asset.stream')
//     ->middleware('signed'); // 🔐 pakai signed, bukan auth

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
});


Route::controller(BookController::class)->group(function () {
    Route::get('/book/detail/{slug}', 'detailBook')->name('book.detail');
});

Route::controller(CatalogController::class)->group(function () {
    Route::get('/catalog/books', 'books')->name('catalog.books');
    Route::get('/catalog/categories', 'categories')->name('catalog.categories');
    Route::get('/catalog/category/{slug}/books', 'getBooksByCategory')->name('catalog.category.books');
    Route::get('/catalog/authors', 'authors')->name('catalog.authors');
    Route::get('/catalog/author/{username}/books', 'getBooksByAuthor')->name('catalog.author.books');
    Route::get('/catalog/publishers', 'publishers')->name('catalog.publishers');
    Route::get('/catalog/publisher/{slug}/books', 'getBooksByPublisher')->name('catalog.publisher.books');
});

Route::controller(ResourceController::class)->group(function () {
    Route::get('/resources', 'index')->name('resource');
});

Route::controller(InformationController::class)->group(function () {
    Route::get('/informations', 'index')->name('announcements.index');
    Route::get('/information/detail/{slug}', 'detail')->name('announcement.detail');
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

Route::middleware('auth')->group(function () {
    Route::controller(LoanController::class)->group(function () {
        Route::get('/dashboard/loans', 'index')->name('loan.index');
        Route::get('/dashboard/loan/{loanCode}', 'detail')->name('loan.detail');
        Route::get('/confirmation/loan/book/{slug}', 'confirmation')->name('loan.confirmation');
        Route::post('/loan/book/{slug}', 'store')->name('loan.store');
    });

    Route::middleware('ensure.loan')->group(function () {
        Route::controller(AssetController::class)->group(function () {
            Route::get('/assets/book/{slug}', 'index')->name('book.assets');
        });

        Route::controller(ReturnBookController::class)->group(function () {
            Route::get('/confirmation/return/book/{slug}/{loanCode}', 'confirmation')->name('return.confirmation');

            Route::post('/return/book/{slug}', 'store')->name('return.store');

            Route::get('/dashboard/returns', 'index')->name('return.index');

            Route::get('/dashboard/return/{returnBookCode}', 'detail')->name('return.detail');
        });
    });
});

Route::get('/assets/stream/{id}', [AssetController::class, 'stream'])
    ->name('assets.stream');

require __DIR__ . '/auth.php';

require __DIR__ . '/settings.php';
