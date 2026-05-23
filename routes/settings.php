<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SocialMediaController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use App\Http\Controllers\UpdatePasswordController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::controller(SocialMediaController::class)->group(function () {
        Route::post('settings/social-media', 'store')->name('social-media.store');
        Route::patch('settings/social-media/{id}', 'update')->name('social-media.update');
        Route::delete('settings/social-media/{id}', 'destroy')->name('social-media.destroy');
    });
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('settings/password', [PasswordController::class, 'edit'])->name('user-password.edit');

//     Route::put('settings/password', [PasswordController::class, 'update'])
//         ->middleware('throttle:6,1')
//         ->name('user-password.update');

//     Route::get('settings/appearance', function () {
//         return Inertia::render('settings/appearance');
//     })->name('appearance.edit');

//     Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
//         ->name('two-factor.show');
// });

Route::middleware(['auth', 'verified'])->group(function () {
    Route::controller(UpdatePasswordController::class)->group(function () {
        Route::get('/update-password', 'edit')->name('password-update.edit');
        Route::put('/update-password', 'update')
            ->middleware('throttle:6,1')
            ->name('password-update.update');
    });
    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance.edit');

    Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
        ->name('two-factor.show');
});
