# Aplikasir Web - Admin Panel

Admin panel untuk aplikasi point of sale / kasir berbasis web.

## Fitur Utama

- Manajemen pengguna (kasir)
- Manajemen produk global dan produk per toko
- Log aktivitas admin
- Laporan transaksi
- Manajemen pelanggan
- Fitur sinkronisasi data

## Instalasi

### Prasyarat

- PHP 8.1+
- Composer
- Node.js dan npm
- Database MySQL
- Firebase Account (untuk penyimpanan gambar)

### Langkah Instalasi

1. Clone repositori ini

```bash
git clone https://github.com/your-username/aplikasir-web.git
cd aplikasir-web
```

2. Install dependensi PHP

```bash
composer install
```

3. Install dependensi JavaScript

```bash
npm install
```

4. Salin file .env.example menjadi .env dan sesuaikan konfigurasi database

```bash
cp .env.example .env
```

5. Generate application key

```bash
php artisan key:generate
```

6. Jalankan migrasi database dan seeder

```bash
php artisan migrate --seed
```

7. Konfigurasi Firebase

Salin variabel lingkungan Firebase dari `.env.example` ke file `.env` Anda:

```bash
# Firebase Storage Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project-id.iam.gserviceaccount.com
```

Untuk mendapatkan kredensial Firebase:
- Buat project di [Firebase Console](https://console.firebase.google.com/)
- Aktifkan Firebase Storage
- Buat Service Account di Project Settings > Service accounts
- Klik "Generate new private key" untuk mendapatkan file kredensial JSON
- Salin nilai dari file JSON ke variabel lingkungan yang sesuai

Pastikan untuk mengatur aturan keamanan Firebase Storage:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profile_images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Troubleshooting Firebase Integration

### Masalah Kredensial Firebase

Jika Anda mengalami masalah dengan integrasi Firebase, pastikan:

1. File kredensial sudah ada di `storage/app/firebase-credentials.json`
2. Kredensial di `.env` sudah sesuai dengan project Firebase Anda
3. Bucket Storage di Firebase sudah dibuat dan diaktifkan
4. Kredensial memiliki izin untuk mengakses Firebase Storage
5. Pastikan format private key sudah benar (termasuk karakter newline `\n`)

### Pengujian Firebase Storage

Anda dapat menjalankan pengujian Firebase Storage dengan perintah:

```bash
php artisan test --filter=FirebaseStorageTest
```

Atau jalankan command berikut untuk test interaktif:

```bash
php artisan test:firebase-storage
```

Command ini akan:
1. Membuat gambar test
2. Mengupload ke Firebase Storage
3. Mengambil URL publik
4. Menghapus gambar dari Firebase Storage

8. Compile assets

```bash
npm run dev
```

9. Jalankan aplikasi

```bash
php artisan serve
```

Aplikasi akan tersedia di `http://localhost:8000`

## Fitur Pengguna

### Manajemen Pengguna

Setiap pengguna memiliki:
- Informasi dasar (nama, email, nomor telepon)
- Informasi toko (nama dan alamat)
- Foto profil (disimpan di Firebase Storage)
- Kode QR/QRIS untuk pembayaran di aplikasi mobile

Untuk dokumentasi lengkap tentang fitur update pengguna, lihat [USER_UPDATE_GUIDE.md](USER_UPDATE_GUIDE.md).

### API Mobile

Aplikasi web ini terintegrasi dengan aplikasi mobile yang dikembangkan secara terpisah. 

Catatan Penting:
- Autentikasi pengguna mobile ditangani oleh backend Node.js yang terpisah
- Aplikasi web ini hanya menyediakan API untuk update data pengguna, khususnya foto profil
- Sistem ini mendukung upload foto profil melalui format base64 dari aplikasi mobile

API yang tersedia:
- Katalog produk global dan informasi kategori/brand
- Penambahan produk dari katalog ke inventaris

Untuk menguji fitur upload gambar base64, gunakan script:
```bash
php test-base64-upload.php
```

### Firebase Storage Integration

Aplikasi ini menggunakan Firebase Storage khusus untuk penyimpanan gambar profil pengguna. Firebase hanya digunakan untuk layanan penyimpanan, tidak untuk fitur lainnya.
Fitur penyimpanan Firebase:

1. **Upload Foto Profil**: 
   - Pengguna dapat mengunggah dan mengganti foto profil
   - Foto disimpan di Firebase Storage dengan akses publik
   - Gambar profil akan otomatis dihapus dari Firebase Storage ketika akun pengguna dihapus
   
### Konfigurasi Firebase

Aplikasi ini menggunakan Firebase Storage untuk menyimpan gambar profil. Untuk konfigurasi Firebase:

1. Ikuti panduan konfigurasi Firebase di file [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
2. Pastikan variabel lingkungan Firebase sudah diatur di file `.env`
3. Jalankan command test untuk memverifikasi koneksi:

```bash
php artisan firebase:test-storage
```

Untuk panduan lengkap mengenai setup dan troubleshooting Firebase, lihat [FIREBASE_SETUP.md](FIREBASE_SETUP.md).

### Kode QRIS (Quick Response Code Indonesian Standard)

Aplikasi ini mengintegrasikan sistem QRIS, standar pembayaran QR nasional Indonesia, untuk proses pembayaran mobile:

1. **Integrasi Pembayaran Mobile**:
   - Setiap pengguna memiliki kode QRIS unik
   - QRIS digunakan sebagai metode pembayaran di aplikasi mobile
   - Memudahkan transaksi pembayaran digital sesuai standar Bank Indonesia
   
2. **Manajemen Kode QRIS**:
   - Kode dapat digenerate ulang jika diperlukan
   - Format QR dapat diunduh sebagai gambar
   - Terintegrasi dengan sistem point-of-sale di aplikasi mobile

### Upload Foto Profil

Saat membuat atau mengedit pengguna, Anda dapat mengunggah foto profil yang akan disimpan di Firebase Storage. Pengunggahan dilakukan menggunakan service `FirebaseStorageService`.

### Kode QRIS

Setiap pengguna akan secara otomatis diberi kode QR yang berisi data QRIS (Quick Response Code Indonesian Standard) untuk memfasilitasi pembayaran digital di aplikasi mobile. 

**Tentang QRIS:**
- QRIS adalah standar nasional QR Code payment yang ditetapkan oleh Bank Indonesia
- Memungkinkan interoperabilitas antar penyedia layanan pembayaran di Indonesia
- Format QRIS mengikuti spesifikasi Merchant Presented Mode (MPM) yang standar
- Untuk detail implementasi QRIS dalam aplikasi ini, lihat [QRIS_IMPLEMENTATION.md](QRIS_IMPLEMENTATION.md)
- Untuk memahami perbedaan antara QR Code dan QRIS, lihat [QR_CODE_VS_QRIS.md](QR_CODE_VS_QRIS.md)
- Memungkinkan interoperabilitas antar penyedia layanan pembayaran di Indonesia
- Format QRIS mengikuti spesifikasi Merchant Presented Mode (MPM) yang standar
- Untuk detail implementasi QRIS dalam aplikasi ini, lihat [QRIS_IMPLEMENTATION.md](QRIS_IMPLEMENTATION.md)

**Manajemen Kode QRIS di Aplikasi:**
- Kode dapat diubah secara manual jika diperlukan melalui halaman pengguna
- QR Code dapat diunduh sebagai gambar untuk dicetak atau ditampilkan di toko
- Integrasi dengan aplikasi mobile untuk pemrosesan pembayaran
- Kode QR mentah (raw) disimpan dalam database untuk memastikan konsistensi antara penyimpanan dan representasi visual

**Penggunaan di Aplikasi Mobile:**
- Pengguna aplikasi mobile dapat membayar dengan memindai kode QRIS
- Transaksi diproses secara real-time melalui payment gateway yang terintegrasi
- Kode QRIS mengidentifikasi merchant/toko secara unik dalam sistem

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
