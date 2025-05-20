<?php

namespace Database\Seeders;

use App\Models\GlobalProduct;
use Illuminate\Database\Seeder;

class GlobalProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Seeder ini menciptakan katalog produk global yang nantinya bisa dipilih oleh pengguna
     * untuk dimasukkan ke dalam inventaris toko mereka.
     */
    public function run(): void
    {
        $this->command->info('Seeding katalog produk global...');
        
        // Contoh data produk global untuk katalog
        $globalProducts = [
            [
                'kode_produk' => 'GP001',
                'nama_produk' => 'Indomie Goreng',
                'kategori' => 'Makanan Instan',
                'merek' => 'Indomie',
                'deskripsi' => 'Mie instan goreng original',
                'gambar_produk' => 'global-products/indomie-goreng.jpg',
            ],
            [
                'kode_produk' => 'GP002',
                'nama_produk' => 'Indomie Kuah',
                'kategori' => 'Makanan Instan',
                'merek' => 'Indomie',
                'deskripsi' => 'Mie instan kuah original',
                'gambar_produk' => 'global-products/indomie-kuah.jpg',
            ],
            [
                'kode_produk' => 'GP003',
                'nama_produk' => 'Aqua 600ml',
                'kategori' => 'Minuman',
                'merek' => 'Aqua',
                'deskripsi' => 'Air mineral dalam kemasan botol 600ml',
                'gambar_produk' => 'global-products/aqua-600ml.jpg',
            ],
            [
                'kode_produk' => 'GP004',
                'nama_produk' => 'Coca Cola 1.5L',
                'kategori' => 'Minuman',
                'merek' => 'Coca Cola',
                'deskripsi' => 'Minuman soda dalam kemasan botol 1.5 liter',
                'gambar_produk' => 'global-products/coca-cola-1.5l.jpg',
            ],
            [
                'kode_produk' => 'GP005',
                'nama_produk' => 'Beng Beng',
                'kategori' => 'Makanan Ringan',
                'merek' => 'Beng Beng',
                'deskripsi' => 'Wafer berlapis cokelat',
                'gambar_produk' => 'global-products/beng-beng.jpg',
            ],
        ];

        foreach ($globalProducts as $product) {
            GlobalProduct::create($product);
        }
    }
}
