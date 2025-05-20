<?php

namespace App\Services;

use App\Models\AdminActivityLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class AdminActivityLogger
{
    /**
     * Log an admin activity
     *
     * @param string $module The module where the action occurred (users, products, etc.)
     * @param string $action The action performed (created, updated, deleted, etc.)
     * @param string $description A brief description of the activity
     * @param array|null $details Additional details about the activity
     * @return AdminActivityLog|null
     */
    public static function log(string $module, string $action, string $description, ?array $details = null): ?AdminActivityLog
    {
        // Only log if admin is authenticated
        if (!Auth::guard('web')->check()) {
            return null;
        }
        
        $admin = Auth::guard('web')->user();
        
        return AdminActivityLog::create([
            'admin_id' => $admin->id,
            'module' => $module,
            'action' => $action,
            'description' => $description,
            'details' => $details,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
        ]);
    }
}
