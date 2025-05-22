<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class, // Admin untuk web dashboard
            UserSeeder::class, // Pengguna aplikasi mobile
            GlobalProductSeeder::class, // Produk global (katalog produk)
            ProductSeeder::class, // Contoh produk user (untuk demo)
            CustomerSeeder::class, // Pelanggan
            TransactionSeeder::class, // Transaksi
            AdminActivityLogSeeder::class, // Log aktivitas admin
            SyncLogSeeder::class, // Log sinkronisasi
        ]);
    }
}
