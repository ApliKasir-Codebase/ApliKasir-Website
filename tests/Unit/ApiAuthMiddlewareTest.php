<?php

namespace Tests\Unit;

use App\Http\Middleware\ApiAuthenticate;
use App\Models\User;
use Illuminate\Http\Request;
use Tests\TestCase;

class ApiAuthMiddlewareTest extends TestCase
{
    public function test_api_middleware_rejects_missing_headers()
    {
        $middleware = new ApiAuthenticate();
        $request = new Request();
        
        $next = function ($request) {
            return response('OK');
        };
        
        $response = $middleware->handle($request, $next);
        
        $this->assertEquals(401, $response->getStatusCode());
        $this->assertStringContainsString('Autentikasi gagal', $response->getContent());
    }
    
    public function test_api_middleware_rejects_invalid_user()
    {
        $middleware = new ApiAuthenticate();
        $request = new Request();
        
        $request->headers->set('X-API-KEY', 'test-key');
        $request->headers->set('X-USER-ID', '99999999'); // Non-existent user ID
        
        $next = function ($request) {
            return response('OK');
        };
        
        $response = $middleware->handle($request, $next);
        
        $this->assertEquals(401, $response->getStatusCode());
        $this->assertStringContainsString('Pengguna tidak ditemukan', $response->getContent());
    }
    
    public function test_api_middleware_passes_with_valid_credentials()
    {
        // Create a test user
        $user = User::factory()->create([
            'email' => 'test-api-' . time() . '@example.com',
        ]);
        
        // Generate an API key using the same algorithm as in the middleware
        $apiKey = hash('sha256', $user->email . config('app.key'));
        
        $middleware = new ApiAuthenticate();
        $request = new Request();
        
        $request->headers->set('X-API-KEY', $apiKey);
        $request->headers->set('X-USER-ID', $user->id);
        
        $next = function ($request) {
            $this->assertInstanceOf(User::class, $request->user());
            return response('OK');
        };
        
        $response = $middleware->handle($request, $next);
        
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('OK', $response->getContent());
        
        // Clean up
        $user->delete();
    }
}
