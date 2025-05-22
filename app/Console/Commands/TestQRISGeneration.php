<?php

namespace App\Console\Commands;

use App\Helpers\ImageHelper;
use Illuminate\Console\Command;

class TestQRISGeneration extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'qris:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test QRIS code generation functionality';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Testing QRIS Code Generation');
        $this->line('-------------------------------');
        
        // Generate test QRIS code
        $qrisCode = 'QR-TEST-' . strtoupper(substr(md5(uniqid()), 0, 8));
        $this->info("Generated test QRIS code: $qrisCode");
        
        // Step 1: Generate QR code as data URI
        $this->line('1. Generating QR code as data URI...');
        $qrDataUri = ImageHelper::generateQrCodeDataUri($qrisCode);
        $this->info('✓ Success! Data URI generated (truncated): ' . substr($qrDataUri, 0, 50) . '...');
        
        // Step 2: Generate QR code as file
        $outputPath = storage_path('app/test-qris.png');
        $this->line("2. Generating QR code file at: $outputPath...");
        $success = ImageHelper::generateQrCodeFile($qrisCode, $outputPath);
        
        if ($success) {
            $this->info('✓ Success! QR code file created');
            $this->line("File path: $outputPath");
            $this->line("File size: " . round(filesize($outputPath) / 1024, 2) . " KB");
        } else {
            $this->error('✗ Failed to create QR code file');
        }
        
        $this->line('');
        $this->info('QRIS Code Generation Test Completed');
        
        return 0;
    }
}
