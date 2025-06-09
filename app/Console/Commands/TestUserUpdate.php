<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Helpers\ImageHelper;
use App\Services\FirebaseStorageService;
use Illuminate\Support\Facades\Log;

class TestUserUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:user-update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test user update functionality including partial updates and firebase uploads';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== TESTING USER UPDATE FUNCTIONALITY ===');
        
        // 1. Test Firebase Connection
        $this->info('Testing Firebase Storage connection...');
        
        try {
            $firebase = new FirebaseStorageService();
            $connectionTest = $firebase->testConnection();
            
            if ($connectionTest['success']) {
                $this->info('Firebase connection successful!');
                $this->info('Bucket: ' . $connectionTest['bucket']);
            } else {
                $this->error('Firebase connection failed!');
                $this->error('Error: ' . $connectionTest['message']);
                $this->warn('Skipping Firebase-related tests...');
            }
        } catch (\Exception $e) {
            $this->error('Firebase connection error: ' . $e->getMessage());
            $this->warn('Skipping Firebase-related tests...');
            $connectionTest['success'] = false;
        }
        
        $this->newLine();
        
        // 2. Create test user
        $this->info('Creating test user...');
        
        $user = User::create([
            'name' => 'Test User ' . time(),
            'email' => 'test' . time() . '@example.com',
            'phoneNumber' => '08' . rand(100000000, 999999999),
            'storeName' => 'Test Store ' . time(),
            'storeAddress' => 'Test Address',
            'passwordHash' => bcrypt('password123'),
            'kodeQR' => 'QR-TEST-' . strtoupper(substr(md5(rand()), 0, 8)),
        ]);
        
        $this->info('Created user with ID: ' . $user->id);
        $this->table(
            ['Field', 'Value'],
            [
                ['Name', $user->name],
                ['Email', $user->email],
                ['Phone', $user->phoneNumber],
                ['Store', $user->storeName],
                ['QR Code', $user->kodeQR],
            ]
        );
        
        $this->newLine();
        
        // 3. Test partial update (only name)
        $this->info('Testing partial update (name only)...');
        
        $newName = 'Updated Name ' . time();
        $user->update(['name' => $newName]);
        $user->refresh();
        
        $this->info('Updated name to: ' . $user->name);
        if ($user->name === $newName) {
            $this->info('✓ Name updated successfully');
        } else {
            $this->error('✗ Name update failed');
        }
        
        $this->newLine();
        
        // 4. Test QR code update
        $this->info('Testing QR code update...');
        
        $newQrCode = 'QR-UPDATE-' . strtoupper(substr(md5(rand()), 0, 8));
        $user->update(['kodeQR' => $newQrCode]);
        $user->refresh();
        
        $this->info('Updated QR code to: ' . $user->kodeQR);
        if ($user->kodeQR === $newQrCode) {
            $this->info('✓ QR code updated successfully');
        } else {
            $this->error('✗ QR code update failed');
        }
        
        // 5. Test generating QR code
        if ($user->kodeQR) {
            $this->info('Generating QR code image...');
            $qrDataUri = ImageHelper::generateQrCodeDataUri($user->kodeQR);
            
            $this->info('QR code image generated as data URI');
            $this->info('Data URI length: ' . strlen($qrDataUri) . ' characters');
            
            if (strlen($qrDataUri) > 100) {
                $this->info('✓ QR code generation successful');
            } else {
                $this->error('✗ QR code generation failed or returned invalid data');
            }
        }
        
        $this->newLine();
        
        // 6. Clean up
        $this->info('Cleaning up - deleting test user...');
        
        $userId = $user->id;
        $user->delete();
        
        $exists = User::where('id', $userId)->exists();
        if (!$exists) {
            $this->info('✓ Test user deleted successfully');
        } else {
            $this->error('✗ Failed to delete test user');
        }
        
        $this->newLine();
        $this->info('=== TEST COMPLETED ===');
        
        return Command::SUCCESS;
    }
}
