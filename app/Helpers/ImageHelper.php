<?php

namespace App\Helpers;

use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;

class ImageHelper
{
    /**
     * Mengubah file gambar menjadi data URI untuk display preview
     * 
     * @param string $filePath Path ke file gambar
     * @return string Data URI string
     */
    public static function fileToDataUri($filePath)
    {
        if (!file_exists($filePath)) {
            return null;
        }
        
        $type = mime_content_type($filePath);
        $data = file_get_contents($filePath);
        
        return 'data:' . $type . ';base64,' . base64_encode($data);
    }
    

    
    /**
     * Mendapatkan ekstensi file dari nama file
     * 
     * @param string $filename Nama file
     * @return string Ekstensi file (tanpa titik di depan)
     */
    public static function getFileExtension($filename)
    {
        if (empty($filename)) {
            return '';
        }
        
        $parts = explode('.', $filename);
        if (count($parts) > 1) {
            return strtolower(end($parts));
        }
        
        return '';
    }
    /**
     * Generate QR code image sebagai data URI
     * 
     * Membuat kode QRIS (Quick Response Code Indonesian Standard) dalam format
     * gambar QR yang dapat digunakan untuk pembayaran digital sesuai standar Bank Indonesia.
     * 
     * Kode QR mentah dari database ($content) dikonversi menjadi representasi 
     * visual yang dapat dipindai aplikasi pembayaran mobile. Generasi dilakukan
     * secara lokal tanpa memerlukan layanan eksternal.
     * 
     * @param string $content Konten yang akan dijadikan QR code (kode QRIS)
     * @param int $size Ukuran QR code (pixel)
     * @return string Data URI dari QR code yang dibuat
     */
    public static function generateQrCodeDataUri($content, $size = 200)
    {
        // Konfigurasi QR code
        $options = new QROptions([
            'outputType' => QRCode::OUTPUT_IMAGE_PNG,
            'eccLevel' => QRCode::ECC_L,
            'scale' => 5,
            'imageBase64' => true,
            'moduleValues' => [
                // Warna standar QRIS
                1024 => [0, 0, 0, 0],       // light (background)
                4096 => [0, 0, 0, 100],     // dark (foreground)
            ],
        ]);
        
        // Buat QR code
        $qrcode = new QRCode($options);
        $qrDataUri = $qrcode->render($content);
        
        // QR code sudah dalam format data:image/png;base64,...
        return $qrDataUri;
    }
    /**
     * Generate QR code image as a file
     * 
     * Membuat kode QRIS (Quick Response Code Indonesian Standard) sebagai file gambar
     * yang dapat disimpan ke disk atau diunduh oleh pengguna.
     * 
     * @param string $content Konten yang akan dijadikan QR code (kode QRIS)
     * @param string $outputPath Path lengkap ke lokasi penyimpanan file
     * @param int $size Ukuran QR code (pixel)
     * @return bool True jika berhasil membuat file, false jika gagal
     */
    public static function generateQrCodeFile($content, $outputPath, $size = 500)
    {
        // Konfigurasi QR code
        $options = new QROptions([
            'outputType' => QRCode::OUTPUT_IMAGE_PNG,
            'eccLevel' => QRCode::ECC_L,
            'scale' => 10,
            'imageBase64' => false,
            'moduleValues' => [
                // Warna standar QRIS
                1024 => [0, 0, 0, 0],       // light (background)
                4096 => [0, 0, 0, 100],     // dark (foreground)
            ],
        ]);
        
        try {
            // Pastikan direktori ada
            $dir = dirname($outputPath);
            if (!file_exists($dir)) {
                mkdir($dir, 0755, true);
            }
            
            // Buat QR code dan simpan ke file
            $qrcode = new QRCode($options);
            $qrcode->render($content, $outputPath);
            
            return file_exists($outputPath);
        } catch (\Exception $e) {
            \Log::error('Failed to generate QR code file: ' . $e->getMessage());
            return false;
        }
    }
}
