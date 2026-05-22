<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Tanggal kartu anggota diterbitkan. NULL = belum punya kartu.
            $table->timestamp('member_card_issued_at')->nullable()->after('approved_by');
            // Admin/pengelola yang menerbitkan kartu.
            $table->foreignId('member_card_issued_by')->nullable()->after('member_card_issued_at')
                ->constrained('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['member_card_issued_by']);
            $table->dropColumn(['member_card_issued_at', 'member_card_issued_by']);
        });
    }
};
