<?php

namespace App\Providers;

use App\Interface\BookInterfaceRepositories;
use App\Interface\CatalogInterfaceRepositories;
use App\Interface\HomeInterfaceRepositories;
use App\Interface\InformationRepositoriesInterface;
use App\Interface\ResourceInterfaceRepositories;
use App\Repositories\BookRepositories;
use App\Repositories\CatalogRepositories;
use App\Repositories\HomeRepositories;
use App\Repositories\InformationRepositories;
use App\Repositories\ResourceRepositories;
use Carbon\CarbonImmutable;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(HomeInterfaceRepositories::class, HomeRepositories::class);
        $this->app->bind(CatalogInterfaceRepositories::class, CatalogRepositories::class);
        $this->app->bind(ResourceInterfaceRepositories::class, ResourceRepositories::class);
        $this->app->bind(BookInterfaceRepositories::class, BookRepositories::class);
        $this->app->bind(InformationRepositoriesInterface::class, InformationRepositories::class);
    }

    public function boot(): void
    {
        $this->configureDefaults();

        // dari Breeze (optional)
        Vite::prefetch(concurrency: 3);

        // dari kamu
        FilamentAsset::register([
            Js::make('midtrans', 'https://app.sandbox.midtrans.com/snap/snap.js')
                ->extraAttributes([
                    'data-client-key' => config('midtrans.client_key'),
                ]),
            Js::make('midtrans-handler', resource_path('js/midtrans/midtrans.js')),
        ]);
    }

    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(
            fn(): ?Password => app()->isProduction()
                ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
                : null
        );
    }
}
