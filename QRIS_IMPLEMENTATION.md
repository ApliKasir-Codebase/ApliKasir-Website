# Implementasi QRIS (Quick Response Code Indonesian Standard)

> **Catatan Pembaruan (21 Mei 2025)**: Sistem pembuatan QR Code telah diubah dari menggunakan Google Chart API menjadi library lokal `chillerlan/php-qrcode`. Perubahan ini meningkatkan kehandalan aplikasi karena tidak lagi bergantung pada layanan eksternal.

Dokumen ini menjelaskan implementasi QRIS dalam aplikasi Aplikasir-Web.

## Tentang QRIS

QRIS (Quick Response Code Indonesian Standard) adalah standar QR Code untuk pembayaran digital yang ditetapkan oleh Bank Indonesia. QRIS bertujuan untuk memfasilitasi interoperabilitas antar penyedia layanan pembayaran di Indonesia, sehingga memudahkan transaksi pembayaran digital.

## Implementasi dalam Aplikasi

### Format Penyimpanan QRIS

Dalam aplikasi Aplikasir-Web, kode QRIS disimpan dalam database dengan format sebagai berikut:

```
QR-[8 KARAKTER UNIK]
```

Contoh: `QR-AB12CD34`

Kode QR ini disimpan dalam kolom `kodeQR` pada tabel `users` dan berfungsi sebagai data mentah (raw) yang kemudian dikonversi menjadi representasi visual QR code untuk keperluan pembayaran.

### Pengelolaan Kode QRIS

1. **Pembuatan Kode QRIS**
   - Setiap pengguna baru secara otomatis mendapatkan kode QRIS unik
   - Kode dibuat menggunakan kombinasi prefix `QR-` dan 8 karakter unik dari hash MD5

2. **Pembaruan Kode QRIS**
   - Pengguna dapat mengubah kode QRIS melalui halaman edit profil
   - Administrator dapat mengubah kode QRIS pengguna
   - Kode dapat di-regenerate jika diperlukan melalui tombol regenerate

3. **Penyimpanan Raw Code**
   - **Penting**: Kode QR mentah (raw) selalu disimpan dalam database untuk konsistensi
   - Menyimpan raw code memastikan data yang sama digunakan di aplikasi web dan mobile
   - Format raw code memudahkan troubleshooting dan audit transaksi

4. **Penggunaan dalam Pembayaran**
   - Kode QRIS digunakan sebagai identifikasi merchant dalam aplikasi mobile
   - Transaksi pembayaran menggunakan kode QRIS untuk identifikasi penerima pembayaran

## Konversi ke Visual QR Code

Kode QRIS yang disimpan dalam database akan dikonversi menjadi representasi visual QR code menggunakan library `chillerlan/php-qrcode` melalui `ImageHelper::generateQrCodeDataUri()` dan `ImageHelper::generateQrCodeFile()`. QR code ini kemudian dapat:

1. Ditampilkan di aplikasi web untuk preview
2. Diunduh sebagai gambar PNG
3. Digunakan dalam aplikasi mobile untuk pembayaran

Keuntungan dari pendekatan ini adalah semua kode QR dibuat secara lokal tanpa bergantung pada layanan eksternal seperti Google Chart API, sehingga aplikasi tetap berfungsi bahkan tanpa koneksi internet.

## Validasi dan Keamanan

1. **Validasi Format**
   - Kode QRIS memiliki format yang konsisten dengan prefix `QR-`
   - Setiap kode bersifat unik untuk setiap pengguna (validasi uniqueness)

2. **Keamanan**
   - Kode QRIS hanya dapat diubah oleh pemilik akun atau administrator
   - Pembaruan kode QRIS dicatat dalam log aktivitas admin

## Alur Proses QRIS dalam Aplikasi

1. Admin membuat pengguna baru → Sistem generate kode QRIS otomatis
2. Pengguna dapat melihat dan mengunduh QR code dari dashboard
3. Pembeli menggunakan aplikasi pembayaran untuk memindai QR code
4. Sistem pembayaran memproses transaksi menggunakan data QRIS
5. Status pembayaran diperbarui di aplikasi mobile

## Integrasi dengan Aplikasi Mobile

Kode QRIS digunakan dalam aplikasi mobile Aplikasir untuk:

1. Identifikasi merchant saat proses pembayaran
2. Validasi pembayaran dari berbagai penyedia layanan pembayaran
3. Pencatatan transaksi yang masuk ke merchant

## Pertimbangan Penting

- Kode QRIS harus selalu disimpan dalam database dan tidak boleh hilang
- Perubahan kode QRIS akan mempengaruhi transaksi pembayaran
- Pastikan QR code yang dicetak selalu sesuai dengan data terbaru di database
