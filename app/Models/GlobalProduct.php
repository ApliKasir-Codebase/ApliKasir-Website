<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GlobalProduct extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'kode_produk',
        'nama_produk',
        'kategori',
        'merek',
        'deskripsi',
        'gambar_produk',
        'is_active',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];
    
    /**
     * Get all the user products that reference this global product.
     * 
     * Produk global berfungsi sebagai katalog yang bisa dipilih oleh pengguna.
     * Pengguna bisa memilih produk dari katalog global ini untuk ditambahkan
     * ke inventaris toko mereka dengan penyesuaian harga dan stok sesuai
     * kebutuhan bisnis masing-masing.
     */
    public function userProducts(): HasMany
    {
        return $this->hasMany(Product::class, 'global_product_id');
    }
}
