<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * Model Admin untuk pengelola sistem ApliKasir Web
 */
class Admin extends Authenticatable
{
    use HasFactory, Notifiable;
    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'admins';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_super_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_super_admin' => 'boolean',
        ];
    }
    
    /**
     * Get the activity logs for this admin
     */
    public function activityLogs()
    {
        return $this->hasMany(AdminActivityLog::class);
    }
}
