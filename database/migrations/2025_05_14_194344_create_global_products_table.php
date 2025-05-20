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
        Schema::create('global_products', function (Blueprint $table) {
            $table->id();
            $table->string('kode_produk', 100)->unique(); // Kode produk harus unik
            $table->string('nama_produk');
            $table->string('kategori')->nullable();
            $table->string('merek')->nullable(); 
            $table->text('deskripsi')->nullable();
            $table->string('gambar_produk')->nullable();
            $table->timestamps();
            $table->boolean('is_active')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('global_products');
    }
};
