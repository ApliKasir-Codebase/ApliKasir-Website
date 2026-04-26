<?php

use App\Http\Controllers\AppDownloadController;
use App\Http\Controllers\GlobalProductController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QRCodeController;
use App\Http\Controllers\UserController;
use App\Models\AdminActivityLog;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Rute untuk Landing Page
Route::get('/', function () {
    // Get available app versions for download
    $appDownloadController = new AppDownloadController;
    $availableVersions = $appDownloadController->getAvailableVersions();

    return Inertia::render('LandingPage', [
        'availableVersions' => $availableVersions,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('landing');

// Rute untuk download aplikasi
Route::get('/download-app/{filename}', [AppDownloadController::class, 'downloadApp'])
    ->name('app.download')
    ->where('filename', '[^/]+');

// Rute Dashboard (Breeze sudah membuat ini)
Route::get('/dashboard', function () {
    // Data untuk kartu statistik
    $statsData = [
        ['title' => 'Pengguna Harian', 'value' => '124', 'icon' => 'UserIcon'], // Ganti 'UserIcon' dengan nama ikon yang sesuai
        ['title' => 'Pengguna Baru', 'value' => '124', 'icon' => 'UserPlusIcon'],
        ['title' => 'Scan Harian', 'value' => '124', 'icon' => 'ScanIcon'],
        ['title' => 'Total Pengguna', 'value' => '124', 'icon' => 'UsersIcon'],
    ];

    // Ambil log aktivitas admin terbaru
    $activityLogs = AdminActivityLog::with('admin')
        ->orderBy('created_at', 'desc')
        ->limit(10)
        ->get()
        ->map(function ($log) {
            return [
                'id' => $log->id,
                'user' => $log->admin ? $log->admin->name : 'Admin',
                'action' => $log->action,
                'module' => $log->module,
                'description' => $log->description,
                'timestamp' => $log->created_at->format('d/m/Y, H:i:s'),
                'ip_address' => $log->ip_address,
                'user_agent' => $log->user_agent,
                'details' => $log->details,
            ];
        });

    return Inertia::render('Dashboard/Index', [
        'stats' => $statsData,
        'activities' => $activityLogs,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Rute Profil (Breeze sudah membuat ini)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    // Rute untuk halaman pengguna
    Route::resource('users', UserController::class);

    // Rute untuk QR Code
    Route::get('/users/{user}/qrcode/regenerate', [QRCodeController::class, 'regenerate'])->name('users.qrcode.regenerate');
    Route::get('/users/{user}/qrcode/download', [QRCodeController::class, 'download'])->name('users.qrcode.download');

    // Rute untuk halaman produk
    Route::resource('products', ProductController::class);

    // Rute untuk verifikasi kode produk
    Route::post('products/verify-code', [ProductController::class, 'verifyProductCode'])
        ->name('products.verify-code');

    // Rute untuk halaman produk global
    Route::resource('global-products', GlobalProductController::class);

    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rute Autentikasi lainnya (Breeze sudah membuat ini)
require __DIR__.'/auth.php';
