<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use App\Models\GlobalProduct;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class GlobalProductUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * This seeder ensures users only have products that exist in the global products database.
     * It removes existing user products first, then creates new ones only based on global products.
     */
    public function run(): void
    {
        $this->command->info('Starting GlobalProductUserSeeder...');
        
        try {
            // Disable foreign key checks temporarily to allow truncating
            Schema::disableForeignKeyConstraints();
            
            // Clear existing user products
            $this->command->info('Clearing existing user products...');
            Product::truncate();
            
            // Re-enable foreign key checks
            Schema::enableForeignKeyConstraints();
            
            // Get all users and global products
            $users = User::all();
            $globalProducts = GlobalProduct::all();
            
            if ($users->count() > 0 && $globalProducts->count() > 0) {
                foreach ($users as $user) {
                    // Define store code prefix based on the user's store name
                    $storePrefix = strtoupper(substr(preg_replace('/[^a-zA-Z0-9]/', '', $user->storeName), 0, 2));
                    if (empty($storePrefix)) {
                        $storePrefix = 'ST'; // Default prefix if storeName doesn't contain letters or numbers
                    }
                    
                    // Assign a random subset of global products to each user
                    $randomGlobalProducts = $globalProducts->shuffle()->take(rand(2, $globalProducts->count()));
                    
                    foreach ($randomGlobalProducts as $globalProduct) {
                        // Create user product based on global product
                        Product::create([
                            'user_id' => $user->id,
                            'global_product_id' => $globalProduct->id,
                            'nama_produk' => $globalProduct->nama_produk,
                            'kode_produk' => $storePrefix . '-' . $globalProduct->kode_produk,
                            'jumlah_produk' => rand(10, 100), // Random stock quantity
                            'harga_modal' => round(rand(1000, 10000), -2), // Random purchase price rounded to hundreds
                            'harga_jual' => round(rand(2000, 15000), -2), // Random selling price rounded to hundreds
                            'gambar_produk' => $globalProduct->gambar_produk,
                        ]);
                    }
                }            
                $this->command->info('User products created successfully, based only on global products.');
            } else {
                $this->command->error('Cannot create user products. No users or global products found.');
            }
        } catch (\Exception $e) {
            $this->command->error('Error in GlobalProductUserSeeder: ' . $e->getMessage());
        } finally {
            // Make sure foreign keys are re-enabled even if an exception occurred
            Schema::enableForeignKeyConstraints();
        }
    }
}
