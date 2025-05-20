<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Mendapatkan ID dari user yang sudah ada
        $users = User::all();

        if ($users->count() > 0) {
            // Data pelanggan untuk toko pertama (Budi)
            $customersForBudi = [
                [
                    'id_pengguna' => $users[0]->id,
                    'nama_pelanggan' => 'Ahmad Baihaki',
                    'nomor_telepon' => '081122334455',
                ],
                [
                    'id_pengguna' => $users[0]->id,
                    'nama_pelanggan' => 'Rani Susanti',
                    'nomor_telepon' => '082233445566',
                ],
                [
                    'id_pengguna' => $users[0]->id,
                    'nama_pelanggan' => 'Hendra Wijaya',
                    'nomor_telepon' => '083344556677',
                ],
            ];

            foreach ($customersForBudi as $customer) {
                Customer::create($customer);
            }

            // Data pelanggan untuk toko kedua (Ani)
            if ($users->count() > 1) {
                $customersForAni = [
                    [
                        'id_pengguna' => $users[1]->id,
                        'nama_pelanggan' => 'Dimas Prayoga',
                        'nomor_telepon' => '084455667788',
                    ],
                    [
                        'id_pengguna' => $users[1]->id,
                        'nama_pelanggan' => 'Lina Salim',
                        'nomor_telepon' => '085566778899',
                    ],
                ];

                foreach ($customersForAni as $customer) {
                    Customer::create($customer);
                }
            }
        }
    }
}
