<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Admin;
use App\Models\AdminActivityLog;
use Illuminate\Support\Facades\Hash;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    private function createAdmin(): Admin
    {
        return Admin::create([
            'name' => 'Test Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'is_super_admin' => true,
        ]);
    }

    public function test_dashboard_page_can_be_accessed_by_authenticated_user(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAs($admin)->get('/dashboard');

        $response->assertStatus(200);
    }

    public function test_dashboard_page_displays_statistics(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAs($admin)->get('/dashboard');

        $response->assertStatus(200);
        
        // Assert Inertia response has stats property
        $response->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page
            ->component('Dashboard/Index')
            ->has('stats')
        );
    }

    public function test_activity_log_can_be_filtered(): void
    {
        $admin = $this->createAdmin();
        
        AdminActivityLog::create([
            'admin_id' => $admin->id,
            'module' => 'users',
            'action' => 'created',
            'description' => 'Created user X',
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Test Agent',
        ]);

        $response = $this->actingAs($admin)->get('/dashboard?action=created');

        $response->assertStatus(200);
        $response->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page
            ->component('Dashboard/Index')
            ->has('activities')
            ->where('filters.action', 'created')
        );
    }
}

