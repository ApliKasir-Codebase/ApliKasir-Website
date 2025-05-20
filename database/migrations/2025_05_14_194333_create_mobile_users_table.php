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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phoneNumber', 50)->unique();
            $table->string('storeName');
            $table->text('storeAddress');
            $table->string('passwordHash');
            $table->string('profileImagePath')->nullable();
            $table->timestamp('last_sync_time')->nullable()->comment('Timestamp sinkronisasi terakhir dari server');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
