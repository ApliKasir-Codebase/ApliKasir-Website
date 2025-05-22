<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "================================\n";
echo "TESTING FIREBASE STORAGE SERVICE\n";
echo "================================\n\n";

try {
    echo "Creating FirebaseStorageService instance...\n";
    $service = app(\App\Services\FirebaseStorageService::class);
    
    echo "Testing connection...\n";
    $result = $service->testConnection();
    
    echo "Connection result: " . ($result['success'] ? "SUCCESS" : "FAILED") . "\n";
    echo "Message: " . $result['message'] . "\n";
    echo "Bucket: " . $result['bucket'] . "\n\n";

    // If the connection test passes, try uploading a test image
    if ($result['success']) {
        echo "Testing file upload functionality...\n";
        
        // Create a simple test image
        $testImagePath = __DIR__ . '/storage/app/test-image.png';
        $testImageContent = createTestImage();
        file_put_contents($testImagePath, $testImageContent);
        
        echo "Created test image at: $testImagePath\n";
        
        // Upload the image
        $timestamp = time();
        $storagePath = "test/test-image-{$timestamp}.png";
        echo "Uploading to: $storagePath\n";
        
        $url = $service->uploadImage($testImagePath, $storagePath);
        
        echo "Upload successful!\n";
        echo "Image URL: $url\n\n";
        
        // Now test deletion
        echo "Testing file deletion...\n";
        $deleteResult = $service->deleteFile($storagePath);
        echo "Deletion result: " . ($deleteResult ? "SUCCESS" : "FAILED") . "\n";
        
        // Clean up local test image
        @unlink($testImagePath);
    }
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}

/**
 * Create a simple test image (1x1 px transparent PNG)
 */
function createTestImage() {
    $im = imagecreatetruecolor(100, 100);
    $red = imagecolorallocate($im, 255, 0, 0);
    $white = imagecolorallocate($im, 255, 255, 255);
    
    // Fill the background
    imagefill($im, 0, 0, $white);
    
    // Draw a red circle
    imagefilledellipse($im, 50, 50, 80, 80, $red);
    
    // Add some text
    imagestring($im, 5, 20, 40, 'Test', $white);
    
    // Start output buffer
    ob_start();
    imagepng($im);
    $imageData = ob_get_clean();
    
    // Free memory
    imagedestroy($im);
    
    return $imageData;
}
