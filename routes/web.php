<?php

use App\Http\Controllers\Admin\MemberCardController;
use App\Http\Controllers\Admin\UserApprovalController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\ReturnBookController;
use App\Http\Controllers\UpdatePasswordController;
use App\Http\Controllers\VisitFormController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

Route::get('dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

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

Route::prefix('about')->name('about.')->group(function () {
    Route::get('/profile', fn () => Inertia::render('about/ProfilePage'))->name('profile');
    Route::get('/vision-mission', fn () => Inertia::render('about/VisionMissionPage'))->name('vision-mission');
    Route::get('/contact', fn () => Inertia::render('about/ContactPage'))->name('contact');
    Route::get('/organization-structure', fn () => Inertia::render('about/OrganizationStructurePage'))->name('organization-structure');
});

// Kiosk publik pencatatan kunjungan perpustakaan (scan kartu / cari user / isi manual).
Route::controller(VisitFormController::class)->group(function () {
    Route::get('/visit', 'create')->name('visit.create');
    Route::post('/visit', 'store')->name('visit.store');

    Route::middleware('throttle:30,1')->group(function () {
        Route::get('/visit/search-users', 'searchUsers')->name('visit.search-users');
        Route::get('/visit/user/{user}', 'lookupUser')->name('visit.lookup-user');
        Route::post('/visit/scan', 'scan')->name('visit.scan');
    });
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::controller(HistoryController::class)->group(function () {
        Route::get('/history', 'index')->name('history.index');
    });
});

Route::middleware('auth')->group(function () {
    Route::controller(BookmarkController::class)->group(function () {
        Route::post('/bookmark/{slug}', 'store')->name('bookmark.store');
        Route::delete('/bookmark/{slug}', 'destroy')->name('bookmark.destroy');
    });

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

    Route::controller(ReturnBookController::class)->group(function () {
        Route::post('/return/{returnBookCode}/review', 'storeReview')->name('return.review.store');
    });
});

Route::get('/assets/stream/{id}', [AssetController::class, 'stream'])
    ->name('assets.stream');

Route::middleware('signed')->prefix('admin/users')->name('admin.users.')->group(function () {
    Route::get('/{user}/approve', [UserApprovalController::class, 'approve'])
        ->withTrashed()
        ->name('approve');
    Route::get('/{user}/reject', [UserApprovalController::class, 'reject'])
        ->withTrashed()
        ->name('reject');
});

Route::middleware('auth')->prefix('admin/users')->name('admin.users.')->group(function () {
    Route::get('/{user}/member-card/download', [MemberCardController::class, 'download'])
        ->name('member-card.download');
});

require __DIR__ . '/auth.php';

require __DIR__ . '/settings.php';
