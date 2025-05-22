<?php
/**
 * Tes untuk memverifikasi fungsi upload gambar base64 ke Firebase Storage
 * 
 * Script ini menguji fitur upload gambar profil pengguna dalam format base64
 * yang digunakan oleh aplikasi mobile.
 * 
 * Cara penggunaan: php test-base64-upload.php
 */

require_once __DIR__ . '/vendor/autoload.php';

use App\Models\User;
use App\Services\FirebaseStorageService;
use Illuminate\Support\Facades\Hash;

// Bootstrap Laravel application
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "=== Test Base64 Image Upload ===\n\n";

// Test connection to Firebase
echo "1. Testing Firebase Storage connection...\n";
try {
    $firebase = new FirebaseStorageService();
    $connectionTest = $firebase->testConnection();
    
    if ($connectionTest['success']) {
        echo "Firebase connection successful!\n";
        echo "Bucket: " . $connectionTest['bucket'] . "\n";
    } else {
        echo "Firebase connection failed!\n";
        echo "Error: " . $connectionTest['message'] . "\n";
        exit(1);
    }
} catch (\Exception $e) {
    echo "Firebase connection error: " . $e->getMessage() . "\n";
    exit(1);
}

echo "\n";

// Create test image
echo "2. Creating sample base64 image...\n";

// Find an image to use for testing
$imagePath = __DIR__ . '/public/images/test-profile.jpg';
if (!file_exists($imagePath)) {
    $imagePath = __DIR__ . '/public/images/default_avatar.png';
    if (!file_exists($imagePath)) {
        echo "No test image found. Creating a simple test image...\n";
        
        // Create a simple image
        $image = imagecreatetruecolor(100, 100);
        $bgColor = imagecolorallocate($image, 255, 255, 255);
        $textColor = imagecolorallocate($image, 0, 0, 0);
        imagefill($image, 0, 0, $bgColor);
        imagestring($image, 5, 10, 40, 'TEST IMAGE', $textColor);
        
        // Save the image
        $tempImagePath = __DIR__ . '/storage/app/test-image.jpg';
        imagejpeg($image, $tempImagePath);
        imagedestroy($image);
        
        $imagePath = $tempImagePath;
        echo "Created test image at: $tempImagePath\n";
    }
}

// Convert to base64
$imageData = file_get_contents($imagePath);
$base64Image = 'data:image/jpeg;base64,' . base64_encode($imageData);

echo "Successfully created base64 image string (" . strlen($base64Image) . " characters)\n";
echo "Base64 preview: " . substr($base64Image, 0, 50) . "...\n";

echo "\n";

// Test base64 upload
echo "3. Testing base64 image upload to Firebase...\n";

try {
    // Create a unique filename
    $timestamp = time();
    $random = rand(100000000, 999999999);
    $filename = "test_base64_{$timestamp}-{$random}.jpg";
    $storagePath = 'profile_images/' . $filename;
    
    echo "Generated filename: $filename\n";
    echo "Generated storage path: $storagePath\n";
    echo "Base64 image length: " . strlen($base64Image) . " characters\n";
    echo "Base64 image starts with: " . substr($base64Image, 0, 30) . "...\n";
    
    // Direktif debug untuk menampilkan apakah base64 memiliki format yang benar
    $hasDataPrefix = strpos($base64Image, 'data:image') !== false;
    $hasBase64Marker = strpos($base64Image, ';base64,') !== false;
    echo "Has 'data:image' prefix: " . ($hasDataPrefix ? "Yes" : "No") . "\n";
    echo "Has ';base64,' marker: " . ($hasBase64Marker ? "Yes" : "No") . "\n";
    
    if (!$hasDataPrefix || !$hasBase64Marker) {
        echo "WARNING: Base64 image does not have the correct format. It should start with 'data:image/jpeg;base64,'\n";
        
        if (!$hasDataPrefix) {
            $base64Image = 'data:image/jpeg;base64,' . $base64Image;
            echo "Added 'data:image/jpeg;base64,' prefix to the image\n";
        }
    }
    
    // Test direct method on FirebaseStorageService
    echo "\nTesting using testBase64Upload method for diagnosis...\n";
    $testResult = $firebase->testBase64Upload($base64Image);
    
    if ($testResult['success']) {
        echo "Diagnostic test successful!\n";
        echo "Test URL: {$testResult['url']}\n";
    } else {
        echo "Diagnostic test failed: {$testResult['message']}\n";
        // Continue anyway with the regular test
        echo "Continuing with regular test...\n";
    }
      // Upload to Firebase
    echo "\nAttempting regular upload to Firebase...\n";
    $url = $firebase->uploadBase64Image($base64Image, $storagePath);
    
    echo "Upload successful!\n";
    echo "Firebase URL: $url\n";
    
    // Delete the test image to clean up
    echo "\n4. Cleaning up: deleting test image from Firebase...\n";
    $deleteResult = $firebase->deleteFile($storagePath);
    
    if ($deleteResult) {
        echo "Test image deleted successfully from Firebase.\n";
    } else {
        echo "Warning: Could not delete test image from Firebase.\n";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Error Class: " . get_class($e) . "\n";
    echo "Error Code: " . $e->getCode() . "\n";
    echo "Error File: " . $e->getFile() . " (line " . $e->getLine() . ")\n";
    
    // If we have a previous exception, show it too
    if ($e->getPrevious()) {
        echo "\nCaused by: " . $e->getPrevious()->getMessage() . "\n";
    }
    
    echo "\nStack Trace:\n" . $e->getTraceAsString() . "\n";
    exit(1);
}

echo "\nTest completed successfully!\n";
