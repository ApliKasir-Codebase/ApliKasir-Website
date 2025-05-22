<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Helpers\ImageHelper;

class TestQrCode extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:qrcode';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test local QR code generation';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Testing QR code generation...');
        
        $testCode = 'QR-TEST-' . strtoupper(substr(md5(uniqid()), 0, 8));
        $this->info('Test QR code value: ' . $testCode);
        
        // Test generating QR code as file
        $filePath = storage_path('app/test-qr.png');
        $this->info('Generating QR code file at: ' . $filePath);
        
        $success = ImageHelper::generateQrCodeFile($testCode, $filePath);
        
        if ($success) {
            $this->info('✅ QR code file generated successfully.');
            $this->info('File size: ' . filesize($filePath) . ' bytes');
        } else {
            $this->error('❌ Failed to generate QR code file.');
            return 1;
        }
        
        // Test generating QR code as data URI
        $this->info('Generating QR code data URI...');
        try {
            $dataUri = ImageHelper::generateQrCodeDataUri($testCode);
            $this->info('✅ QR code data URI generated successfully.');
            $this->info('Data URI length: ' . strlen($dataUri) . ' characters');
            $this->info('Data URI (truncated): ' . substr($dataUri, 0, 50) . '...');
        } catch (\Exception $e) {
            $this->error('❌ Failed to generate QR code data URI: ' . $e->getMessage());
            return 1;
        }
        
        $this->info('✅ All QR code tests passed successfully!');
        return 0;
    }
}
