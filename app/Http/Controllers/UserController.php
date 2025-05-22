<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Transaction;
use App\Services\AdminActivityLogger;
use App\Services\FirebaseStorageService;
use App\Helpers\ImageHelper;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{    /**
     * Display a listing of the users.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $query = User::select('id', 'name', 'email', 'phoneNumber', 'storeName', 'created_at');
        
        // Apply search if provided
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phoneNumber', 'like', "%{$search}%")
                  ->orWhere('storeName', 'like', "%{$search}%");
            });
        }
        
        $users = $query->orderBy('created_at', 'desc')
                     ->paginate(10)
                     ->withQueryString();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }    /**
     * Store a newly created user in storage.
     * 
     * Membuat pengguna baru dengan semua informasi yang diperlukan,
     * termasuk menghasilkan kode QRIS (Quick Response Code Indonesian Standard)
     * yang akan digunakan untuk pembayaran di aplikasi mobile.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */      public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phoneNumber' => 'required|string|unique:users',
            'storeName' => 'required|string|max:255',
            'storeAddress' => 'required|string',
            'password' => 'required|string|min:8',
            'profileImage' => 'nullable|image|max:2048', // Max 2MB
        ]);        $validated['passwordHash'] = bcrypt($request->password);
        
        // Generate kode QR untuk pengguna baru
        // Kode QR mentah ini disimpan di database dan digunakan untuk
        // membuat representasi visual kode QRIS untuk pembayaran
        $validated['kodeQR'] = 'QR-' . strtoupper(substr(md5(uniqid()), 0, 8));
        
        // Default profile image path
        $validated['profileImagePath'] = 'https://firebasestorage.googleapis.com/v0/b/' . 
            config('services.firebase.storage_bucket') . 
            '/o/profile_images%2Fdefault_avatar.png?alt=media&token=default-token';
        
        // Handle profileImage upload ke Firebase Storage jika ada
        if ($request->hasFile('profileImage')) {
            $profileImage = $request->file('profileImage');
            $filename = 'profile_' . time() . '-' . rand(100000000, 999999999) . '.' . $profileImage->getClientOriginalExtension();
            
            try {
                $firebaseStorage = new FirebaseStorageService();
                $storagePath = 'profile_images/' . $filename;
                $url = $firebaseStorage->uploadImage($profileImage->getRealPath(), $storagePath);
                
                $validated['profileImagePath'] = $url;
            } catch (\Exception $e) {
                \Log::error("Firebase upload error: " . $e->getMessage());
                return redirect()->back()->withErrors(['profileImage' => 'Gagal mengupload gambar: ' . $e->getMessage()]);
            }
        }
        
        // Hapus key yang tidak dibutuhkan di model
        unset($validated['password']);
        unset($validated['profileImage']);

        $user = User::create($validated);
        
        // Log admin activity
        AdminActivityLogger::log(
            'users', 
            'created',
            "Membuat pengguna baru: {$user->name}",
            [
                'user_id' => $user->id,
                'user_email' => $user->email,
                'store_name' => $user->storeName
            ]
        );

        return redirect()->route('users.index')->with('success', 'Pengguna berhasil ditambahkan!');    }/**
     * Display the specified user.
     * 
     * Menampilkan detail pengguna, termasuk visualisasi kode QRIS
     * yang diambil dari nilai kodeQR dalam database.
     * 
     * @param  \App\Models\User  $user
     * @return \Inertia\Response
     */    public function show(User $user)
    {
        $user->load([
            'customers' => function ($query) {
                $query->orderBy('nama_pelanggan');
            },
            'transactions' => function ($query) {
                $query->with('customer')  // Load the customer relationship
                      ->orderBy('tanggal_transaksi', 'desc')
                      ->limit(10);
            },
            'products' => function ($query) {
                $query->orderBy('nama_produk');
            }
        ]);

        // Get all unpaid transactions (debts)
        $customerDebts = Transaction::where('user_id', $user->id)
            ->where('status_pembayaran', 'Belum Lunas')
            ->with('customer')
            ->get();
            
        // Generate QR code data URI for display
        $qrCodeDataUri = null;
        if ($user->kodeQR) {
            $qrCodeDataUri = ImageHelper::generateQrCodeDataUri($user->kodeQR);
        }

        return Inertia::render('Users/Show', [
            'user' => $user,
            'customerDebts' => $customerDebts,
            'qrCodeDataUri' => $qrCodeDataUri
        ]);
    }/**
     * Show the form for editing the specified user.
     */
    public function edit(User $user)
    {
        // Generate QR code preview if needed
        $qrCodeDataUri = null;
        if (!empty($user->kodeQR)) {
            $qrCodeDataUri = ImageHelper::generateQrCodeDataUri($user->kodeQR);
        }
        
        return Inertia::render('Users/Edit', [
            'user' => $user,
            'qrCodeDataUri' => $qrCodeDataUri,
        ]);
    }/**
     * Update the specified user in storage.
     * 
     * Mengupdate informasi pengguna, termasuk kode QRIS jika diubah.
     * Kode QRIS dipertahankan dalam database dan penting untuk proses
     * pembayaran di aplikasi mobile.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\RedirectResponse
     */          public function update(Request $request, User $user)    {          // Log informasi request untuk debugging
        \Log::info('User update request details', [
            'content_type' => $request->header('Content-Type'),
            'request_has_file' => $request->hasFile('profileImage'),
            'files_global' => !empty($_FILES) ? count($_FILES) : 0,
            'files_keys' => !empty($_FILES) ? array_keys($_FILES) : [],
            'request_all_files' => $request->allFiles(),
        ]);

        // Cek keberadaan file dengan metode yang lebih detail
        $hasProfileImage = false;
        
        // Cek keberadaan file dengan beberapa metode
        if ($request->hasFile('profileImage') && $request->file('profileImage')->isValid()) {
            $hasProfileImage = true;
            \Log::info("ProfileImage detected using hasFile");
        } 
        // Cek melalui $_FILES global
        else if (!empty($_FILES['profileImage']['tmp_name']) && $_FILES['profileImage']['error'] === UPLOAD_ERR_OK) {
            // Create UploadedFile instance from $_FILES
            $file = new \Illuminate\Http\UploadedFile(
                $_FILES['profileImage']['tmp_name'],
                $_FILES['profileImage']['name'],
                $_FILES['profileImage']['type'],
                $_FILES['profileImage']['error'],
                true
            );
            
            // Tambahkan file ke request
            $request->files->set('profileImage', $file);
            $hasProfileImage = true;
            \Log::info("ProfileImage detected using global FILES", [
                'name' => $_FILES['profileImage']['name'],
                'type' => $_FILES['profileImage']['type'],
                'size' => $_FILES['profileImage']['size']
            ]);
        }
        
        // Lakukan validasi data
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'phoneNumber' => 'required|string|unique:users,phoneNumber,'.$user->id,
            'storeName' => 'required|string|max:255',
            'storeAddress' => 'required|string',
            'kodeQR' => 'nullable|string|unique:users,kodeQR,'.$user->id,
        ];
        
        // Tambahkan validasi file jika ada
        if ($hasProfileImage) {
            $rules['profileImage'] = 'file|image|max:5120'; // Allow up to 5MB
        }
        
        $validated = $request->validate($rules);
        
        // Siapkan data untuk update
        $dataToUpdate = collect($validated)
            ->except(['profileImage', 'password', 'password_confirmation'])
            ->toArray();
        
        // Handle profile image upload if present
        if ($hasProfileImage) {
            $profileImage = $request->file('profileImage');
            
            try {
                $timestamp = time();
                $random = rand(100000000, 999999999);
                $filename = "profile_{$timestamp}-{$random}.{$profileImage->getClientOriginalExtension()}";
                
                // Upload ke Firebase Storage
                $firebaseStorage = new \App\Services\FirebaseStorageService();
                $storagePath = "profile_images/{$filename}";
                $url = $firebaseStorage->uploadImage($profileImage->getRealPath(), $storagePath);
                
                // Tambahkan URL gambar ke data update
                $dataToUpdate['profileImagePath'] = $url;
                
                \Log::info('Profile image uploaded successfully', [
                    'url' => $url,
                    'filename' => $filename
                ]);
            } catch (\Exception $e) {
                \Log::error('Failed to upload profile image', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                
                return redirect()->back()->withErrors([
                    'profileImage' => 'Gagal mengupload gambar: ' . $e->getMessage()
                ])->withInput();
            }
        }
        
        // Update user data
        $user->update($dataToUpdate);
        
        // Add success response
        \Log::info('User updated successfully', [
            'user_id' => $user->id,
            'has_profile_image' => $hasProfileImage ? 'Yes' : 'No',
            'updated_fields' => array_keys($dataToUpdate)
        ]);
        
        // Redirect with success message
        return redirect()->route('users.show', $user->id)
            ->with('success', 'Pengguna berhasil diperbarui');
    }/**
     * Remove the specified user from storage.
     */    public function destroy(User $user)
    {
        $userName = $user->name;
        $userId = $user->id;
        
        // Hapus foto profil dari Firebase Storage jika bukan default
        if (!empty($user->profileImagePath) && !str_contains($user->profileImagePath, 'default_avatar')) {
            try {
                $firebaseStorage = new FirebaseStorageService();
                $oldFilename = ImageHelper::getFilenameFromFirebaseUrl($user->profileImagePath);
                
                if ($oldFilename) {
                    $oldPath = 'profile_images/' . $oldFilename;
                    $firebaseStorage->deleteFile($oldPath);
                }
            } catch (\Exception $e) {
                \Log::error("Firebase delete error on user {$userId}: " . $e->getMessage());
                // Continue with deletion even if image deletion fails
            }
        }
        
        $user->delete();
        
        // Log admin activity
        AdminActivityLogger::log(
            'users', 
            'deleted',
            "Menghapus pengguna: {$userName}",
            [
                'user_id' => $userId,
                'user_email' => $user->email,
                'store_name' => $user->storeName
            ]
        );

        return redirect()->route('users.index')->with('success', 'Pengguna berhasil dihapus!');
    }
    
    /**
     * Helper function to get upload error message
     */    private function getUploadErrorMessage($errorCode)
    {
        $errorMessages = [
            UPLOAD_ERR_INI_SIZE => 'Ukuran file melebihi upload_max_filesize pada php.ini (' . ini_get('upload_max_filesize') . ')',
            UPLOAD_ERR_FORM_SIZE => 'Ukuran file melebihi MAX_FILE_SIZE pada form HTML',
            UPLOAD_ERR_PARTIAL => 'File hanya terupload sebagian. Coba lagi dengan koneksi yang lebih stabil.',
            UPLOAD_ERR_NO_FILE => 'Tidak ada file yang diupload',
            UPLOAD_ERR_NO_TMP_DIR => 'Folder temporary server tidak ditemukan. Hubungi administrator.',
            UPLOAD_ERR_CANT_WRITE => 'Gagal menulis file ke disk server. Hubungi administrator.',
            UPLOAD_ERR_EXTENSION => 'Upload dihentikan oleh ekstensi PHP. Hubungi administrator.'
        ];
        
        return $errorMessages[$errorCode] ?? "Unknown upload error (code: {$errorCode})";
    }
    
    /**
     * Memvalidasi file gambar dan mengembalikan pesan error jika ada
     * 
     * @param \Illuminate\Http\UploadedFile $file
     * @return string|null Pesan error atau null jika valid
     */
    private function validateImageFile($file)
    {
        if (!$file->isValid()) {
            return 'File tidak valid: ' . $this->getUploadErrorMessage($file->getError());
        }
        
        // Validasi ukuran (max 2MB)
        if ($file->getSize() > 2 * 1024 * 1024) {
            return 'Ukuran file terlalu besar. Maksimal 2MB.';
        }
        
        // Validasi mime type
        $mime = $file->getMimeType();
        $allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/jpg'];
        
        if (!in_array($mime, $allowedMimes)) {
            return 'Format file tidak didukung. Gunakan JPG, PNG, GIF, WEBP, atau BMP. Format terdeteksi: ' . $mime;
        }
        
        return null;
    }
    
    private function hasProfileImage(Request $request)
    {
        // Enhanced detection using multiple methods
        if ($request->hasFile('profileImage')) {
            return true;
        }
        
        // Check raw request files array
        if (isset($_FILES['profileImage']) && !empty($_FILES['profileImage']['tmp_name'])) {
            return true;
        }
        
        // Check in the input bag
        if ($request->input('profileImage') instanceof UploadedFile) {
            return true;
        }
        
        // For AJAX-based uploads with FormData
        $headers = $request->headers->all();
        $contentType = $request->header('Content-Type', '');
        
        if (strpos($contentType, 'multipart/form-data') !== false) {
            // Manual check of request content when dealing with multipart
            foreach ($request->all() as $key => $value) {
                if ($key === 'profileImage' && !empty($value)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    // Add this to your controller to add better logging
    private function debugUploadInfo(Request $request)
    {
        \Log::info('Request files structure', [
            'files' => $request->allFiles(),
            'request_content' => $request->getContent(),
            'has_file_method' => $request->hasFile('profileImage'),
            'input_keys' => array_keys($request->all()),
            'file_input_content' => $request->input('profileImage')
        ]);
    }
}
