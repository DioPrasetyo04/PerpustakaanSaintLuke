<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Kolom location_book juga didefinisikan di create_books_table; guard agar
        // fresh-migrate (test/deploy baru) tidak error "Duplicate column".
        if (! Schema::hasColumn('books', 'location_book')) {
            Schema::table('books', function (Blueprint $table) {
                $table->text('location_book')->after('added_by')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('books', function (Blueprint $table) {
            //
        });
    }
};
