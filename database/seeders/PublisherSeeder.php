<?php

namespace Database\Seeders;

use App\Models\Publisher;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PublisherSeeder extends Seeder
{
    /**
     * Seed penerbit buku.
     */
    public function run(): void
    {
        $publishers = [
            ['name' => 'Gramedia Pustaka Utama', 'email' => 'info@gramedia.com', 'phone' => '021-53650110', 'address' => 'Jl. Palmerah Barat 29-37, Jakarta'],
            ['name' => 'Mizan Pustaka', 'email' => 'info@mizan.com', 'phone' => '022-7834310', 'address' => 'Jl. Cinambo No. 135, Bandung'],
            ['name' => 'Penerbit Erlangga', 'email' => 'info@erlangga.co.id', 'phone' => '021-8717006', 'address' => 'Jl. H. Baping Raya No. 100, Jakarta'],
            ['name' => 'Bentang Pustaka', 'email' => 'info@bentangpustaka.com', 'phone' => '0274-517373', 'address' => 'Jl. Plemburan No. 1, Yogyakarta'],
            ['name' => 'Penerbit Kanisius', 'email' => 'office@kanisius.co.id', 'phone' => '0274-588783', 'address' => 'Jl. Cempaka No. 9, Yogyakarta'],
            ['name' => 'Republika Penerbit', 'email' => 'info@republikapenerbit.com', 'phone' => '021-7803747', 'address' => 'Jl. Kebagusan III No. 5, Jakarta'],
        ];

        foreach ($publishers as $publisher) {
            Publisher::updateOrCreate(
                ['slug' => Str::slug($publisher['name'])],
                array_merge($publisher, ['is_active' => true]),
            );
        }
    }
}
