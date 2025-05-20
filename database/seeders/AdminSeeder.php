<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin Super
        Admin::create([
            'name' => 'Super Admin',
            'email' => 'admin@aplikasir.com',
            'password' => Hash::make('Admin123!'),
            'is_super_admin' => true,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        // Admin Staff
        Admin::create([
            'name' => 'Staff Admin',
            'email' => 'staff@aplikasir.com',
            'password' => Hash::make('Staff123!'),
            'is_super_admin' => false,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);
    }
}
