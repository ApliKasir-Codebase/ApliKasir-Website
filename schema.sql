CREATE DATABASE IF NOT EXISTS aplikasir_db;
USE aplikasir_db;

-- Tabel Admin (Former web users table with admin privileges)
CREATE TABLE IF NOT EXISTS admins (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(191) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    is_super_admin BOOLEAN DEFAULT FALSE,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Pengguna Mobile (Users)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(191) UNIQUE NOT NULL,
    phoneNumber VARCHAR(50) UNIQUE NOT NULL,
    storeName VARCHAR(255) NOT NULL,
    storeAddress TEXT NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    profileImagePath TEXT NULL,
    kodeQR VARCHAR(191) UNIQUE NULL COMMENT 'Kode QRIS (Quick Response Code Indonesian Standard) untuk pembayaran di aplikasi mobile',
    last_sync_time TIMESTAMP NULL COMMENT 'Timestamp sinkronisasi terakhir dari server',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Produk Terkonsolidasi (Products - after consolidation)
CREATE TABLE IF NOT EXISTS products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    kode_produk VARCHAR(100) NULL,
    nama_produk VARCHAR(255) NOT NULL,
    kategori VARCHAR(255) NULL,
    merek VARCHAR(255) NULL,
    deskripsi TEXT NULL,
    user_id BIGINT NULL,
    jumlah_produk INT DEFAULT 0,
    harga_modal DECIMAL(15, 2) DEFAULT 0.00,
    harga_jual DECIMAL(15, 2) DEFAULT 0.00,
    gambar_produk VARCHAR(255) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_product_user (user_id),
    INDEX idx_product_code (kode_produk)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Pelanggan (Customers)
CREATE TABLE IF NOT EXISTS customers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    nama_pelanggan VARCHAR(255) NOT NULL,
    nomor_telepon VARCHAR(50) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_customer_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Transaksi (Transactions)
CREATE TABLE IF NOT EXISTS transactions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    tanggal_transaksi DATETIME NOT NULL,
    total_belanja DECIMAL(15, 2) NOT NULL,
    total_modal DECIMAL(15, 2) NOT NULL,
    metode_pembayaran VARCHAR(50) NOT NULL,
    status_pembayaran VARCHAR(50) NOT NULL,
    id_pelanggan BIGINT NULL,
    detail_items JSON NOT NULL,
    jumlah_bayar DECIMAL(15, 2) NULL,
    jumlah_kembali DECIMAL(15, 2) NULL,
    id_transaksi_hutang BIGINT NULL COMMENT 'Referensi ke ID transaksi hutang yg dilunasi',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_pelanggan) REFERENCES customers(id) ON DELETE SET NULL,
    FOREIGN KEY (id_transaksi_hutang) REFERENCES transactions(id) ON DELETE SET NULL,
    INDEX idx_transaction_user_date (user_id, tanggal_transaksi),
    INDEX idx_transaction_customer (id_pelanggan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Log Sinkronisasi (Sync Logs)
CREATE TABLE IF NOT EXISTS sync_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
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

-- Tabel Log Aktivitas Admin (Admin Activity Logs)
CREATE TABLE IF NOT EXISTS admin_activity_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    admin_id BIGINT NOT NULL,
    module VARCHAR(50) NOT NULL COMMENT 'e.g., users, products, etc.',
    action VARCHAR(50) NOT NULL COMMENT 'e.g., created, updated, deleted',
    description VARCHAR(255) NOT NULL COMMENT 'Brief description of the activity',
    details TEXT NULL COMMENT 'JSON encoded details of changes',
    ip_address VARCHAR(45) NULL,
    user_agent VARCHAR(255) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
    INDEX idx_admin_activity_time (admin_id, created_at),
    INDEX idx_admin_activity_module (module, action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Reset Password Token
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    email VARCHAR(191) PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Sesi (Sessions)
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(191) PRIMARY KEY,
    user_id BIGINT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    payload LONGTEXT NOT NULL,
    last_activity INT NOT NULL,
    INDEX idx_sessions_user_id (user_id),
    INDEX idx_sessions_last_activity (last_activity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Cache
CREATE TABLE IF NOT EXISTS cache (
    `key` VARCHAR(191) PRIMARY KEY,
    value MEDIUMTEXT NOT NULL,
    expiration INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Cache Locks
CREATE TABLE IF NOT EXISTS cache_locks (
    `key` VARCHAR(191) PRIMARY KEY,
    owner VARCHAR(191) NOT NULL,
    expiration INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Jobs (Queue System)
CREATE TABLE IF NOT EXISTS jobs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    queue VARCHAR(255) NOT NULL,
    payload LONGTEXT NOT NULL,
    attempts TINYINT UNSIGNED NOT NULL,
    reserved_at INT UNSIGNED NULL,
    available_at INT UNSIGNED NOT NULL,
    created_at INT UNSIGNED NOT NULL,
    INDEX idx_jobs_queue (queue)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Job Batches
CREATE TABLE IF NOT EXISTS job_batches (
    id VARCHAR(191) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    total_jobs INT NOT NULL,
    pending_jobs INT NOT NULL,
    failed_jobs INT NOT NULL,
    failed_job_ids LONGTEXT NOT NULL,
    options MEDIUMTEXT NULL,
    cancelled_at INT NULL,
    created_at INT NOT NULL,
    finished_at INT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Failed Jobs
CREATE TABLE IF NOT EXISTS failed_jobs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    uuid VARCHAR(191) UNIQUE NOT NULL,
    connection TEXT NOT NULL,
    queue TEXT NOT NULL,
    payload LONGTEXT NOT NULL,
    exception LONGTEXT NOT NULL,
    failed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;