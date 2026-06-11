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
     * Seed akun media sosial (polymorphic) untuk para penulis.
     * Dependensi: AuthorsSeeder.
     */
    public function run(): void
    {
        $authors = Author::query()->get();
        if ($authors->isEmpty()) {
            $this->command?->warn('SocialMediaSeeder dilewati: belum ada penulis (jalankan AuthorsSeeder).');
            return;
        }

        foreach ($authors as $author) {
            $handle = Str::slug($author->name, '');

            $accounts = [
                ['platform' => SocialMediaEnum::INSTAGRAM->value, 'url' => 'https://instagram.com/' . $handle, 'username' => $handle],
                ['platform' => SocialMediaEnum::TWITTER->value, 'url' => 'https://twitter.com/' . $handle, 'username' => '@' . $handle],
            ];

            foreach ($accounts as $account) {
                SocialMedia::updateOrCreate(
                    [
                        'socialable_id' => $author->id,
                        'socialable_type' => Author::class,
                        'platform' => $account['platform'],
                    ],
                    [
                        'url' => $account['url'],
                        'username' => $account['username'],
                    ],
                );
            }
        }
    }
}
