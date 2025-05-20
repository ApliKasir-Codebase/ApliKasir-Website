<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\GlobalProduct;
use Illuminate\Database\Seeder;

class VerifyProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Verifying user products are based on global products...');
        
        $allProducts = Product::all();
        $globalProducts = GlobalProduct::all();
        
        $totalProducts = $allProducts->count();
        $productsWithGlobalId = $allProducts->whereNotNull('global_product_id')->count();
        
        $this->command->info("Total user products: $totalProducts");
        $this->command->info("Products with global_product_id: $productsWithGlobalId");
        $this->command->info("Percentage linked to global products: " . 
            ($totalProducts > 0 ? round($productsWithGlobalId / $totalProducts * 100, 2) . '%' : '0%'));
        
        // Check if any products are linked to non-existent global products
        $invalidLinks = 0;
        $globalProductIds = $globalProducts->pluck('id')->toArray();
        
        foreach ($allProducts as $product) {
            if ($product->global_product_id !== null && !in_array($product->global_product_id, $globalProductIds)) {
                $invalidLinks++;
                $this->command->error("Product ID {$product->id} linked to non-existent global product ID {$product->global_product_id}");
            }
        }
        
        if ($invalidLinks === 0) {
            $this->command->info('All products correctly linked to existing global products.');
        } else {
            $this->command->error("Found $invalidLinks products with invalid global product references!");
        }
    }
}
