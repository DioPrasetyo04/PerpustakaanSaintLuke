<?php

use App\Enums\PaymentStatus;
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
        Schema::create('fines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('return_book_id')->constrained('return_books', 'id')->cascadeOnUpdate()->cascadeOnDelete();
            $table->decimal('late_fee', 8, 2)->default(0);
            $table->decimal('other_fee', 8, 2)->default(0);
            $table->decimal('total_fee', 8, 2)->default(0);
            $table->date('fine_date')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('payment_status')->default(PaymentStatus::PENDING->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fines');
    }
};
