<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Tambah kolom identitas & keperluan pengunjung (selalu disimpan di visit, termasuk tamu).
        Schema::table('visits', function (Blueprint $table) {
            if (! Schema::hasColumn('visits', 'name')) {
                $table->string('name')->nullable()->after('user_id');
            }
            if (! Schema::hasColumn('visits', 'address')) {
                $table->string('address')->nullable()->after('name');
            }
            if (! Schema::hasColumn('visits', 'needs')) {
                // Keperluan kunjungan (diisi bila tingkat = Lainnya / pengunjung non-murid).
                $table->string('needs')->nullable()->after('type_other');
            }
        });

        // 2. Isi name & address dari profil user untuk data kunjungan lama.
        DB::statement(
            'UPDATE visits v JOIN users u ON u.id = v.user_id SET v.name = u.name, v.address = u.address WHERE v.name IS NULL'
        );

        // 3. user_id jadi opsional + FK nullOnDelete (kunjungan tamu / user terhapus tetap tersimpan).
        Schema::table('visits', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        Schema::table('visits', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->change();
        });
        Schema::table('visits', function (Blueprint $table) {
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('visits', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        Schema::table('visits', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable(false)->change();
        });
        Schema::table('visits', function (Blueprint $table) {
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::table('visits', function (Blueprint $table) {
            foreach (['name', 'address', 'needs'] as $column) {
                if (Schema::hasColumn('visits', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
