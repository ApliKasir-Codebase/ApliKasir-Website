<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class FixSessionUserIdMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        
        // If user is authenticated, ensure session has correct user_id
        if (auth()->check() && auth()->user() && session()->getId()) {
            try {
                $userId = auth()->id();
                $sessionId = session()->getId();
                
                // Direct database update to fix potential user_id issues
                DB::table('sessions')
                    ->where('id', $sessionId)
                    ->update(['user_id' => $userId]);
                
                Log::debug("Session fixed for user {$userId} with session ID {$sessionId}");
            } catch (\Exception $e) {
                Log::error("Error fixing session user_id: " . $e->getMessage());
            }
        }
        
        return $response;
    }
}
