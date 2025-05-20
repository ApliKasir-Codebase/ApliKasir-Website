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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pengguna')->constrained('users')->cascadeOnDelete();
            $table->string('nama_pelanggan');
            $table->string('nomor_telepon', 50)->nullable();
            $table->timestamps();
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('deleted_at')->nullable();

            // Index
            $table->index('id_pengguna');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
