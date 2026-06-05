<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('online_resources', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('type');               // E-Book, Jurnal, Kursus, Riset, Ensiklopedi, Video, Referensi
            $table->string('format')->nullable(); // Web, Eksternal
            $table->string('tag')->nullable();
            $table->text('description')->nullable();
            $table->string('url');
            $table->unsignedTinyInteger('palette')->default(0);
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('online_resources');
    }
};
