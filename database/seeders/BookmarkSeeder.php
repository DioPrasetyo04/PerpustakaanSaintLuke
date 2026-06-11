<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Seeder;

class BookmarkSeeder extends Seeder
{
    /**
     * Seed bookmark/favorit buku oleh anggota.
     * Dependensi: MemberUserSeeder & BookSeeder.
     */
    public function run(): void
    {
        $members = User::query()->where('email', 'like', '%@example.com')->get();
        $bookIds = Book::query()->pluck('id');

        if ($members->isEmpty() || $bookIds->isEmpty()) {
            $this->command?->warn('BookmarkSeeder dilewati: butuh anggota (MemberUserSeeder) dan buku (BookSeeder).');
            return;
        }

        foreach ($members as $member) {
            $picks = $bookIds->shuffle()->take(random_int(2, 4))->all();
            $member->bookmarks()->syncWithoutDetaching($picks);
        }
    }
}
