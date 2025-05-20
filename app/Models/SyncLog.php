<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SyncLog extends Model
{
    use HasFactory;
    
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'sync_start_time',
        'sync_end_time',
        'direction',
        'status',
        'items_uploaded',
        'items_downloaded',
        'error_message',
        'details',
        'client_last_sync_time',
        'server_sync_time',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sync_start_time' => 'datetime',
        'sync_end_time' => 'datetime',
        'items_uploaded' => 'integer',
        'items_downloaded' => 'integer',
        'details' => 'array',
        'client_last_sync_time' => 'datetime',
        'server_sync_time' => 'datetime',
    ];

    /**
     * Get the user that this sync log belongs to.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
