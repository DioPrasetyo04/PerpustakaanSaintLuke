<?php

namespace Database\Factories;

use App\Models\RouteAccess;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RouteAccess>
 *
 * Catatan: RouteAccess menggunakan JSON column role_ids dan permission_ids
 * (bukan FK langsung).
 */
class RouteAccessFactory extends Factory
{
    protected $model = RouteAccess::class;

    private static array $sampleRoutes = [
        'filament.admin.resources.books.index',
        'filament.admin.resources.authors.index',
        'filament.admin.resources.categories.index',
        'filament.admin.resources.publishers.index',
        'filament.admin.resources.loans.index',
        'filament.admin.resources.users.index',
        'filament.admin.resources.fines.index',
        'filament.admin.resources.events.index',
        'filament.admin.resources.testimonials.index',
        'filament.admin.resources.online-resources.index',
    ];

    private static int $index = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $routeName = self::$sampleRoutes[self::$index % count(self::$sampleRoutes)];
        self::$index++;

        return [
            'route_name'     => $routeName,
            'role_ids'       => [1],        // ID role admin (default)
            'permission_ids' => [1, 2, 3],  // Sample permission IDs
        ];
    }
}
