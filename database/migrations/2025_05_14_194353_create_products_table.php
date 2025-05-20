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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pengguna')->constrained('users', 'id')->cascadeOnDelete();
            $table->foreignId('global_product_id')->nullable()->constrained('global_products', 'id')->nullOnDelete(); // Reference ke produk global
            $table->string('nama_produk');
            $table->string('kode_produk', 100)->nullable();
            $table->integer('jumlah_produk')->default(0);
            $table->decimal('harga_modal', 15, 2)->default(0);
            $table->decimal('harga_jual', 15, 2)->default(0);
            $table->string('gambar_produk')->nullable(); // Bisa gunakan gambar dari global atau custom
            $table->timestamps();
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('deleted_at')->nullable();

            // Indexes
            $table->index('id_pengguna');
            $table->index(['id_pengguna', 'kode_produk']);
            $table->index('global_product_id'); // Index untuk global product
            // Unique constraint per user
            $table->unique(['id_pengguna', 'kode_produk'], 'unique_product_code_user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
