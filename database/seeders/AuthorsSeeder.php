<?php

namespace Database\Seeders;

use App\Enums\UserGender;
use App\Models\Author;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AuthorsSeeder extends Seeder
{
    /**
     * Seed penulis buku. Author yang dibuat otomatis diberi role "writer"
     * lewat boot model (lihat App\Models\Author).
     */
    public function run(): void
    {
        $authors = [
            ['name' => 'Andrea Hirata', 'gender' => UserGender::MALE->value, 'nationality' => 'Indonesia', 'bio' => 'Novelis asal Belitung, dikenal lewat tetralogi Laskar Pelangi.'],
            ['name' => 'Tere Liye', 'gender' => UserGender::MALE->value, 'nationality' => 'Indonesia', 'bio' => 'Penulis produktif novel populer Indonesia.'],
            ['name' => 'Pramoedya Ananta Toer', 'gender' => UserGender::MALE->value, 'nationality' => 'Indonesia', 'bio' => 'Sastrawan besar Indonesia, penulis Tetralogi Buru.'],
            ['name' => 'Dee Lestari', 'gender' => UserGender::FEMALE->value, 'nationality' => 'Indonesia', 'bio' => 'Penulis seri Supernova dan penyanyi.'],
            ['name' => 'Habiburrahman El Shirazy', 'gender' => UserGender::MALE->value, 'nationality' => 'Indonesia', 'bio' => 'Novelis bernuansa islami, penulis Ayat-Ayat Cinta.'],
            ['name' => 'Eka Kurniawan', 'gender' => UserGender::MALE->value, 'nationality' => 'Indonesia', 'bio' => 'Penulis Cantik Itu Luka, diakui secara internasional.'],
            ['name' => 'Raditya Dika', 'gender' => UserGender::MALE->value, 'nationality' => 'Indonesia', 'bio' => 'Penulis komedi dan kreator konten.'],
            ['name' => 'J.K. Rowling', 'gender' => UserGender::FEMALE->value, 'nationality' => 'Inggris', 'bio' => 'Penulis seri Harry Potter.'],
        ];

        foreach ($authors as $author) {
            Author::firstOrCreate(
                ['username' => Str::slug($author['name'])],
                [
                    'name' => $author['name'],
                    'gender' => $author['gender'],
                    'nationality' => $author['nationality'],
                    'bio' => $author['bio'],
                    'verified_at' => now(),
                ],
            );
        }
    }
}
