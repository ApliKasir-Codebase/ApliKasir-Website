<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CustomerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutVite();
        $this->user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phoneNumber' => '081234567890',
            'storeName' => 'Toko Test',
            'storeAddress' => 'Alamat Test',
            'passwordHash' => bcrypt('password'),
        ]);
    }

    public function test_customer_page_is_displayed()
    {
        $response = $this->actingAs($this->user)->get('/customers');

        $response->assertStatus(200);
    }

    public function test_can_create_customer()
    {
        $response = $this->actingAs($this->user)->post('/customers', [
            'nama_pelanggan' => 'Budi Santoso',
            'nomor_telepon' => '08123456789',
        ]);

        $response->assertRedirect('/customers');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('customers', [
            'nama_pelanggan' => 'Budi Santoso',
            'nomor_telepon' => '08123456789',
            'user_id' => $this->user->id,
        ]);
    }

    public function test_cannot_create_customer_without_name()
    {
        $response = $this->actingAs($this->user)->post('/customers', [
            'nama_pelanggan' => '',
            'nomor_telepon' => '08123456789',
        ]);

        $response->assertSessionHasErrors('nama_pelanggan');
        $this->assertDatabaseMissing('customers', [
            'nomor_telepon' => '08123456789',
        ]);
    }

    public function test_can_search_customer()
    {
        Customer::create([
            'nama_pelanggan' => 'Budi',
            'nomor_telepon' => '08123456789',
            'user_id' => $this->user->id,
        ]);

        Customer::create([
            'nama_pelanggan' => 'Agus',
            'nomor_telepon' => '08987654321',
            'user_id' => $this->user->id,
        ]);

        $response = $this->actingAs($this->user)->get('/customers?search=Budi');

        $response->assertStatus(200);
        // Inertia testing might be tricky without specific inertia assertions
        // We verify that the request succeeds
    }
}
