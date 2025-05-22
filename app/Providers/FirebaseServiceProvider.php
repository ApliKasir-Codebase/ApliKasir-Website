<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Kreait\Firebase\Factory;
use Kreait\Laravel\Firebase\ServiceProvider as KreaitFirebaseServiceProvider;

class FirebaseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->register(KreaitFirebaseServiceProvider::class);
    }    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Pastikan file kredensial Firebase ada di storage
        $credentialsPath = storage_path('app/firebase-credentials.json');
        
        if (!file_exists($credentialsPath)) {
            $this->ensureCredentialsExist();
        }
    }
      /**
     * Buat file kredensial Firebase dari environment variables
     * 
     * @param bool $force Paksa pembuatan ulang file meskipun sudah ada
     */    public function ensureCredentialsExist(bool $force = false): void
    {
        $credentialsPath = storage_path('app/firebase-credentials.json');
        
        // Buat direktori jika belum ada
        if (!file_exists(dirname($credentialsPath))) {
            mkdir(dirname($credentialsPath), 0755, true);
        }
        
        // Get private key from config or env
        $privateKey = config('services.firebase.private_key');
        
        // Ensure proper formatting of private key
        // The key in .env is typically escaped, so we need to process it correctly
        if (strpos($privateKey, "\\n") !== false) {
            $privateKey = str_replace("\\n", "\n", $privateKey);
        }
        
        // If the key doesn't contain newlines but should, add them
        if (strpos($privateKey, "\n") === false && strpos($privateKey, "BEGIN PRIVATE KEY") !== false) {
            $privateKey = str_replace("-----BEGIN PRIVATE KEY-----", "-----BEGIN PRIVATE KEY-----\n", $privateKey);
            $privateKey = str_replace("-----END PRIVATE KEY-----", "\n-----END PRIVATE KEY-----", $privateKey);
        }
        
        // Buat file kredensial dari environment variables
        $credentials = [
            'type' => 'service_account',
            'project_id' => config('services.firebase.project_id'),
            'private_key_id' => config('services.firebase.private_key_id', ''),
            'private_key' => $privateKey,
            'client_email' => config('services.firebase.client_email', ''),
            'client_id' => config('services.firebase.client_id', ''),
            'auth_uri' => env('FIREBASE_AUTH_URI', 'https://accounts.google.com/o/oauth2/auth'),
            'token_uri' => env('FIREBASE_TOKEN_URI', 'https://oauth2.googleapis.com/token'),
            'auth_provider_x509_cert_url' => env('FIREBASE_AUTH_PROVIDER_X509_CERT_URL', 'https://www.googleapis.com/oauth2/v1/certs'),
            'client_x509_cert_url' => config('services.firebase.client_x509_cert_url', ''),
        ];
          // Log credential keys for debugging (without exposing the actual key)
        \Log::debug('Firebase credential keys available: ' . json_encode([
            'project_id' => !empty(config('services.firebase.project_id')),
            'private_key_id' => !empty(config('services.firebase.private_key_id')),
            'private_key' => !empty($privateKey),
            'client_email' => !empty(config('services.firebase.client_email')),
            'client_id' => !empty(config('services.firebase.client_id')),
            'client_x509_cert_url' => !empty(config('services.firebase.client_x509_cert_url')),
        ]));
        
        // Write credentials to file
        try {
            $result = file_put_contents($credentialsPath, json_encode($credentials, JSON_PRETTY_PRINT));
            
            if ($result === false) {
                \Log::error('Failed to write Firebase credentials file', [
                    'path' => $credentialsPath,
                    'error' => error_get_last()
                ]);
            } else {
                \Log::info('Firebase credentials file created successfully', [
                    'path' => $credentialsPath,
                    'bytes_written' => $result,
                    'file_exists' => file_exists($credentialsPath),
                    'file_size' => file_exists($credentialsPath) ? filesize($credentialsPath) : 0,
                    'file_permissions' => file_exists($credentialsPath) ? substr(sprintf('%o', fileperms($credentialsPath)), -4) : 'n/a'
                ]);
            }
        } catch (\Exception $e) {
            \Log::error('Exception while creating Firebase credentials file', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }
}
