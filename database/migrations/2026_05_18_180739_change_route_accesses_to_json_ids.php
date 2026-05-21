<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('route_accesses', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropForeign(['permission_id']);
            $table->dropColumn(['role_id', 'permission_id']);

            $table->json('role_ids')->after('route_name');
            $table->json('permission_ids')->after('role_ids');
        });
    }

    public function down(): void
    {
        Schema::table('route_accesses', function (Blueprint $table) {
            $table->dropColumn(['role_ids', 'permission_ids']);

            $table->foreignId('role_id')->after('route_name')->constrained('roles')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('permission_id')->after('role_id')->constrained('permissions')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }
};
