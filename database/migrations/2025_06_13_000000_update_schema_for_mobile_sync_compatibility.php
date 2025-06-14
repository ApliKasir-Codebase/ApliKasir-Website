<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * This migration updates the existing schema to be fully compatible with mobile sync requirements
     * Based on mobile_to_mysql_schema.sql from aplikasir-backend
     */
    public function up(): void
    {
        // 1. Update users table for mobile sync compatibility
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                // Add missing indexes for sync performance if they don't exist
                if (!$this->indexExists('users', 'idx_users_last_sync')) {
                    $table->index('last_sync_time', 'idx_users_last_sync');
                }
                if (!$this->indexExists('users', 'idx_users_email')) {
                    $table->index('email', 'idx_users_email');  
                }
                if (!$this->indexExists('users', 'idx_users_phone')) {
                    $table->index('phoneNumber', 'idx_users_phone');
                }
            });
        }

        // 2. Update products table for mobile sync compatibility
        if (Schema::hasTable('products')) {
            Schema::table('products', function (Blueprint $table) {
                // Add missing columns if they don't exist
                if (!Schema::hasColumn('products', 'is_active')) {
                    $table->boolean('is_active')->default(true)->after('gambar_produk');
                }
                if (!Schema::hasColumn('products', 'global_product_id')) {
                    $table->foreignId('global_product_id')->nullable()
                          ->after('user_id')
                          ->comment('Reference to global product catalog');
                }

                // Add sync-optimized indexes
                if (!$this->indexExists('products', 'idx_products_updated')) {
                    $table->index('updated_at', 'idx_products_updated');
                }
                if (!$this->indexExists('products', 'idx_products_active')) {
                    $table->index('is_active', 'idx_products_active');
                }
                if (!$this->indexExists('products', 'idx_products_global')) {
                    $table->index('global_product_id', 'idx_products_global');
                }
                if (!$this->indexExists('products', 'idx_products_stock')) {
                    $table->index('jumlah_produk', 'idx_products_stock');
                }
                if (!$this->indexExists('products', 'idx_products_user_updated')) {
                    $table->index(['user_id', 'updated_at'], 'idx_products_user_updated');
                }
                if (!$this->indexExists('products', 'idx_products_not_deleted')) {
                    $table->index(['user_id', 'deleted_at'], 'idx_products_not_deleted');
                }
                if (!$this->indexExists('products', 'idx_products_sync_check')) {
                    $table->index(['user_id', 'updated_at', 'deleted_at'], 'idx_products_sync_check');
                }
                if (!$this->indexExists('products', 'idx_products_conflict_detection')) {
                    $table->index(['id', 'updated_at'], 'idx_products_conflict_detection');
                }
            });

            // Add foreign key for global_product_id if it doesn't exist
            if (Schema::hasColumn('products', 'global_product_id') && Schema::hasTable('global_products')) {
                try {
                    Schema::table('products', function (Blueprint $table) {
                        $table->foreign('global_product_id')
                              ->references('id')->on('global_products')
                              ->onDelete('set null');
                    });
                } catch (Exception $e) {
                    // Foreign key might already exist, ignore error
                }
            }
        }

        // 3. Update customers table for mobile sync compatibility  
        if (Schema::hasTable('customers')) {
            Schema::table('customers', function (Blueprint $table) {
                // Add sync-optimized indexes
                if (!$this->indexExists('customers', 'idx_customers_nama')) {
                    $table->index('nama_pelanggan', 'idx_customers_nama');
                }
                if (!$this->indexExists('customers', 'idx_customers_phone')) {
                    $table->index('nomor_telepon', 'idx_customers_phone');
                }
                if (!$this->indexExists('customers', 'idx_customers_updated')) {
                    $table->index('updated_at', 'idx_customers_updated');
                }
                if (!$this->indexExists('customers', 'idx_customers_user_updated')) {
                    $table->index(['user_id', 'updated_at'], 'idx_customers_user_updated');
                }
                if (!$this->indexExists('customers', 'idx_customers_not_deleted')) {
                    $table->index(['user_id', 'deleted_at'], 'idx_customers_not_deleted');
                }
                if (!$this->indexExists('customers', 'idx_customers_sync_check')) {
                    $table->index(['user_id', 'updated_at', 'deleted_at'], 'idx_customers_sync_check');
                }
                if (!$this->indexExists('customers', 'idx_customers_conflict_detection')) {
                    $table->index(['id', 'updated_at'], 'idx_customers_conflict_detection');
                }
            });
        }

        // 4. Update transactions table for mobile sync compatibility
        if (Schema::hasTable('transactions')) {
            Schema::table('transactions', function (Blueprint $table) {
                // Add sync-optimized indexes
                if (!$this->indexExists('transactions', 'idx_transactions_updated')) {
                    $table->index('updated_at', 'idx_transactions_updated');
                }
                if (!$this->indexExists('transactions', 'idx_transactions_user_updated')) {
                    $table->index(['user_id', 'updated_at'], 'idx_transactions_user_updated');
                }
                if (!$this->indexExists('transactions', 'idx_transactions_not_deleted')) {
                    $table->index(['user_id', 'deleted_at'], 'idx_transactions_not_deleted');
                }
                if (!$this->indexExists('transactions', 'idx_transactions_sync_check')) {
                    $table->index(['user_id', 'updated_at', 'deleted_at'], 'idx_transactions_sync_check');
                }
                if (!$this->indexExists('transactions', 'idx_transactions_conflict_detection')) {
                    $table->index(['id', 'updated_at'], 'idx_transactions_conflict_detection');
                }
            });
        }

        // 5. Update sync_logs table with enhanced fields for mobile sync
        if (Schema::hasTable('sync_logs')) {
            Schema::table('sync_logs', function (Blueprint $table) {
                // Add missing columns for enhanced sync logging
                if (!Schema::hasColumn('sync_logs', 'conflicts_detected')) {
                    $table->integer('conflicts_detected')->default(0)->after('items_downloaded');
                }
                if (!Schema::hasColumn('sync_logs', 'processing_time_ms')) {
                    $table->bigInteger('processing_time_ms')->nullable()
                          ->after('conflicts_detected')
                          ->comment('Total processing time in milliseconds');
                }
                if (!Schema::hasColumn('sync_logs', 'client_ip')) {
                    $table->string('client_ip', 45)->nullable()
                          ->after('server_sync_time')
                          ->comment('Client IP address');
                }
                if (!Schema::hasColumn('sync_logs', 'user_agent')) {
                    $table->text('user_agent')->nullable()
                          ->after('client_ip')
                          ->comment('Client user agent string');
                }

                // Update direction column if needed (expand enum values)
                if (Schema::hasColumn('sync_logs', 'direction')) {
                    DB::statement("ALTER TABLE sync_logs MODIFY COLUMN direction VARCHAR(20) DEFAULT 'Bidirectional' COMMENT 'Upload, Download, or Bidirectional'");
                }

                // Add enhanced indexes
                if (!$this->indexExists('sync_logs', 'idx_sync_logs_direction')) {
                    $table->index('direction', 'idx_sync_logs_direction');
                }
            });
        }

        // 6. Create enhanced views for mobile sync operations
        $this->createSyncViews();

        // 7. Create triggers for automatic timestamp updates
        $this->createUpdateTriggers();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop views
        DB::statement('DROP VIEW IF EXISTS user_sync_statistics');
        DB::statement('DROP VIEW IF EXISTS recent_sync_activity');
        DB::statement('DROP VIEW IF EXISTS unpaid_transactions');
        DB::statement('DROP VIEW IF EXISTS active_products_with_stock');

        // Drop triggers
        DB::statement('DROP TRIGGER IF EXISTS products_updated_at_trigger');
        DB::statement('DROP TRIGGER IF EXISTS customers_updated_at_trigger');
        DB::statement('DROP TRIGGER IF EXISTS transactions_updated_at_trigger');

        // Remove added columns and indexes would be complex to reverse safely
        // In production, create a new migration instead of rolling back
    }

    /**
     * Check if an index exists on a table
     */
    private function indexExists(string $table, string $indexName): bool
    {
        $indexes = DB::select("SHOW INDEX FROM {$table}");
        foreach ($indexes as $index) {
            if ($index->Key_name === $indexName) {
                return true;
            }
        }
        return false;
    }

    /**
     * Create enhanced views for sync operations
     */
    private function createSyncViews(): void
    {        // View for active products with stock information
        DB::statement('
            CREATE OR REPLACE VIEW active_products_with_stock AS
            SELECT 
                p.*,
                gp.kategori as global_kategori,
                gp.merek as global_merek,
                gp.deskripsi as global_description,
                u.name as store_owner,
                u.storeName
            FROM products p
            LEFT JOIN global_products gp ON p.global_product_id = gp.id
            JOIN users u ON p.user_id = u.id
            WHERE p.deleted_at IS NULL 
            AND p.is_active = TRUE 
            AND p.jumlah_produk >= 0
        ');

        // View for unpaid transactions (credit tracking)
        DB::statement('
            CREATE OR REPLACE VIEW unpaid_transactions AS
            SELECT 
                t.*,
                c.nama_pelanggan,
                c.nomor_telepon,
                u.name as store_owner,
                u.storeName,
                DATEDIFF(CURRENT_DATE, DATE(t.tanggal_transaksi)) as days_overdue
            FROM transactions t
            JOIN customers c ON t.id_pelanggan = c.id
            JOIN users u ON t.user_id = u.id
            WHERE t.deleted_at IS NULL 
            AND t.status_pembayaran = "Belum Lunas"
            AND t.metode_pembayaran LIKE "%Kredit%"
        ');

        // View for recent sync activity with performance metrics
        DB::statement('
            CREATE OR REPLACE VIEW recent_sync_activity AS
            SELECT 
                sl.*,
                u.name as user_name,
                u.storeName,
                TIMESTAMPDIFF(SECOND, sl.sync_start_time, sl.sync_end_time) as duration_seconds,
                CASE 
                    WHEN sl.status = "Success" THEN "success"
                    WHEN sl.status = "Failed" THEN "error"
                    WHEN sl.status = "Partial Success" THEN "warning"
                    ELSE "info"
                END as status_type
            FROM sync_logs sl
            JOIN users u ON sl.user_id = u.id
            WHERE sl.sync_start_time >= DATE_SUB(NOW(), INTERVAL 7 DAY)
            ORDER BY sl.sync_start_time DESC
        ');

        // View for sync statistics per user
        DB::statement('
            CREATE OR REPLACE VIEW user_sync_statistics AS
            SELECT 
                u.id as user_id,
                u.name as user_name,
                u.storeName,
                u.last_sync_time,
                COUNT(sl.id) as total_syncs,
                SUM(CASE WHEN sl.status = "Success" THEN 1 ELSE 0 END) as successful_syncs,
                SUM(CASE WHEN sl.status = "Failed" THEN 1 ELSE 0 END) as failed_syncs,
                SUM(CASE WHEN sl.conflicts_detected > 0 THEN 1 ELSE 0 END) as syncs_with_conflicts,
                AVG(sl.processing_time_ms) as avg_processing_time_ms,
                COALESCE(SUM(sl.items_uploaded), 0) as total_items_uploaded,
                COALESCE(SUM(sl.items_downloaded), 0) as total_items_downloaded,
                MAX(sl.sync_start_time) as last_sync_attempt
            FROM users u
            LEFT JOIN sync_logs sl ON u.id = sl.user_id 
                AND sl.sync_start_time >= DATE_SUB(NOW(), INTERVAL 30 DAY)
            GROUP BY u.id, u.name, u.storeName, u.last_sync_time
        ');
    }

    /**
     * Create triggers for automatic timestamp updates
     */
    private function createUpdateTriggers(): void
    {
        // Only create triggers if they don't exist
        $triggers = [
            'products_updated_at_trigger' => 'products',
            'customers_updated_at_trigger' => 'customers', 
            'transactions_updated_at_trigger' => 'transactions'
        ];

        foreach ($triggers as $triggerName => $tableName) {
            $exists = DB::select("SHOW TRIGGERS WHERE `Trigger` = '{$triggerName}'");
            
            if (empty($exists)) {
                DB::statement("
                    CREATE TRIGGER {$triggerName}
                        BEFORE UPDATE ON {$tableName}
                        FOR EACH ROW
                    BEGIN
                        SET NEW.updated_at = CURRENT_TIMESTAMP;
                    END
                ");
            }
        }
    }
};
