<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('books', function (Blueprint $table) {
            // Penerbit boleh kosong (mis. saat import dari Excel tanpa data penerbit).
            $table->unsignedBigInteger('publisher_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->unsignedBigInteger('publisher_id')->nullable(false)->change();
        });
    }
};
