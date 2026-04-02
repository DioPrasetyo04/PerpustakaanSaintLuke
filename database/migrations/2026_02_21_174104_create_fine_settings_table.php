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
        Schema::create('fine_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('late_fee_per_day');
            $table->enum('damage_discount_type', ['percentage', 'fixed']);
            $table->unsignedBigInteger('damage_fee_book');
            $table->enum('lost_discount_type', ['percentage', 'fixed']);
            $table->unsignedBigInteger('lost_fee_book');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fine_settings');
    }
};
