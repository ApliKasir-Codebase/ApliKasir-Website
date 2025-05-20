<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use App\Models\GlobalProduct;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Seeder ini membuat contoh produk untuk user pertama berdasarkan produk global,
     * untuk mendemonstrasikan bahwa pengguna dapat memilih produk dari katalog global.
     * Dalam aplikasi sesungguhnya, pengguna akan memilih sendiri produk dari katalog.
     */
    public function run(): void
    {
        $this->command->info('Membuat contoh produk untuk demo...');
        
        try {
            // Get user and global products
            $users = User::all();
            $globalProducts = GlobalProduct::all();
            
            if ($users->count() > 0 && $globalProducts->count() > 0) {
                // Hanya membuat produk untuk user pertama sebagai contoh
                $user = $users->first();
                $storePrefix = strtoupper(substr(preg_replace('/[^a-zA-Z0-9]/', '', $user->storeName), 0, 2));
                if (empty($storePrefix)) {
                    $storePrefix = 'ST';
                }
                
                // Pilih beberapa produk global sebagai contoh
                $selectedGlobalProducts = $globalProducts->take(3); // Ambil 3 produk global pertama
                
                $this->command->info("Membuat contoh produk untuk user: {$user->name} ({$user->storeName})");
                
                foreach ($selectedGlobalProducts as $globalProduct) {
                    // Contoh produk dengan harga dan stok yang berbeda
                    Product::create([
                        'id_pengguna' => $user->id,
                        'global_product_id' => $globalProduct->id,
                        'nama_produk' => $globalProduct->nama_produk,
                        'kode_produk' => $storePrefix . '-' . $globalProduct->kode_produk,
                        'jumlah_produk' => rand(10, 50),
                        'harga_modal' => round(rand(1000, 5000), -2), // Harga modal acak
                        'harga_jual' => round(rand(6000, 10000), -2), // Harga jual acak
                        'gambar_produk' => $globalProduct->gambar_produk,
                    ]);
                }
                
                // Buat juga contoh produk custom (tidak dari katalog global)
                Product::create([
                    'id_pengguna' => $user->id,
                    'global_product_id' => null, // Produk custom
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
                $this->command->error('Cannot create demo products. No users or global products found.');
            }
        } catch (\Exception $e) {
            $this->command->error('Error in ProductSeeder: ' . $e->getMessage());
        }
    }
}
