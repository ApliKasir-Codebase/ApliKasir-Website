<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\SoftDeletes;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            // GANTI: id_pengguna menjadi user_id
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('global_product_id')->nullable()->constrained('global_products')->nullOnDelete();
            $table->string('nama_produk');
            $table->string('kode_produk', 100)->nullable();
            $table->integer('jumlah_produk')->default(0);
            $table->decimal('harga_modal', 15, 2)->default(0);
            $table->decimal('harga_jual', 15, 2)->default(0);
            $table->string('gambar_produk')->nullable();
            $table->timestamps();
            // HAPUS: $table->boolean('is_deleted')->default(false);
            // HAPUS: $table->timestamp('deleted_at')->nullable();
            // TAMBAH: Laravel SoftDeletes
            $table->softDeletes(); // Ini akan membuat kolom deleted_at

            // Indexes
            $table->index('user_id'); // Sesuaikan dengan nama baru
            $table->index(['user_id', 'kode_produk']); // Sesuaikan dengan nama baru
            $table->index('global_product_id');
            // Unique constraint per user
            // Sesuaikan nama kolom di unique constraint
            $table->unique(['user_id', 'kode_produk'], 'unique_product_code_user');
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