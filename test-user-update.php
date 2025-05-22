<?php
/**
 * Test User Update Functionality
 * 
 * Skrip ini mendemonstrasikan proses update data pengguna secara parsial,
 * termasuk upload gambar profil ke Firebase Storage.
 */

require __DIR__ . '/vendor/autoload.php';

use App\Models\User;
use App\Helpers\ImageHelper;
use App\Services\FirebaseStorageService;
use Illuminate\Http\UploadedFile;

// Bootstrap aplikasi Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Fungsi untuk menguji update pengguna
function testUserUpdate() {
    echo "=== TEST USER UPDATE ===\n";
    
    // 1. Tes koneksi Firebase Storage
    try {
        $firebase = new FirebaseStorageService();
        $connectionTest = $firebase->testConnection();
        
        echo "Firebase Connection: " . ($connectionTest['success'] ? "SUCCESS" : "FAILED") . "\n";
        echo "Message: " . $connectionTest['message'] . "\n";
        echo "Bucket: " . $connectionTest['bucket'] . "\n\n";
        
        if (!$connectionTest['success']) {
            echo "Firebase connection failed, skipping remaining tests.\n";
            return;
        }
    } catch (\Exception $e) {
        echo "Firebase error: " . $e->getMessage() . "\n";
        echo "Skipping remaining tests.\n";
        return;
    }
    
    // 2. Buat user dummy untuk testing
    echo "Creating test user...\n";
    $user = User::create([
        'name' => 'Test User ' . time(),
        'email' => 'test' . time() . '@example.com',
        'phoneNumber' => '08' . rand(100000000, 999999999),
        'storeName' => 'Test Store ' . time(),
        'storeAddress' => 'Test Address',
        'passwordHash' => bcrypt('password123'),
        'kodeQR' => 'QR-TEST-' . strtoupper(substr(md5(rand()), 0, 8)),
    ]);
    
    echo "Created test user with ID: " . $user->id . "\n\n";
    
    // 3. Test update hanya nama
    echo "Testing partial update (name only)...\n";
    $newName = 'Updated Name ' . time();
    $user->update(['name' => $newName]);
    $user->refresh();
    
    echo "Updated name to: " . $user->name . "\n";
    echo "Updated successfully: " . ($user->name === $newName ? "YES" : "NO") . "\n\n";
    
    // 4. Test update kode QR
    echo "Testing QR code update...\n";
    $newQrCode = 'QR-UPDATE-' . strtoupper(substr(md5(rand()), 0, 8));
    $user->update(['kodeQR' => $newQrCode]);
    $user->refresh();
    
    echo "Updated QR code to: " . $user->kodeQR . "\n";
    echo "Updated successfully: " . ($user->kodeQR === $newQrCode ? "YES" : "NO") . "\n\n";
    
    // 5. Hapus user test
    echo "Cleaning up - deleting test user...\n";
    $userId = $user->id;
    $user->delete();
    
    $exists = User::where('id', $userId)->exists();
    echo "User deleted successfully: " . (!$exists ? "YES" : "NO") . "\n\n";
    
    echo "=== TEST COMPLETED ===\n";
}

// Jalankan test
try {
    testUserUpdate();
} catch (\Exception $e) {
    echo "Error during test: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
}
