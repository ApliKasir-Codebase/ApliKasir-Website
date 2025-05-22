// database/migrations/2025_05_14_194423_create_transactions_table.php
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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            // GANTI: id_pengguna menjadi user_id (jika mengikuti saran poin 2)
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->dateTime('tanggal_transaksi');
            $table->decimal('total_belanja', 15, 2);
            $table->decimal('total_modal', 15, 2);
            $table->string('metode_pembayaran', 50);
            $table->string('status_pembayaran', 50);
            $table->foreignId('id_pelanggan')->nullable()->constrained('customers')->nullOnDelete();
            $table->json('detail_items');
            $table->decimal('jumlah_bayar', 15, 2)->nullable();
            $table->decimal('jumlah_kembali', 15, 2)->nullable();
            $table->unsignedBigInteger('id_transaksi_hutang')->nullable()->comment('Referensi ke ID transaksi hutang yg dilunasi');
            $table->timestamps();
            // HAPUS: $table->boolean('is_deleted')->default(false);
            // HAPUS: $table->timestamp('deleted_at')->nullable();
            // TAMBAH: Laravel SoftDeletes
            $table->softDeletes();

            // Indexes
            $table->index(['user_id', 'tanggal_transaksi']); // Sesuaikan dengan nama baru jika diubah
            $table->index('id_pelanggan');
            
            // AKTIFKAN: Self-referencing foreign key
            $table->foreign('id_transaksi_hutang')->references('id')->on('transactions')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};