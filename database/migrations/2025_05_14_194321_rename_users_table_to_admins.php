<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Menyalin struktur tabel users ke admins
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('is_super_admin')->default(false);
            $table->rememberToken();
            $table->timestamps();
        });

        // Jika tabel users sudah ada data, salin datanya
        if (Schema::hasTable('users')) {
            DB::statement('INSERT INTO admins (id, name, email, email_verified_at, password, remember_token, created_at, updated_at) 
                          SELECT id, name, email, email_verified_at, password, remember_token, created_at, updated_at FROM users');
        }

        // Untuk menangani sessions, kita tidak perlu mengubah struktur
        // karena Laravel session driver mengharapkan kolom 'user_id'
        // Kita biarkan saja, tetapi hapus relation ke users (jika ada)
        // dan pastikan semua sesi current tetap berfungsi

        // Hapus tabel users lama setelah semua referensi diperbaiki
        Schema::dropIfExists('users');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Kembalikan struktur tabel users
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        // Salin data dari admins ke users
        if (Schema::hasTable('admins')) {
            DB::statement('INSERT INTO users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at) 
                          SELECT id, name, email, email_verified_at, password, remember_token, created_at, updated_at FROM admins');
        }

        // Hapus tabel admins
        Schema::dropIfExists('admins');
    }
};
