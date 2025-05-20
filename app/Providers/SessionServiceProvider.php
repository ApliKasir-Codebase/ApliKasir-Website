<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\SessionGuard;
use App\Models\Admin;

class SessionServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // 
    }

    /**
     * Bootstrap services.
     */    public function boot(): void
    {
        // This ensures that when Laravel saves a session, it correctly identifies
        // the Admin model as the user entity for web authentication
        
        // Override the default behavior of session user ID setting
        if (\Illuminate\Support\Facades\Auth::guard() instanceof \Illuminate\Auth\SessionGuard) {
            $sessionHandler = app(\Illuminate\Contracts\Session\Session::class);
            
            // Handle session creation with the right user_id field
            \Illuminate\Support\Facades\Event::listen('auth.login', function ($user, $remember) use ($sessionHandler) {
                if ($user instanceof \App\Models\Admin) {
                    $id = $user->getAuthIdentifier();
                    $sessionHandler->put('auth.admin_id', $id);
                    $sessionHandler->put('auth.user_id', $id); // Keep this for Laravel's default mechanisms
                }
            });
            
            // Handle session destruction
            \Illuminate\Support\Facades\Event::listen('auth.logout', function () use ($sessionHandler) {
                $sessionHandler->forget('auth.admin_id');
                $sessionHandler->forget('auth.user_id');
            });
        }
    }
}
