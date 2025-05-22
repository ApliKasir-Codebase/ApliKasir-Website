<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UserApiTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Setup test environment
        // Mock the Firebase Storage service for testing
        $this->mock(\App\Services\FirebaseStorageService::class, function ($mock) {
            $mock->shouldReceive('uploadImage')
                ->andReturn('https://firebasestorage.googleapis.com/mock/profile_images/test.jpg');
            
            $mock->shouldReceive('uploadBase64Image')
                ->andReturn('https://firebasestorage.googleapis.com/mock/profile_images/test_base64.jpg');
            
            $mock->shouldReceive('deleteFile')
                ->andReturn(true);
        });
    }

    /**
     * Test user profile retrieval.
     *
     * @return void
     */
    public function test_user_can_get_profile(): void
    {
        // Create a test user
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'passwordHash' => Hash::make('password'),
            'phoneNumber' => '08123456789',
            'storeName' => 'Test Store',
            'storeAddress' => 'Test Address',
            'profileImagePath' => 'https://firebasestorage.googleapis.com/default_avatar.png',
        ]);

        // Generate a test API key (same algorithm as in the middleware)
        $apiKey = hash('sha256', $user->email . config('app.key'));

        // Make a request to get profile
        $response = $this->withHeaders([
            'X-API-KEY' => $apiKey,
            'X-USER-ID' => $user->id,
        ])->getJson('/api/user/profile');

        // Assert response is successful and contains user data
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'name' => 'Test User',
                    'email' => 'test@example.com',
                ]
            ]);
    }

    /**
     * Test user profile update with regular fields.
     *
     * @return void
     */
    public function test_user_can_update_profile_regular_fields(): void
    {
        // Create a test user
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'passwordHash' => Hash::make('password'),
            'phoneNumber' => '08123456789',
            'storeName' => 'Test Store',
            'storeAddress' => 'Test Address',
            'profileImagePath' => 'https://firebasestorage.googleapis.com/default_avatar.png',
        ]);

        // Generate a test API key
        $apiKey = hash('sha256', $user->email . config('app.key'));

        // Make a request to update profile
        $response = $this->withHeaders([
            'X-API-KEY' => $apiKey,
            'X-USER-ID' => $user->id,
        ])->postJson('/api/user/profile/update', [
            'name' => 'Updated User',
            'storeName' => 'Updated Store',
            'storeAddress' => 'Updated Address',
        ]);

        // Assert response is successful
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Profil berhasil diperbarui',
                'data' => [
                    'name' => 'Updated User',
                    'storeName' => 'Updated Store',
                    'storeAddress' => 'Updated Address',
                ]
            ]);

        // Assert database has updated values
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated User',
            'storeName' => 'Updated Store',
            'storeAddress' => 'Updated Address',
        ]);
    }

    /**
     * Test user profile update with image file.
     *
     * @return void
     */
    public function test_user_can_update_profile_image_file(): void
    {
        // Create a test user
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'passwordHash' => Hash::make('password'),
            'phoneNumber' => '08123456789',
            'storeName' => 'Test Store',
            'storeAddress' => 'Test Address',
            'profileImagePath' => 'https://firebasestorage.googleapis.com/default_avatar.png',
        ]);

        // Generate a test API key
        $apiKey = hash('sha256', $user->email . config('app.key'));

        // Create a fake image file
        $file = UploadedFile::fake()->image('profile.jpg');

        // Make a request to update profile with image
        $response = $this->withHeaders([
            'X-API-KEY' => $apiKey,
            'X-USER-ID' => $user->id,
        ])->postJson('/api/user/profile/update', [
            'profileImage' => $file,
        ]);

        // Assert response is successful
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Profil berhasil diperbarui',
            ]);

        // Assert database has updated image path
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'profileImagePath' => 'https://firebasestorage.googleapis.com/mock/profile_images/test.jpg',
        ]);
    }

    /**
     * Test user profile update with base64 image.
     *
     * @return void
     */
    public function test_user_can_update_profile_image_base64(): void
    {
        // Create a test user
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'passwordHash' => Hash::make('password'),
            'phoneNumber' => '08123456789',
            'storeName' => 'Test Store',
            'storeAddress' => 'Test Address',
            'profileImagePath' => 'https://firebasestorage.googleapis.com/default_avatar.png',
        ]);

        // Generate a test API key
        $apiKey = hash('sha256', $user->email . config('app.key'));

        // Create a fake base64 image
        $base64Image = 'data:image/jpeg;base64,' . base64_encode(file_get_contents(UploadedFile::fake()->image('profile.jpg')->path()));

        // Make a request to update profile with base64 image
        $response = $this->withHeaders([
            'X-API-KEY' => $apiKey,
            'X-USER-ID' => $user->id,
        ])->postJson('/api/user/profile/update', [
            'profileImageBase64' => $base64Image,
        ]);

        // Assert response is successful
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Profil berhasil diperbarui',
            ]);

        // Assert database has updated image path
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'profileImagePath' => 'https://firebasestorage.googleapis.com/mock/profile_images/test_base64.jpg',
        ]);
    }
}
