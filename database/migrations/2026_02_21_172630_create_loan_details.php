<?php

use App\Enums\LoanBookStatus;
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
        Schema::create('loan_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_id')->constrained('loans', 'id')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('book_id')->constrained('books', 'id')->cascadeOnUpdate()->cascadeOnDelete();
            $table->enum('status', LoanBookStatus::cases())->default(LoanBookStatus::BORROWED->value);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
