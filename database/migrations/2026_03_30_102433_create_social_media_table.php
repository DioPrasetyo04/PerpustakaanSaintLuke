<?php

use App\Enums\SocialMedia;
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
        Schema::create('social_media', function (Blueprint $table) {
            $table->id();
            // Polymorphic relation
            $table->morphs('socialable'); // generates: socialable_id, socialable_type

            $table->enum('platform', SocialMedia::values());
            $table->string('url');
            $table->string('username')->nullable(); // username tanpa URL
            $table->unique(['socialable_id', 'socialable_type', 'platform']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('social_media');
    }
};
