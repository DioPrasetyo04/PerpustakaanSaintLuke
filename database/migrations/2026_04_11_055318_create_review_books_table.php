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
        Schema::create('review_books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_user_id')->constrained('loan_details', 'id')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('return_book_id')->constrained('return_books', 'id')->cascadeOnUpdate()->cascadeOnDelete();
            $table->decimal('rating', 2, 1)->default(0);
            $table->string('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('review_books');
    }
};
