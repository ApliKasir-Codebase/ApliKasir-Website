<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Model untuk pengguna aplikasi mobile
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phoneNumber',
        'storeName',
        'storeAddress',
        'profileImagePath',
        'passwordHash',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'passwordHash',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    public function casts(): array
    {
        return [
            'last_sync_time' => 'datetime',
        ];
    }

    /**
     * Get the password for the user.
     */
    public function getAuthPassword()
    {
        return $this->passwordHash;
    }
    
    /**
     * Relasi ke produk user
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'id_pengguna');
    }
    
    /**
     * Relasi ke pelanggan user
     */
    public function customers(): HasMany
    {
        return $this->hasMany(Customer::class, 'id_pengguna');
    }
    
    /**
     * Relasi ke transaksi user
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'id_pengguna');
    }
    
    /**
     * Relasi ke log sinkronisasi
     */
    public function syncLogs(): HasMany
    {
        return $this->hasMany(SyncLog::class, 'user_id');
    }
}
