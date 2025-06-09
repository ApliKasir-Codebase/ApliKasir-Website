<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Seeder ini membuat contoh produk untuk user pertama berdasarkan produk global,
     * untuk mendemonstrasikan bahwa pengguna dapat memilih produk dari katalog.
     * Dalam aplikasi sesungguhnya, pengguna akan memilih sendiri produk dari katalog.
     */
    public function run(): void
    {
        $this->command->info('Membuat contoh produk untuk demo...');
        
        try {
            // Get user and catalog products
            $users = User::all();
            $catalogProducts = Product::whereNull('user_id')->get();
              if ($users->count() > 0 && $catalogProducts->count() > 0) {
                // Hanya membuat produk untuk user pertama sebagai contoh
                $user = $users->first();
                $storePrefix = strtoupper(substr(preg_replace('/[^a-zA-Z0-9]/', '', $user->storeName), 0, 2));
                if (empty($storePrefix)) {
                    $storePrefix = 'ST';
                }
                
                // Pilih beberapa produk dari katalog sebagai contoh
                $selectedCatalogProducts = $catalogProducts->take(3); // Ambil 3 produk pertama dari katalog
                
                $this->command->info("Membuat contoh produk untuk user: {$user->name} ({$user->storeName})");
                
                foreach ($selectedCatalogProducts as $catalogProduct) {
                    // Contoh produk dengan harga dan stok yang berbeda
                    Product::create([
                        'user_id' => $user->id,
                        'nama_produk' => $catalogProduct->nama_produk,
                        'kode_produk' => $storePrefix . '-' . $catalogProduct->kode_produk,
                        'jumlah_produk' => rand(10, 50),
                        'harga_modal' => round(rand(1000, 5000), -2), // Harga modal acak
                        'harga_jual' => round(rand(6000, 10000), -2), // Harga jual acak
                        'gambar_produk' => $catalogProduct->gambar_produk,
                    ]);
                }
                  // Buat juga contoh produk custom (tidak dari katalog)
                Product::create([
                    'user_id' => $user->id,
                    'nama_produk' => 'Produk Custom Toko',
                    'kode_produk' => $storePrefix . '-CUSTOM001',
                    'jumlah_produk' => 25,
                    'harga_modal' => 5000,
                    'harga_jual' => 8000,
                    'gambar_produk' => null, // Tidak ada gambar
                ]);
                
                $this->command->info('Contoh produk berhasil dibuat!');
                $this->command->info('Catatan: Dalam aplikasi sebenarnya, pengguna akan memilih sendiri produk dari katalog.');
            } else {
                $this->command->error('Cannot create demo products. No users or catalog products found.');
            }
        } catch (\Exception $e) {
            $this->command->error('Error in ProductSeeder: ' . $e->getMessage());
        }
    }
}
