<?php

namespace Tests\Console\Commands;

use Illuminate\Console\Command;
use App\Services\FirebaseStorageService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

class TestFirebaseStorage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:firebase-storage';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test Firebase Storage integration';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Testing Firebase Storage integration...');
        
        // Step 1: Check if Firebase credentials exist
        $credentialsPath = storage_path('app/firebase-credentials.json');
        if (!file_exists($credentialsPath)) {
            $this->error('Firebase credentials file not found at ' . $credentialsPath);
            return 1;
        }
        $this->info('✅ Firebase credentials found.');
        
        // Step 2: Create a test image
        $testImagePath = storage_path('app/test-image.png');
        $this->createTestImage($testImagePath);
        $this->info('✅ Test image created.');
        
        // Step 3: Upload to Firebase
        try {
            $service = new FirebaseStorageService();
            $storagePath = 'test/test-' . time() . '.png';
            
            $this->info('Uploading to Firebase Storage...');
            $url = $service->uploadImage($testImagePath, $storagePath);
            
            $this->info('✅ Image uploaded successfully!');
            $this->info('Image URL: ' . $url);
            
            // Step 4: Delete the image
            $this->info('Deleting from Firebase Storage...');
            $result = $service->deleteFile($storagePath);
            
            if ($result) {
                $this->info('✅ Image deleted successfully!');
            } else {
                $this->warn('⚠️ Failed to delete image.');
            }
        } catch (\Exception $e) {
            $this->error('Firebase upload error: ' . $e->getMessage());
            return 1;
        }
        
        // Clean up
        if (file_exists($testImagePath)) {
            unlink($testImagePath);
        }
        
        $this->info('Firebase Storage test completed successfully!');
        return 0;
    }
    
    /**
     * Create a test image
     */
    private function createTestImage($path)
    {
        // Create a simple 100x100 black PNG image
        $image = imagecreatetruecolor(100, 100);
        imagepng($image, $path);
        imagedestroy($image);
    }
}
