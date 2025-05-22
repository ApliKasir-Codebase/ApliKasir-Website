# Panduan Update Data Pengguna

Dokumen ini menjelaskan cara kerja sistem update data pengguna di Aplikasir Web.

## Fitur Utama

1. **Update Parsial** - Sistem mendukung update parsial data pengguna di mana hanya field yang berubah saja yang akan divalidasi, dikirim ke server, dan disimpan di database.

2. **Penanganan Gambar Profil** - Upload gambar profil ke Firebase Storage dilakukan dengan efisien, termasuk penghapusan gambar lama jika ada perubahan. Mendukung upload dari file dan format base64 (untuk aplikasi mobile).

3. **Penanganan Kode QRIS** - Kode QR untuk pembayaran QRIS dapat diupdate secara manual atau dibuat otomatis jika dikosongkan.

4. **Audit Log** - Seluruh perubahan data pengguna dicatat di system log untuk keperluan audit.

## Alur Update Data

1. **Frontend (React/Inertia)**
   - Form diinisialisasi dengan data pengguna saat ini
   - Data awal disimpan untuk perbandingan
   - Saat submit, hanya data yang berubah yang dikirim ke server
   - File gambar selalu dikirim sebagai file utuh jika dipilih

2. **Backend (Laravel Controller)**
   - Validasi hanya diterapkan pada field yang ada dalam request
   - Pemrosesan khusus untuk field seperti password dan profileImage
   - Update database hanya dilakukan jika ada perubahan data
   - Pencatatan perubahan untuk audit log

## Implementasi Technical

### Frontend (Edit.jsx)

```jsx
// 1. Simpan data awal untuk perbandingan
useEffect(() => {
    setOriginalData({
        name: user.name || '',
        email: user.email || '',
        // ... field lainnya ...
    });
}, [user]);

// 2. Saat submit, hanya kirim data yang berubah
const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
        // Selalu kirim password jika diisi
        if (key === 'password' && data[key]) {
            formData.append(key, data[key]);
            formData.append('password_confirmation', data.password_confirmation);
        } 
        // Selalu kirim file gambar jika dipilih
        else if (key === 'profileImage' && data[key]) {
            formData.append(key, data[key]);
        } 
        // Hanya kirim field lain jika berubah
        else if (key !== 'profileImage' && key !== 'password' && 
                 key !== 'password_confirmation' && 
                 data[key] !== originalData[key]) {
            formData.append(key, data[key] || '');
        }
    });
    
    put(route('users.update', user.id), formData, {
        forceFormData: true
    });
};
```

### Backend (UserController.php)

```php
public function update(Request $request, User $user)
{        
    // 1. Tentukan aturan validasi hanya untuk field yang ada dalam request
    $rules = [];
    
    if ($request->has('name')) {
        $rules['name'] = 'required|string|max:255';
    }
    
    // ... aturan validasi untuk field lainnya ...
    
    // 2. Validasi input berdasarkan rules yang sudah ditentukan
    $validated = $request->validate($rules);
    
    // 3. Data yang akan diupdate & perubahan untuk logging
    $dataToUpdate = [];
    $changes = [];
    
    // 4. Proses setiap field yang valid
    foreach ($validated as $key => $value) {
        if ($key !== 'profileImage' && $key !== 'password' && $key !== 'password_confirmation' && $key !== 'kodeQR') {
            $dataToUpdate[$key] = $value;
            if ($user->{$key} != $value) {
                $changes[$key] = [
                    'old' => $user->{$key},
                    'new' => $value
                ];
            }
        }
    }
    
    // 5. Proses khusus untuk field tertentu (password, gambar, dll)
    
    // 6. Update database hanya jika ada perubahan
    if (!empty($dataToUpdate)) {
        $user->update($dataToUpdate);
        
        // 7. Log aktivitas jika ada perubahan
        if (!empty($changes)) {
            AdminActivityLogger::log(
                'users', 
                'updated',
                "Mengubah data pengguna: {$user->name}",
                [
                    'user_id' => $user->id,
                    'changes' => $changes
                ]
            );
        }
    }
}
```

## Pengujian

Untuk menguji fitur update parsial, gunakan skrip `test-user-update.php`:

```bash
php test-user-update.php
```

Skrip ini akan:
1. Membuat pengguna test
2. Mengupdate hanya sebagian data
3. Memverifikasi bahwa perubahan tersimpan dengan benar
4. Membersihkan pengguna test

## Troubleshooting

Jika mengalami masalah dengan upload gambar profil:

1. Periksa koneksi Firebase dengan menjalankan metode testConnection:
   ```php
   $firebase = new FirebaseStorageService();
   $result = $firebase->testConnection();
   ```

2. Pastikan format private key di .env sudah benar (dengan quotes dan newlines):
   ```
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

3. Periksa log Laravel untuk error detail:
   ```bash
   tail -n 100 storage/logs/laravel.log
   ```

## Update Gambar Profil via Base64 (Mobile)

Untuk aplikasi mobile yang menggunakan endpoint dari sistem lain (Node.js), aplikasi tersebut dapat mengirim gambar profil menggunakan format base64 melalui aplikasi web Laravel ini.

### Format Data untuk Update Base64

```json
{
  "profileImageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."
}
```

### Implementasi di UserController

UserController mendukung update gambar profil via base64 dengan penanganan khusus:

```php
// Tangani upload gambar profil dengan format base64 (untuk aplikasi mobile)
if ($request->filled('profileImageBase64')) {
    try {
        // Ambil data gambar base64
        $base64Image = $request->input('profileImageBase64');
        
        // Generate filename unik
        $filename = "profile_{$timestamp}-{$random}.jpg";
        $storagePath = 'profile_images/' . $filename;
        
        // Upload gambar base64 ke Firebase Storage
        $url = $firebaseStorage->uploadBase64Image($base64Image, $storagePath);
        
        // Tambahkan URL gambar ke data yang akan diupdate
        $dataToUpdate['profileImagePath'] = $url;
        
        // Hapus gambar lama jika ada
        // ...
    } catch (\Exception $e) {
        // Error handling
    }
}
```
