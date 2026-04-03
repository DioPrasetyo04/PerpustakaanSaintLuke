<?php

use App\Http\Controllers\CatalogController;
use App\Http\Controllers\HomeController;
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

require __DIR__ . '/settings.php';
