

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('books', function (Blueprint $table) {
            // Penanda buku "Sorotan / Pilihan Pustakawan" yang tampil di Beranda.
            $table->boolean('is_spotlight')->default(false)->after('is_published');
            $table->index('is_spotlight');
        });
    }

    public function down(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->dropIndex(['is_spotlight']);
            $table->dropColumn('is_spotlight');
        });
    }
};
