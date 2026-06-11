<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * URL avatar Google bisa >1000 karakter; varchar(255) memicu
     * "Data too long for column 'avatar_url'" saat login/register Google.
     * Ubah ke TEXT. doctrine/dbal tidak terpasang → pakai SQL mentah (MySQL).
     */
    public function up(): void
    {
        if (Schema::hasColumn('users', 'avatar_url')) {
            DB::statement('ALTER TABLE users MODIFY avatar_url TEXT NULL');
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('users', 'avatar_url')) {
            DB::statement('ALTER TABLE users MODIFY avatar_url VARCHAR(255) NULL');
        }
    }
};
