/**
 * Debug utility for file uploads
 */
export const debugFileUpload = (file) => {
    if (!file) {
        console.log('No file selected');
        return;
    }
    
    console.log('File details:', {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: new Date(file.lastModified).toISOString()
    });
};

export const validateImageFile = (file) => {
    if (!file) return { valid: false, error: 'No file selected' };
    
    // Check size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        return { 
            valid: false, 
            error: `File size (${(file.size/1024/1024).toFixed(2)}MB) exceeds maximum size of 5MB` 
        };
    }
    
    // Check type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
        return { 
            valid: false, 
            error: `Unsupported file type: ${file.type}. Use JPG, PNG, GIF, WEBP, or BMP.` 
        };
    }
    
    return { valid: true };
};
