CREATE DATABASE IF NOT EXISTS aplikasir_db;
USE aplikasir_db;

-- Tabel Pengguna (Users)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phoneNumber VARCHAR(50) UNIQUE NOT NULL,
    storeName VARCHAR(255) NOT NULL,
    storeAddress TEXT NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    profileImagePath VARCHAR(255) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- Opsional: Kolom untuk sinkronisasi
    last_sync_time DATETIME NULL COMMENT 'Timestamp sinkronisasi terakhir dari server'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Produk (Products)
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_pengguna INT NOT NULL,
    nama_produk VARCHAR(255) NOT NULL,
    kode_produk VARCHAR(100) NULL, -- Sebaiknya unik per pengguna, tambahkan UNIQUE INDEX jika perlu
    jumlah_produk INT NOT NULL DEFAULT 0,
    harga_modal DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    harga_jual DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    gambar_produk VARCHAR(255) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE, -- Untuk soft delete (opsional, membantu sinkronisasi)
    deleted_at DATETIME NULL,      -- Timestamp soft delete (opsional)
    FOREIGN KEY (id_pengguna) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_product_user (id_pengguna),
    INDEX idx_product_code (id_pengguna, kode_produk) -- Index untuk kode produk per pengguna
    -- Jika kode_produk harus unik per pengguna:
    -- UNIQUE KEY unique_product_code_user (id_pengguna, kode_produk)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Pelanggan (Customers)
CREATE TABLE IF NOT EXISTS customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_pengguna INT NOT NULL,
    nama_pelanggan VARCHAR(255) NOT NULL,
    nomor_telepon VARCHAR(50) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at DATETIME NULL,
    FOREIGN KEY (id_pengguna) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_customer_user (id_pengguna)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Transaksi (Transactions)
CREATE TABLE IF NOT EXISTS transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_pengguna INT NOT NULL,
    tanggal_transaksi DATETIME NOT NULL,
    total_belanja DECIMAL(15, 2) NOT NULL,
    total_modal DECIMAL(15, 2) NOT NULL,
    metode_pembayaran VARCHAR(50) NOT NULL, -- 'Tunai', 'QRIS', 'Kredit', 'Pembayaran Kredit Tunai', 'Pembayaran Kredit QRIS'
    status_pembayaran VARCHAR(50) NOT NULL, -- 'Lunas', 'Belum Lunas'
    id_pelanggan INT NULL,
    detail_items JSON NOT NULL, -- MySQL JSON type
    jumlah_bayar DECIMAL(15, 2) NULL,
    jumlah_kembali DECIMAL(15, 2) NULL,
    id_transaksi_hutang INT NULL COMMENT 'Referensi ke ID transaksi hutang yg dilunasi',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at DATETIME NULL,
    FOREIGN KEY (id_pengguna) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_pelanggan) REFERENCES customers(id) ON DELETE SET NULL, -- Jika pelanggan dihapus, transaksi tetap ada
    -- FOREIGN KEY (id_transaksi_hutang) REFERENCES transactions(id) ON DELETE SET NULL, -- Optional constraint
    INDEX idx_transaction_user_date (id_pengguna, tanggal_transaksi),
    INDEX idx_transaction_customer (id_pelanggan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Log Sinkronisasi (Sync Logs)
CREATE TABLE IF NOT EXISTS sync_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    sync_start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    sync_end_time DATETIME NULL,
    direction VARCHAR(10) NOT NULL COMMENT '"Up" (Client -> Server) or "Down" (Server -> Client)',
    status VARCHAR(50) NOT NULL COMMENT '"Success", "Partial Failure", "Failed", "Pending"',
    items_uploaded INT DEFAULT 0,
    items_downloaded INT DEFAULT 0,
    error_message TEXT NULL,
    details JSON NULL COMMENT 'Optional: Store counts per table, specific errors, etc.',
    client_last_sync_time DATETIME NULL COMMENT 'Timestamp terakhir klien sebelum sync ini',
    server_sync_time DATETIME NULL COMMENT 'Timestamp server saat sync ini selesai',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_synclog_user_time (user_id, sync_start_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

UNIQUE constraint untuk kode produk per pengguna jika diperlukan setelah tabel dibuat
ALTER TABLE products ADD UNIQUE INDEX unique_product_code_user (id_pengguna, kode_produk);