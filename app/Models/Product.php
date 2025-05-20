<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id_pengguna',
        'global_product_id',
        'nama_produk',
        'kode_produk',
        'jumlah_produk',
        'harga_modal',
        'harga_jual',
        'gambar_produk',
        'is_deleted',
        'deleted_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'jumlah_produk' => 'integer',
        'harga_modal' => 'decimal:2',
        'harga_jual' => 'decimal:2',
        'is_deleted' => 'boolean',
        'deleted_at' => 'datetime',
    ];

    /**
     * Get the user that owns the product.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_pengguna');
    }
    
    /**
     * Get the global product that this product is based on.
     */
    public function globalProduct(): BelongsTo
    {
        return $this->belongsTo(GlobalProduct::class, 'global_product_id');
    }

    /**
     * Scope a query to only include active products.
     */
    public function scopeActive(Builder $query): void
    {
        $query->where('is_deleted', false);
    }
}
