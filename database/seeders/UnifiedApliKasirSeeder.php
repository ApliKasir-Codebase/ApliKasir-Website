<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UnifiedApliKasirSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Comprehensive seeder that includes all sample data from both web and mobile requirements
     */
    public function run(): void
    {
        // ===========================================
        // 1. SEED ADMINS (Web Application Users)
        // ===========================================
        DB::table('admins')->insert([
            [
                'id' => 1,
                'name' => 'Super Admin',
                'email' => 'admin@aplikasir.com',
                'password' => Hash::make('admin123'),
                'is_super_admin' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Admin Biasa',
                'email' => 'staff@aplikasir.com',
                'password' => Hash::make('staff123'),
                'is_super_admin' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // ===========================================
        // 2. SEED USERS (Mobile App Users)
        // ===========================================
        DB::table('users')->insert([
            [
                'id' => 1,
                'name' => 'Kylian Mbappe',
                'email' => 'kylian@gmail.com',
                'phoneNumber' => '081234567890',
                'storeName' => 'Toko Sembako Mbappe',
                'storeAddress' => 'Jl. Merdeka No. 123, Jakarta Pusat',
                'passwordHash' => password_hash('password123', PASSWORD_DEFAULT),
                'profileImagePath' => null,
                'kodeQR' => 'QR001MBAPPE',
                'last_sync_time' => null,
                'is_active' => true,
                'credit_limit' => 10000000.00,
                'sync_settings' => json_encode([
                    'auto_sync' => true,
                    'sync_interval_minutes' => 30,
                    'sync_on_data_change' => true,
                    'sync_on_network_change' => true
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Sadio Mane',
                'email' => 'sadio@gmail.com',
                'phoneNumber' => '081234567891',
                'storeName' => 'Warung Mane Electronics',
                'storeAddress' => 'Jl. Elektronik No. 456, Bandung',
                'passwordHash' => password_hash('password123', PASSWORD_DEFAULT),
                'profileImagePath' => null,
                'kodeQR' => 'QR002MANE',
                'last_sync_time' => Carbon::now()->subHours(2),
                'is_active' => true,
                'credit_limit' => 5000000.00,
                'sync_settings' => json_encode([
                    'auto_sync' => true,
                    'sync_interval_minutes' => 60,
                    'sync_on_data_change' => false,
                    'sync_on_network_change' => true
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Mohamed Salah',
                'email' => 'salah@gmail.com',
                'phoneNumber' => '081234567892',
                'storeName' => 'Toko Kelontong Salah',
                'storeAddress' => 'Jl. Pahlawan No. 789, Surabaya',
                'passwordHash' => password_hash('password123', PASSWORD_DEFAULT),
                'profileImagePath' => null,
                'kodeQR' => 'QR003SALAH',
                'last_sync_time' => Carbon::now()->subMinutes(30),
                'is_active' => true,
                'credit_limit' => 7500000.00,
                'sync_settings' => json_encode([
                    'auto_sync' => false,
                    'sync_interval_minutes' => 15,
                    'sync_on_data_change' => true,
                    'sync_on_network_change' => false
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // ===========================================
        // 3. SEED GLOBAL PRODUCTS (Reference Catalog)
        // ===========================================
        DB::table('global_products')->insert([
            [
                'id' => 1,
                'kode_produk' => 'GP001',
                'nama_produk' => 'Beras Premium 5kg',
                'kategori' => 'Makanan Pokok',
                'merek' => 'Beras Rojolele',
                'deskripsi' => 'Beras premium kualitas terbaik untuk keluarga',
                'gambar_produk' => 'beras_premium.jpg',
                'harga_referensi' => 75000.00,
                'satuan' => 'kg',
                'barcode' => '8991234567890',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'kode_produk' => 'GP002',
                'nama_produk' => 'Minyak Goreng 1L',
                'kategori' => 'Makanan Pokok',
                'merek' => 'Tropical',
                'deskripsi' => 'Minyak goreng berkualitas untuk masak sehari-hari',
                'gambar_produk' => 'minyak_goreng.jpg',
                'harga_referensi' => 15000.00,
                'satuan' => 'liter',
                'barcode' => '8991234567891',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'kode_produk' => 'GP003',
                'nama_produk' => 'Gula Pasir 1kg',
                'kategori' => 'Makanan Pokok',
                'merek' => 'Gulaku',
                'deskripsi' => 'Gula pasir putih berkualitas tinggi',
                'gambar_produk' => 'gula_pasir.jpg',
                'harga_referensi' => 14000.00,
                'satuan' => 'kg',
                'barcode' => '8991234567892',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'kode_produk' => 'GP004',
                'nama_produk' => 'Sabun Mandi 85g',
                'kategori' => 'Perawatan Tubuh',
                'merek' => 'Lifebuoy',
                'deskripsi' => 'Sabun mandi antibakteri untuk perlindungan keluarga',
                'gambar_produk' => 'sabun_mandi.jpg',
                'harga_referensi' => 3500.00,
                'satuan' => 'pcs',
                'barcode' => '8991234567893',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'kode_produk' => 'GP005',
                'nama_produk' => 'Indomie Goreng',
                'kategori' => 'Makanan Instan',
                'merek' => 'Indofood',
                'deskripsi' => 'Mi instan goreng rasa original',
                'gambar_produk' => 'indomie.jpg',
                'harga_referensi' => 3000.00,
                'satuan' => 'pcs',
                'barcode' => '8991234567894',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // ===========================================
        // 4. SEED PRODUCTS (User-specific products)
        // ===========================================
        $products = [
            // Products for User 1 (Kylian Mbappe)
            [
                'id' => 1,
                'user_id' => 1,
                'global_product_id' => 1,
                'nama_produk' => 'Beras Premium 5kg',
                'kode_produk' => 'BRS001',
                'jumlah_produk' => 50,
                'harga_modal' => 70000.00,
                'harga_jual' => 77000.00,
                'gambar_produk' => 'beras_premium.jpg',
                'kategori' => 'Makanan Pokok',
                'merek' => 'Beras Rojolele',
                'satuan' => 'kg',
                'barcode' => '8991234567890',
                'stok_minimum' => 10,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'user_id' => 1,
                'global_product_id' => 2,
                'nama_produk' => 'Minyak Goreng 1L',
                'kode_produk' => 'MYK001',
                'jumlah_produk' => 30,
                'harga_modal' => 14000.00,
                'harga_jual' => 16000.00,
                'gambar_produk' => 'minyak_goreng.jpg',
                'kategori' => 'Makanan Pokok',
                'merek' => 'Tropical',
                'satuan' => 'liter',
                'barcode' => '8991234567891',
                'stok_minimum' => 5,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'user_id' => 1,
                'global_product_id' => 3,
                'nama_produk' => 'Gula Pasir 1kg',
                'kode_produk' => 'GLA001',
                'jumlah_produk' => 25,
                'harga_modal' => 13000.00,
                'harga_jual' => 15000.00,
                'gambar_produk' => 'gula_pasir.jpg',
                'kategori' => 'Makanan Pokok',
                'merek' => 'Gulaku',
                'satuan' => 'kg',
                'barcode' => '8991234567892',
                'stok_minimum' => 8,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Products for User 2 (Sadio Mane) - Electronics
            [
                'id' => 4,
                'user_id' => 2,
                'global_product_id' => null,
                'nama_produk' => 'Smartphone Samsung A54',
                'kode_produk' => 'SPH001',
                'jumlah_produk' => 10,
                'harga_modal' => 4500000.00,
                'harga_jual' => 5200000.00,
                'gambar_produk' => 'samsung_a54.jpg',
                'kategori' => 'Elektronik',
                'merek' => 'Samsung',
                'satuan' => 'pcs',
                'barcode' => '8991234567895',
                'stok_minimum' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'user_id' => 2,
                'global_product_id' => null,
                'nama_produk' => 'Earphone Bluetooth',
                'kode_produk' => 'EPH001',
                'jumlah_produk' => 25,
                'harga_modal' => 150000.00,
                'harga_jual' => 200000.00,
                'gambar_produk' => 'earphone_bt.jpg',
                'kategori' => 'Aksesoris',
                'merek' => 'Sony',
                'satuan' => 'pcs',
                'barcode' => '8991234567896',
                'stok_minimum' => 5,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Products for User 3 (Mohamed Salah)
            [
                'id' => 6,
                'user_id' => 3,
                'global_product_id' => 4,
                'nama_produk' => 'Sabun Mandi Lifebuoy',
                'kode_produk' => 'SBN001',
                'jumlah_produk' => 100,
                'harga_modal' => 3200.00,
                'harga_jual' => 4000.00,
                'gambar_produk' => 'sabun_mandi.jpg',
                'kategori' => 'Perawatan Tubuh',
                'merek' => 'Lifebuoy',
                'satuan' => 'pcs',
                'barcode' => '8991234567893',
                'stok_minimum' => 20,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'user_id' => 3,
                'global_product_id' => 5,
                'nama_produk' => 'Indomie Goreng',
                'kode_produk' => 'IDM001',
                'jumlah_produk' => 200,
                'harga_modal' => 2800.00,
                'harga_jual' => 3500.00,
                'gambar_produk' => 'indomie.jpg',
                'kategori' => 'Makanan Instan',
                'merek' => 'Indofood',
                'satuan' => 'pcs',
                'barcode' => '8991234567894',
                'stok_minimum' => 50,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('products')->insert($products);

        // ===========================================
        // 5. SEED CUSTOMERS
        // ===========================================
        DB::table('customers')->insert([
            // Customers for User 1 (Kylian Mbappe)
            [
                'id' => 1,
                'user_id' => 1,
                'nama_pelanggan' => 'Ibu Sari',
                'nomor_telepon' => '081234567801',
                'alamat' => 'Jl. Mawar No. 12, Jakarta Pusat',
                'email' => 'sari@gmail.com',
                'tanggal_lahir' => '1985-05-15',
                'jenis_kelamin' => 'P',
                'credit_limit' => 500000.00,
                'total_hutang' => 0.00,
                'kategori_pelanggan' => 'VIP',
                'catatan' => 'Pelanggan setia sejak 2020',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'user_id' => 1,
                'nama_pelanggan' => 'Pak Budi',
                'nomor_telepon' => '081234567802',
                'alamat' => 'Jl. Melati No. 34, Jakarta Selatan',
                'email' => null,
                'tanggal_lahir' => '1975-12-03',
                'jenis_kelamin' => 'L',
                'credit_limit' => 300000.00,
                'total_hutang' => 75000.00,
                'kategori_pelanggan' => 'Regular',
                'catatan' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Customers for User 2 (Sadio Mane)
            [
                'id' => 3,
                'user_id' => 2,
                'nama_pelanggan' => 'Deni Pratama',
                'nomor_telepon' => '081234567803',
                'alamat' => 'Jl. Dago No. 56, Bandung',
                'email' => 'deni@gmail.com',
                'tanggal_lahir' => '1990-03-22',
                'jenis_kelamin' => 'L',
                'credit_limit' => 1000000.00,
                'total_hutang' => 0.00,
                'kategori_pelanggan' => 'Wholesale',
                'catatan' => 'Reseller aktif',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Customers for User 3 (Mohamed Salah)
            [
                'id' => 4,
                'user_id' => 3,
                'nama_pelanggan' => 'Ibu Ratna',
                'nomor_telepon' => '081234567804',
                'alamat' => 'Jl. Pemuda No. 78, Surabaya',
                'email' => 'ratna@yahoo.com',
                'tanggal_lahir' => '1980-07-11',
                'jenis_kelamin' => 'P',
                'credit_limit' => 200000.00,
                'total_hutang' => 25000.00,
                'kategori_pelanggan' => 'Regular',
                'catatan' => 'Suka beli dalam jumlah banyak',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'user_id' => 3,
                'nama_pelanggan' => 'Pak Ahmad',
                'nomor_telepon' => '081234567805',
                'alamat' => 'Jl. Veteran No. 90, Surabaya',
                'email' => null,
                'tanggal_lahir' => '1970-11-28',
                'jenis_kelamin' => 'L',
                'credit_limit' => 150000.00,
                'total_hutang' => 0.00,
                'kategori_pelanggan' => 'Regular',
                'catatan' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // ===========================================
        // 6. SEED TRANSACTIONS
        // ===========================================
        DB::table('transactions')->insert([
            // Transaction 1 - User 1, Customer 1 (Paid)
            [
                'id' => 1,
                'user_id' => 1,
                'tanggal_transaksi' => Carbon::now()->subDays(2),
                'total_belanja' => 108000.00,
                'total_modal' => 97000.00,
                'metode_pembayaran' => 'Tunai',
                'status_pembayaran' => 'Lunas',
                'id_pelanggan' => 1,
                'detail_items' => json_encode([
                    [
                        'kode_produk' => 'BRS001',
                        'nama_produk' => 'Beras Premium 5kg',
                        'quantity' => 1,
                        'harga_modal' => 70000.00,
                        'harga_jual' => 77000.00,
                        'subtotal_modal' => 70000.00,
                        'subtotal_jual' => 77000.00
                    ],
                    [
                        'kode_produk' => 'MYK001',
                        'nama_produk' => 'Minyak Goreng 1L',
                        'quantity' => 2,
                        'harga_modal' => 14000.00,
                        'harga_jual' => 16000.00,
                        'subtotal_modal' => 28000.00,
                        'subtotal_jual' => 32000.00
                    ]
                ]),
                'jumlah_bayar' => 110000.00,
                'jumlah_kembali' => 2000.00,
                'id_transaksi_hutang' => null,
                'nomor_nota' => 'INV-001-20250611',
                'total_diskon' => 1000.00,
                'pajak' => 0.00,
                'kasir' => 'Kylian Mbappe',
                'catatan' => 'Transaksi normal',
                'shift' => 'Pagi',
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            // Transaction 2 - User 1, Customer 2 (Credit/Unpaid)
            [
                'id' => 2,
                'user_id' => 1,
                'tanggal_transaksi' => Carbon::now()->subDays(1),
                'total_belanja' => 75000.00,
                'total_modal' => 65000.00,
                'metode_pembayaran' => 'Kredit/Hutang',
                'status_pembayaran' => 'Belum Lunas',
                'id_pelanggan' => 2,
                'detail_items' => json_encode([
                    [
                        'kode_produk' => 'BRS001',
                        'nama_produk' => 'Beras Premium 5kg',
                        'quantity' => 1,
                        'harga_modal' => 70000.00,
                        'harga_jual' => 77000.00,
                        'subtotal_modal' => 70000.00,
                        'subtotal_jual' => 77000.00
                    ]
                ]),
                'jumlah_bayar' => 0.00,
                'jumlah_kembali' => 0.00,
                'id_transaksi_hutang' => null,
                'nomor_nota' => 'INV-002-20250612',
                'total_diskon' => 2000.00,
                'pajak' => 0.00,
                'kasir' => 'Kylian Mbappe',
                'catatan' => 'Hutang pelanggan',
                'shift' => 'Siang',
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            // Transaction 3 - User 2, Customer 3 (Electronics)
            [
                'id' => 3,
                'user_id' => 2,
                'tanggal_transaksi' => Carbon::now()->subHours(5),
                'total_belanja' => 5200000.00,
                'total_modal' => 4500000.00,
                'metode_pembayaran' => 'Transfer Bank',
                'status_pembayaran' => 'Lunas',
                'id_pelanggan' => 3,
                'detail_items' => json_encode([
                    [
                        'kode_produk' => 'SPH001',
                        'nama_produk' => 'Smartphone Samsung A54',
                        'quantity' => 1,
                        'harga_modal' => 4500000.00,
                        'harga_jual' => 5200000.00,
                        'subtotal_modal' => 4500000.00,
                        'subtotal_jual' => 5200000.00
                    ]
                ]),
                'jumlah_bayar' => 5200000.00,
                'jumlah_kembali' => 0.00,
                'id_transaksi_hutang' => null,
                'nomor_nota' => 'INV-003-20250613',
                'total_diskon' => 0.00,
                'pajak' => 0.00,
                'kasir' => 'Sadio Mane',
                'catatan' => 'Penjualan smartphone',
                'shift' => 'Siang',
                'created_at' => Carbon::now()->subHours(5),
                'updated_at' => Carbon::now()->subHours(5),
            ],
            // Transaction 4 - User 3, Customer 4 (Multiple items)
            [
                'id' => 4,
                'user_id' => 3,
                'tanggal_transaksi' => Carbon::now()->subHours(2),
                'total_belanja' => 25500.00,
                'total_modal' => 22200.00,
                'metode_pembayaran' => 'Tunai',
                'status_pembayaran' => 'Lunas',
                'id_pelanggan' => 4,
                'detail_items' => json_encode([
                    [
                        'kode_produk' => 'SBN001',
                        'nama_produk' => 'Sabun Mandi Lifebuoy',
                        'quantity' => 5,
                        'harga_modal' => 3200.00,
                        'harga_jual' => 4000.00,
                        'subtotal_modal' => 16000.00,
                        'subtotal_jual' => 20000.00
                    ],
                    [
                        'kode_produk' => 'IDM001',
                        'nama_produk' => 'Indomie Goreng',
                        'quantity' => 2,
                        'harga_modal' => 2800.00,
                        'harga_jual' => 3500.00,
                        'subtotal_modal' => 5600.00,
                        'subtotal_jual' => 7000.00
                    ]
                ]),
                'jumlah_bayar' => 26000.00,
                'jumlah_kembali' => 500.00,
                'id_transaksi_hutang' => null,
                'nomor_nota' => 'INV-004-20250613',
                'total_diskon' => 1500.00,
                'pajak' => 0.00,
                'kasir' => 'Mohamed Salah',
                'catatan' => 'Belanja bulanan',
                'shift' => 'Sore',
                'created_at' => Carbon::now()->subHours(2),
                'updated_at' => Carbon::now()->subHours(2),
            ],
            // Transaction 5 - User 3, Customer 4 (Credit transaction)
            [
                'id' => 5,
                'user_id' => 3,
                'tanggal_transaksi' => Carbon::now()->subMinutes(30),
                'total_belanja' => 25000.00,
                'total_modal' => 22400.00,
                'metode_pembayaran' => 'Kredit/Hutang',
                'status_pembayaran' => 'Belum Lunas',
                'id_pelanggan' => 4,
                'detail_items' => json_encode([
                    [
                        'kode_produk' => 'IDM001',
                        'nama_produk' => 'Indomie Goreng',
                        'quantity' => 8,
                        'harga_modal' => 2800.00,
                        'harga_jual' => 3500.00,
                        'subtotal_modal' => 22400.00,
                        'subtotal_jual' => 28000.00
                    ]
                ]),
                'jumlah_bayar' => 0.00,
                'jumlah_kembali' => 0.00,
                'id_transaksi_hutang' => null,
                'nomor_nota' => 'INV-005-20250613',
                'total_diskon' => 3000.00,
                'pajak' => 0.00,
                'kasir' => 'Mohamed Salah',
                'catatan' => 'Hutang untuk stok warung',
                'shift' => 'Sore',
                'created_at' => Carbon::now()->subMinutes(30),
                'updated_at' => Carbon::now()->subMinutes(30),
            ],
        ]);

        // ===========================================
        // 7. SEED SYNC LOGS
        // ===========================================
        DB::table('sync_logs')->insert([
            [
                'id' => 1,
                'user_id' => 1,
                'sync_start_time' => Carbon::now()->subHours(6),
                'sync_end_time' => Carbon::now()->subHours(6)->addSeconds(45),
                'direction' => 'Up',
                'status' => 'Success',
                'items_uploaded' => 15,
                'items_downloaded' => 0,
                'conflicts_detected' => 0,
                'conflicts_resolved' => 0,
                'error_message' => null,
                'details' => json_encode([
                    'products_uploaded' => 3,
                    'customers_uploaded' => 2,
                    'transactions_uploaded' => 10,
                    'performance' => ['duration_ms' => 45000]
                ]),
                'client_last_sync_time' => Carbon::now()->subDays(1),
                'server_sync_time' => Carbon::now()->subHours(6),
                'duration_ms' => 45000,
                'data_size_kb' => 125.5,
                'app_version' => '1.0.0',
                'device_info' => 'Android 12, MI 8 Pro',
                'created_at' => Carbon::now()->subHours(6),
                'updated_at' => Carbon::now()->subHours(6),
            ],
            [
                'id' => 2,
                'user_id' => 2,
                'sync_start_time' => Carbon::now()->subHours(3),
                'sync_end_time' => Carbon::now()->subHours(3)->addSeconds(30),
                'direction' => 'Down',
                'status' => 'Success',
                'items_uploaded' => 0,
                'items_downloaded' => 8,
                'conflicts_detected' => 1,
                'conflicts_resolved' => 1,
                'error_message' => null,
                'details' => json_encode([
                    'products_downloaded' => 5,
                    'customers_downloaded' => 1,
                    'transactions_downloaded' => 2,
                    'conflicts' => ['product_price_conflict_resolved']
                ]),
                'client_last_sync_time' => Carbon::now()->subHours(4),
                'server_sync_time' => Carbon::now()->subHours(3),
                'duration_ms' => 30000,
                'data_size_kb' => 89.2,
                'app_version' => '1.0.0',
                'device_info' => 'Android 11, Samsung A54',
                'created_at' => Carbon::now()->subHours(3),
                'updated_at' => Carbon::now()->subHours(3),
            ],
            [
                'id' => 3,
                'user_id' => 3,
                'sync_start_time' => Carbon::now()->subMinutes(45),
                'sync_end_time' => null,
                'direction' => 'Up',
                'status' => 'Failed',
                'items_uploaded' => 0,
                'items_downloaded' => 0,
                'conflicts_detected' => 0,
                'conflicts_resolved' => 0,
                'error_message' => 'Network timeout during upload',
                'details' => json_encode([
                    'error_type' => 'network_timeout',
                    'retry_count' => 3,
                    'items_pending' => 25
                ]),
                'client_last_sync_time' => Carbon::now()->subHours(2),
                'server_sync_time' => null,
                'duration_ms' => null,
                'data_size_kb' => null,
                'app_version' => '1.0.0',
                'device_info' => 'Android 13, Pixel 7',
                'created_at' => Carbon::now()->subMinutes(45),
                'updated_at' => Carbon::now()->subMinutes(45),
            ],
        ]);

        // ===========================================
        // 8. SEED ADMIN ACTIVITY LOGS
        // ===========================================
        DB::table('admin_activity_logs')->insert([
            [
                'id' => 1,
                'admin_id' => 1,
                'module' => 'users',
                'action' => 'viewed',
                'description' => 'Viewed user management dashboard',
                'details' => json_encode(['total_users' => 3, 'active_users' => 3]),
                'ip_address' => '192.168.1.100',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'target_id' => null,
                'target_type' => null,
                'created_at' => Carbon::now()->subHours(1),
                'updated_at' => Carbon::now()->subHours(1),
            ],
            [
                'id' => 2,
                'admin_id' => 1,
                'module' => 'global_products',
                'action' => 'created',
                'description' => 'Added new global product: Beras Premium 5kg',
                'details' => json_encode([
                    'product_id' => 1,
                    'product_name' => 'Beras Premium 5kg',
                    'category' => 'Makanan Pokok'
                ]),
                'ip_address' => '192.168.1.100',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'target_id' => 1,
                'target_type' => 'GlobalProduct',
                'created_at' => Carbon::now()->subMinutes(30),
                'updated_at' => Carbon::now()->subMinutes(30),
            ],
        ]);

        $this->command->info('✅ Unified ApliKasir database seeded successfully!');
        $this->command->info('📊 Data Summary:');
        $this->command->info('   - Admins: 2');
        $this->command->info('   - Mobile Users: 3');
        $this->command->info('   - Global Products: 5');
        $this->command->info('   - User Products: 7');
        $this->command->info('   - Customers: 5');
        $this->command->info('   - Transactions: 5');
        $this->command->info('   - Sync Logs: 3');
        $this->command->info('   - Admin Activity Logs: 2');
    }
}
