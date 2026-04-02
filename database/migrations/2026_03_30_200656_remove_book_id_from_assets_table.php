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
        Schema::table('assets', function (Blueprint $table) {
            if (Schema::hasColumn('assets', 'book_id')) {
                try {
                    $table->dropForeign(['book_id']);
                } catch (\Exception $e) {
                    $e->getMessage();
                }

                $table->dropColumn('book_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assets', function (Blueprint $table) {
            $table->foreignId('book_id')->after('id')->constrained('books', 'id')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }
};
