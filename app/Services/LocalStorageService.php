<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class LocalStorageService
{
    protected $disk;
    protected $basePath;

    public function __construct()
    {
        $this->disk = Storage::disk('public');
        $this->basePath = 'profile_images';
    }

    public function uploadImage($file, $storagePath)
    {
        try {
            if (is_string($file)) {
                $filename = basename($storagePath);
                $this->disk->putFileAs($this->basePath, new UploadedFile($file, $filename), $filename);
            } else {
                $this->disk->putFileAs($this->basePath, $file, basename($storagePath));
            }

            return $this->getPublicUrl($storagePath);
        } catch (\Exception $e) {
            \Log::error('Local storage upload error: ' . $e->getMessage());
            throw new \Exception('Gagal mengupload gambar: ' . $e->getMessage());
        }
    }

    public function uploadBase64Image($base64String, $storagePath)
    {
        try {
            if (strpos($base64String, ';base64,') !== false) {
                list(, $base64String) = explode(',', $base64String);
            }

            $fileContent = base64_decode($base64String);
            
            if (empty($fileContent)) {
                throw new \Exception('Base64 content kosong');
            }

            $this->disk->put($this->basePath . '/' . $storagePath, $fileContent);

            return $this->getPublicUrl($this->basePath . '/' . $storagePath);
        } catch (\Exception $e) {
            \Log::error('Local storage base64 upload error: ' . $e->getMessage());
            throw new \Exception('Gagal mengupload base64: ' . $e->getMessage());
        }
    }

    public function deleteFile($storagePath)
    {
        try {
            return $this->disk->delete($storagePath);
        } catch (\Exception $e) {
            \Log::error('Local storage delete error: ' . $e->getMessage());
            return false;
        }
    }

    public function getPublicUrl($storagePath)
    {
        return $this->disk->url($storagePath);
    }

    public function fileExists($storagePath)
    {
        return $this->disk->exists($storagePath);
    }
}
