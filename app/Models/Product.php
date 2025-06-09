<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;
    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';
    
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
        'user_id',
        'jumlah_produk',
        'harga_modal',
        'harga_jual',
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
        'jumlah_produk' => 'integer',
        'harga_modal' => 'decimal:2',
        'harga_jual' => 'decimal:2',
    ];
    
    /**
     * Get all the transactions that reference this product.
     * 
     * Produk berfungsi sebagai repositori produk yang bisa direferensikan dalam transaksi.
     * Produk bisa bersifat global (tidak memiliki user_id) atau milik pengguna spesifik (memiliki user_id).
     * Kode produk digunakan untuk verifikasi dan untuk katalog produk pada aplikasi pengguna.
     * Data produk ini disinkronkan dengan aplikasi mobile untuk keperluan pencarian dan transaksi.
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'product_id');
    }
    
    /**
     * Get the user that owns the product.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Verify a product code against global products (products with no user_id)
     * 
     * Metode ini digunakan untuk memverifikasi apakah kode produk yang diberikan
     * cocok dengan kode produk dalam katalog global. Hanya kode produk yang 
     * dicocokkan, bukan katalog lengkap.
     * 
     * @param string $productCode Kode produk yang akan diverifikasi
     * @return bool|Product False jika tidak ditemukan, object Product jika ditemukan
     */
    public static function verifyProductCode(string $productCode)
    {
        $catalogProduct = self::where('kode_produk', $productCode)
                           ->whereNull('user_id')
                           ->where('is_active', true)
                           ->first();
        
        return $catalogProduct ?: false;
    }
    
    /**
     * Scope a query to only include global catalog products (no user_id).
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCatalog($query)
    {
        return $query->whereNull('user_id');
    }
    
    /**
     * Scope a query to only include products owned by a specific user.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $userId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOwnedBy($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}
