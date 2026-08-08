<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jadikan book_id nullable agar LocationOfBook bisa berdiri sebagai data master
     * (lokasi rak/lantai) tanpa harus terikat ke buku tertentu terlebih dahulu.
     * Buku yang ingin merujuk ke lokasi cukup mengisi location_of_book_id di tabel books.
     */
    public function up(): void
    {
        Schema::table('location_of_books', function (Blueprint $table) {
            // Drop foreign key constraint terlebih dahulu sebelum mengubah kolom
            $table->dropForeign(['book_id']);
            // Ubah book_id menjadi nullable
            $table->foreignId('book_id')->nullable()->change();
            // Tambahkan kembali foreign key constraint dengan nullable
            $table->foreign('book_id')->references('id')->on('books')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Kembalikan book_id menjadi NOT NULL.
     */
    public function down(): void
    {
        Schema::table('location_of_books', function (Blueprint $table) {
            $table->dropForeign(['book_id']);
            $table->foreignId('book_id')->nullable(false)->change();
            $table->foreign('book_id')->references('id')->on('books')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }
};
