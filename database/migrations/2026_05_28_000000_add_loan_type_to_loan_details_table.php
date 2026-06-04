<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('loan_details', function (Blueprint $table) {
            $table->string('loan_type', 16)->nullable()->after('status')->index();
        });
    }

    public function down(): void
    {
        Schema::table('loan_details', function (Blueprint $table) {
            $table->dropIndex(['loan_type']);
            $table->dropColumn('loan_type');
        });
    }
};
