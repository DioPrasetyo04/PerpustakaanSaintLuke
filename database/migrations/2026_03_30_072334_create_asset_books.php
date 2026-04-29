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
        Schema::create(
            'book_of_assets',
            function (Blueprint $table) {
                $table->id();
                $table->foreignId('book_id')->constrained('books', 'id')->cascadeOnUpdate()->cascadeOnDelete();
                $table->foreignId('asset_id')->constrained('assets', 'id')->cascadeOnUpdate()->cascadeOnDelete();
            }
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
