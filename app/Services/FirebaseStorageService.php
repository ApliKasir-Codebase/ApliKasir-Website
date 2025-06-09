<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Storage;
use Google\Cloud\Storage\StorageClient;

class FirebaseStorageService
{
    protected $storage;
    protected $bucket;
    protected $bucketName;    public function __construct()
    {
        $this->bucketName = config('services.firebase.storage_bucket');
        
        try {
            // Path to the Firebase credentials file
            $credentialsPath = storage_path('app/firebase-credentials.json');
            
            if (!file_exists($credentialsPath)) {
                \Log::error('Firebase credentials file not found at: ' . $credentialsPath);
                throw new \Exception('Firebase credentials file not found');
            }
            
            // Log credentials file info for debug
            \Log::debug('Firebase credentials file size: ' . filesize($credentialsPath) . ' bytes');
            
            $factory = (new Factory)
                ->withServiceAccount($credentialsPath)
                ->withDefaultStorageBucket($this->bucketName);
                
            $this->storage = $factory->createStorage();
            $this->bucket = $this->storage->getBucket();
            
            \Log::info('Firebase Storage initialized successfully with bucket: ' . $this->bucketName);
        } catch (\Exception $e) {
            \Log::error('Firebase Storage initialization error: ' . $e->getMessage());
            \Log::error('Firebase error stack trace: ' . $e->getTraceAsString());
            throw new \Exception('Gagal menginisialisasi Firebase Storage: ' . $e->getMessage());
        }
    }    /**
     * Upload file ke Firebase Storage
     *
     * @param string|resource $fileContent Konten file yang akan diupload (path lokal atau konten binary)
     * @param string $storagePath Path di Firebase Storage (folder/filename.ext)
     * @param string|null $mimeType MIME type file (opsional, akan dideteksi jika tidak diberikan)
     * @return string URL publik dari file yang diupload
     */    /**
     * Upload an image file to Firebase Storage
     *
     * @param string|resource $fileContent File path or binary content
     * @param string $storagePath Storage path including filename
     * @param string|null $mimeType Optional MIME type
     * @return string Public URL of the uploaded file
     * @throws \Exception
     */
    public function uploadImage($fileContent, $storagePath, $mimeType = null)
    {
        try {
            // Check if input is a file path or binary content
            $isFilePath = is_string($fileContent) && file_exists($fileContent);
            
            // More detailed logging for debugging
            \Log::info("Starting image upload to Firebase Storage", [
                'storagePath' => $storagePath,
                'isFilePath' => $isFilePath ? 'Yes' : 'No',
                'content_type' => gettype($fileContent),
                'mime_type_provided' => $mimeType ?? 'Not provided',
                'memory_limit' => ini_get('memory_limit')
            ]);
            
            // Read file content if input is a file path
            if ($isFilePath) {
                try {
                    // Check file details before reading
                    $fileSize = filesize($fileContent);
                    $filePerms = substr(sprintf('%o', fileperms($fileContent)), -4);
                    
                    \Log::debug("File details before reading", [
                        'path' => $fileContent,
                        'size' => $fileSize . ' bytes',
                        'permissions' => $filePerms,
                        'readable' => is_readable($fileContent) ? 'Yes' : 'No'
                    ]);
                    
                    // Attempt to read with file_get_contents first
                    $content = file_get_contents($fileContent);
                    if ($content === false) {
                        throw new \Exception("file_get_contents failed to read the file");
                    }
                    
                    $detectedMimeType = $mimeType ?? mime_content_type($fileContent);
                    \Log::debug("File read successfully", [
                        'method' => 'file_get_contents',
                        'mime' => $detectedMimeType,
                        'size' => strlen($content) . ' bytes'
                    ]);
                } catch (\Exception $e) {
                    \Log::warning("Failed to read file with file_get_contents", [
                        'error' => $e->getMessage()
                    ]);
                    
                    // Try alternative method with fopen/stream_get_contents
                    \Log::info("Attempting fallback with fopen/stream_get_contents");
                    try {
                        $handle = fopen($fileContent, 'rb'); // Binary mode for images
                        if ($handle) {
                            $content = stream_get_contents($handle);
                            fclose($handle);
                            $detectedMimeType = $mimeType ?? 'image/jpeg';
                            \Log::debug("File read successfully with fallback method", [
                                'method' => 'stream_get_contents',
                                'size' => strlen($content) . ' bytes'
                            ]);
                        } else {
                            throw new \Exception("Failed to open file with fopen");
                        }
                    } catch (\Exception $e2) {
                        \Log::error("All file reading methods failed", [
                            'original_error' => $e->getMessage(),
                            'fallback_error' => $e2->getMessage()
                        ]);
                        throw new \Exception("Failed to read file after multiple attempts: " . $e2->getMessage());
                    }
                }
            } else {
                $content = $fileContent;
                $detectedMimeType = $mimeType ?? 'image/jpeg'; // Default MIME type
                \Log::debug("Using provided content directly, MIME: {$detectedMimeType}, Size: " . 
                    (is_string($content) ? strlen($content) : 'unknown (not string)') . " bytes");
            }
            
            if (empty($content)) {
                \Log::error("File content is empty for upload", [
                    'storagePath' => $storagePath, 
                    'isFilePath' => $isFilePath,
                    'original_input_type' => gettype($fileContent)
                ]);
                throw new \Exception('File content is empty');
            }
            
            \Log::debug("Preparing to upload to Firebase", [
                'content_length' => is_string($content) ? strlen($content) : 'non-string content',
                'mime_type' => $detectedMimeType,
                'storage_path' => $storagePath,
                'bucket' => $this->bucketName,
                'content_preview' => is_string($content) ? substr(bin2hex($content), 0, 50) . '...' : 'non-string content'
            ]);              // Upload file ke bucket
            try {
                \Log::info("Beginning actual Firebase upload operation", [
                    'storage_path' => $storagePath,
                    'mime_type' => $detectedMimeType,
                    'content_size' => is_string($content) ? strlen($content) : 'unknown'
                ]);
                
                \Log::debug("Firebase: Preparing to upload object", [
                    'content_length' => is_string($content) ? strlen($content) : 'non-string content',
                    'bucket' => $this->bucketName,
                    'storage_path' => $storagePath,
                    'mime_type' => $detectedMimeType,
                    'is_binary' => is_string($content) && !mb_detect_encoding($content, 'UTF-8', true) ? 'Yes' : 'No',
                    'has_content' => !empty($content) ? 'Yes' : 'No'
                ]);
                
                $object = $this->bucket->upload($content, [
                    'name' => $storagePath,
                    'predefinedAcl' => 'publicRead',
                    'metadata' => [
                        'contentType' => $detectedMimeType,
                        'cacheControl' => 'public, max-age=31536000',
                    ]
                ]);
                
                \Log::info("Firebase upload completed successfully", [
                    'storage_path' => $storagePath,
                    'bucket' => $this->bucketName,
                    'object_exists' => $object->exists() ? 'Yes' : 'No'
                ]);
            } catch (\Exception $e) {
                \Log::error("Firebase upload object error: " . $e->getMessage(), [
                    'storage_path' => $storagePath,
                    'error_code' => $e->getCode(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString()
                ]);
                throw $e; // Re-throw the exception after logging
            }
            
            // Dapatkan public URL
            $url = $object->signedUrl(new \DateTime('2099-01-01'));
            \Log::info("Successfully generated signed URL for Firebase object", [
                'url' => $url,
                'url_length' => strlen($url),
                'storage_path' => $storagePath,
                'expires' => '2099-01-01'
            ]);
            return $url;
        } catch (\Exception $e) {
            \Log::error('Firebase Storage upload error: ' . $e->getMessage(), [
                'exception_class' => get_class($e),
                'error_code' => $e->getCode(),
                'error_file' => $e->getFile(),
                'error_line' => $e->getLine(),
                'storage_path' => $storagePath,
                'stack_trace' => $e->getTraceAsString(),
                'previous_exception' => $e->getPrevious() ? $e->getPrevious()->getMessage() : 'None'
            ]);
            throw new \Exception('Gagal mengupload gambar ke Firebase Storage: ' . $e->getMessage(), 0, $e);
        }
    }
    
    /**
     * Upload gambar dari string Base64 ke Firebase Storage
     *
     * @param string $base64String String Base64 yang akan diupload (dengan atau tanpa header data:image/*)
     * @param string $storagePath Path di Firebase Storage (folder/filename.ext)
     * @return string URL publik dari file yang diupload
     */    public function uploadBase64Image($base64String, $storagePath)
    {
        try {
            \Log::info("Processing base64 image upload", [
                'storage_path' => $storagePath,
                'base64_length' => strlen($base64String),
                'has_data_prefix' => strpos($base64String, 'data:image') !== false ? 'Yes' : 'No'
            ]);
            
            // Hapus header data:image/* jika ada
            if (strpos($base64String, ';base64,') !== false) {
                list($type, $base64String) = explode(';', $base64String);
                list(, $base64String) = explode(',', $base64String);
                list(, $mimeType) = explode(':', $type);
                
                \Log::info("Base64 image type extracted", [
                    'mime_type' => $mimeType,
                    'base64_length_without_header' => strlen($base64String)
                ]);
            } else {
                $mimeType = 'image/jpeg'; // Default MIME type
                \Log::info("No base64 header detected, using default mime type: {$mimeType}");
            }
            
            // Decode string Base64
            $fileContent = base64_decode($base64String);
            
            \Log::info("Base64 string decoded", [
                'decoded_length' => strlen($fileContent),
                'is_binary' => is_string($fileContent) && !mb_detect_encoding($fileContent, 'UTF-8', true) ? 'Yes' : 'No'
            ]);
            
            // Upload file ke bucket
            return $this->uploadImage($fileContent, $storagePath, $mimeType);
        } catch (\Exception $e) {
            \Log::error('Firebase Storage base64 upload error: ' . $e->getMessage(), [
                'exception_class' => get_class($e),
                'error_code' => $e->getCode(),
                'error_file' => $e->getFile(),
                'error_line' => $e->getLine(),
                'storage_path' => $storagePath,
                'base64_length' => isset($base64String) ? strlen($base64String) : 'N/A',
                'stack_trace' => $e->getTraceAsString()
            ]);
            throw new \Exception('Gagal mengupload gambar Base64 ke Firebase Storage: ' . $e->getMessage(), 0, $e);
        }
    }/**
     * Hapus file dari Firebase Storage
     * 
     * Menghapus file yang tersimpan di Firebase Storage, terutama digunakan
     * untuk membersihkan gambar profil pengguna yang tidak lagi digunakan
     * atau ketika akun pengguna dihapus.
     *
     * @param string $storagePath Path di Firebase Storage (folder/filename.ext)
     * @return bool Berhasil dihapus atau tidak
     */
    public function deleteFile($storagePath)
    {
        try {
            \Log::info("Attempting to delete file from Firebase Storage", ['path' => $storagePath]);
            
            $object = $this->bucket->object($storagePath);
            
            if ($object->exists()) {
                $object->delete();
                \Log::info("Successfully deleted file from Firebase Storage", ['path' => $storagePath]);
                return true;
            }
            
            \Log::warning("File does not exist in Firebase Storage", ['path' => $storagePath]);
            return false;
        } catch (\Exception $e) {
            \Log::error('Firebase Storage delete error: ' . $e->getMessage(), [
                'path' => $storagePath,
                'trace' => $e->getTraceAsString()
            ]);
            return false;
        }
    }
      /**
     * Get public URL for a file in Firebase Storage
     * 
     * Mengambil URL publik dari file yang tersimpan di Firebase Storage,
     * terutama digunakan untuk mendapatkan URL gambar profil pengguna
     * yang dapat diakses di web dan aplikasi mobile.
     * URL memiliki waktu kedaluwarsa yang sangat panjang (hingga 2099).
     *
     * @param string $storagePath Path di Firebase Storage (folder/filename.ext)
     * @return string|null URL publik atau null jika file tidak ditemukan
     */
    public function getPublicUrl($storagePath)
    {
        try {
            $object = $this->bucket->object($storagePath);
            
            if ($object->exists()) {
                return $object->signedUrl(new \DateTime('2099-01-01'));
            }
            
            return null;
        } catch (\Exception $e) {
            \Log::error('Firebase Storage URL retrieval error: ' . $e->getMessage());
            return null;
        }
    }
      /**
     * Check if file exists in Firebase Storage
     * 
     * Memeriksa apakah file tertentu tersedia di Firebase Storage.
     * Digunakan untuk validasi sebelum melakukan operasi pada file
     * atau untuk memeriksa status gambar profil pengguna.
     *
     * @param string $storagePath Path di Firebase Storage (folder/filename.ext)
     * @return bool File ada atau tidak
     */
    public function fileExists($storagePath)
    {
        try {
            $object = $this->bucket->object($storagePath);
            return $object->exists();
        } catch (\Exception $e) {
            \Log::error('Firebase Storage check error: ' . $e->getMessage());
            return false;
        }
    }
    /**
     * Menguji koneksi ke Firebase Storage
     * 
     * @return array Status koneksi dan pesan
     */
    public function testConnection()
    {
        try {
            // Mencoba mengakses bucket untuk memvalidasi koneksi
            $exists = $this->bucket->exists();
            
            return [
                'success' => true,
                'message' => 'Koneksi ke Firebase Storage berhasil.',
                'bucket' => $this->bucketName
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Gagal terhubung ke Firebase Storage: ' . $e->getMessage(),
                'bucket' => $this->bucketName
            ];
        }
    }
    /**
     * Menguji upload gambar base64 ke Firebase Storage
     * 
     * @param string $base64String String Base64 yang akan ditest (dengan atau tanpa header data:image/*)
     * @return array Status test dan URL jika berhasil
     */
    public function testBase64Upload($base64String)
    {
        try {
            \Log::info("Testing base64 image upload");
            
            // Buat storage path unik untuk test
            $timestamp = time();
            $random = rand(100000000, 999999999);
            $storagePath = 'test_uploads/test_base64_' . $timestamp . '_' . $random . '.jpg';
            
            \Log::info("Test base64 upload: generated test path", [
                'storage_path' => $storagePath
            ]);
            
            // Upload gambar base64
            $url = $this->uploadBase64Image($base64String, $storagePath);
            
            \Log::info("Test base64 upload: success", [
                'url' => $url
            ]);
            
            // Hapus file test yang baru saja diupload (cleanup)
            $this->deleteFile($storagePath);
            
            return [
                'success' => true,
                'message' => 'Test upload berhasil',
                'url' => $url
            ];
        } catch (\Exception $e) {
            \Log::error('Test base64 upload failed: ' . $e->getMessage(), [
                'exception_class' => get_class($e),
                'error_code' => $e->getCode(),
                'stack_trace' => $e->getTraceAsString()
            ]);
            
            return [
                'success' => false,
                'message' => 'Test upload gagal: ' . $e->getMessage()
            ];
        }
    }
}
