<?php

use App\Models\Admin;
use App\Models\GlobalProduct;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

test('admin can add global product to inventory for a store', function () {
    // Create a store user
    $storeUser = User::create([
        'name' => 'Toko Sejahtera',
        'email' => 'toko@example.com',
        'phoneNumber' => '08123456789',
        'storeName' => 'Toko Sejahtera',
        'storeAddress' => 'Jl. Merdeka No.1',
        'passwordHash' => Hash::make('password'),
        'is_active' => true,
    ]);

    $admin = Admin::create([
        'name' => 'Super Admin',
        'email' => 'admin@example.com',
        'password' => Hash::make('password'),
        'is_super_admin' => true,
    ]);

    $global = GlobalProduct::create([
        'kode_produk' => 'GLOBAL-001',
        'nama_produk' => 'Produk Global Test',
        'kategori' => 'Makanan',
        'merek' => 'Indofood',
        'deskripsi' => 'Deskripsi produk global',
        'is_active' => true,
    ]);

    $this->actingAs($admin)
        ->withoutMiddleware()
        ->post(route('products.store'), [
            'user_id' => $storeUser->id,
            'global_product_id' => $global->id,
            'jumlah_produk' => 50,
            'harga_modal' => 10000,
            'harga_jual' => 15000,
        ])
        ->assertRedirect(route('products.index'));

    $this->assertDatabaseHas('products', [
        'user_id' => $storeUser->id,
        'global_product_id' => $global->id,
        'kode_produk' => 'GLOBAL-001',
        'nama_produk' => 'Produk Global Test',
        'jumlah_produk' => 50,
        'harga_modal' => 10000,
        'harga_jual' => 15000,
    ]);
});

test('admin can verify global product code via API', function () {
    $admin = Admin::create([
        'name' => 'Admin',
        'email' => 'admin@verify.com',
        'password' => Hash::make('password'),
    ]);

    $global = GlobalProduct::create([
        'kode_produk' => 'VERIFY-001',
        'nama_produk' => 'Produk Verifikasi',
        'is_active' => true,
    ]);

    $this->actingAs($admin)
        ->withoutMiddleware()
        ->post(route('products.verify-code'), [
            'kode_produk' => 'VERIFY-001',
        ])
        ->assertJson([
            'success' => true,
        ])
        ->assertJsonFragment([
            'kode_produk' => 'VERIFY-001',
        ]);
});

test('admin can create inventory product without global product reference', function () {
    $storeUser = User::create([
        'name' => 'Toko Melati',
        'email' => 'melati@example.com',
        'phoneNumber' => '08987654321',
        'storeName' => 'Toko Melati',
        'storeAddress' => 'Jl. Mawar',
        'passwordHash' => Hash::make('password'),
        'is_active' => true,
    ]);

    $admin = Admin::create([
        'name' => 'Admin',
        'email' => 'admin2@example.com',
        'password' => Hash::make('password'),
    ]);

    $this->actingAs($admin)
        ->withoutMiddleware()
        ->post(route('products.store'), [
            'user_id' => $storeUser->id,
            'kode_produk' => 'MANUAL-001',
            'nama_produk' => 'Produk Manual',
            'jumlah_produk' => 100,
            'harga_modal' => 5000,
            'harga_jual' => 7500,
            'kategori' => 'Peralatan',
            'merek' => 'Local',
        ])
        ->assertRedirect(route('products.index'));

    $this->assertDatabaseHas('products', [
        'user_id' => $storeUser->id,
        'kode_produk' => 'MANUAL-001',
        'nama_produk' => 'Produk Manual',
        'jumlah_produk' => 100,
    ]);
});
