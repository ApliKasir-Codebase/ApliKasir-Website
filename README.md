# ApliKasir Web - Admin Panel

Admin panel untuk sistem point of sale (POS) ApliKasir. Dibangun dengan Laravel 11, digunakan untuk manajemen operasional kasir multi-toko.

## Fitur

- **Manajemen Pengguna** - Kelola kasir dan pemilik toko dengan foto profil
- **Manajemen Produk** - Katalog produk global dan inventaris per toko
- **QRIS Integration** - Generate kode QRIS untuk pembayaran digital
- **Customer Management** - Database pelanggan
- **Laporan Transaksi** - Tracking penjualan dan riwayat transaksi
- **Multi-shop Support** - Satu admin panel untuk banyak toko

## Tech Stack

- **Backend:** Laravel 11 + PHP 8.2+
- **Frontend:** React + Vite + Tailwind CSS
- **Database:** PostgreSQL
- **Storage:** Local storage (foto profil)
- **Testing:** Pest PHP

## Instalasi

```bash
# Clone dan install dependencies
git clone https://github.com/your-username/aplikasir-web.git
cd aplikasir-web
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Konfigurasi database di .env, lalu migrate
php artisan migrate --seed

# Setup storage link untuk foto profil
php artisan storage:link

# Build assets dan jalankan
npm run build
php artisan serve
```

## API Mobile

Project ini menyediakan API untuk aplikasi mobile ApliKasir:
- Katalog produk
- Update profil pengguna
- QRIS payment data

Autentikasi mobile ditangani backend Node.js terpisah.

## Development

```bash
# Run development server
npm run dev
php artisan serve

# Run tests
php artisan test
```

## Struktur Fitur

```
app/
├── Models/          # User, Product, Customer, Transaction, dll
├── Services/        # LocalStorageService, AdminActivityLogger
├── Http/           # Controllers dan middleware
└── Policies/       # Authorization logic
```

## License

MIT
