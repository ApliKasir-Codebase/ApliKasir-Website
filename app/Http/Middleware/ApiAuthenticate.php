<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ApiAuthenticate
{
    /**
     * Handle an incoming request.
     * 
     * Middleware ini hanya untuk memverifikasi bahwa user_id ada dan valid,
     * sementara autentikasi sebenarnya dilakukan oleh backend Node.js.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $userId = $request->header('X-USER-ID');

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'User ID tidak diberikan.'
            ], 401);
        }

        // Log request
        Log::info('Mobile API request', [
            'user_id' => $userId,
            'ip' => $request->ip(),
            'endpoint' => $request->path(),
            'method' => $request->method()
        ]);

        // Find user
        $user = User::find($userId);
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Pengguna tidak ditemukan.'
            ], 404);
        }

        // Store user in request for further use
        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $next($request);
    }
}
