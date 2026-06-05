<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // ID akun Google (sub) — null untuk akun yang mendaftar manual.
            $table->string('google_id')->nullable()->unique()->after('email');
            // URL foto profil dari penyedia OAuth (Google mengirim URL absolut).
            $table->string('avatar_url')->nullable()->after('avatar');
        });

        // Password boleh null: akun yang mendaftar via Google belum punya password lokal.
        // doctrine/dbal tidak terpasang, jadi gunakan SQL mentah (MySQL).
        DB::statement('ALTER TABLE users MODIFY password VARCHAR(255) NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['google_id', 'avatar_url']);
        });

        DB::statement('ALTER TABLE users MODIFY password VARCHAR(255) NOT NULL');
    }
};
