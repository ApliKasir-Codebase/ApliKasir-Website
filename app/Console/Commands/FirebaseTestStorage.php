<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use App\Services\FirebaseStorageService;

class FirebaseTestStorage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'firebase:test-storage';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test Firebase Storage connection and configuration';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Testing Firebase Storage integration...');
        
        // Step 1: Check if Firebase credentials exist
        $credentialsPath = storage_path('app/firebase-credentials.json');
        if (!file_exists($credentialsPath)) {
            $this->error('❌ Firebase credentials file not found at ' . $credentialsPath);
            $this->info('Make sure FirebaseServiceProvider has run and created the credentials.');
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
            $publicUrl = $service->uploadImage($testImagePath, $storagePath);
            
            $this->info('✅ Upload successful!');
            $this->info('Public URL: ' . $publicUrl);
            
            // Step 4: Check if file exists
            $this->info('Verifying file exists...');
            $exists = $service->fileExists($storagePath);
            
            if ($exists) {
                $this->info('✅ File exists in Firebase Storage.');
            } else {
                $this->error('❌ File does not exist in Firebase Storage.');
                return 1;
            }
            
            // Step 5: Delete test file
            $this->info('Deleting test file...');
            $service->deleteFile($storagePath);
            $this->info('✅ Test file deleted.');
            
            // Clean up local test file
            File::delete($testImagePath);
            $this->info('✅ Local test file cleaned up.');
            
            $this->info('✅ All Firebase Storage tests passed successfully!');
            return 0;
            
        } catch (\Exception $e) {
            $this->error('❌ Firebase Storage test failed: ' . $e->getMessage());
            $this->line('Stack trace:');
            $this->line($e->getTraceAsString());
            
            // Clean up local test file
            if (File::exists($testImagePath)) {
                File::delete($testImagePath);
            }
            
            return 1;
        }
    }
    
    /**
     * Create a simple test image.
     *
     * @param string $path
     * @return void
     */
    private function createTestImage($path)
    {
        // Create a small 100x100 black image
        $image = imagecreatetruecolor(100, 100);
        
        // Add some text
        $textColor = imagecolorallocate($image, 255, 255, 255);
        imagestring($image, 5, 10, 40, 'Firebase Test', $textColor);
        
        // Save the image
        imagepng($image, $path);
        imagedestroy($image);
    }
}
