<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class AppDownloadController extends Controller
{
    /**
     * Get available app versions for download
     */
    public function getAvailableVersions()
    {
        $files = Storage::disk('local')->files('app-mobile');
        $versions = [];
        
        foreach ($files as $file) {
            $filename = basename($file);
            $fileInfo = pathinfo($filename);
            
            if (in_array(strtolower($fileInfo['extension'] ?? ''), ['apk', 'ipa', 'aab'])) {
                $versions[] = [
                    'filename' => $filename,
                    'platform' => $this->getPlatformFromExtension($fileInfo['extension'] ?? ''),
                    'size' => Storage::disk('local')->size($file),
                    'last_modified' => Storage::disk('local')->lastModified($file),
                    'download_url' => route('app.download', ['filename' => $filename])
                ];
            }
        }
        
        return $versions;
    }
    
    /**
     * Download app file
     */
    public function downloadApp(Request $request, $filename)
    {
        $filePath = 'app-mobile/' . $filename;
        
        // Check if file exists
        if (!Storage::disk('local')->exists($filePath)) {
            abort(404, 'File aplikasi tidak ditemukan');
        }
        
        // Get full path
        $fullPath = Storage::disk('local')->path($filePath);
        
        // Determine content type based on extension
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        $contentType = $this->getContentType($extension);
        
        // Return file download response
        return Response::download($fullPath, $filename, [
            'Content-Type' => $contentType,
            'Content-Disposition' => 'attachment; filename="' . $filename . '"'
        ]);
    }
    
    /**
     * Get platform from file extension
     */
    private function getPlatformFromExtension($extension)
    {
        $extension = strtolower($extension);
        
        switch ($extension) {
            case 'apk':
            case 'aab':
                return 'Android';
            case 'ipa':
                return 'iOS';
            default:
                return 'Unknown';
        }
    }
    
    /**
     * Get content type for file extension
     */
    private function getContentType($extension)
    {
        switch (strtolower($extension)) {
            case 'apk':
                return 'application/vnd.android.package-archive';
            case 'aab':
                return 'application/x-authorware-bin';
            case 'ipa':
                return 'application/octet-stream';
            default:
                return 'application/octet-stream';
        }
    }
}
