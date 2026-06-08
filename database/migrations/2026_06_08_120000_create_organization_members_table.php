<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('organization_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');                       // jabatan, mis. "Kepala Perpustakaan"
            $table->string('specialization')->nullable(); // bidang/keterangan, mis. "Literasi Digital"
            $table->string('photo')->nullable();          // path foto (disk public)
            $table->boolean('is_featured')->default(false); // tampil sebagai kartu sorotan (pimpinan)
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organization_members');
    }
};
