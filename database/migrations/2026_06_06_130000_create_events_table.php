<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('category')->nullable();        // badge/tag, mis. "Klub Baca", "Workshop"
            $table->string('location')->nullable();         // mis. "Ruang Baca Utama"
            $table->dateTime('start_at');                   // tanggal & jam mulai acara
            $table->dateTime('end_at')->nullable();         // opsional, jam selesai
            $table->unsignedInteger('capacity')->nullable(); // total kursi (null = tanpa batas)
            $table->unsignedInteger('seats_taken')->default(0); // kursi terisi
            $table->string('registration_url')->nullable(); // tautan pendaftaran (opsional)
            $table->string('thumbnail')->nullable();        // poster acara (disk public)
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_active', 'start_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
