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
        // Create a new consolidated products table with all necessary columns
        Schema::create('consolidated_products', function (Blueprint $table) {
            $table->id();
            $table->string('kode_produk', 100)->nullable();
            $table->string('nama_produk');
            $table->string('kategori')->nullable();
            $table->string('merek')->nullable();
            $table->text('deskripsi')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->integer('jumlah_produk')->default(0);
            $table->decimal('harga_modal', 15, 2)->default(0);
            $table->decimal('harga_jual', 15, 2)->default(0);
            $table->string('gambar_produk')->nullable();
            $table->boolean('is_active')->default(1);
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('user_id');
            $table->index('kode_produk');
        });
        
        // Copy data from global_products to the new consolidated table (if exists)
        if (Schema::hasTable('global_products')) {
            \DB::statement('
                INSERT INTO consolidated_products 
                (kode_produk, nama_produk, kategori, merek, deskripsi, gambar_produk, is_active, created_at, updated_at)
                SELECT kode_produk, nama_produk, kategori, merek, deskripsi, gambar_produk, is_active, created_at, updated_at
                FROM global_products
            ');
        }
        
        // Copy data from user products to the new consolidated table (if exists)
        if (Schema::hasTable('products')) {
            \DB::statement('
                INSERT INTO consolidated_products 
                (kode_produk, nama_produk, user_id, jumlah_produk, harga_modal, harga_jual, gambar_produk, created_at, updated_at)
                SELECT kode_produk, nama_produk, user_id, jumlah_produk, harga_modal, harga_jual, gambar_produk, created_at, updated_at
                FROM products
            ');
        }
        
        // Drop original tables
        Schema::dropIfExists('products');
        Schema::dropIfExists('global_products');
        
        // Rename consolidated table to products
        Schema::rename('consolidated_products', 'products');
        
        // Update reference in transactions table (if exists)
        if (Schema::hasTable('transactions')) {
            Schema::table('transactions', function (Blueprint $table) {
                if (Schema::hasColumn('transactions', 'global_product_id')) {
                    $table->renameColumn('global_product_id', 'product_id');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Create temporary table for data separation
        Schema::create('temp_products', function (Blueprint $table) {
            $table->id();
            $table->string('kode_produk', 100)->nullable();
            $table->string('nama_produk');
            $table->string('kategori')->nullable();
            $table->string('merek')->nullable();
            $table->text('deskripsi')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->integer('jumlah_produk')->default(0);
            $table->decimal('harga_modal', 15, 2)->default(0);
            $table->decimal('harga_jual', 15, 2)->default(0);
            $table->string('gambar_produk')->nullable();
            $table->boolean('is_active')->default(1);
            $table->timestamps();
            $table->softDeletes();
        });
        
        // Copy all data to temp table
        \DB::statement('INSERT INTO temp_products SELECT * FROM products');
        
        // Create global_products table
        Schema::create('global_products', function (Blueprint $table) {
            $table->id();
            $table->string('kode_produk', 100)->nullable();
            $table->string('nama_produk');
            $table->string('kategori')->nullable();
            $table->string('merek')->nullable();
            $table->text('deskripsi')->nullable();
            $table->string('gambar_produk')->nullable();
            $table->boolean('is_active')->default(1);
            $table->timestamps();
            $table->softDeletes();
        });
        
        // Create original products table
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('global_product_id')->nullable()->constrained('global_products')->nullOnDelete();
            $table->string('nama_produk');
            $table->string('kode_produk', 100)->nullable();
            $table->integer('jumlah_produk')->default(0);
            $table->decimal('harga_modal', 15, 2)->default(0);
            $table->decimal('harga_jual', 15, 2)->default(0);
            $table->string('gambar_produk')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('user_id');
            $table->index(['user_id', 'kode_produk']);
            $table->index('global_product_id');
            $table->unique(['user_id', 'kode_produk'], 'unique_product_code_user');
        });
        
        // Copy global product data (products without user_id)
        \DB::statement('
            INSERT INTO global_products
            (kode_produk, nama_produk, kategori, merek, deskripsi, gambar_produk, is_active, created_at, updated_at, deleted_at)
            SELECT kode_produk, nama_produk, kategori, merek, deskripsi, gambar_produk, is_active, created_at, updated_at, deleted_at
            FROM temp_products
            WHERE user_id IS NULL
        ');
        
        // Copy user product data (products with user_id)
        \DB::statement('
            INSERT INTO products
            (user_id, nama_produk, kode_produk, jumlah_produk, harga_modal, harga_jual, gambar_produk, created_at, updated_at, deleted_at)
            SELECT user_id, nama_produk, kode_produk, jumlah_produk, harga_modal, harga_jual, gambar_produk, created_at, updated_at, deleted_at
            FROM temp_products
            WHERE user_id IS NOT NULL
        ');
        
        // Update references in transactions table
        if (Schema::hasTable('transactions')) {
            Schema::table('transactions', function (Blueprint $table) {
                if (Schema::hasColumn('transactions', 'product_id')) {
                    $table->renameColumn('product_id', 'global_product_id');
                }
            });
        }
        
        // Clean up
        Schema::dropIfExists('temp_products');
        Schema::dropIfExists('products_consolidated');
    }
};
