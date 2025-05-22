<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\AdminActivityLog;
use Illuminate\Database\Seeder;

class AdminActivityLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Mendapatkan admin dari database
        $superAdmin = Admin::where('is_super_admin', true)->first();
        $staffAdmin = Admin::where('is_super_admin', false)->first();
        
        if (!$superAdmin || !$staffAdmin) {
            $this->command->warn('Admin tidak ditemukan. Lewati seeding aktivitas admin.');
            return;
        }
        
        // Log aktivitas untuk Super Admin
        $superAdminActivities = [
            [
                'admin_id' => $superAdmin->id,
                'module' => 'admin',
                'action' => 'login',
                'description' => 'Login ke sistem',
                'details' => json_encode(['browser' => 'Chrome', 'os' => 'Windows']),
                'ip_address' => '192.168.1.1',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(5),
            ],
            [
                'admin_id' => $superAdmin->id,
                'module' => 'global_products',
                'action' => 'create',
                'description' => 'Menambahkan produk global baru',
                'details' => json_encode(['product_name' => 'Coca Cola 1.5L', 'category' => 'Minuman']),
                'ip_address' => '192.168.1.1',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'created_at' => now()->subDays(4),
                'updated_at' => now()->subDays(4),
            ],
            [
                'admin_id' => $superAdmin->id,
                'module' => 'admin',
                'action' => 'create',
                'description' => 'Membuat akun staff admin baru',
                'details' => json_encode(['name' => 'Staff Admin', 'email' => 'staff@aplikasir.com']),
                'ip_address' => '192.168.1.1',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subDays(3),
            ],
        ];
        
        // Log aktivitas untuk Staff Admin
        $staffAdminActivities = [
            [
                'admin_id' => $staffAdmin->id,
                'module' => 'admin',
                'action' => 'login',
                'description' => 'Login ke sistem',
                'details' => json_encode(['browser' => 'Firefox', 'os' => 'Windows']),
                'ip_address' => '192.168.1.2',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'admin_id' => $staffAdmin->id,
                'module' => 'global_products',
                'action' => 'update',
                'description' => 'Mengupdate informasi produk global',
                'details' => json_encode([
                    'product_id' => 'GP001',
                    'old_name' => 'Indomie Goreng',
                    'new_name' => 'Indomie Goreng Original'
                ]),
                'ip_address' => '192.168.1.2',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
                'created_at' => now()->subDays(1),
                'updated_at' => now()->subDays(1),
            ],
        ];
        
        // Gabungkan semua aktivitas
        $allActivities = array_merge($superAdminActivities, $staffAdminActivities);
        
        // Membuat data di tabel admin_activity_logs
        foreach ($allActivities as $activity) {
            \DB::table('admin_activity_logs')->insert($activity);
        }
        
        $this->command->info('Admin activity logs seeded successfully!');
    }
}
