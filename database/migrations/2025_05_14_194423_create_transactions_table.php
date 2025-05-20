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
            $table->foreignId('id_pengguna')->constrained('users')->cascadeOnDelete();
            $table->dateTime('tanggal_transaksi');
            $table->decimal('total_belanja', 15, 2);
            $table->decimal('total_modal', 15, 2);
            $table->string('metode_pembayaran', 50);  // 'Tunai', 'QRIS', 'Kredit', dll.
            $table->string('status_pembayaran', 50);  // 'Lunas', 'Belum Lunas'
            $table->foreignId('id_pelanggan')->nullable()->constrained('customers')->nullOnDelete();
            $table->json('detail_items');
            $table->decimal('jumlah_bayar', 15, 2)->nullable();
            $table->decimal('jumlah_kembali', 15, 2)->nullable();
            $table->unsignedBigInteger('id_transaksi_hutang')->nullable()->comment('Referensi ke ID transaksi hutang yg dilunasi');
            $table->timestamps();
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('deleted_at')->nullable();

            // Indexes
            $table->index(['id_pengguna', 'tanggal_transaksi']);
            $table->index('id_pelanggan');
            
            // Self-referencing foreign key
            // Uncomment ini jika diperlukan validasi yang lebih ketat
            // $table->foreign('id_transaksi_hutang')->references('id')->on('transactions')->nullOnDelete();
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
