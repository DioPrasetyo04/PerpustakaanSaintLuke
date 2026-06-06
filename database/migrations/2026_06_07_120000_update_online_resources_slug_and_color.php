<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /** Pemetaan index palet lama → kode warna hex (latar kartu di frontend). */
    private array $paletteMap = [
        0 => '#0F3D2E',
        1 => '#11324F',
        2 => '#3A2B14',
        3 => '#1E2440',
        4 => '#3A1530',
        5 => '#13322F',
        6 => '#2A1840',
        7 => '#402015',
    ];

    public function up(): void
    {
        // Tambah kolom color (hex) berdasarkan palet lama.
        Schema::table('online_resources', function (Blueprint $table) {
            $table->string('color', 9)->default('#0F3D2E')->after('url');
        });

        if (Schema::hasColumn('online_resources', 'palette')) {
            foreach ($this->paletteMap as $index => $hex) {
                DB::table('online_resources')->where('palette', $index)->update(['color' => $hex]);
            }
        }

        Schema::table('online_resources', function (Blueprint $table) {
            if (Schema::hasColumn('online_resources', 'palette')) {
                $table->dropColumn('palette');
            }
            if (Schema::hasColumn('online_resources', 'slug')) {
                $table->dropUnique(['slug']);
                $table->dropColumn('slug');
            }
        });
    }

    public function down(): void
    {
        Schema::table('online_resources', function (Blueprint $table) {
            $table->unsignedTinyInteger('palette')->default(0)->after('url');
            $table->string('slug')->nullable()->after('title');
        });

        // Pulihkan palet dari color (mapping balik); sisanya default 0.
        foreach ($this->paletteMap as $index => $hex) {
            DB::table('online_resources')->where('color', $hex)->update(['palette' => $index]);
        }

        Schema::table('online_resources', function (Blueprint $table) {
            $table->dropColumn('color');
        });
    }
};
