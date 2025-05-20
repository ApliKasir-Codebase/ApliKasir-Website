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
        Schema::create('sync_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->dateTime('sync_start_time')->useCurrent();
            $table->dateTime('sync_end_time')->nullable();
            $table->string('direction', 10)->comment('"Up" (Client -> Server) or "Down" (Server -> Client)');
            $table->string('status', 50)->comment('"Success", "Partial Failure", "Failed", "Pending"');
            $table->integer('items_uploaded')->default(0);
            $table->integer('items_downloaded')->default(0);
            $table->text('error_message')->nullable();
            $table->json('details')->nullable()->comment('Optional: Store counts per table, specific errors, etc.');
            $table->dateTime('client_last_sync_time')->nullable()->comment('Timestamp terakhir klien sebelum sync ini');
            $table->dateTime('server_sync_time')->nullable()->comment('Timestamp server saat sync ini selesai');
            
            // Index
            $table->index(['user_id', 'sync_start_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sync_logs');
    }
};
