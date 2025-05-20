<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Customer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id_pengguna',
        'nama_pelanggan',
        'nomor_telepon',
        'is_deleted',
        'deleted_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_deleted' => 'boolean',
        'deleted_at' => 'datetime',
    ];

    /**
     * Get the user that owns the customer.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_pengguna');
    }

    /**
     * Get the transactions for the customer.
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'id_pelanggan');
    }

    /**
     * Scope a query to only include active customers.
     */
    public function scopeActive(Builder $query): void
    {
        $query->where('is_deleted', false);
    }
}
