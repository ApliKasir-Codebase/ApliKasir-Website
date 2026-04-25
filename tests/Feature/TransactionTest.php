<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TransactionTest extends TestCase
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

    public function test_transaction_summary_page_is_displayed()
    {
        $response = $this->actingAs($this->user)->get('/transactions');

        $response->assertStatus(200);
    }

    public function test_transaction_summary_calculates_correctly()
    {
        $customer = Customer::create([
            'nama_pelanggan' => 'Budi',
            'nomor_telepon' => '08123456789',
            'user_id' => $this->user->id,
        ]);

        Transaction::create([
            'user_id' => $this->user->id,
            'id_pelanggan' => $customer->id,
            'total_belanja' => 50000,
            'tanggal_transaksi' => now(),
            'total_modal' => 30000,
            'metode_pembayaran' => 'Cash',
            'status_pembayaran' => 'Lunas',
            'detail_items' => [],
            'jumlah_bayar' => 50000,
            'jumlah_kembali' => 0,
        ]);

        Transaction::create([
            'user_id' => $this->user->id,
            'id_pelanggan' => $customer->id,
            'total_belanja' => 150000,
            'tanggal_transaksi' => now(),
            'total_modal' => 100000,
            'metode_pembayaran' => 'Cash',
            'status_pembayaran' => 'Lunas',
            'detail_items' => [],
            'jumlah_bayar' => 150000,
            'jumlah_kembali' => 0,
        ]);

        $response = $this->actingAs($this->user)->get('/transactions');

        $response->assertStatus(200);
        
        // Ensure customer has 2 transactions total and sum is 200000
        $customerFromDb = Customer::withCount('transactions')->withSum('transactions', 'total_belanja')->find($customer->id);
        $this->assertEquals(2, $customerFromDb->transactions_count);
        $this->assertEquals(200000, $customerFromDb->transactions_sum_total_belanja);
    }
}
