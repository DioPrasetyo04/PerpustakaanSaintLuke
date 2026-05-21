<?php

namespace App\Providers\Filament;

use App\Enums\Days;
use App\Filament\Pages\Auth\Register;
use App\Filament\Pages\Auth\ResetPassword;
use App\Filament\Pages\Profile;
use App\Models\Announcement;
use BezhanSalleh\FilamentShield\FilamentShieldPlugin;
use Carbon\Carbon;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\NavigationGroup;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->maxContentWidth('full')
            ->brandName('E-Library Santo Lukas')
            ->brandLogo(fn () => view('filament.brand'))
            ->brandLogoHeight('2.75rem')
            ->login()
            ->registration(Register::class)
            ->profile(Profile::class)
            ->passwordReset(resetAction: ResetPassword::class)
            ->colors([
                'primary' => Color::Amber,
            ])
            ->renderHook(
                'panels::head.end',
                fn () => '<style>' . file_get_contents(resource_path('css/filament/admin/custom.css')) . '</style>',
            )
            ->renderHook(
                'panels::user-menu.before',
                fn () => view('filament.partials.user-menu-card'),
            )
            ->renderHook(
                'panels::body.end',
                fn () => $this->resolveAnnouncementView(),
            )
            ->navigationGroups([
                NavigationGroup::make('Katalog Buku'),
                NavigationGroup::make('Peminjaman'),
                NavigationGroup::make('Keuangan'),
                NavigationGroup::make('Informasi'),
                NavigationGroup::make('Kunjungan'),
                NavigationGroup::make('Manajemen Pengguna'),
                NavigationGroup::make('Laporan'),
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->plugins([
                FilamentShieldPlugin::make()
                    ->navigationGroup('Manajemen Pengguna'),
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }

    private function resolveAnnouncementView(): \Illuminate\Support\HtmlString
    {
        try {
            $today = Days::today();

            $record = Announcement::query()
                ->where('days', $today->value)
                ->where('is_active', true)
                ->withoutTrashed()
                ->first();

            if (!$record) {
                return new \Illuminate\Support\HtmlString('');
            }

            $now       = Carbon::now();
            $openTime  = Carbon::today()->setTimeFromTimeString($record->open_time);
            $closeTime = Carbon::today()->setTimeFromTimeString($record->close_time);
            $isOpen    = $now->between($openTime, $closeTime);

            $html = view('filament.partials.announcement-popup', [
                'title'       => $record->title,
                'description' => $record->description,
                'photo'       => $record->photo ? asset('storage/' . $record->photo) : null,
                'open_time'   => substr($record->open_time, 0, 5),
                'close_time'  => substr($record->close_time, 0, 5),
                'days'        => $record->days instanceof Days ? $record->days->value : $record->days,
                'is_open'     => $isOpen,
            ])->render();

            return new \Illuminate\Support\HtmlString($html);
        } catch (\Throwable) {
            return new \Illuminate\Support\HtmlString('');
        }
    }
}
