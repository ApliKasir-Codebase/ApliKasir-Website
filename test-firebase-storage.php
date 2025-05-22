<?php

// Firebase Storage Test Script
// This script tests Firebase Storage connectivity and image upload functionality

require __DIR__ . '/vendor/autoload.php';

// Inisialisasi app Laravel untuk mengakses config dan log
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "Starting Firebase Storage test...\n";

try {
    // Mencoba membuat instance FirebaseStorageService
    echo "Initializing FirebaseStorageService...\n";
    $firebaseStorage = new \App\Services\FirebaseStorageService();
    
    // Test koneksi
    echo "Testing connection to Firebase Storage...\n";
    $connectionTest = $firebaseStorage->testConnection();
    
    echo "Connection test result: " . ($connectionTest['success'] ? 'SUCCESS' : 'FAILED') . "\n";
    echo "Message: " . $connectionTest['message'] . "\n";
    echo "Bucket: " . $connectionTest['bucket'] . "\n\n";
    
    if (!$connectionTest['success']) {
        throw new Exception("Failed to connect to Firebase Storage: " . $connectionTest['message']);
    }
    
    // Cek file kredensial
    $credentialsPath = storage_path('app/firebase-credentials.json');
    echo "Checking Firebase credentials file...\n";
    
    if (file_exists($credentialsPath)) {
        echo "Credentials file exists at: " . $credentialsPath . "\n";
        echo "File size: " . filesize($credentialsPath) . " bytes\n";
        
        // Validasi format JSON credentials
        $credentials = json_decode(file_get_contents($credentialsPath), true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            echo "WARNING: Credentials file is not valid JSON: " . json_last_error_msg() . "\n";
        } else {
            echo "Credentials file contains valid JSON\n";
            echo "Required fields present: " .
                 "project_id(" . (isset($credentials['project_id']) ? 'YES' : 'NO') . "), " .
                 "private_key(" . (isset($credentials['private_key']) ? 'YES' : 'NO') . "), " .
                 "client_email(" . (isset($credentials['client_email']) ? 'YES' : 'NO') . ")\n";
        }
    } else {
        echo "Credentials file does not exist at: " . $credentialsPath . "\n";
        
        // Mencoba membuat file kredensial secara manual
        echo "Trying to create credentials file...\n";
        $firebaseProvider = new \App\Providers\FirebaseServiceProvider($app);
        $firebaseProvider->ensureCredentialsExist(true);
        
        if (file_exists($credentialsPath)) {
            echo "Credentials file created successfully\n";
        } else {
            echo "Failed to create credentials file\n";
        }
    }
    
    echo "\nTesting image upload functionality...\n";
    
    // Buat test image
    $testImagePath = storage_path('app/test-image.png');
    
    // Buat gambar test sederhana jika belum ada
    if (!file_exists($testImagePath)) {
        echo "Creating test image...\n";
        $image = imagecreatetruecolor(100, 100);
        $bgColor = imagecolorallocate($image, 255, 255, 255);
        $textColor = imagecolorallocate($image, 0, 0, 0);
        imagefill($image, 0, 0, $bgColor);
        imagestring($image, 5, 10, 40, 'Test Image', $textColor);
        imagepng($image, $testImagePath);
        imagedestroy($image);
    }
    
    // Upload test image
    echo "Uploading test image...\n";
    $storagePath = 'test/test-image-' . time() . '.png';
    
    try {
        $url = $firebaseStorage->uploadImage($testImagePath, $storagePath);
        echo "Upload successful!\n";
        echo "Image URL: " . $url . "\n";
        
        // Test penghapusan gambar
        echo "\nTesting image deletion...\n";
        $deleteResult = $firebaseStorage->deleteFile($storagePath);
        echo "Deletion result: " . ($deleteResult ? 'SUCCESS' : 'FAILED') . "\n";
    } catch (Exception $e) {
        echo "Upload failed: " . $e->getMessage() . "\n";
        echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
    }
    
    echo "\nTest completed!\n";
    
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}
