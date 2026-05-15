<?php

use App\Enums\Days;
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
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();

            // Hari announcement
            $table->enum('day', Days::values())->unique();

            $table->string('title');

            $table->text('description')->nullable();

            $table->string('photo')->nullable();

            $table->time('open_time');

            $table->time('close_time');

            $table->boolean('is_active')->default(true);

            $table->softDeletes();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
