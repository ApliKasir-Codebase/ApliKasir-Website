<?php

require __DIR__ . '/vendor/autoload.php';

use App\Helpers\ImageHelper;

// Generate and save a QR code
$qrCode = ImageHelper::generateQrCodeFile('QR-TEST-12345678', __DIR__ . '/storage/app/test-qr.png');

if ($qrCode) {
    echo "QR code successfully generated at: " . __DIR__ . '/storage/app/test-qr.png' . PHP_EOL;
} else {
    echo "Failed to generate QR code" . PHP_EOL;
}

// Generate a QR code data URI
$qrDataUri = ImageHelper::generateQrCodeDataUri('QR-TEST-12345678');
echo "QR code data URI (truncated): " . substr($qrDataUri, 0, 100) . '...' . PHP_EOL;
