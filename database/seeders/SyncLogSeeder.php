<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\SyncLog;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class SyncLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Mendapatkan beberapa user untuk membuat log sinkronisasi
        $users = User::take(5)->get();
        
        if ($users->count() == 0) {
            $this->command->warn('Tidak ada user yang ditemukan untuk membuat data sync logs');
            return;
        }
        
        // Membuat beberapa entri log sinkronisasi untuk setiap user
        foreach ($users as $index => $user) {
            // Hanya buat log untuk 3 user pertama saja sebagai contoh
            if ($index > 2) break;
            
            // Kapan terakhir kali sync dari user
            $lastSyncTime = $user->last_sync_time ?? now()->subDays(30);
            
            // Buat beberapa catatan sync untuk setiap user
            $syncCount = rand(3, 8); // Jumlah sync acak antara 3-8
            
            for ($i = 0; $i < $syncCount; $i++) {
                // Tentukan waktu sync, dimulai dari yang paling lama
                $syncStartTime = Carbon::parse($lastSyncTime)->addDays($i * 2 + rand(1, 3));
                
                // Jika waktu sync melebihi waktu sekarang, hentikan loop
                if ($syncStartTime->gt(now())) {
                    break;
                }
                
                // Tentukan durasi sync, antara 10 detik - 2 menit
                $syncDuration = rand(10, 120);
                $syncEndTime = (clone $syncStartTime)->addSeconds($syncDuration);
                
                // 80% kemungkinan sync sukses, 15% partial, 5% gagal
                $randomStatus = rand(1, 100);
                if ($randomStatus <= 80) {
                    $status = 'Success';
                    $errorMessage = null;
                } elseif ($randomStatus <= 95) {
                    $status = 'Partial Failure';
                    $errorMessage = 'Beberapa data tidak berhasil disinkronkan';
                } else {
                    $status = 'Failed';
                    $errorMessage = 'Koneksi terputus saat sinkronisasi';
                }
                
                // Jumlah item yang disinkronkan
                $itemsUploaded = ($status != 'Failed') ? rand(5, 50) : 0;
                $itemsDownloaded = ($status != 'Failed') ? rand(5, 30) : 0;
                
                // Detail lebih lanjut untuk sync
                $details = [
                    'tables_synced' => [
                        'products' => rand(1, 20),
                        'transactions' => rand(1, 15),
                        'customers' => rand(0, 5),
                    ],
                    'device_info' => [
                        'model' => ['Samsung Galaxy A52', 'Xiaomi Redmi Note 10', 'iPhone 13', 'Oppo Reno 5'][rand(0, 3)],
                        'os_version' => ['Android 11', 'Android 12', 'iOS 15', 'Android 10'][rand(0, 3)],
                        'app_version' => ['1.0.0', '1.1.0', '1.2.0', '1.2.1'][rand(0, 3)],
                    ],
                    'network_type' => ['wifi', '4G', '3G'][rand(0, 2)],
                ];
                
                // Buat catatan sync log
                SyncLog::create([
                    'user_id' => $user->id,
                    'sync_start_time' => $syncStartTime,
                    'sync_end_time' => $syncEndTime,
                    'direction' => (rand(0, 1) == 0) ? 'Up' : 'Down',
                    'status' => $status,
                    'items_uploaded' => $itemsUploaded,
                    'items_downloaded' => $itemsDownloaded,
                    'error_message' => $errorMessage,
                    'details' => json_encode($details),
                    'client_last_sync_time' => $lastSyncTime,
                    'server_sync_time' => ($status != 'Failed') ? $syncEndTime : null,
                ]);
                
                // Update last sync time untuk iterasi berikutnya
                $lastSyncTime = $syncEndTime;
            }
            
            // Update user's last_sync_time if any successful syncs occurred
            if ($syncCount > 0 && $lastSyncTime) {
                $user->last_sync_time = $lastSyncTime;
                $user->save();
            }
        }
        
        $this->command->info('Sync logs berhasil dibuat!');
    }
}
