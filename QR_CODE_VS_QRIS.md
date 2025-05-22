# QR Code vs QRIS: Perbedaan dan Implementasi

Dokumen ini menjelaskan perbedaan antara QR Code standar dan QRIS (Quick Response Code Indonesian Standard) dalam konteks aplikasi Aplikasir-Web.

## QR Code

QR Code (Quick Response Code) adalah jenis kode batang dua dimensi yang dikembangkan oleh Denso Wave. QR Code dapat menyimpan berbagai jenis data seperti teks, URL, informasi kontak, dan data lainnya.

### Karakteristik QR Code:
- Dapat digunakan untuk berbagai tujuan (multi-purpose)
- Tidak memiliki standar spesifik untuk isi konten
- Dapat dibuat dan dibaca oleh berbagai aplikasi umum

## QRIS (Quick Response Code Indonesian Standard)

QRIS adalah implementasi standar QR Code untuk pembayaran yang ditetapkan oleh Bank Indonesia. QRIS memiliki format dan aturan khusus yang memungkinkan interoperabilitas antar penyedia layanan pembayaran di Indonesia.

### Karakteristik QRIS:
- Dikhususkan untuk transaksi pembayaran
- Memiliki standar format konten spesifik sesuai regulasi Bank Indonesia
- Memuat informasi penting seperti ID merchant, nama merchant, dan informasi pembayaran
- Dapat diproses oleh berbagai aplikasi pembayaran yang terintegrasi dengan sistem QRIS

## Implementasi di Aplikasi Aplikasir-Web

Dalam aplikasi ini, kami mengimplementasikan penyimpanan kode QRIS dengan pendekatan berikut:

### 1. Penyimpanan dalam Database
Aplikasi menyimpan kode QR mentah dengan format:
```
QR-[8 KARAKTER UNIK]
```
Contoh: `QR-AB12CD34`

Kode ini disimpan dalam tabel `users.kodeQR` dan digunakan sebagai identifikasi unik merchant.

### 2. Pembuatan Representasi Visual QR Code
Ketika dibutuhkan representasi visual (gambar QR), aplikasi menggunakan library `chillerlan/php-qrcode` untuk menghasilkan QR code dari kode mentah yang tersimpan di database.

### 3. Integrasi dengan Sistem Pembayaran
Kode QR yang dihasilkan memenuhi standar QRIS untuk dapat digunakan dalam transaksi pembayaran mobile sesuai regulasi Bank Indonesia.

## Keunggulan Pendekatan Ini

1. **Kesederhanaan**: Penyimpanan kode mentah dalam database lebih sederhana dan efisien
2. **Independensi**: Tidak tergantung pada layanan eksternal untuk pembuatan QR code
3. **Fleksibilitas**: Memungkinkan pembuatan ulang QR code kapan saja dengan format yang berbeda
4. **Kompatibilitas**: Sesuai dengan standar QRIS yang berlaku di Indonesia

## Catatan Penerapan

Perlu diingat bahwa meskipun format kode yang disimpan dalam database sederhana, namun ketika digunakan dalam sistem pembayaran, aplikasi mobile akan mengkonversi kode tersebut ke format QRIS yang sesuai dengan standar Bank Indonesia, termasuk menambahkan informasi penting seperti nama merchant, jumlah pembayaran, dan informasi lainnya.
