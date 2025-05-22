<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Helpers\ImageHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class QRCodeController extends Controller
{    /**
     * Generate a new QR code for a user.
     * 
     * Membuat kode QRIS (Quick Response Code Indonesian Standard) baru untuk pengguna
     * yang akan digunakan sebagai identifikasi merchant dalam pembayaran mobile.
     * Kode ini mengikuti standar nasional Bank Indonesia.
     * 
     * Kode QR mentah disimpan dalam database dan digunakan untuk membuat
     * representasi visual kode QR yang dapat dipindai.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\RedirectResponse
     */
    public function regenerate(Request $request, User $user)
    {
        // Generate a new QR code value
        $user->kodeQR = 'QR-' . strtoupper(substr(md5(uniqid()), 0, 8));
        $user->save();
        
        return redirect()->back()->with('success', 'Kode QR berhasil digenerate ulang!');
    }    /**
     * Download the QR code image.
     * 
     * Menghasilkan dan mengunduh representasi visual dari kode QRIS pengguna
     * untuk ditampilkan di toko atau tempat usaha sebagai metode pembayaran.
     * QR Code mengikuti spesifikasi visual QRIS Bank Indonesia.
     * 
     * Kode QR mentah yang tersimpan di database akan dikonversi menjadi 
     * kode QR yang dapat dipindai menggunakan aplikasi payment.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function download(Request $request, User $user)
    {        if (empty($user->kodeQR)) {
            return redirect()->back()->with('error', 'Pengguna belum memiliki kode QR!');
        }
        
        // Create a temporary file path
        $tempFilePath = storage_path('app/temp/qrcode_' . $user->id . '.png');
        
        // Generate QR code image directly to file
        $success = ImageHelper::generateQrCodeFile($user->kodeQR, $tempFilePath, 500);
        
        if (!$success) {
            return redirect()->back()->with('error', 'Gagal menghasilkan file QR code!');
        }
        
        // Return file for download and then delete it
        return response()->download($tempFilePath, 'qrcode_' . $user->name . '.png', [
            'Content-Type' => 'image/png',
        ])->deleteFileAfterSend(true);
    }
}
