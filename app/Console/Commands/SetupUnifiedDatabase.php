<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class SetupUnifiedDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'aplikasir:setup-unified-db {--fresh : Drop all tables and recreate} {--seed : Run seeders after migration}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Setup unified ApliKasir database schema for web and mobile compatibility';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 Setting up Unified ApliKasir Database...');
        $this->newLine();

        $fresh = $this->option('fresh');
        $seed = $this->option('seed');

        try {
            // Check database connection
            $this->info('📡 Checking database connection...');
            DB::connection()->getPdo();
            $this->info('✅ Database connection successful');
            $this->newLine();

            if ($fresh) {
                $this->warn('⚠️  FRESH MIGRATION: This will drop all existing tables!');
                if (!$this->confirm('Are you sure you want to continue?')) {
                    $this->error('❌ Operation cancelled');
                    return Command::FAILURE;
                }

                $this->info('🗑️  Dropping all tables...');
                Artisan::call('migrate:fresh', [], $this->getOutput());
                $this->info('✅ All tables dropped');
            }

            // Run the unified migration
            $this->info('📦 Running unified migration...');
            if ($fresh) {
                // Migration already run with fresh
                $this->info('✅ Unified migration completed (via fresh)');
            } else {
                Artisan::call('migrate', [], $this->getOutput());
                $this->info('✅ Unified migration completed');
            }
            
            $this->newLine();

            // Run seeders if requested
            if ($seed || $fresh) {
                $this->info('🌱 Seeding database with sample data...');
                Artisan::call('db:seed', ['--class' => 'UnifiedApliKasirSeeder'], $this->getOutput());
                $this->info('✅ Database seeded successfully');
                $this->newLine();
            }

            // Display summary
            $this->displaySummary();

            $this->newLine();
            $this->info('🎉 Unified ApliKasir Database setup completed successfully!');
            $this->info('📱 Ready for mobile synchronization');
            $this->info('🌐 Ready for web application');

            return Command::SUCCESS;

        } catch (\Exception $e) {
            $this->error('❌ Database setup failed: ' . $e->getMessage());
            $this->error('Stack trace: ' . $e->getTraceAsString());
            return Command::FAILURE;
        }
    }

    /**
     * Display database summary after setup
     */
    private function displaySummary()
    {
        $this->info('📊 Database Summary:');
        
        $tables = [
            'admins' => 'Web Application Admins',
            'users' => 'Mobile App Users',
            'global_products' => 'Global Product Catalog',
            'products' => 'User-specific Products',
            'customers' => 'Customer Database',
            'transactions' => 'Transaction Records',
            'sync_logs' => 'Mobile Sync Logs',
            'admin_activity_logs' => 'Admin Activity Logs',
        ];

        foreach ($tables as $table => $description) {
            try {
                $count = DB::table($table)->count();
                $this->line("   📋 {$table}: {$count} records ({$description})");
            } catch (\Exception $e) {
                $this->line("   ❌ {$table}: Error counting records");
            }
        }

        $this->newLine();
        $this->info('🔗 Database Views Created:');
        $views = [
            'active_products_with_stock' => 'Products with stock status',
            'low_stock_products' => 'Products with low stock alerts',
            'unpaid_transactions' => 'Credit/debt tracking',
            'recent_sync_activity' => 'Mobile sync monitoring',
            'user_sync_statistics' => 'Sync performance metrics',
            'top_selling_products' => 'Sales analytics',
            'customer_transaction_summary' => 'Customer analytics',
        ];

        foreach ($views as $view => $description) {
            $this->line("   👁️  {$view}: {$description}");
        }

        $this->newLine();
        $this->info('⚙️  Database Triggers Created:');
        $triggers = [
            'products_updated_at_trigger' => 'Auto-update product timestamps',
            'customers_updated_at_trigger' => 'Auto-update customer timestamps', 
            'transactions_updated_at_trigger' => 'Auto-update transaction timestamps',
            'update_customer_debt_*' => 'Auto-calculate customer debt totals',
        ];

        foreach ($triggers as $trigger => $description) {
            $this->line("   ⚡ {$trigger}: {$description}");
        }
    }
}
