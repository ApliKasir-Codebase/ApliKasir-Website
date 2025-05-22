<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use App\Services\FirebaseStorageService;
use Mockery;

class FirebaseStorageTest extends TestCase
{
    /**
     * Test file upload to Firebase Storage.
     */
    public function test_firebase_image_upload(): void
    {
        // Skip test if Firebase credentials are not configured
        if (empty(config('services.firebase.project_id'))) {
            $this->markTestSkipped('Firebase credentials not configured.');
            return;
        }
        
        // Create temporary file for testing
        Storage::fake('local');
        $file = UploadedFile::fake()->image('profile.jpg', 100, 100);
        $localPath = Storage::disk('local')->path($file->store('temp'));
        
        // Mock Firebase service for unit testing
        $mockBucket = Mockery::mock('Google\Cloud\Storage\Bucket');
        $mockObject = Mockery::mock('Google\Cloud\Storage\StorageObject');
        
        $mockBucket->shouldReceive('upload')
            ->once()
            ->andReturn($mockObject);
            
        $mockObject->shouldReceive('signedUrl')
            ->once()
            ->andReturn('https://example.com/test-image.jpg');
        
        // Create service with mocked dependencies
        $service = $this->getMockBuilder(FirebaseStorageService::class)
            ->onlyMethods(['getBucket'])
            ->getMock();
            
        $service->method('getBucket')->willReturn($mockBucket);
        
        // Test upload
        $result = $service->uploadImage($localPath, 'profile_images/test.jpg');
        
        // Assert result is a valid URL
        $this->assertStringStartsWith('http', $result);
        
        // Clean up
        @unlink($localPath);
    }
    
    /**
     * Test file deletion from Firebase Storage.
     */
    public function test_firebase_image_deletion(): void
    {
        // Skip test if Firebase credentials are not configured
        if (empty(config('services.firebase.project_id'))) {
            $this->markTestSkipped('Firebase credentials not configured.');
            return;
        }
        
        // Mock Firebase service for unit testing
        $mockBucket = Mockery::mock('Google\Cloud\Storage\Bucket');
        $mockObject = Mockery::mock('Google\Cloud\Storage\StorageObject');
        
        $mockBucket->shouldReceive('object')
            ->once()
            ->andReturn($mockObject);
            
        $mockObject->shouldReceive('exists')
            ->once()
            ->andReturn(true);
            
        $mockObject->shouldReceive('delete')
            ->once();
        
        // Create service with mocked dependencies
        $service = $this->getMockBuilder(FirebaseStorageService::class)
            ->onlyMethods(['getBucket'])
            ->getMock();
            
        $service->method('getBucket')->willReturn($mockBucket);
        
        // Test deletion
        $result = $service->deleteFile('profile_images/test.jpg');
        
        // Assert deletion was successful
        $this->assertTrue($result);
    }
    
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
