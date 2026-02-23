<?php

use App\Enums\BookStatus;
use App\Enums\PublishedBooks;
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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('publisher_id')->constrained('publishers', 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('author_id')->constrained('users', 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('book_code')->unique();
            $table->string('title');
            $table->string('slug')->unique();
            $table->unsignedBigInteger('publication_year')->nullable();
            $table->text('isbn')->nullable();
            $table->text('synopsis')->nullable();
            $table->unsignedBigInteger('number_of_pages')->nullable();
            $table->string('status')->default(BookStatus::AVAILABLE->value);
            $table->string('cover')->nullable();
            $table->unsignedBigInteger('price')->nullable();
            $table->enum('is_published', PublishedBooks::values())->default(PublishedBooks::UNPUBLISH->value);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
