# API Mobile Aplikasir - Dokumentasi

Dokumen ini menjelaskan endpoint API yang tersedia untuk aplikasi mobile Aplikasir.

## Autentikasi API

Semua endpoint API dilindungi dengan autentikasi berbasis header. Untuk mengakses API, klien harus menyertakan header berikut:

```
X-API-KEY: <api_key>
X-USER-ID: <user_id>
```

Di mana:
- `user_id` adalah ID pengguna yang valid dari database.
- `api_key` adalah kunci API yang digenerate berdasarkan email pengguna.

## Endpoint API

### 1. Mendapatkan Profil Pengguna

**Endpoint:** `GET /api/user/profile`

**Headers:**
- X-API-KEY: [api_key]
- X-USER-ID: [user_id]

**Response Success:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Nama Pengguna",
    "email": "user@example.com",
    "phoneNumber": "08123456789",
    "storeName": "Nama Toko",
    "storeAddress": "Alamat Toko",
    "profileImagePath": "https://firebasestorage.googleapis.com/...",
    "kodeQR": "QR-ABCD1234"
  }
}
```

### 2. Memperbarui Profil Pengguna

**Endpoint:** `POST /api/user/profile/update`

**Headers:**
- X-API-KEY: [api_key]
- X-USER-ID: [user_id]

**Parameters:**
- `name` (opsional): Nama baru pengguna
- `email` (opsional): Email baru pengguna
- `phoneNumber` (opsional): Nomor telepon baru
- `storeName` (opsional): Nama toko baru
- `storeAddress` (opsional): Alamat toko baru
- `password` (opsional): Password baru
- `password_confirmation` (opsional): Konfirmasi password baru
- `profileImage` (opsional): File gambar profil (multipart/form-data)
- `profileImageBase64` (opsional): String base64 gambar profil

**Catatan:**
- Untuk update field biasa, gunakan form data reguler.
- Untuk upload gambar, ada dua opsi:
  1. Upload file langsung menggunakan `profileImage`
  2. Upload base64 string menggunakan `profileImageBase64`

**Response Success:**
```json
{
  "success": true,
  "message": "Profil berhasil diperbarui",
  "data": {
    "id": 1,
    "name": "Nama Pengguna",
    "email": "user@example.com",
    "phoneNumber": "08123456789",
    "storeName": "Nama Toko",
    "storeAddress": "Alamat Toko",
    "profileImagePath": "https://firebasestorage.googleapis.com/...",
    "kodeQR": "QR-ABCD1234"
  }
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Pesan error",
  "errors": {
    "field": ["Detail error validasi"]
  }
}
```

## Upload Gambar Profil

Untuk upload gambar profil dari aplikasi mobile, ada dua metode yang didukung:

### 1. Upload File (multipart/form-data)

Gunakan metode ini jika aplikasi mobile Anda dapat mengirim file langsung.

```
POST /api/user/profile/update
Content-Type: multipart/form-data
X-API-KEY: [api_key]
X-USER-ID: [user_id]

profileImage: [FILE]
```

### 2. Upload Base64 String

Gunakan metode ini jika aplikasi mobile Anda tidak dapat mengirim file langsung.

```
POST /api/user/profile/update
Content-Type: application/x-www-form-urlencoded
X-API-KEY: [api_key]
X-USER-ID: [user_id]

profileImageBase64: data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...
```

## Proses Firebase Storage

1. Gambar diunggah ke Firebase Storage di folder `profile_images/`
2. Gambar profil lama dihapus dari Firebase Storage (kecuali gambar default)
3. URL gambar baru disimpan di database dan dikembalikan dalam respons API

## Pengujian API

Untuk menguji API, gunakan skrip `test-mobile-api.php`:

```bash
php test-mobile-api.php
```

Untuk pengujian otomatis dengan PHPUnit:

```bash
php artisan test --filter=UserApiTest
```
