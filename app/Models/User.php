<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Model untuk pengguna aplikasi mobile
 * 
 * Model ini menyimpan data pengguna aplikasi mobile Aplikasir, 
 * termasuk informasi toko, gambar profil, dan kode QRIS untuk pembayaran.
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
        'profileImagePath', // Path gambar profil di Firebase Storage
        'passwordHash',
        'kodeQR',           // Kode QRIS untuk pembayaran di aplikasi mobile
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
        return $this->hasMany(Product::class, 'user_id');
    }
    
    /**
     * Relasi ke pelanggan user
     */
    public function customers(): HasMany
    {
        return $this->hasMany(Customer::class, 'user_id');
    }
    
    /**
     * Relasi ke transaksi user
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'user_id');
    }
    
    /**
     * Relasi ke log sinkronisasi
     */
    public function syncLogs(): HasMany
    {
        return $this->hasMany(SyncLog::class, 'user_id');
    }
    
    /**
     * Generate QR code string untuk user jika belum ada
     * 
     * Membuat kode QRIS (Quick Response Code Indonesian Standard) untuk pembayaran
     * di aplikasi mobile. Kode ini mengikuti format standar Bank Indonesia
     * untuk interoperabilitas dengan berbagai layanan pembayaran.
     * 
     * Kode QR mentah (raw) ini selalu disimpan di database dan dapat diubah
     * melalui halaman edit pengguna di website.
     * 
     * @return string Kode QRIS yang digenerate atau yang sudah ada
     */
    public function generateQrCode()
    {
        if (empty($this->kodeQR)) {
            $this->kodeQR = 'QR-' . strtoupper(substr(md5(uniqid()), 0, 8));
            $this->save();
        }
        
        return $this->kodeQR;
    }
    
    /**
     * Check if profile image is a default image
     * 
     * Memeriksa apakah pengguna menggunakan gambar profil default
     * atau telah mengunggah gambar profil kustom ke Firebase Storage.
     * 
     * @return bool True jika gambar profil adalah default, false jika kustom
     */
    public function hasDefaultProfileImage()
    {
        return empty($this->profileImagePath) || str_contains($this->profileImagePath, 'default_avatar');
    }
    
    /**
     * Get the public URL of user's profile image
     * 
     * @return string URL publik gambar profil dari Firebase Storage atau gambar default
     */
    public function getProfileImageUrl()
    {
        if ($this->hasDefaultProfileImage()) {
            return asset('images/default_avatar.png');
        }
        
        return $this->profileImagePath;
    }
    
    /**
     * Get QRIS data for payment processing
     * 
     * Mengembalikan data QRIS yang sesuai dengan standar Bank Indonesia
     * untuk digunakan dalam pemrosesan pembayaran mobile.
     * 
     * @return array Data QRIS untuk pembayaran
     */
    public function getQrisData()
    {
        // Generate QR code if not exists
        $qrCode = $this->generateQrCode();
        
        return [
            'merchant_id' => $qrCode,
            'merchant_name' => $this->storeName,
            'merchant_city' => $this->extractCity(),
            'transaction_type' => 'QRIS',
            'currency_code' => 'IDR',
        ];
    }
    
    /**
     * Get QRIS formatted code
     * 
     * Mengembalikan kode QR dalam format yang sesuai dengan
     * standar QRIS Bank Indonesia. Kode ini berbentuk string
     * dan disimpan mentah dalam database.
     * 
     * @return string Format kode QRIS standar
     */
    public function getQrisCode()
    {
        return $this->kodeQR ?? $this->generateQrCode();
    }
    
    /**
     * Extract city from store address
     * 
     * @return string Nama kota dari alamat toko
     */
    private function extractCity()
    {
        $address = $this->storeAddress ?? '';
        
        // Simple city extraction from address
        $parts = explode(',', $address);
        if (count($parts) >= 2) {
            return trim($parts[count($parts) - 2]);
        }
        
        return 'Unknown City';
    }
}
