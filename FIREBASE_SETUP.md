# Firebase Setup dan Troubleshooting

Dokumen ini berisi panduan konfigurasi dan troubleshooting untuk integrasi Firebase Storage dalam aplikasi Laravel Aplikasir-Web.

## Kebutuhan Konfigurasi

Untuk menggunakan Firebase Storage, Anda memerlukan:

1. Akun Firebase
2. Project Firebase yang sudah dibuat
3. Service Account yang sudah dikonfigurasi dengan izin Storage Admin

## Langkah-langkah Konfigurasi

### 1. Membuat Project Firebase

1. Kunjungi [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project"
3. Ikuti petunjuk untuk membuat project baru

### 2. Mengaktifkan Firebase Storage

1. Di Firebase Console, pilih project Anda
2. Klik "Storage" di menu sebelah kiri
3. Ikuti panduan untuk mengaktifkan Firebase Storage
4. Pilih lokasi penyimpanan yang sesuai (mis: asia-southeast1 untuk lokasi Indonesia)

### 3. Mendapatkan Service Account Credentials

1. Di Firebase Console, pilih project Anda
2. Klik ikon roda gigi di pojok kiri atas, lalu pilih "Project settings"
3. Pilih tab "Service accounts"
4. Klik "Generate new private key"
5. Simpan file JSON yang diunduh di tempat yang aman

### 4. Konfigurasi Aplikasi Laravel

#### A. Menyiapkan Environment Variables

Tambahkan variabel berikut di file `.env`:

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_X509_CERT_URL=...
```

#### B. Mengatur Firebase Credentials

Pastikan bahwa file `firebase-credentials.json` dibuat secara otomatis oleh `FirebaseServiceProvider` di folder `storage/app/`.

## Troubleshooting

### Masalah Umum dan Solusinya

#### 1. Error: "Failed to initialize Firebase Storage client"

**Penyebab potensial:**
- File kredensial tidak ditemukan
- Format private key tidak benar

**Solusi:**
- Pastikan format private key sudah benar, termasuk karakter escape `\n`
- Pastikan `FirebaseServiceProvider` sudah membuat file `firebase-credentials.json`
- Jalankan perintah berikut untuk menguji koneksi:

```bash
php artisan firebase:test-storage
```

#### 2. Error: "Storage bucket not found"

**Penyebab potensial:**
- Nama bucket Firebase Storage tidak benar
- Bucket belum dibuat di Firebase Console

**Solusi:**
- Pastikan nama bucket di `.env` sama dengan yang ada di Firebase Console (biasanya: `your-project-id.appspot.com`)
- Pastikan Storage sudah diaktifkan di Firebase Console

#### 3. Error: "Permission denied" saat upload

**Penyebab potensial:**
- Service account tidak memiliki izin yang cukup
- Rules pada Firebase Storage terlalu ketat

**Solusi:**
- Pastikan service account memiliki izin Storage Admin
- Periksa dan sesuaikan rules Firebase Storage di Firebase Console

#### 4. Image URL Tidak Bisa Diakses

**Penyebab potensial:**
- File diupload tanpa akses publik
- CORS belum dikonfigurasi dengan benar

**Solusi:**
- Pastikan parameter `predefinedAcl` diatur ke `publicRead` saat upload
- Konfigurasi CORS di Firebase Console untuk mengizinkan akses dari domain aplikasi Anda

## Testing Integrasi Firebase

Untuk memverifikasi bahwa integrasi Firebase Storage berfungsi dengan benar, jalankan command:

```bash
php artisan firebase:test-storage
```

Command ini akan mencoba mengunggah file test ke Firebase Storage dan menampilkan hasilnya. Ini sangat berguna untuk memastikan konfigurasi sudah benar sebelum menjalankan aplikasi secara penuh.

## Pertanyaan Umum (FAQ)

### Q: Apakah Firebase digunakan untuk database juga?
A: Tidak, dalam aplikasi ini Firebase hanya digunakan untuk penyimpanan file (Storage), bukan untuk database atau autentikasi.

### Q: Apakah gambar profil user selalu disimpan di Firebase?
A: Ya, semua gambar profil user disimpan di Firebase Storage untuk memastikan performa dan ketersediaan yang baik.

### Q: Bagaimana cara mendapatkan URL publik gambar?
A: URL publik didapatkan melalui method `getPublicUrl()` di `FirebaseStorageService` setelah file berhasil diunggah.
