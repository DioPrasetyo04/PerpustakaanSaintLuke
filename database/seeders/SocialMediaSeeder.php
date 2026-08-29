<?php

namespace Database\Seeders;

use App\Enums\SocialMedia as SocialMediaEnum;
use App\Models\Author;
use App\Models\SocialMedia;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SocialMediaSeeder extends Seeder
{
    /**
     * Seed akun media sosial (polymorphic) untuk para penulis menggunakan SocialMediaFactory.
     * Setiap penulis mendapat 2 platform (Instagram & Twitter) yang unik.
     *
     * Dependensi: AuthorsSeeder.
     */
    public function run(): void
    {
        $authors = Author::query()->get();

        if ($authors->isEmpty()) {
            $this->command?->warn('SocialMediaSeeder dilewati: belum ada penulis (jalankan AuthorsSeeder).');
            return;
        }

        $platforms = [SocialMediaEnum::INSTAGRAM, SocialMediaEnum::TWITTER];

        foreach ($authors as $author) {
            $handle = Str::slug($author->name, '');

            foreach ($platforms as $platform) {
                $url = match ($platform) {
                    SocialMediaEnum::INSTAGRAM => 'https://instagram.com/' . $handle,
                    SocialMediaEnum::TWITTER   => 'https://twitter.com/' . $handle,
                    default                    => 'https://social.example.com/' . $handle,
                };

                SocialMedia::updateOrCreate(
                    [
                        'socialable_id'   => $author->id,
                        'socialable_type' => Author::class,
                        'platform'        => $platform->value,
                    ],
                    [
                        'url'      => $url,
                        'username' => $handle,
                    ],
                );
            }
        }

        $this->command?->info('SocialMediaSeeder: media sosial dihubungkan ke ' . $authors->count() . ' penulis.');
    }
}
